// flocking code taken from p5.js examples
// import Sprite() 'sprite.js';
let boids = [];
let tank;
let blueFsh;
let fish = [];
let dude;
// horse sprite example
let spritesheet;
let spritedata;
let animation = [];
let leftward = [];
let rightward = [];

let horses = [];

function preload() {
  const fish_sheet = localStorage.getItem('selectedFish'); // grabbing fish image from localstorage
  if (fish_sheet != 'assets/siameseFishSheet.png') { // if fish_sheet isn't NULL
    spritedata = loadJSON('assets/fish.json');
    spritesheet = loadImage('assets/clearFishSheet.png');
  } else { // if user hasn't selected fish yet, then use default
      
      spritedata = loadJSON('assets/siaFish.json');
      spritesheet = loadImage(fish_sheet);
  }
}

var cnv;

function centerCanvas() {
  var cx =  (windowWidth - width) / 2;
  var cy =  (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  cnv = createCanvas(720, 400);
  centerCanvas();
  
  cnv.parent("app");

  // p5.js create image example
  tank = loadImage('assets/aquarium.jpg');  // 800 x 507 pixels
  
  
  tank.loadPixels();
  for (let x = 0; x < tank.width; x++) {
    for (let y = 0; y < tank.height; y++) {
      let a = map(y, 0, tank.height, 255, 0);
      tank.set(x, y, [0, 153, 204, a]);
    }
  }
  tank.updatePixels();

  blueFsh = loadImage('assets/blueFsh.jpg');  // 800 x 507 pixels
  
  blueFsh.loadPixels();
  for (let x = 0; x < blueFsh.width; x++) {
    for (let y = 0; y < blueFsh.height; y++) {
      let a = map(y, 0, blueFsh.height, 255, 0);
      blueFsh.set(x, y, [0, 153, 204, a]);
    }
  }
  blueFsh.updatePixels();

  dude = loadImage('assets/clearFishSheet.png')
  for (let x = 0; x < dude.width; x++) {
    for (let y = 0; y < dude.height; y++) {
      let a = map(y, 0, dude.height, 255, 0);
      dude.set(x, y, [0, 153, 204, a]);
    }
  }
  dude.updatePixels();

  // Add an initial set of boids into the system
  for (let i = 0; i < 100; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
  // VVV fish constructors
  for (let i = 0; i < 3; i++) {
    fish[i] = new Fish(random(width), random(height))
  }

  /* if (mouseX > 720) {
    mouseX = 720;
  }
  if (mouseX > 400) {
    mouseX = 400;
  } */
  /*spritedata = loadJSON('assets/horse.json');
  spritesheet = loadImage('assets/dude.png');*/


  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
  // leftward vvv
  for (let i = 0; i < 6; i++) {
    let pos = frames[i].position;
    console.log(pos)
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    console.log(img)
    rightward.push(img);
  }
  // rightward vvv
  for (let i = 6; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    leftward.push(img);
  }
  


  // img = spritesheet.get(0, 0, 32, 48);
  // animation.push(img);


  /* for (let i = 0; i < 8; i++) {
    horses[i] = new Sprite(animation, 0, i * 75, random(0.1, 0.4));
  }
  */
}

function draw() {
  background(51);
  // scale affects everything rendered in the code after it through multiplication
  image(tank, -25, -50);
  // image(img, mouseX - img.width / 2, mouseY - img.height / 2);
  scale(0.05)
  // image(blueFsh, mouseX * 20 - (blueFsh.width / 2), mouseY * 20 - (blueFsh.height / 2));
  scale(20)

  // image(dude, 100, 100);

  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }

  for (let i = 0; i < fish.length; i++) {
    fish[i].run(fish);
  }

  /*for (let horse of horses) {
    horse.show();
    horse.animate();
  }*/

  for (fram in animation) {
    // showing()
    // animate(.01);
  }
  
  // image(rightward[frameCount % rightward.length], 10, 10);
  // ^^ test case for animation images
}
let indexr = 0;
let xpos = 10;
let ypos= 10;
function showing() {
  let index = floor(indexr) % animation.length;
  image(animation[index], xpos, ypos);
}

function animate(speed) {
  
  indexr += speed;
  xpos += speed * 15;

  if (xpos > animation[0].width) {
    xpos = -animation[0].width;
  }
  // image(animation[indexr % animation.length], x, 10);
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids);    // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }
  
  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }
  
  // Draw boid as a circle
  render() {
    
    fill(127, 127);
    stroke(200);
    ellipse(this.position.x, this.position.y, 16, 16);
    

    // scale(0.1)
    // image(blueFsh, this.position.x - blueFsh.width/2, this.position.y - blueFsh.height/2);
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }  
}

// seperation of classes

class Fish {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    if (this.position.x < 30 || this.position.x > 650) {
      this.position.x = 40;
    }
    if (this.position.y < 30 || this.position.y > 320) {
      this.position.y = 40;
    }
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  run(fish) {
    this.flock(fish);
    this.update();
    this.borders();
    this.render();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // We accumulate a new acceleration each time based on three rules
  flock(fish) {
    let sep = this.separate(fish); // Separation
    let ali = this.align(fish);    // Alignment
    let coh = this.cohesion(fish); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
    // 720 x 400 is frame
    if (this.position.x < 30 || this.position.x > 650) {
      this.velocity.x = -1 * this.velocity.x;
    }
    if (this.position.y < 30 || this.position.y > 320) {
      this.velocity.y = -1 * this.velocity.y;
    }
  }
  
  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }
  
  // Draw Fish as Sprite
  render() {
    xpos = this.position.x;
    ypos = this.position.y;
    animate(.01);
    
    let index = floor(indexr) % animation.length;
    
    if (this.velocity.x < 0) {
      // go left
      // index = 0;
      image(leftward[index], this.position.x, this.position.y);
      if (indexr > 3) {
        indexr = 0;
      }
      if (xpos > animation[0].width) {
        xpos = -animation[0].width;
      }
    } else if (this.velocity.x == 0) {
      image(animation[4], this.position.x, this.position.y);
    } else {
      // go right
      // index = 5;
      image(rightward[index], this.position.x, this.position.y);
      if (indexr > 3) {
        indexr = 0;
      }
      if (xpos > animation[0].width) {
        xpos = -animation[0].width;
      }
    }
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(fish) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < fish.length; i++) {
      let d = p5.Vector.dist(this.position, fish[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, fish[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(fish) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < fish.length; i++) {
      let d = p5.Vector.dist(this.position, fish[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(fish[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(fish) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < fish.length; i++) {
      let d = p5.Vector.dist(this.position, fish[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(fish[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }  
}