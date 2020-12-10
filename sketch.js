//game states
var play = 1;
var over = 0;
var gameState = 1;
var background1, background1Image;

//tasty and juicy fruits
var fruit1, fruit1Image, fruit2Image, fruit3Image, fruit4Image, fruitGroup;

//knife or sword who cares , we just have to cut them
var sword, swordImage, gameOverImage ,backgroundImage;

// the enemy
var trash, trashImage;

//score
var score;

function preload(){
  
  //i think they have a look also
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
 
  //sword is here 
swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  
  //sounds
knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
  //enemies
  trashImage = loadImage("alien1.png","alien2.png");
  
  background1Image = loadImage("wallpaper.png");
}

function setup(){
  //the canvas
  createCanvas(500,400);
  background("lightBlue");
  background1 = createSprite(250,200);
  background1.addImage(background1Image);
  background1.scale = 2;
  
  //sword created and sharpened for the ninja
  sword = createSprite(200,200,10,10);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
 //called the fruit group
  fruitGroup = createGroup();
  //calling the enemies
  trashGroup = createGroup();
  
  score = 0;
  
}

function draw(){
  //the background

//movement for the sword
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  //score size
  textSize(50);
  fill("black");
  //conditions when the game state is in play
  if(gameState === play){
    
  
    //score is increasing
      if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
        score = score+2;
        knifeSwooshSound.play();
  }
    
    //create fruit
  spawnFruits();
    //create trash
    spawnTrash();
    
  if(trashGroup.isTouching(sword)){
    gameState = over;
    sword.addImage(gameOverImage);
    sword.scale = 2.5;
    sword.velocityX = 0
    sword.velocityY = 0;
    gameOverSound.play();
  }
  }

  drawSprites();
  //score display
  text("SCORE: " + score,150,50);

}

// for the fruits to come in the game
function spawnFruits(){
  
  if(frameCount % 50 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    var rand = Math.round(random(1,4));
    switch(rand){
        
      //these fruits consist of banana, apple, pear, peach.. AFTER cutting enjoy your fruit salad :)
        
   case 1: fruit.addImage(fruit1Image);
        break;
        case 2: fruit.addImage(fruit2Image);
        break;
        case 3: fruit.addImage(fruit3Image);
        break;
        case 4: fruit.addImage(fruit4Image);
        break;
        default: break;
    }
    fruit.y = Math.round(random(50,340));
    fruit.y = Math.round(random(10,340));
    
    position = Math.round(random(1,5));
  
    
   if(position === 1){
   fruit.x = 400;
     fruit.velocityX = 10;
   }else if(position === 2){
     fruit.x = 10;
     fruit.velocityX = 4
   }else if(position === 3){
    
     fruit.velocityY = 5
   }else if(position === 4){
     
     fruit.velocityY = 5;
   }
  
    fruit.velocityX = -(7+(score/4));
    
    
    fruitGroup.add(fruit);
    
    
    console.log(frameCount);
  }
    
}

function spawnTrash(){
 
  if (frameCount % 200 === 0) {
   trash = createSprite(400,200,10,10);
    trash.addImage("running",trashImage);
    trash.y =Math.round(random(100,300));
   trash.velocityX = -(8+(score/10));
    
    trash.setLifeTime = 150;
    
    //adding trash the group
   trashGroup.add(trash);
  }
}

