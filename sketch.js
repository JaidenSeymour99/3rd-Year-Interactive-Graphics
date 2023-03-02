//The rules of the environment:
//The molecules cannot escape from the box / canvas the molecules will bounce off of eachother, there  will be x amount of infected molecules and many more healthy molecules that will be there at the start, if an infected molecule hits a healthy molecule it has a chance to get infected. if a molecule is infected it is infected for y amount of time then has a chance to recover and become a recovered molecule which can not be infected again.

//The elements controlable by the user are:
// the number of molecules, number of rows and cols for the intersections, the canvas size, the min + max molecule size, the loopState which controls if the simulation will run or stay still, the gridState which controls if the grid is visable or not, the lineState which toggles the visibility of the intersection lines between molecules, the textState which controls if the text on the molecules is visiable or not. The color of the background, the lineState lines, the grid, and the text can all be changed. The text size can be changed, the stroke weight of the grid and the lineState lines can be changed. The chance of recovery, chance to be infected and percent of already infected can be changed.



let values = [];
let molecules = [];
let colWidth, rowHeight;
let checkNum = 0;

let percentOfInfected;
let percentToInfect;
let percentToRecover;

//creates the canvas
//calculates the col width and rowHeight
//creates molecules array
//places every molecule
//then the molecules get spaced out by gridify.
//and checks if it will loop or not.
//there are no parameters required to fulfil the function and no returns
function setup() {
  frameCount = 0;
  percentOfInfected = obj.percentOfInfected;
  percentToRecover = obj.percentToRecover;
  percentToInfect = obj.percentToInfect;
  createCanvas(obj.canvasSize, obj.canvasSize);

  colWidth = obj.canvasSize / obj.numCols;
  rowHeight = obj.canvasSize / obj.numRows;
  molecules = [];

  let healthy;
  let infected;
  let recovered;

  for (let i = 0; i < obj.numOfMolecules; i++) {
    let randomNum = random();
    if (randomNum < percentOfInfected) {
      molecules.push(new Infected({i}));
    } else {
      molecules.push(new Healthy({i}));
    }
  }


  gridify();
  checkLoop();
}

//the draw function renders the background, the molecule colour and position, the grid (toggleable), the molecules and their movement
//splitObjectIntoGrid needs to be run every frame because it is keeping track of which molecule is in each box of the grid.
//there are no parameters required to use the function.
//there are no returns.
function draw() {
  background(obj.backgroundColor);
  values = [];
  countEachTypeMolecule();
  splitObjectIntoGrid();
  values.push(healthy, infected, recovered);



  obj.gridState ? drawGrid() : null;

  molecules.forEach((molecule) => {
    molecule.render();
    molecule.step();
  });
  for(let i = 0; i < values.length; i++) {
    fill(20,20,20,10);
    rect(obj.canvasSize - 300, obj.canvasSize - 100, 150, 100);
    fill(255);
    rect(750 - values[i], i *31 + 805 , values[i], 15);
  }
}


//the checkIntersections function checks for intersections between molecules in their grid box.
//if the lineState is true it will draw a line between each intersection check.
//if they are intersecting, the molecules that are infected will have a chance to infect a healthy molecule
//the _collection parameter comes from the splitObjectIntoGrid function where it finds which molecules are in which grid box.
//_collection is the filtered array of molecule index's.
//there are no returns.
function checkIntersections(_collection) {
  // console.log(_collection);
  for (let a = 0; a < _collection.length; a++) {
    for (let b = a + 1; b < _collection.length; b++) {
      let moleculeA = molecules[_collection[a]];
      let moleculeB = molecules[_collection[b]];
      if (obj.lineState) {
        stroke(obj.lineCheckColor, 100);
        strokeWeight(obj.lineCheckWeight);
        line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
      };
      //
      if (moleculeA.isIntersecting(moleculeB) && (moleculeB.isInfected || moleculeA.isInfected) && (!moleculeA.isRecovered && !moleculeB.isRecovered) ) {
          //if A is infected and B is a "Healthy" object.
          //turn the "healthy" into a new "infected" object at the same location and with the same index.
          let randomNum1 = random();
          if (randomNum1 < percentToInfect){
            (moleculeA.isInfected) ? molecules[moleculeB.index] = new Infected({i:moleculeB.index, px:moleculeB.position.x, py:moleculeB.position.y, xVel:moleculeB.velocity.x, yVel:moleculeB.velocity.y, minSize:moleculeB.radius, maxSize:moleculeB.radius}) : null;
          }
          //if B is infected and A is a "Healthy" object.
          //turn the "healthy" into a new "infected" object at the same location and with the same index.
          let randomNum2 = random();
          if (randomNum2 < percentToRecover){
            (moleculeB.isInfected) ? molecules[moleculeA.index] = new Infected({i:moleculeA.index, px:moleculeA.position.x, py:moleculeA.position.y, xVel:moleculeA.velocity.x, yVel:moleculeA.velocity.y, minSize:moleculeA.radius, maxSize:moleculeA.radius}): null;
          }
      }

      checkNum++;
    }
  }
}

