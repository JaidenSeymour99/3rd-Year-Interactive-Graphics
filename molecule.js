//This class is the Molecule super class
class Molecule {
  constructor({i, px = 200, py = 200, xVel = random(-2, 2), yVel = random(-2, 2), minSize = obj.minMoleculeSize, maxSize = obj.maxMoleculeSize,  _isInfected = false}) {
    this.position = createVector(px, py);
    this.velocity = createVector(xVel, yVel);
    this.radius = random(minSize, maxSize);
    this.fillColor = obj.fillColor;
    this.isInfected = _isInfected;
    this.timeCreated = frameCount;
    this.timeToRecover = obj.timeToRecover;
    this.recoverTime = this.timeToRecover + this.timeCreated;
    this.index = i;
  }

// this function displays the circles (molecules), and also text if textState is true.
//it also displays the text for how many healthy / infected / recovered left.
//this function has no params and gives no returns.
  render() {
    noStroke()
    fill(this.fillColor);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0);
    (obj.textState) ? (
      textSize(obj.textSize),
      textAlign(CENTER),
      stroke(obj.textStrokeColor),
      strokeWeight(1),
      fill(obj.textColor),
      text(this.index, this.position.x, this.position.y + 6)) : null;

    fill(20,20,20,10);
    strokeWeight(0);
    rect(obj.canvasSize - 150, obj.canvasSize - 100, 150, 100);
    textSize(obj.textSize),
    textAlign(CENTER),
    stroke(obj.textStrokeColor),
    fill(obj.textColor),
    text("Healthy: " + healthy ,obj.canvasSize -75 ,obj.canvasSize -80 );
    text("Infected: " + infected ,obj.canvasSize -75 ,obj.canvasSize -50 );
    text("Recovered: " + recovered ,obj.canvasSize -75 ,obj.canvasSize -20 );
  }

  // this function is used to see if 1 object is intersecting another given object. it finds the distance betweent the two objects and if it is 0 they are intersecting.
  //if the objects are intersecting the objects will bounce off eachother.
  //if the objects distance is less than 0 the object is split and put back to where it should be (not inside the other molecule).
  //this function takes a molecule object as a parameter.
  isIntersecting(_molecule) {
    let distance = dist(this.position.x, this.position.y, _molecule.position.x, _molecule.position.y)
    let gap = distance - this.radius - _molecule.radius;
    //if <0 move both balls a small distance away from eachother.
    let check = (gap <= 0) ? true : false;

    // if the radius of the molecules are overlapping
    if (check) {



      //difference in the x between the current ball and the other ball
      let dx = this.position.x - _molecule.position.x;
      //difference in the y between the current ball and the other ball
      let dy = this.position.y - _molecule.position.y;
      //if the gap is less than 0 then seperate the balls.
      if (gap <0) {
        this.split(_molecule);
      }

      let normalX = dx / distance;
      let normalY = dy / distance;

      let dVector = (this.velocity.x - _molecule.velocity.x) * normalX;
      dVector += (this.velocity.y - _molecule.velocity.y) * normalY;

      let dvx = dVector * normalX;
      let dvy = dVector * normalY;
      //making a max speed the molecule can be changed by.
      dvx = constrain(dvx, -1.5, 1.5);
      dvy = constrain(dvy, -1.5, 1.5);

      this.velocity.x -= dvx;
      this.velocity.y -= dvy;

      _molecule.velocity.x += dvx;
      _molecule.velocity.y += dvy;

    }
    return check;

    }

  //this fucntion prevents the molecules from clustering when they hit into eachother.
  //this function takes in a parameter (the molecule object)
  //this function calculates the objects resultant vector, the objects heading and distance the object needs to be moved.
  //this function then moves the object to the correct position.
  //this function has no returns.
  split(_molecule) {
      let resultantVector = p5.Vector.sub(this.position, _molecule.position);
      let resHeading = resultantVector.heading();
      let resDist = (resultantVector.mag() - this.radius - _molecule.radius);

      //take away calc distance from current pos.
      let moveX = cos(resHeading) * resDist;
      let moveY = sin(resHeading) * resDist;

      this.position.x -= moveX;
      this.position.y -= moveY;

      _molecule.position.x += moveX;
      _molecule.position.y += moveY;
  }

  //the step function move the molecules in the speed and direction of their velocity
  //this function takes in no params.
  //this function has no returns.
  step() {

    (this.position.x >= width - this.radius || this.position.x < 0 + this.radius) ?
    this.velocity.x *= -1: null;

    (this.position.y >= height - this.radius || this.position.y < 0 + this.radius) ?
    this.velocity.y *= -1: null;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
