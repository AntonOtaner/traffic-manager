//Packages
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { fitBounds, meters2ScreenPixels } from "google-map-react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

//Components
import Button from "../components/UI/Button";
import Map from "../components/UI/Map";
import Ship from "../components/UI/Ship";
import Station from "../components/UI/Station";
import Circle from "../components/UI/Circle";
import Connection from "../components/UI/Connection";

import Info from "../components/Sections/Info";
import Source from "../components/Sections/Source";
import Update from "../components/Sections/Update";
import Controls from "../components/Sections/Controls";

//Data
import { dummyData } from "../utils/data/dummyData";
import { radiusData } from "../utils/data/radiusData";

//Helper functions
import { measure } from "../utils/helper/helper";

//Styles for general component
const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  padding: 100px 70px;
`;

//Styles for map
const MapContainer = styled.div`
  flex: 1;
  border-radius: 20px;
  border: 5px solid var(--border);
  overflow: hidden;
  position: relative;

  // Offline
  ${({ isOnline, initialLoading }) =>
    (!isOnline || !initialLoading) &&
    css`
      pointer-events: none;
      background-size: 56px 56px;
      background-image: linear-gradient(
          to right,
          var(--border) 0.5px,
          transparent 1px
        ),
        linear-gradient(to bottom, var(--border) 0.5px, transparent 1px);
    `};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  right: 0;
  bottom: 0;

  margin: 30px;
  z-index: 1;
