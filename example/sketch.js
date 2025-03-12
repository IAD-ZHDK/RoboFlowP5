let api_key = "yourRoboflowID"  //needs to be publishable ID
let roboFlowModel = "first_3900" //https://universe.roboflow.com/lyas-emre-nal/first_3900/model/1
let modelVersion = "1"
const configuration = {scoreThreshold: 0.5, iouThreshold: 0.5, maxNumBoxes: 50};
let roboFlowInstance;
let img;
let video;

function preload() {
  img = loadImage('fish.jpg');
  // load mp4 video
   //video = createVideo('Snorkeling_in_Florida.mp4');
  // video.hide()
}
function setup() {
  createCanvas(800, 500); // poster is resized automatically
  img.resize(800, 500);
  roboFlowInstance = new RoboflowP5(api_key, roboFlowModel, modelVersion, configuration)
  textSize(10);
}

function draw() {
  background(255, 0, 0, 20);
  roboFlowInstance.predict(img);
  console.log(roboFlowInstance.lastPrediction);
  if (roboFlowInstance.lastImage && roboFlowInstance.lastImage.width) {
    image(roboFlowInstance.lastImage, 0, 0);
    drawBoundingBoxes()
  }
}

function windowResized() {

}

function drawBoundingBoxes() {
// loop through the predictions and draw them on the canvas
try {
  for (let i = 0; i < roboFlowInstance.lastPrediction.length; i++) {
    let prediction = roboFlowInstance.lastPrediction[i];
    stroke(prediction.color);
    strokeWeight(1);
    noFill();
    rectMode(CENTER)
    rect(prediction.bbox.x, prediction.bbox.y, prediction.bbox.width, prediction.bbox.height);
    fill(prediction.color)
    noStroke();
    // prediction.confidence rounded to 3 decimal places
    let roundedTwoDecimals = parseFloat(prediction.confidence.toFixed(2));
    text(roundedTwoDecimals, prediction.bbox.x-(prediction.bbox.width/2), prediction.bbox.y)
  }
} catch (error) {
  console.log("No predictions yet.")
}

}

function mousePressed() {
 // video.loop(); // set the video to loop and start playing
}
