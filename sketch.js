
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle

var obstaclesGroup
var score=0;

function preload(){
Gameover = loadSound('stuff/gameover.mp3')
Point = loadSound('stuff/point.mp3')	
Jump = loadSound('stuff/Slime Jump.mp3')
Slime1IMG = loadImage('stuff/Slime1.png')	
Slime2IMG = loadImage('stuff/Slime2.png')
evilslimeIMG = loadImage('stuff/evil-slime.png')
backgroundIMG = loadImage('stuff/background.png')
background2IMG = loadImage('stuff/background-cave.png')
}

function setup() {
	createCanvas(800, 700);
	obstaclesGroup = new Group();

	backgroundlook = createSprite(400,350)
	backgroundlook.addImage(backgroundIMG)

	backgroundlook2 = createSprite(400,350)
	  backgroundlook2.addImage(background2IMG)
	  backgroundlook2.scale = 1.5
	  backgroundlook2.visible = false
	   
	Slime1 = createSprite(100,650,25,25)
	Slime1.addImage(Slime1IMG)
	Slime1.scale=0.2

	Slime2 = createSprite(40,640,25,25)
	Slime2.addImage(Slime2IMG)
	Slime2.scale=0.2

	InvisibleGround = createSprite(400,680,1000,20)
	InvisibleGround.visible = false

	Slime1.setCollider("rectangle",0,0,250,150)
	Slime2.setCollider("rectangle",0,0,250,150)

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
	score = 0;
}


function draw() {
	background(0);
	rectMode(CENTER);
	if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  Slime1.velocityY = Slime1.velocityY + 0.8
 
  Slime2.velocityY = Slime2.velocityY + 0.8
  Slime2.collide(InvisibleGround);
  
  if(score>0 && score%100 === 0){
	  Point.play()
  }

  if(score===1000){
	  backgroundlook2.visible = true
	  backgroundlook.visible = false
  }
	backgroundlook.velocityX = (-5 + -1*score/50);
	backgroundlook2.velocityX = (-5 + -1*score/50);

  if(keyIsDown(32)&& Slime1.y>635){
	Slime1.velocityY=-12
	Jump.play()
}
if(keyIsDown(UP_ARROW)&& Slime2.y>635){
	Slime2.velocityY=-12
	Jump.play()
}

  if(Slime1.isTouching(obstaclesGroup)){
	gameState=END;
	Gameover.play()
  }
  if(Slime2.isTouching(obstaclesGroup)){
	gameState=END;
	Gameover.play()
}

  spawnObstacles()
  drawSprites();
}
else if(gameState===END){
	textSize(75)
	fill("red")
	text("Game Over", 200,400)
	textSize(55)
	fill("red")
	text("Refresh to try again!", 150,600)
	Slime1.velocityY = 0;
	Slime2.velocityY = 0;
	backgroundlook.visible = false
	backgroundlook2.visible = false

}

	Slime1.collide(InvisibleGround);


	if (backgroundlook.x < 200){
		backgroundlook.x = backgroundlook.width/2;
	  }

	  if (backgroundlook2.x < 100){
		backgroundlook2.x = backgroundlook2.width/2;
	  }

	  drawSprites();
	  textSize(35)
	  fill("yellow")
	  text("Score: "+ score, 600,50)
}
function spawnObstacles() {
	if(frameCount % 60 === 0) {
	  obstacle = createSprite(800,650,20,10);
	  obstacle.setCollider("rectangle",0,0,50,50)
	  obstacle.addImage(evilslimeIMG)
	  obstacle.scale = 0.1
	  obstacle.debug = true;
	  obstacle.velocityX = (-6 + -4*score/100);
	  obstaclesGroup.add(obstacle)
	}
}

