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
import GridMarks from "../components/Sections/GridMarks";

//Data
import { dummyData } from "../utils/data/dummyData";
import { radiusData } from "../utils/data/radiusData";
import { simulationData } from "../utils/data/simulationData";

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
  transition: all 0.4s ease;

  // Offline
  ${({ isOnline, initialLoading, zoom }) =>
    // (!isOnline || !initialLoading) &&
    css`
      //pointer-events: none;
      background-size: calc(1200px / ${zoom ? 30 - zoom * 2.65 : "10"})
        calc(1200px / ${zoom ? 30 - zoom * 2.65 : "10"});
      background-position: center;
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

//Readme
//Offline (load things offline, show things offline)
//Textfield
//polish

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

  //NEW STATES
  const [endpointURL, setEndpointURL] = useState(
    localStorage.getItem("endpointURL") || "default"
  );
  const [mapType, setMapType] = useState(localStorage.getItem("mapType") || 3);
  const [gridValues, setGridValues] = useState([[], []]);

  const maxAmount = 25;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    localStorage.setItem("endpointURL", endpointURL);
  }, [endpointURL]);

  useEffect(() => {
    localStorage.setItem("mapType", mapType);
    //change how map looks (may need to be updated if google map updates)
    if (initialLoading) {
      console.log("MapType " + mapType);
      if (parseInt(mapType) === 1) {
        mapContainerRef.current.children[1].children[0].children[0].style.backgroundColor =
          "transparent";
        mapContainerRef.current.children[1].children[0].children[0].children[0].children[0].children[0].style.opacity = 0;
      } else if (parseInt(mapType) === 3) {
        mapContainerRef.current.children[1].children[0].children[0].style.backgroundColor =
          "var(--background)";
        mapContainerRef.current.children[1].children[0].children[0].children[0].children[0].children[0].style.opacity = 1;
      }
    }
  }, [mapType, initialLoading]);

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
      return await fetch(
        endpointURL === "default" ? "https://www.google.com/" : endpointURL,
        {
          mode: "no-cors",
        }
      )
        .then((response) => {
          console.log(response);
          if (response.type === "opaque" || response.ok) {
            console.log("success");
          } else {
            console.log("error1");
            throw new Error("Something went wrong");
          }
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
          console.log("error2");
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
  const getNewShipData = async (prevShipData) => {
    //Simulation mode
    if (endpointURL === "simulation") {
      //advance frame
      setCurrentFrame((oldFrame) => {
        console.log("Curernt fram" + oldFrame);
        if (oldFrame - 1 >= 0) {
          return oldFrame - 1;
        } else {
          return oldFrame;
        }
      });

      return prevShipData;
    }

    //check internet
    if (await checkInternet(null, true)) {
      //Update positions of ships
      const newShipData = {};

      for (const key in prevShipData[0]) {
        newShipData[key] = JSON.parse(JSON.stringify(prevShipData[0][key]));
        //Update timestamp
        newShipData[key].timestamp = Date.now();
        if (prevShipData[0][key].type === "ship") {
          if (prevShipData[0][key].direction >= 180) {
            newShipData[key].position = {
              lat:
                prevShipData[0][key].position.lat +
                (Math.floor(Math.random() * 20) - 10) / 1000,
              lng:
                prevShipData[0][key].position.lng -
                Math.floor(Math.random() * 10 + 1) / 1000,
            };
          } else {
            newShipData[key].position = {
              lat:
                prevShipData[0][key].position.lat +
                (Math.floor(Math.random() * 20) - 10) / 1000,
              lng:
                prevShipData[0][key].position.lng +
                Math.floor(Math.random() * 10 + 1) / 1000,
            };
          }
        }
      }

      console.log(prevShipData);
      console.log(prevShipData.length);
      console.log(maxAmount);

      if (prevShipData.length === maxAmount) {
        console.log("In here");
        setShipData([newShipData, ...prevShipData.slice(0, -1)]);
        return [newShipData, ...prevShipData.slice(0, -1)];
      } else {
        setShipData([newShipData, ...prevShipData.slice()]);
        return [newShipData, ...prevShipData.slice()];
      }

      //return newShipData;
    } else {
      setStatusText("No internet connection, will try again in 60 seconds");
      //return null representing false (code stops here)
      return;
    }
  };

  useEffect(() => {
    console.log("it updated");
    console.log(shipData);
  }, [shipData]);

  //Update data every minute
  const updateLoading = (internetCheck, prevShipData) => {
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
        const shipData = await getNewShipData(prevShipData); //show small movements for testing
        //if API returns proper data
        if (shipData) {
          await loadMaps(shipData[0], false); //Loap Map with new Ship Data
          updateLoading(false, shipData); //restart loop
        } else {
          updateLoading(true, prevShipData); //skip updates loop
        }
      }, 500);
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
      console.log("DONE");

      setDefaultCenter(center);
      setDefaultZoom(zoom);
    }
  };

  //When map is finished loading tiles (will only load if map is online)
  const finsihedLoading = () => {
    console.log("FINITO");
    //only run on initial load
    if (!initialLoading) {
      setInitialLoading(true); //initial load is done
      updateLoading(false, shipData); //Call function to update data every minute
    }
  };

  //New
  const valueFromPercentage = (percentage, initial, final) => {
    return percentage * (final - initial) + initial;
  };

  //Update center and zoom when user moves map
  const onMapsChange = ({ center, zoom, bounds }) => {
    setCenter(center);
    //setZoom(zoom); //TODO

    //Compute update grid marks
    let gridMarks = [
      [
        bounds.ne.lng.toFixed(5),
        valueFromPercentage(0.25, bounds.ne.lng, bounds.sw.lng).toFixed(5),
        valueFromPercentage(0.5, bounds.ne.lng, bounds.sw.lng).toFixed(5),
        valueFromPercentage(0.75, bounds.ne.lng, bounds.sw.lng).toFixed(5),
        bounds.sw.lng.toFixed(5),
      ],
      [
        bounds.ne.lat.toFixed(5),
        valueFromPercentage(0.75, bounds.sw.lat, bounds.ne.lat).toFixed(5),
        valueFromPercentage(0.5, bounds.sw.lat, bounds.ne.lat).toFixed(5),
        valueFromPercentage(0.25, bounds.sw.lat, bounds.ne.lat).toFixed(5),
        bounds.sw.lat.toFixed(5),
      ],
    ];
    setGridValues(gridMarks);

    //get bounds

    //Possibly compute upgrade grid size
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
      const data = shipData[currentFrame][event.target.dataset["id"]];
      setInfoOpen(true);
      setSelectedData(data);
      setCenter({
        lat: data.position.lat,
        lng: data.position.lng - 0.5, //slightly moved to the right
      });
      setZoom(defaultZoom + 1);
    },
    [shipData, defaultZoom, currentFrame]
  );

  //Get Ship Data from API
  const getShipData = useCallback(async () => {
    //check internet
    if (!initialLoading) {
      //Simulation mode
      if (endpointURL === "simulation") {
        //polish data by tranform array to JSON
        const polishedArray = [];
        for (let i = 0; i < simulationData.length; i++) {
          const polishedData = {};
          for (let j = 0; j < simulationData[i].length; j++) {
            polishedData[simulationData[i][j].id] = simulationData[i][j];
            //Add timestamp if not present
            if (!polishedData[simulationData[i][j].id].timestamp) {
              polishedData[simulationData[i][j].id].timestamp =
                Date.now() + reloadTime * 1000 * i; // add extra time for each frame
            }
          }
          polishedArray.unshift(polishedData);
        }
        console.log("SET");
        console.log(polishedArray);
        console.log(simulationData.length - 1);
        setShipData(polishedArray);
        setCurrentFrame(simulationData.length - 1); //length
        setIsOnline(true);
        return polishedArray[0];
      }

      if (await checkInternet()) {
        //polish data by tranform array to JSON
        const polishedData = {};
        for (let i = 0; i < dummyData.length; i++) {
          polishedData[dummyData[i].id] = dummyData[i];
          //Add timestamp if not present
          if (!polishedData[dummyData[i].id].timestamp) {
            polishedData[dummyData[i].id].timestamp = Date.now();
          }
        }
        console.log("SET");
        setShipData([polishedData]);
        setIsOnline(true);

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
      console.log("OUT");
      //if API returns proper data
      if (shipData) {
        console.log("IN");
        await loadMaps(shipData, true); //Loap map with new ship data
      }
    })();
    return () => {
      clearInterval(intervalId.current);
    };
  }, [getShipData]);

  //get radius widths when zoom or shipData updates
  useEffect(() => {
    if (shipData[currentFrame] && zoom) {
      const circleData = {};
      let shipKeys = Object.keys(shipData[currentFrame]); //get id's

      for (let i = 0; i < shipKeys.length; i++) {
        //only add radiuses to ships
        if (shipData[currentFrame][shipKeys[i]].type === "ship") {
          for (const rad in radiusData) {
            //convert radius to width and height
            const { w, h } = meters2ScreenPixels(
              radiusData[rad] * 1000 * 2,
              {
                lat: shipData[currentFrame][shipKeys[i]].position.lat,
                lng: shipData[currentFrame][shipKeys[i]].position.lng,
              },
              zoom
            );

            circleData[shipData[currentFrame][shipKeys[i]].id] = {
              ...circleData[shipData[currentFrame][shipKeys[i]].id],
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
  }, [zoom, shipData, currentFrame]);

  //get connections widths when zoom or shipData updates
  useEffect(() => {
    if (shipData && zoom) {
      const allConnetions = [];

      for (const key in shipData[currentFrame]) {
        for (const type in shipData[currentFrame][key].connections) {
          for (
            let i = 0;
            i < shipData[currentFrame][key].connections[type].length;
            i++
          ) {
            let initialShipKey = "";
            let toShipKey = "";

            if (type === "receiving") {
              initialShipKey = shipData[currentFrame][key].connections[type][i];
              toShipKey = key;
            } else {
              initialShipKey = key;
              toShipKey = shipData[currentFrame][key].connections[type][i];
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
                  shipData[currentFrame][initialShipKey].position.lat,
                  shipData[currentFrame][toShipKey].position.lat
                ),
                lng: Math.min(
                  shipData[currentFrame][initialShipKey].position.lng,
                  shipData[currentFrame][toShipKey].position.lng
                ),
              },
              se: {
                lat: Math.min(
                  shipData[currentFrame][initialShipKey].position.lat,
                  shipData[currentFrame][toShipKey].position.lat
                ),
                lng: Math.max(
                  shipData[currentFrame][initialShipKey].position.lng,
                  shipData[currentFrame][toShipKey].position.lng
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
              shipData[currentFrame][initialShipKey].position.lat,
              shipData[currentFrame][initialShipKey].position.lng,
              shipData[currentFrame][toShipKey].position.lat,
              shipData[currentFrame][initialShipKey].position.lng
            );
            const { h: screenHeight } = meters2ScreenPixels(
              height,
              center,
              zoom
            );
            //get width  (coordinate distance to meters)
            const width = measure(
              shipData[currentFrame][initialShipKey].position.lat,
              shipData[currentFrame][initialShipKey].position.lng,
              shipData[currentFrame][initialShipKey].position.lat,
              shipData[currentFrame][toShipKey].position.lng
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
              JSON.stringify(shipData[currentFrame][initialShipKey].position)
            ) {
              //Top left is initital ship
              //diagonal is type 1 and direction is type 1
              diagonal = 1;
              direction = 1;
            } else if (
              JSON.stringify(bounds["nw"]) ===
              JSON.stringify(shipData[currentFrame][toShipKey].position)
            ) {
              //Top left is other ship
              //diagonal is type 1 and direction is type 2
              diagonal = 1;
              direction = 2;
            } else if (
              bounds["nw"].lat ===
              shipData[currentFrame][initialShipKey].position.lat
            ) {
              //Top right is initial ship
              //diagonal is type 2 and direction is type 1
              diagonal = 2;
              direction = 1;
            } else if (
              bounds["nw"].lat ===
              shipData[currentFrame][toShipKey].position.lat
            ) {
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
  }, [zoom, shipData, currentFrame]);

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
        zoom={zoom}
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
                {Object.keys(shipData[currentFrame]).map((item) => {
                  if (shipData[currentFrame][item].type === "ship") {
                    return (
                      <Ship
                        onClick={openInfoContainer}
                        direction={shipData[currentFrame][item].direction}
                        isConnected={shipData[currentFrame][item].connected}
                        isCenter={shipData[currentFrame][item].isCenter}
                        isSelected={selectedData.id === item}
                        data-id={item}
                        key={`ship-${shipData[currentFrame][item].id}`}
                        {...shipData[currentFrame][item].position}
                      />
                    );
                  } else {
                    return (
                      <Station
                        onClick={openInfoContainer}
                        data-id={item}
                        key={`station-${shipData[currentFrame][item].id}`}
                        {...shipData[currentFrame][item].position}
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
                          isConnected={shipData[currentFrame][item].connected}
                          isCenter={shipData[currentFrame][item].isCenter}
                          isSelected={selectedData.id === item}
                          key={`radius-${rad}-${shipData[currentFrame][item].id}`}
                          {...shipData[currentFrame][item].position}
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
                        isConnected={
                          shipData[currentFrame][item.from].connected ||
                          shipData[currentFrame][item.to].connected
                        }
                        isCenter={
                          shipData[currentFrame][item.from].isCenter ||
                          shipData[currentFrame][item.to].isCenter
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

      {/* GRID MARKS SECTION */}
      <GridMarks values={gridValues} />

      {/* CONTROLS SECTION */}
      <Controls
        endpointURL={endpointURL}
        setEndpointURL={setEndpointURL}
        mapType={mapType}
        setMapType={setMapType}
        frameAmount={shipData.length}
        frameTimestamp={
          shipData[currentFrame] &&
          shipData[currentFrame][Object.keys(shipData[currentFrame])[0]]
            .timestamp
        }
        currentFrame={currentFrame}
        setCurrentFrame={setCurrentFrame}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

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
