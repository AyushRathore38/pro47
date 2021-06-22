var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var robots, robot1,robot2;
var robot1Img, robot2Img;
var bg, bgImg, gameBg;
var zombie,zombieImg;
var zombiesGroup;
var shooterImg,shooterGroup;
var bullet, bulletImg, bulletsGroup;

function preload(){
  bgImg=loadImage("images/form_bg.jpg");
  gameBg=loadImage("images/game_bg.jpg");
  zombieImg=loadImage("images/zombie.gif")
  shooterImg=loadAnimation("images/shooter1.png","images/shooter2.png","images/shooter3.png","images/shooter4.png",
  "images/shooter5.png");
 
  bulletImg=loadImage("images/bullet.png")

 


}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();                                            

  zombiesGroup = new Group();
  shooterGroup = new Group();
  bulletsGroup = new Group();


  
}


function draw(){
  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    game.spawnZombies();

    if(bg.x<displayWidth/2-50){
      bg.x=displayWidth/2
      
    }
    //console.log(robot1.x)

    if(keyDown("space")){
      game.spawnBullets();
    }

    for(var i = 0; i<zombiesGroup.length; i++){
      if(zombiesGroup.get(i).isTouching(bulletsGroup)){
        zombiesGroup.get(i).destroy();
        bulletsGroup.destroyEach();
      
      }
    }
   
  }
  if(gameState==2){
    game.end();
  }

  
}
