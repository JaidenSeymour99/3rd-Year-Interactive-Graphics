let obj = {
  numOfMolecules: 210,
  numRows: 1,
  numCols: 1,
  moleculeStrokeColor: [90, 44, 120],
  moleculeStrokeWeight: 1,
  infectedFillColor: [0,100,130],
  healthyFillColor: [200, 160, 170],
  recoveredFillColor: [85,49,69],
  minMoleculeSize: 10,
  maxMoleculeSize: 20,
  lineCheckColor: [179,38,146],
  lineCheckWeight: .3,
  gridStrokeColor: [88, 95, 144],
  gridStrokeWeight: 1,
  loopState: false,
  gridState: false,
  lineState: false,
  textState: false,
  textSize: 16,
  textStrokeColor: [0, 0, 0],
  textColor: [255, 255, 255],
  backgroundColor: [25, 25, 25],
  timeToRecover: 200,
  canvasSize: 900,
  percentToRecover: 0.97,
  percentToInfect: 0.75,
  percentOfInfected: 0.02
}

//creating a gui
let joshuasGui = new dat.gui.GUI();
//lets you save your config / change between saved config's / create new config
joshuasGui.remember(obj);
//making a folder for the gui
section01 = joshuasGui.addFolder('Layout');
//making a second folder for the gui
section02 = joshuasGui.addFolder('Design');
//making a third folder to change the odds of things happening.
section03 = joshuasGui.addFolder('Chance');

//section 1
section01.add(obj, 'numOfMolecules')
  .min(10)
  .max(1000)
  .step(10)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'numRows')
  .min(1)
  .max(50)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'numCols')
  .min(1)
  .max(50)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'canvasSize')
  .min(500)
  .max(2000)
  .step(10)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'maxMoleculeSize')
  .min(1)
  .max(40)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'minMoleculeSize')
  .min(1)
  .max(40)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section01.add(obj, 'loopState')
  .onChange(function() {
    checkLoop()
  });
section01.add(obj, 'gridState')
  .onChange(function() {
    draw();
  });
section01.add(obj, 'lineState')
  .onChange(function() {
    draw();
  });
section01.add(obj, 'textState')
  .onChange(function() {
    draw();
  });

//section 2

section02.addColor(obj, 'backgroundColor')
  .onChange(function() {
    setup();
    draw();
  });
section02.addColor(obj, 'lineCheckColor')
  .onChange(function() {
    setup();
    draw();
  });
section02.add(obj, 'lineCheckWeight')
  .min(.1)
  .max(3)
  .step(.1)
  .onChange(function() {
    setup();
    draw();
  });
section02.addColor(obj, 'gridStrokeColor')
  .onChange(function() {
    setup();
    draw();
  });
section02.add(obj, 'gridStrokeWeight')
  .min(1)
  .max(5)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section02.add(obj, 'textSize')
  .min(8)
  .max(20)
  .step(1)
  .onChange(function() {
    setup();
    draw();
  });
section02.addColor(obj, 'textColor')
  .onChange(function() {
    setup();
    draw();
  });

//section 3

section03.add(obj, 'percentToRecover')
  .min(.01)
  .max(1)
  .step(.01)
  .onChange(function() {
    setup();
    draw();
  });
section03.add(obj, 'percentToInfect')
  .min(.01)
  .max(1)
  .step(.01)
  .onChange(function() {
    setup();
    draw();
  });
section03.add(obj, 'percentOfInfected')
  .min(.01)
  .max(1)
  .step(.01)
  .onChange(function() {
    setup();
    draw();
  });
