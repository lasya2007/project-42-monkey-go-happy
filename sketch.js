var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,foodGroup;
var stone,stoneImg,obstaclesGroup;

var score=0;
var gameOver,gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg=loadImage("banana.png");
  stoneImg=loadImage("stone.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup=new Group();
  obstaclesGroup=new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score++;
      if(player.scale<=0.3){
        player.scale+=0.006;
      }
    }

    if(player.isTouching(obstaclesGroup)){
      gameState=END;
    }
  }

  else if(gameState===END){
    backgr.velocityX=0;
    player.setVelocity(0,0);
    player.visible=false;
    
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    gameOver=createSprite(400,200,50,50);
    gameOver.addImage(gameOverImg);
  }

  drawSprites();

  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(2);
  text("Score: "+score,370,20);
}

function spawnFood(){
  if(frameCount%120===0){
    banana=createSprite(810,random(180,230),15,15);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX=-7;
    banana.lifetime=120;

    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%80===0){
    stone=createSprite(810,320,20,20);
    stone.addImage(stoneImg);
    stone.scale=0.3;
    stone.velocityX=-7;
    stone.lifetime=140;

    obstaclesGroup.add(stone);
  }
}