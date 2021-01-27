//Dummy data in the possible form of the JSON from the API
export const dummyData = [
  {
    id: "1235236", //mmsi
    type: "ship",
    speed: 40, //in knots
    direction: 278, //in angles
    position: {
      lat: 40.9,
      lng: -69.35,
    },
    connected: true,
    connections: {
      receiving: ["2638375"],
      providing: [],
    },
    //isCenter: true, //extra optional tag
    //timestamp: 1611642848087, //extra optional tag
  },
  {
    id: "2638375",
    type: "ship",
    speed: 50, //in knots
    direction: 212,
    position: {
      lat: 41.3,
      lng: -69.127445,
    },
    connected: true,
    connections: {
      receiving: ["6548912"],
      providing: ["1235236"],
    },
  },
  {
    id: "6548912",
    type: "ship",
    speed: 30, //in knots
    direction: 12,
    position: {
      lat: 41.65,
      lng: -69.5,
    },
    connected: true,
    connections: {
      receiving: ["5412354"],
      providing: ["2638375"],
    },
  },
  {
    id: "5412354",
    type: "land-tms",
    position: {
      lat: 41.95,
      lng: -70.01,
    },
    connections: {
      receiving: [],
      providing: ["6548912"],
    },
  },
  {
    id: "8965124",
    type: "ship",
    speed: 20, //in knots
    direction: 258,
    position: {
      lat: 41.6,
      lng: -67.9258,
    },
    connected: false,
    connections: {
      receiving: [],
      providing: [],
    },
  },
];
