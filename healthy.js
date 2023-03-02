//This class represents healthy molecules that have not yet been infected.
//The healthy molecules can be infected by the infected molecules but not the recovered molecules.
class Healthy extends Molecule {
  constructor({i, px = 200, py = 200, xVel = random(-2.5, 2.5), yVel = random(-2.5, 2.5), minSize = obj.minMoleculeSize, maxSize = obj.maxMoleculeSize}) {
    super({i, px, py, xVel, yVel, minSize, maxSize});
    this.fillColor = obj.healthyFillColor;
    this.isInfected = false;

  }
}
