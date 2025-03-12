import { InferenceEngine, CVImage } from "inferencejs";

let workerInstance;
let requestQueue = [];
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 10;


/// hooks
const inferEngine = new InferenceEngine();
function libraryInit() {
  console.log("P5 version" + p5.VERSION);
  console.log("init");

}

p5.prototype.RoboflowP5 = class {
  
  constructor(api_key, roboFlowModel, modelVersion,configuration) {
    api_key = api_key;
    roboFlowModel = roboFlowModel;
    modelVersion = modelVersion;
    this.configuration = configuration;
    this.lastPrediction = 0;
    // create empty p5js image on this.lastImage
    this.lastImage;
    this.startInferenceEngine();
  }

  async startInferenceEngine() {
    try {
      const workerId = await inferEngine.startWorker(roboFlowModel, modelVersion, api_key);
      workerInstance = workerId;
      console.log("Worker started with ID:", workerId);
      // Call a function or trigger an event here
      onWorkerStarted();
    } catch (error) {
      console.error("Error starting worker:", error);
    }
  }

  async performeInference(img, p5img) {
    //console.log(img);
    // check the length of img objet properties
    if (Object.keys(img).length === 0) {
      console.log("Image not loaded yet");
      return;
    }
  
    try {
      if (workerInstance) {
        if (activeRequests < MAX_CONCURRENT_REQUESTS) {
          activeRequests++;
          inferEngine.infer(workerInstance, img, this.configuration).then((predictions) => {
            this.lastPrediction = predictions;
            this.lastImage = p5img;
            activeRequests--;
            this.processQueue();
          }).catch((error) => {
            console.error("Error during inference:", error);
            activeRequests--;
            this.processQueue();
          });
        } else {
          let imageSet = {img: img, p5img: p5img};
          requestQueue.push(imageSet);
        }
      } else {
        console.log("waiting for worker to start");
      }
    } catch (error) {
      console.error("Error during inference:", error);
    }
  }
  
  processQueue() {
    if (requestQueue.length > 0 && activeRequests < MAX_CONCURRENT_REQUESTS) {
      const imgSet = requestQueue.shift();
      this.performeInference(imgSet.img, imgSet.p5img);
    }
  }
  

  async predict(p5img) {
    // convert p5 image to CVImage
    p5img.loadPixels();
    if (p5img.pixels.length > 0) {
      // convert p5 image to ImageBitmap
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = p5img.width;
      canvas.height = p5img.height;
      context.drawImage(p5img.canvas, 0, 0);

      const bitmap = await createImageBitmap(canvas);
      const img = new CVImage(bitmap);
      this.performeInference(img, p5img);
    }
  }

};


function beforeSetup() {

}


function onWorkerStarted() {
  console.log("Worker has started successfully.");
  // You can add additional logic here that should run after the worker has started
}



function afterSetup() {
  /*
  const axios = require("axios");
  const imageElement = document.createElement("img");
  imageElement.src = "YOUR_IMAGE.jpg"
  imageElement.onload = () => {
    imageData = imageElement;
*/
    // working post example
    /*
        const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    context.drawImage(imageElement, 0, 0);
    let image = canvas.toDataURL("image/jpeg").split(",")[1];
        axios({
          method: "POST",
          url: "https://detect.roboflow.com/first_3900/1",
          params: {
            api_key: "rGyiVNI4UJuFkjmNC6nk"
          },
          data: imageData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error.message);
          });
          */

}

function libraryPreDraw() {

}
function libraryPostDraw() {
  // predict(imageData);

}



// register hooks

p5.prototype.registerMethod("init", libraryInit);
p5.prototype.registerMethod("post", libraryPostDraw);
p5.prototype.registerMethod("pre", libraryPreDraw);
p5.prototype.registerMethod("afterSetup", afterSetup);
p5.prototype.registerMethod("beforeSetup", beforeSetup);
