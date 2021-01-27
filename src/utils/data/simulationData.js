//Dummy data in the possible form of the JSON from the API
export const simulationData = [
  //FRAME 1
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.9,
        lng: -69.35,
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
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
      speed: 8, //in knots
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
  ],
  //FRAME 2
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.89,
        lng: -69.36,
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.28,
        lng: -69.08,
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.655,
        lng: -69.495,
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
        lat: 41.58,
        lng: -67.9624,
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 3
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.887,
        lng: -69.368,
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.27,
        lng: -69.072,
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.658,
        lng: -69.491,
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
        lat: 41.57,
        lng: -68.002,
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 4
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.882, //smaller by a bit
        lng: -69.372, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.26, //smaller
        lng: -69.02, //smaller
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.66, //bigger by a bit
        lng: -69.486, //smaller by a bit
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
        lat: 41.56, //smaller
        lng: -68.02, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 5
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.876, //smaller by a bit
        lng: -69.377, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.25, //smaller
        lng: -69.012, //smaller
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.663, //bigger by a bit
        lng: -69.482, //smaller by a bit
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
        lat: 41.55, //smaller
        lng: -68.028, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 6
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.872, //smaller by a bit
        lng: -69.381, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.238, //smaller
        lng: -69.001, //smaller
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.666, //bigger by a bit
        lng: -69.479, //smaller by a bit
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
        lat: 41.535, //smaller
        lng: -68.038, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 7
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.869, //smaller by a bit
        lng: -69.385, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.224, //smaller
        lng: -68.991, //smaller
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.67, //bigger by a bit
        lng: -69.475, //smaller by a bit
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
        lat: 41.522, //smaller
        lng: -68.049, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 8
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.865, //smaller by a bit
        lng: -69.389, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.212, //smaller
        lng: -68.98, //smaller
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
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.673, //bigger by a bit
        lng: -69.472, //smaller by a bit
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
        lat: 41.512, //smaller
        lng: -68.0498, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 9
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.862, //smaller by a bit
        lng: -69.392, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.202, //smaller
        lng: -68.968, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.676, //bigger by a bit
        lng: -69.469, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.495, //smaller
        lng: -68.057, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 10
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.859, //smaller by a bit
        lng: -69.395, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.19, //smaller
        lng: -68.954, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.679, //bigger by a bit
        lng: -69.465, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.484, //smaller
        lng: -68.067, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 11
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.855, //smaller by a bit
        lng: -69.399, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.178, //smaller
        lng: -68.938, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.682, //bigger by a bit
        lng: -69.462, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.468, //smaller
        lng: -68.081, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 12
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.85, //smaller by a bit
        lng: -69.401, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.172, //smaller
        lng: -68.921, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.684, //bigger by a bit
        lng: -69.46, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.452, //smaller
        lng: -68.098, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 13
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.848, //smaller by a bit
        lng: -69.405, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.166, //smaller
        lng: -68.91, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.688, //bigger by a bit
        lng: -69.456, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.441, //smaller
        lng: -68.106, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 14
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.844, //smaller by a bit
        lng: -69.408, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.158, //smaller
        lng: -68.894, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.691, //bigger by a bit
        lng: -69.452, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.431, //smaller
        lng: -68.134, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 15
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.841, //smaller by a bit
        lng: -69.411, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.139, //smaller
        lng: -68.872, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.694, //bigger by a bit
        lng: -69.449, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.418, //smaller
        lng: -68.152, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 16
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.838, //smaller by a bit
        lng: -69.414, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.122, //smaller
        lng: -68.855, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236", "8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.698, //bigger by a bit
        lng: -69.445, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.402, //smaller
        lng: -68.174, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 17
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.835, //smaller by a bit
        lng: -69.418, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.104, //smaller
        lng: -68.835, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236", "8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.702, //bigger by a bit
        lng: -69.441, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.384, //smaller
        lng: -68.192, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 18
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.833, //smaller by a bit
        lng: -69.421, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.094, //smaller
        lng: -68.804, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236", "8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.705, //bigger by a bit
        lng: -69.438, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.368, //smaller
        lng: -68.22, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 19
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.074, //smaller
        lng: -68.771, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["1235236", "8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.348, //smaller
        lng: -68.255, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 19
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.042, //smaller
        lng: -68.741, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.329, //smaller
        lng: -68.294, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 20
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 41.012, //smaller
        lng: -68.702, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.32, //smaller
        lng: -68.34, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 21
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.99, //smaller
        lng: -68.66, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.31, //smaller
        lng: -68.39, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 22
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.95, //smaller
        lng: -68.62, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.305, //smaller
        lng: -68.45, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 23
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.92, //smaller
        lng: -68.56, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.304, //smaller
        lng: -68.53, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 24
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.86, //smaller
        lng: -68.49, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.302, //smaller
        lng: -68.61, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 25
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.81, //smaller
        lng: -68.42, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: ["8965124"],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.302, //smaller
        lng: -68.7, //bigger
      },
      connected: false,
      connections: {
        receiving: ["2638375"],
        providing: [],
      },
    },
  ],
  //FRAME 26
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.76, //smaller
        lng: -68.36, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: [],
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
        lat: 41.29, //smaller
        lng: -68.8, //bigger
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
  ],
  //FRAME 27
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.83, //smaller by a bit
        lng: -69.424, //bigger by a bit
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.72, //smaller
        lng: -68.29, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.708, //bigger by a bit
        lng: -69.435, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: ["8965124"],
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
        lat: 41.28, //smaller
        lng: -68.9, //bigger
      },
      connected: true,
      connections: {
        receiving: ["6548912"],
        providing: [],
      },
    },
  ],
  //FRAME 28
  [
    {
      id: "1235236", //mmsi
      type: "ship",
      speed: 15, //in knots
      direction: 242, //in angles
      position: {
        lat: 40.828, //smaller by a bit
        lng: -69.426, //bigger by a bit
      },
      connected: true,
      connections: {
        receiving: ["8965124"],
        providing: [],
      },
    },
    {
      id: "2638375",
      type: "ship",
      speed: 60, //in knots
      direction: 115,
      position: {
        lat: 40.69, //smaller
        lng: -68.25, //smaller
      },
      connected: false,
      connections: {
        receiving: [],
        providing: [],
      },
    },
    {
      id: "6548912",
      type: "ship",
      speed: 8, //in knots
      direction: 12,
      position: {
        lat: 41.71, //bigger by a bit
        lng: -69.432, //smaller by a bit
      },
      connected: true,
      connections: {
        receiving: ["5412354"],
        providing: ["8965124"],
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
        lat: 41.26, //smaller
        lng: -69.01, //bigger
      },
      connected: true,
      connections: {
        receiving: ["6548912"],
        providing: ["1235236"],
      },
    },
  ],
];
