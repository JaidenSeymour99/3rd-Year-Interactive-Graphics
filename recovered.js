//this class is used for the recovered molecules, they will recover after a specific amount of time from infected to recovered.
class Recovered extends Molecule {
  constructor({i, px = 200, py = 200, xVel = random(-2.5, 2.5), yVel = random(-2.5, 2.5), minSize = obj.minMoleculeSize, maxSize = obj.maxMoleculeSize}) {
    super({i, px, py, xVel, yVel, minSize, maxSize});
    this.fillColor = obj.recoveredFillColor;
    this.isInfected = false;
    this.isRecovered = true;
  }
}
