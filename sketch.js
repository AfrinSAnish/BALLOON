var balloon,bg,database,balloonImg,position;


function preload(){

  bg = loadImage("pro-C35 images/Hot Air Ballon-01.png")
  balloonImg = loadAnimation("pro-C35 images/Hot Air Ballon-02.png",
  "pro-C35 images/Hot Air Ballon-03.png"
  ,"pro-C35 images/Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(800,650);
  balloon = createSprite(250, 400,10,10);
  balloon.addAnimation("balloonAnimation",balloonImg)
  balloon.scale=0.65

  database=firebase.database();

  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value", readPosition,showError)
}

function draw() {
  background(bg); 

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    balloon.scale = balloon.scale - 0.01
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
    balloon.scale = balloon.scale + 0.01
}
  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x+x,
    'y': position.y+y
  })
}

function readPosition(data){
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("CAUTION!! ERROR...")
}