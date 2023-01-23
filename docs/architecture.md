# Architecture
![Diagram of Birdie App](https://raw.githubusercontent.com/JuanitoSebastian/birdie-app/main/docs/architecture_1.png)
The Birdie App back-end polls the Birdnest API for sightings of drones. The back-end parses the information sent by the Birdnest API and provides an endpoint for a list of drones that have broken the NDZ during the last 10 minutes. The back-end also provides an endpoint for fetching pilot information.

## Front-end
- Typescript
- React
- Tailwindcss
- DaisyUI

## Back-end
- Typescript
- Node
- Express
