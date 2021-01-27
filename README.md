# Traffic Manager System Front End
The TMS (Traffic Manager System) front end is built with React.js and Google Maps. It includes many different visualizations options and configurations.

![Traffic Manager System Front End](https://raw.githubusercontent.com/AntonOtaner/traffic-manager/main/public/promo-image.png "Traffic Manager System Front End")

## Features
- Map controls
- Map item selection
- Map type controls (grid or dynamic)
- Playback system with playback controls
- Different modes: 
    - default (random data updating every X seconds)
    - simualation (data from simulation file)

## Things left to complete
- Static map option
- Custom URL endpoint supporting both web addresses and IP addresses
- Offline user controls

## How to run
1. In the root directory, run `npm install`
2. Once all packages have installed, run `npm start`
3. To build the project for production purposes, run `npm build`

Currently, to use modes, you must either type "default" or "simulation" in the endpoint URL textfield in the control panel.

Note: npm can be replaced with yarn if desired. Make sure your node version is at leasst 10.0.0.

## Credits
This is a project built for Ericsson by [Anton Otaner](https://github.com/AntonOtaner) in Janurary 2021, <antonethem@gmail.com>.