`;

//TODO:
//UI in app

//Readme
//grid line (long / lat) instead of offline map
//offline map
//Offline (load things offline, show things offline)
//Textfield (readme add for change of data)
//Rewind system
//Timestamps

const reloadTime = 5; //time to reload data or to recheck for internet (outside of component since it does not need to be updated every rerender)

//Container for the interactable part of the application
function Main() {
  //States
  const [isLoading, setIsLoading] = useState(true); //true if new data is being fetched and processed
  const [initialLoading, setInitialLoading] = useState(false); //true when map first loads tiles
  const [statusText, setStatusText] = useState("Updating"); //atatus text shown in update componet
  const [isOnline, setIsOnline] = useState(); //true if connected to the internet, false if not, null if not yet determined

  const [selectedData, setSelectedData] = useState({}); //selected data to be shown on info panel
  const [shipData, setShipData] = useState([]); //array containing ship data loaded on page load and every minute
  const [circles, setCircles] = useState({}); //object containing circles/radiuses around ships
  const [connections, setConnections] = useState([]); //array containing connections between different ships and base stations
  const [infoOpen, setInfoOpen] = useState(false); //true when info panel is open

  const [center, setCenter] = useState(); //current map center
  const [defaultCenter, setDefaultCenter] = useState(); //default map center based on bounds
  const [zoom, setZoom] = useState(); //current map zoom
  const [defaultZoom, setDefaultZoom] = useState(); //default map zoom based on bounds

  const mapContainerRef = useRef(); //Map Ref to compute width and height
  const intervalId = useRef(); //setInterval ID of checkInternet in getShipData (used to cancel interval) (useRef since state does not need to update with it)

  //Check for internet connection
  const checkInternet = useCallback(async () => {
    //Case 1: USER ENTERS THE APP
    //check if there is wifi
    //if there is: set is online to true and continue
    //if not: run clock to check and reload when connected (must reload maps api)

    //Case 2: Mid program
    //check if there is wifi
    //if there is: continue
    //if not: run clock to check (to not remove current map)

    //If is online
    if (navigator.onLine) {
      //If can ping api (google.com for testing)
      return await fetch("https://www.google.com/", {
        mode: "no-cors",
      })
        .then(async () => {
          //Has Internet
          if (isOnline === false && !initialLoading) {
            //didnt load but was detected false
            window.location.reload();
          }
          setIsOnline(true);
          return true;
        })
        .catch(() => {
          //Does not have internet
          setIsOnline(false);
          return false;
        });
    } else {
      //Does not have internet
      setIsOnline(false);
      return false;
    }
  }, [isOnline, initialLoading]);

  //Get new ship data by updating coordinates a small amount
  const getNewShipData = async () => {
    //check internet
    if (await checkInternet(null, true)) {
      //Update positions of ships
      const newShipData = {};
      for (const key in shipData) {
        newShipData[key] = shipData[key];
        if (shipData[key].type === "ship") {
          if (shipData[key].direction >= 180) {
            newShipData[key].position = {
              lat:
                shipData[key].position.lat +
                (Math.floor(Math.random() * 20) - 10) / 1000,
              lng:
                shipData[key].position.lng -
                Math.floor(Math.random() * 10 + 1) / 1000,
            };
          } else {
            newShipData[key].position = {
              lat:
                shipData[key].position.lat +
                (Math.floor(Math.random() * 20) - 10) / 1000,
              lng:
                shipData[key].position.lng +
                Math.floor(Math.random() * 10 + 1) / 1000,
            };
          }
        }
      }
      setShipData(newShipData);
      return newShipData;
    } else {
      setStatusText("No internet connection, will try again in 60 seconds");
      //return null representing false (code stops here)
      return;
    }
  };

  //Update data every minute
  const updateLoading = (internetCheck) => {
    //Update status
    if (!internetCheck) {
      setStatusText("Synched");
      setIsLoading(false);
    }
    //get new data every minute
    setTimeout(() => {
      if (!internetCheck) {
        setStatusText("Updating");
        setIsLoading(true);
      }
      //Extra 1 second since no API is actually being loaded
      setTimeout(async () => {
        //Need variable to prevent extra rerender with Hooks
        //const shipData = await getShipData(); //get new Ship Data (uncomment during production)
        const shipData = await getNewShipData(); //show small movements for testing
        //if API returns proper data
        if (shipData) {
          await loadMaps(shipData, false); //Loap Map with new Ship Data
          updateLoading(false); //restart loop
        } else {
          updateLoading(true); //skip updates loop
        }
      }, 1000);
    }, reloadTime * 1000);
  };

  //Get Center and Zoom of Map
  const loadMaps = async (data, isInitial) => {
    //data: ship data (don't have to wait an extra render)
    //isInitial: true if called in useEffect which runs on load
    //this is so that the zoom does not update every minute
    let dataKeys = Object.keys(data); //get all id's
    //If there is one ship, there is no need to compute bounds
    if (dataKeys.length === 1) {
      setCenter(data[dataKeys[0]].position);
      setDefaultCenter(data[dataKeys[0]].position);
      //Only change zoom if it is the first time so that the user does not randonly experience camera changes
      if (isInitial) {
        setZoom(11);
      }
      setDefaultZoom(11);
    } else {
      //Get Map Bounds
      const lats = [];
      const lngs = [];
      for (let i = 0; i < dataKeys.length; i++) {
        lats.push(data[dataKeys[i]].position.lat);
        lngs.push(data[dataKeys[i]].position.lng);
      }
      //Get extremes
      const bounds = {
        nw: {
          lat: Math.max(...lats) + 0.5,
          lng: Math.min(...lngs) - 0.5,
        },
        se: {
          lat: Math.min(...lats) - 0.5,
          lng: Math.max(...lngs) + 0.5,
        },
      };
      //map size
      const size = {
        width: mapContainerRef.current.offsetWidth,
        height: mapContainerRef.current.offsetHeight,
      };
      //Compute center and zoom
      let { center, zoom } = fitBounds(bounds, size);
      //Check if isCenter key exists overiding default center
      for (let i = 0; i < dataKeys.length; i++) {
        if (data[dataKeys[i]].hasOwnProperty("isCenter")) {
          if (data[dataKeys[i]].isCenter) {
            center = data[dataKeys[i]].position;
          }
        }
      }
      //Only change zoom if it is the first time so that the user does not randonly experience camera changes
      if (isInitial) {
        setCenter(center);
        setZoom(zoom);
      }
      setDefaultCenter(center);
      setDefaultZoom(zoom);
    }
  };

  //When map is finished loading tiles (will only load if map is online)
  const finsihedLoading = () => {
    //only run on initial load
    if (!initialLoading) {
      setInitialLoading(true); //initial load is done
      updateLoading(false); //Call function to update data every minute
    }
  };

  //Update center and zoom when user moves map
  const onMapsChange = ({ center, zoom }) => {
    setCenter(center);
    //setZoom(zoom); //TODO
  };

  //Update map center and position when info panel is closed
  const closeInfo = useCallback(() => {
    setInfoOpen(false);
    setCenter(defaultCenter);
    setZoom(defaultZoom);

    //delay since don't want empty data shown to user
    setTimeout(() => {
      setSelectedData({});
    }, 400);
  }, [defaultCenter, defaultZoom]);

  //Update map center and position when info panel is opened
  const openInfoContainer = useCallback(
    (event) => {
      //get data from item selected
      const data = shipData[event.target.dataset["id"]];
      setInfoOpen(true);
      setSelectedData(data);
      setCenter({
        lat: data.position.lat,
        lng: data.position.lng - 0.5, //slightly moved to the right
      });
      setZoom(defaultZoom + 1);
    },
    [shipData, defaultZoom]
  );

  //Get Ship Data from API
  const getShipData = useCallback(async () => {
    //check internet
    if (!initialLoading) {
      if (await checkInternet()) {
        //polish data by tranform array to JSON
        const polishedData = {};
        for (let i = 0; i < dummyData.length; i++) {
          polishedData[dummyData[i].id] = dummyData[i];
        }
        setShipData(polishedData);
        return polishedData;
      } else {
        setStatusText("No internet connection, will try again in 60 seconds");
        intervalId.current = setInterval(checkInternet, reloadTime * 1000); //check for internet every 60 seconds
        //return null representing false (code stops here)
        return;
      }
    }
  }, [checkInternet, initialLoading]);

  //fetch data on inital load
  useEffect(() => {
    //IIFE to prevent race conditions
    (async function () {
      //Need variable to prevent extra rerender with Hooks
      const shipData = await getShipData(); //get ship data
      //if API returns proper data
      if (shipData) {
        await loadMaps(shipData, true); //Loap map with new ship data
      }
    })();
    return () => {
      clearInterval(intervalId.current);
    };
  }, [getShipData]);

  //get radius widths when zoom or shipData updates
  useEffect(() => {
    if (shipData && zoom) {
      const circleData = {};
      let shipKeys = Object.keys(shipData); //get id's

      for (let i = 0; i < shipKeys.length; i++) {
        //only add radiuses to ships
        if (shipData[shipKeys[i]].type === "ship") {
          for (const rad in radiusData) {
            //convert radius to width and height
            const { w, h } = meters2ScreenPixels(
              radiusData[rad] * 1000 * 2,
              {
                lat: shipData[shipKeys[i]].position.lat,
                lng: shipData[shipKeys[i]].position.lng,
              },
              zoom
            );

            circleData[shipData[shipKeys[i]].id] = {
              ...circleData[shipData[shipKeys[i]].id],
              [rad]: {
                width: w,
                height: h,
              },
            };
          }
        }
      }

      setCircles(circleData);
    }
  }, [zoom, shipData]);

  //get connections widths when zoom or shipData updates
  useEffect(() => {
    if (shipData && zoom) {
      const allConnetions = [];

      for (const key in shipData) {
        for (const type in shipData[key].connections) {
          for (let i = 0; i < shipData[key].connections[type].length; i++) {
            let initialShipKey = "";
            let toShipKey = "";

            if (type === "receiving") {
              initialShipKey = shipData[key].connections[type][i];
              toShipKey = key;
            } else {
              initialShipKey = key;
              toShipKey = shipData[key].connections[type][i];
            }

            //check if connection already exists
            if (
              allConnetions.some((item) => item.from === initialShipKey) &&
              allConnetions.some((item) => item.to === toShipKey)
            ) {
              //jump to next iteration
              continue;
            }
            //Get extremes
            const bounds = {
              nw: {
                lat: Math.max(
                  shipData[initialShipKey].position.lat,
                  shipData[toShipKey].position.lat
                ),
                lng: Math.min(
                  shipData[initialShipKey].position.lng,
                  shipData[toShipKey].position.lng
                ),
              },
              se: {
                lat: Math.min(
                  shipData[initialShipKey].position.lat,
                  shipData[toShipKey].position.lat
                ),
                lng: Math.max(
                  shipData[initialShipKey].position.lng,
                  shipData[toShipKey].position.lng
                ),
              },
            };
            //Get map size
            const size = {
              width: mapContainerRef.current.offsetWidth,
              height: mapContainerRef.current.offsetHeight,
            };
            //Compute center and zoom
            const { center } = fitBounds(bounds, size);
            //get height (coordinate distance to meters)
            const height = measure(
              shipData[initialShipKey].position.lat,
              shipData[initialShipKey].position.lng,
              shipData[toShipKey].position.lat,
              shipData[initialShipKey].position.lng
            );
            const { h: screenHeight } = meters2ScreenPixels(
              height,
              center,
              zoom
            );
            //get width  (coordinate distance to meters)
            const width = measure(
              shipData[initialShipKey].position.lat,
              shipData[initialShipKey].position.lng,
              shipData[initialShipKey].position.lat,
              shipData[toShipKey].position.lng
            );
            const { w: screenWidth } = meters2ScreenPixels(width, center, zoom);

            //Find type of diagonal
            //Type 1: Top left to bottom right
            //Type 2: Bottom Left to top right

            //Find direction:
            //Type 1: From top to bottom
            //Type 2: From bottom to top
            let diagonal = 0;
            let direction = 0;

            if (
              JSON.stringify(bounds["nw"]) ===
              JSON.stringify(shipData[initialShipKey].position)
            ) {
              //Top left is initital ship
              //diagonal is type 1 and direction is type 1
              diagonal = 1;
              direction = 1;
            } else if (
              JSON.stringify(bounds["nw"]) ===
              JSON.stringify(shipData[toShipKey].position)
            ) {
              //Top left is other ship
              //diagonal is type 1 and direction is type 2
              diagonal = 1;
              direction = 2;
            } else if (
              bounds["nw"].lat === shipData[initialShipKey].position.lat
            ) {
              //Top right is initial ship
              //diagonal is type 2 and direction is type 1
              diagonal = 2;
              direction = 1;
            } else if (bounds["nw"].lat === shipData[toShipKey].position.lat) {
              //Top right is other ship
              //diagonal is type 2 and direction is type 2
              diagonal = 2;
              direction = 2;
            }

            allConnetions.push({
              from: initialShipKey,
              to: toShipKey,
              center: center,
              width: screenWidth,
              height: screenHeight,
              diagonal: diagonal,
              direction: direction,
            });
          }
        }
      }

      setConnections(allConnetions);
    }
  }, [zoom, shipData]);

  //Zoom and center controls placed in used memo to avoid useless rerenders
  const MapButtons = useMemo(() => {
    return (
      <ButtonContainer>
        <Button
          square
          fill
          margin="5px 0"
          onClick={() => {
            //Max zoom
            if (zoom < defaultZoom + 2) setZoom(zoom + 1);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          square
          fill
          margin="5px 0"
          onClick={() => {
            //Min zoom
            if (zoom > defaultZoom - 2) setZoom(zoom - 1);
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <Button
          square
          fill
          margin="5px 0 10px 0"
          onClick={() => {
            setCenter(defaultCenter);
            setZoom(defaultZoom);
          }}
        >
          <FontAwesomeIcon icon={faGlobeAmericas} />
        </Button>
      </ButtonContainer>
    );
  }, [defaultCenter, defaultZoom, zoom]);

  return (
    <Container>
      {/* MAP SECTION */}
      <MapContainer
        ref={mapContainerRef}
        isOnline={isOnline}
        initialLoading={initialLoading}
      >
        {center &&
          zoom &&
          defaultZoom &&
          defaultCenter &&
          (isOnline || initialLoading) && (
            <>
              {MapButtons}
              <Map
                onTilesLoaded={finsihedLoading}
                center={center}
                zoom={zoom}
                defaultZoom={defaultZoom}
                onChange={onMapsChange}
              >
                {/* START PLACING OBJECTS ON MAP */}
                {Object.keys(shipData).map((item) => {
                  if (shipData[item].type === "ship") {
                    return (
                      <Ship
                        onClick={openInfoContainer}
                        direction={shipData[item].direction}
                        isConnected={Boolean(
                          shipData[item].connections.receiving.length +
                            shipData[item].connections.providing.length
                        )}
                        isCenter={shipData[item].isCenter}
                        isSelected={selectedData.id === item}
                        data-id={item}
                        key={`ship-${shipData[item].id}`}
                        {...shipData[item].position}
                      />
                    );
                  } else {
                    return (
                      <Station
                        onClick={openInfoContainer}
                        data-id={item}
                        key={`station-${shipData[item].id}`}
                        {...shipData[item].position}
                      />
                    );
                  }
                })}
                {circles &&
                  Object.keys(circles).map((item) => {
                    return Object.keys(circles[item]).map((rad) => {
                      return (
                        <Circle
                          width={circles[item][rad].width}
                          height={circles[item][rad].height}
                          isConnected={Boolean(
                            shipData[item].connections.receiving.length +
                              shipData[item].connections.providing.length
                          )}
                          isCenter={shipData[item].isCenter}
                          isSelected={selectedData.id === item}
                          key={`radius-${rad}-${shipData[item].id}`}
                          {...shipData[item].position}
                        />
                      );
                    });
                  })}

                {connections &&
                  connections.map((item) => {
                    return (
                      <Connection
                        width={item.width}
                        height={item.height}
                        diagonal={item.diagonal}
                        direction={item.direction}
                        isCenter={
                          shipData[item.from].isCenter ||
                          shipData[item.to].isCenter
                        }
                        key={`connection-${item.from}-${item.to}`}
                        {...item.center}
                      />
                    );
                  })}
              </Map>
            </>
          )}
      </MapContainer>

      {/* CONTROLS SECTION */}
      <Controls />

      {/* INFO SECTION */}
      <Info open={infoOpen} selectedData={selectedData} close={closeInfo} />

      {/* UPDATE SECTION */}
      <Update isLoading={isLoading} statusText={statusText} />

      {/* SOURCE SECTION */}
      <Source />
    </Container>
  );
}

export default Main;