//this function uses a for loop to iterate through the filtered array "_collection"
//if the infected molecule has lived long enough there is a chance to turn into a recovered molecule.
//this function takes a parameter which comes from the splitObjectIntoGrid function.
// there is no return
function recover(_collection) {
  for (let a = 0; a < _collection.length; a++) {

      let moleculeA = molecules[_collection[a]];
      //if the current molecules recoverTime is equal to the current frameCount and the current molecule is infected it will have a chance to turn into a recovered molecule.
      if ((moleculeA.recoverTime === frameCount) && moleculeA.isInfected){
        let randomNum = random();
        if (randomNum < percentToRecover){
          molecules[moleculeA.index] = new Recovered ({i:moleculeA.index, px:moleculeA.position.x, py:moleculeA.position.y, xVel:moleculeA.velocity.x, yVel:moleculeA.velocity.y, minSize:moleculeA.radius, maxSize:moleculeA.radius});


        }
      }
  }
}

//the splitObjectIntoGrid function assigns the molecules to a grid box, the index is mapped to a 3d array depending on where the molecule is on the canvas.
//it also runs the check intersections function which will check if each molecule in their box is intersecting another molecule.
//this function is run every frame so that the array is updated with where each molecule is.
//when check intersections is run it is passed moleculeCollection.
//it has no parameters required to use the function.
//there are no returns.
function splitObjectIntoGrid() {
  let checkNum = 0;
  for (let j = 0; j < obj.numRows; j++) {
    for (let i = 0; i < obj.numCols; i++) {

      let moleculeCollection = molecules.filter(molecule =>
        molecule.position.x > (i * colWidth) &&
        molecule.position.x < ((i + 1) * colWidth) &&
        molecule.position.y > j * rowHeight &&
        molecule.position.y < (j + 1) * rowHeight
      ).map(molecule => molecule.index);

      checkIntersections(moleculeCollection);
      recover(moleculeCollection);
    }
  }
}

//The gridify function spaces out each molecule within a grid.
//it finds how many parts it needs to divide the canvas into to spread the molecules out evenly, and the spacing between each.
//iterates through each molecule by their index, molecules can be found in the molecule class.
//for every molecule in the molecule class it uses the index to find the col position and row position.
//then it sets the molecule position of the current molecule to the col / row position + the margin (20) so the molecule cannot be out of bounds of the canvas.
// it has no parameters required to use the function.
// it has no return
function gridify() {
  //calculating the number of divisions (numDivision) by squar rooting the number of molecules and rounds the number up to a whole number.
  let numDivision = ceil(Math.sqrt(obj.numOfMolecules));
  //calculating the spacing by getting the width of the canvas minus the margin divided by the numDivision.
  let spacing = (obj.canvasSize - (obj.maxMoleculeSize * 2)) / numDivision;

  molecules.forEach((molecule, index) => {

    let colPos = (index % numDivision) * spacing;
    let rowPos = floor(index / numDivision) * spacing;
    //console.log(`The col pos ${colPos} and the row pos ${rowPos}`);
    molecule.position.x = colPos + (obj.maxMoleculeSize + 20);
    molecule.position.y = rowPos + (obj.minMoleculeSize + 20);

  });
}

// The drawGrid function draws a grid using a nested loop iterating columns(i)
// within rows(j). colWidth and rowWidth are calculated in the setup(). The style
// of grid is defined by fill, stroke and strokeWeight. There
// are no parameters required to fulfil the function and no returns
function drawGrid() {
  noFill();
  stroke(obj.gridStrokeColor, 50);
  strokeWeight(obj.gridStrokeWeight);

  for (let j = 0; j < obj.numRows; j++) {
    for (let i = 0; i < obj.numCols; i++) {
      //
      rect(i * colWidth, j * rowHeight, colWidth, rowHeight)
    }
  }
}

//The checkLoop function checks if loopState is true or false
//if true it returns loop().
//if false it returns noloop().
function checkLoop() {
  if (obj.loopState) {
    loop();
  } else {
    noLoop();
  }
}

//this function filters each type of molecule puts all the healthy molecules in healthy all the infected in infected and all the recovered in recovered then uses map to only have their index and then gets the length of the array so i can tell how many healthy / infected / recovered objects are alive right now. The text is displayed in the render function in the Molecule class.
function countEachTypeMolecule() {

  healthy = molecules.filter((molecule) => molecule.constructor.name ==="Healthy").map(healthy => healthy.index).length;

  infected = molecules.filter((molecule) => molecule.constructor.name ==="Infected").map(infected => infected.index).length;

  recovered = molecules.filter((molecule) => molecule.constructor.name ==="Recovered").map(recovered => recovered.index).length;
}
