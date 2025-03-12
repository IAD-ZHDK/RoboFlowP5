# P5js library for running roboflow CV models in the browser 

To run the example, you will need a [roboflow API key](https://docs.roboflow.com/api-reference/authentication).

Steps: 

- Download the example folder.
- Replace the api_key value with your own key. 
- Start local server, and experiment. 

Current limitations issues: 

- The model only accepts images in the p5 image format
- Only a limited number of CV models have been tested from roboflow
- The models are typically fast enough to run video in realtime, but currently the library isn't capable of syncing the models output with the videos frames.  

## Building library 

The library is built with webpack. 

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```
