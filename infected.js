//This class represents molecules that have been infected, if the healthy molecules touch them they will get infected.
class Infected extends Molecule {
  constructor({i, px = 200, py = 200, xVel = random(-2.5, 2.5), yVel = random(-2.5, 2.5), minSize = obj.minMoleculeSize, maxSize = obj.maxMoleculeSize}) {
    super({i, px, py, xVel, yVel, minSize, maxSize});
    this.fillColor = obj.infectedFillColor;
    this.timeToRecover = obj.timeToRecover;
    this.isInfected = true;
    this.isRecovered = false;

  }
}
