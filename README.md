# Birdie
This is my solution for the [Reaktor 2023 Developer Trainee pre-assignment](https://assignments.reaktor.com/birdnest/). It's a simple web app that shows the user a list of drone pilots who have violated a no-drone zone (NDZ) during the last 10 minutes.

![Screenshot of Birdie](https://raw.githubusercontent.com/JuanitoSebastian/birdie-app/main/docs/birdie_screen.jpg)

## Fly.io deployment
The app is running [here](https://muddy-shadow-6458.fly.dev)! Please note that it might take a few moments for pilots to appear if the app has been inactive for a while. This is because the list of pilots is not stored permanently.

## Running locally
The app can be run locally using docker. Make sure you have docker and docker-compose installed and clone the repository. Then run the following command in the root of the project:
```
docker-compose up
```
The app can be viewed at `http://localhost:8080/`.
