var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pc, pcI;

var bombGroup;
var famGroup;

var bomb, bombI;
var fam, famI;

var count = 0;

var invisibleGround;

var ground;

function preload(){
  pcI = loadImage("pci.png");
  bombI = loadImage("bomb.png");
  famI = loadImage("fam.png");
}

function setup() {
  createCanvas(400, 400);


  pc = createSprite(60, displayHeight / 2 - 50, 50,50);
  pc.addImage(pcI);
  pc.scale = 1;

   ground = createSprite(200,380,400,20);
   ground.x = ground.width /2;
   ground.visible = false;


   invisibleGround = createSprite(200,385,400,5);
   invisibleGround.visible = false;

  bombGroup = createGroup();
  famGroup = createGroup();


//set text
fill(0);
textSize(18);
textFont("Georgia");
textStyle(BOLD);

}

 fill(0)
function draw() {
  //set background to white
  background(rgb(160,230,340));
  //display score
  text("Score: "+ count, 250, 100);
  //text("COLLECT THE FAMILIES",10,20);
  text("STAY AWAY FROM BOMBS",10,40);
  text(("UP ARROW KEY TO JUMP"),10,60)
 
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
     count = count + Math.round(World.frameRate / 30);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    //add gravity
    pc.velocityY = pc.velocityY + 0.8;
    
    spawnBombs();
    spawnFams();
    
    //End the game when trex is touching the obstacle
    if( bombGroup.isTouching(pc)){
      gameState = END;
    }

    if(famGroup.isTouching(pc)){
      count = count + 5;
    }

  }
  
  else if(gameState === END) {

    text("YOU LOST!", 150,200)
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    pc.velocityY = 0;
    famGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    
  
    
    //set lifetime of the game objects so that they are never destroyed
    bombGroup.setLifetimeEach(-1);
       famGroup.setLifetimeEach(-1);
    
  }
  
  pc.collide(invisibleGround);
  
  drawSprites();
}


function spawnBombs() {
  if(World.frameCount % 60 === 0) {
    bomb = createSprite(random(370,410),random(350,370),10,40);
    bomb.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
   bomb.addImage(bombI);

    //assign scale and lifetime to the obstacle           
    bomb.scale = 0.2;
    bomb.lifetime = 70;
    //add each obstacle to the group
    bombGroup.add(bomb);
  }
}


  
function spawnFams() {
  //write code here to spawn the clouds
  if (World.frameCount % 150 === 0) {
     fam = createSprite(random(370,410),290,10,40);
  
    fam.velocityX = - (6 + 3*count/100);
    
    fam.scale = 0.3;

     //assign lifetime to the variable
     fam.lifetime = 134;
    
     fam.addImage(famI);
   
    //add each cloud to the group
    famGroup.add(fam);
  }
  
}

function keyPressed() {
  if (keyCode === UP_ARROW && pc.y >= 330) {
    pc.velocityY = -15 ;
  } 

}



