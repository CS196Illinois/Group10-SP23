let frame = 0;
function setup() {
  createCanvas(400, 400);
  // noCursor()
  cursor(HAND)
}
function draw() {
  background(GRAY);
  // fill(255)
  if (mouseIsPressed) {
    checkForFood();
    frame++
  } else {
    frame = 0;
  }
}
function checkForFood() {
  // updateFoodCoordinates();
  point(mouseX, frame); // make as hand with food
  if (frame > 400) {
    frame = 0;
  }
}