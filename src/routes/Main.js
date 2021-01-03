//Packages
import { useState, useEffect, useRef } from "react";
import { fitBounds, meters2ScreenPixels } from "google-map-react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faMinus,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

//Components
import Button from "../components/UI/Button";
import Text from "../components/UI/Text";
import Loader from "../components/UI/Loader";
import Map from "../components/UI/Map";
import Ship from "../components/UI/Ship";
import Station from "../components/UI/Station";
import Circle from "../components/UI/Circle";
import Connection from "../components/UI/Connection";

//Data
import { dummyData } from "../utils/data/dummyData";
import { radiusData } from "../utils/data/radiusData";

//EXTRA (NO RUSH)
//weird state not updating
//fit bounds small errors
//Optimization (double fetch, classes, pure components, ...)
//finish comments

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 100px 50px;
`;

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

const TopRightContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  align-items: center;
  padding-right: 10px;
`;

const BottomRightContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 50px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;

  border-radius: 15px 0 0 0;
  border-width: 5px 0 0 5px;
  border-style: solid;
  border-color: var(--border);
`;

const InfoContainer = styled.div`
  position: absolute;
  left: ${({ isOpen }) => (isOpen ? "25px" : "-500px")};

  display: flex;
  flex-direction: column;
  align-self: center;

  background-color: var(--background);
  border-radius: 20px;
  border: 5px solid var(--border);
  width: 400px; //40px less to compensate for padding
  height: 70%; //can be played around with later
  transition: all 0.4s ease;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const InfoBody = styled.div`
  overflow-y: scroll;
  padding: 0 20px;
`;

const InfoBlock = styled.div`
  padding: 10px 0;
`;

const StyledHr = styled.hr`
  border-color: var(--text);
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

function measure(lat1, lon1, lat2, lon2) {
  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}

function Main() {
  //States
  const [isLoading, setIsLoading] = useState(true); //true if new data is being fetched and processed
  const [initialLoading, setInitialLoading] = useState(false); //true when map first loads tiles
  const [selectedData, setSelectedData] = useState({}); //selected data to be shown on info panel
  const [shipData, setShipData] = useState([]); //array containing ship data loaded on page load and every minute
  const [center, setCenter] = useState(); //current map center
  const [defaultCenter, setDefaultCenter] = useState(); //default map center based on bounds
  const [zoom, setZoom] = useState(); //current map zoom
  const [defaultZoom, setDefaultZoom] = useState(); //default map zoom based on bounds

  const [size, setSize] = useState({});
  const [connections, setConnections] = useState([]);
  const [statusText, setStatusText] = useState("Updating");
  const [isOnline, setIsOnline] = useState();
  const [infoOpen, setInfoOpen] = useState(false);

  const mapContainerRef = useRef(); //Map Ref to Compute width and height

  //fetch data on inital load
  useEffect(() => {
    //IIFE to prevent race conditions
    (async function () {
      //Need variable to prevent extra rerender with Hooks
      const shipData = await getShipData(); //get Ship Data
      if (shipData) {
        await loadMaps(shipData, true); //Loap Map with new Ship Data
      }
    })();
  }, []);

  const checkInternet = async (online, hasLoaded) => {
    //USER ENTERS THE APP
    //CHECK IF THERE IS WIFI
    //IF THERE IS: SET IS ONLINE TO TRUE AND CONTINUE ON WITH LIFE
    //IF NOT: RELOAD in 60 seconds (dont really care about map)

    //MID PROGRAM
    //CHECK IF THERE IS WIFI
    //IF THERE IS: KEEP GOING
    //IF NOT: RUN CLOCK TO CHECK (to not remove current map)

    if (navigator.onLine) {
      return await fetch("https://www.google.com/", {
        mode: "no-cors",
      })
        .then(async () => {
          console.log("TYPE 1 INTERNET + intial loading");
          console.log(hasLoaded);
          if (online === false && !hasLoaded) {
            window.location.reload();
          }
          if (online === false && hasLoaded) {
            const shipData = await getNewShipData(); //show small movements for testing
            if (shipData) {
              await loadMaps(shipData, false); //Loap Map with new Ship Data
              updateLoading();
            }
          }
          setIsOnline(true);
          return true;
        })
        .catch(() => {
          console.log("TYPE 2 INTERNET");
          setIsOnline(false);
          setTimeout(() => {
            checkInternet(false, hasLoaded);
          }, 5 * 1000);
          return false;
        });
    } else {
      console.log("TYPE 3 INTERNET");
      setIsOnline(false);
      setTimeout(() => {
        checkInternet(false, hasLoaded);
      }, 5 * 1000);
      console.log("text");
      return false;
    }
  };

  //Get Ship Data from API
  const getShipData = async () => {
    //check internet
    if (await checkInternet(null, false)) {
      //polish data by tranform array to JSON
      const polishedData = {};
      for (let i = 0; i < dummyData.length; i++) {
        polishedData[dummyData[i].id] = dummyData[i];
      }
      setShipData(polishedData);
      return polishedData;
    } else {
      console.log("change status");
      setStatusText("No internet connection, will try again in 60 seconds");
      return;
    }
  };

  const getNewShipData = async () => {
    //check internet
    if (await checkInternet(null, true)) {
      setStatusText("Updating");

      const newShipData = {};

      for (const key in shipData) {
        newShipData[key] = shipData[key];
        if (shipData[key].type === "ship") {
          if (shipData[key].direction >= 180) {
            newShipData[key].position = {
              lat:
                shipData[key].position.lat -
                Math.floor(Math.random() * 10) / 1000,
              lng:
                shipData[key].position.lng +
                (Math.floor(Math.random() * 20) - 10) / 1000,
            };
          } else {
            newShipData[key].position = {
              lat:
                shipData[key].position.lat +
                Math.floor(Math.random() * 10) / 1000,
              lng:
                shipData[key].position.lng +
                (Math.floor(Math.random() * 20) - 10) / 1000,
            };
          }
        }
      }

      setShipData(newShipData);
      return newShipData;
    } else {
      console.log("change status");
      setStatusText("No internet connection, will try again in 60 seconds");
      return false;
    }
  };

  //Get Center and Zoom of Map
  const loadMaps = async (data, isInitial) => {
    let dataKeys = Object.keys(data);

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

      //Get Extremes
      const bounds = {
        nw: {
          lat: Math.max(...lats),
          lng: Math.min(...lngs),
        },
        se: {
          lat: Math.min(...lats),
          lng: Math.max(...lngs),
        },
      };

      const size = {
        width: mapContainerRef.current.offsetWidth,
        height: mapContainerRef.current.offsetHeight,
      };

      //Compute Center and Zoom
      let { center, zoom } = fitBounds(bounds, size);

      //Check if isCenter key exists overiding default center
      for (let i = 0; i < dataKeys.length; i++) {
        if (data[dataKeys[i]].hasOwnProperty("isCenter")) {
          if (data[dataKeys[i]].isCenter) {
            center = data[dataKeys[i]].position;
          }
        }
      }

      console.log("Zoom updates");
      console.log(zoom);

      //Only change zoom if it is the first time so that the user does not randonly experience camera changes
      if (isInitial) {
        setCenter(center);
        setZoom(zoom - 1);
      }
      setDefaultCenter(center);
      setDefaultZoom(zoom - 1);
    }
  };

  //When map is finished loading tiles
  const finsihedLoading = () => {
    //only run on load
    if (!initialLoading) {
      console.log("Going to update");
      setInitialLoading(true);
      updateLoading(); //Call function to update data every minute
    }
  };

  //Update data every minute
  const updateLoading = () => {
    setStatusText("Synched");
    setIsLoading(false);
    //for testing
    setTimeout(() => {
      setIsLoading(true);
      console.log("In loop");
      //Extra 1 second since no API is actually being loaded
      setTimeout(async () => {
        console.log("Updating");
        //Need variable to prevent extra rerender with Hooks
        //const shipData = await getShipData(); //get new Ship Data
        const shipData = await getNewShipData(); //show small movements for testing
        if (shipData) {
          await loadMaps(shipData, false); //Loap Map with new Ship Data
          updateLoading();
        }
      }, 1000);
    }, 5 * 1000);
  };

  //Update center and zoom when user moves map
  const onMapsChange = ({ center, zoom, bounds, marginBounds }) => {
    setCenter(center);
    setZoom(zoom);
  };

  //Update map center and position when info panel is closed
  const closeInfo = () => {
    setInfoOpen(false);
    setCenter(defaultCenter);
    setZoom(defaultZoom);

    setTimeout(() => {
      setSelectedData({});
    }, 400);
  };

  //Update map center and position when info panel is opened
  const openInfoContainer = (data) => {
    setInfoOpen(true);
    setSelectedData(data);
    setCenter({
      lat: data.position.lat,
      lng: data.position.lng - 0.5,
    });
    setZoom(defaultZoom + 1);
  };

  useEffect(() => {
    if (zoom) {
      const rSizeData = {};
      let shipKeys = Object.keys(shipData);

      for (let i = 0; i < shipKeys.length; i++) {
        if (shipData[shipKeys[i]].type === "ship") {
          for (const rad in radiusData) {
            const { w, h } = meters2ScreenPixels(
              radiusData[rad] * 1000 * 2,
              {
                lat: shipData[shipKeys[i]].position.lat,
                lng: shipData[shipKeys[i]].position.lng,
              },
              zoom
            );

            rSizeData[shipData[shipKeys[i]].id] = {
              ...rSizeData[shipData[shipKeys[i]].id],
              [rad]: {
                width: w,
                height: h,
              },
            };
          }
        }
      }

      setSize(rSizeData);
    }
  }, [zoom, shipData]);

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

            //check if exists
            if (
              allConnetions.some((item) => item.from === initialShipKey) &&
              allConnetions.some((item) => item.to === toShipKey)
            ) {
              continue;
            }

            //Get Extremes
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

            const size = {
              width: mapContainerRef.current.offsetWidth,
              height: mapContainerRef.current.offsetHeight,
            };

            //Compute Center and Zoom
            const { center } = fitBounds(bounds, size);

            //get height
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

            //get width
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

  return (
    <Container>
      {/* BEGIN MAP SECTION */}
      <MapContainer
        ref={mapContainerRef}
        isOnline={isOnline}
        initialLoading={initialLoading}
      >
        {center && zoom && (isOnline || initialLoading) && (
          <>
            <ButtonContainer>
              <Button
                margin="5px 0"
                onClick={() => {
                  //Max zoom
                  if (zoom < defaultZoom + 2) setZoom(zoom + 1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button
                margin="5px 0"
                onClick={() => {
                  //Min zoom
                  if (zoom > defaultZoom - 2) setZoom(zoom - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button
                margin="5px 0 10px 0"
                onClick={() => {
                  setCenter(defaultCenter);
                  setZoom(defaultZoom);
                }}
              >
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </Button>
            </ButtonContainer>

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
                      onClick={() => openInfoContainer(shipData[item])}
                      direction={shipData[item].direction}
                      connections={shipData[item].connections}
                      isSelected={selectedData.id === item}
                      key={`ship-${shipData[item].id}`}
                      {...shipData[item].position}
                    />
                  );
                } else {
                  return (
                    <Station
                      onClick={() => openInfoContainer(shipData[item])}
                      key={`station-${shipData[item].id}`}
                      {...shipData[item].position}
                    />
                  );
                }
              })}
              {size &&
                Object.keys(size).map((item) => {
                  return Object.keys(size[item]).map((rad) => {
                    return (
                      <Circle
                        width={size[item][rad].width}
                        height={size[item][rad].height}
                        connections={shipData[item].connections}
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
                      key={`connection-${item.from}-${item.to}`}
                      {...item.center}
                    />
                  );
                })}
            </Map>
          </>
        )}
      </MapContainer>
      {/* END MAP SECTION */}

      {/* BEGIN INFO SECTION */}
      <InfoContainer isOpen={infoOpen}>
        <InfoHeader>
          <Text type="title">
            {selectedData.type?.charAt(0).toUpperCase() +
              selectedData.type?.slice(1)}{" "}
            Information
          </Text>
          <Button empty onClick={closeInfo}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </InfoHeader>
        <InfoBody>
          <InfoBlock>
            <Text type="subTitle" align="center" margin="0 0 10px 0">
              General
            </Text>
            <Text type="bold" margin="10px 0 5px">
              {selectedData.type?.charAt(0).toUpperCase() +
                selectedData.type?.slice(1)}{" "}
              ID
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.id}
            </Text>
          </InfoBlock>
          <StyledHr />
          {selectedData.type === "ship" && (
            <>
              <InfoBlock>
                <Text type="subTitle" align="center" margin="0 0 10px 0">
                  Movement
                </Text>
                <Text type="bold" margin="10px 0 5px">
                  Speed
                </Text>
                <Text type="body" margin="5px 0">
                  {selectedData.speed} knots
                </Text>
                <Text type="bold" margin="10px 0 5px">
                  Direction
                </Text>
                <Text type="body" margin="5px 0">
                  {selectedData.direction}°
                </Text>
              </InfoBlock>
              <StyledHr />
            </>
          )}
          <InfoBlock>
            <Text type="subTitle" align="center" margin="0 0 10px 0">
              Position
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Latitude
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.position?.lat.toFixed(5)}
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Longitude
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.position?.lng.toFixed(5)}
            </Text>
          </InfoBlock>
          <StyledHr />
          <InfoBlock>
            <Text type="subTitle" align="center" margin="0 0 10px 0">
              Connections
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Is Connected
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.connections?.receiving.length +
              selectedData.connections?.providing.length
                ? "Yes"
                : "No"}
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Receiving
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.connections?.receiving.length
                ? selectedData.connections?.receiving
                    .toString()
                    .replace(/,/g, ", ")
                : "None"}
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Providing
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.connections?.providing.length
                ? selectedData.connections?.providing
                    .toString()
                    .replace(/,/g, ", ")
                : "None"}
            </Text>
            <Text type="bold" margin="10px 0 5px">
              Is Center
            </Text>
            <Text type="body" margin="5px 0">
              {selectedData.isCenter ? "Yes" : "No"}
            </Text>
          </InfoBlock>
        </InfoBody>
      </InfoContainer>
      {/* END INFO SECTION */}

      {/* BEGIN UPDATE SECTION */}
      <TopRightContainer>
        {isLoading ? (
          <>
            <Text type="body" margin="10px 5px">
              {statusText}
            </Text>
            <Loader />
          </>
        ) : (
          <Text type="body" margin="10px 0">
            {statusText}
          </Text>
        )}
      </TopRightContainer>
      {/* END UPDATE SECTION */}

      {/* BEGIN SOURCE SECTION */}
      <BottomRightContainer>
        <Text type="body" margin="4px 0">
          TMS
        </Text>
        <Text type="body" margin="0">
          Maritime Mesh
        </Text>
      </BottomRightContainer>
      {/* END SOURCE SECTION */}
    </Container>
  );
}

export default Main;
