let lastRenderTime = 0;
const snake_speed = 7;
const snakePos = [{x: 11, y:11}];
let inputDir = {x: 0, y: 0};
let lastInput = {x: 0, y: 0};
let food = randomizeFood()
const snake_growth = 1;
let newSegments = 0;
let gameOver = false;

function update(currentTime){

  if(gameOver){
    if(confirm("Dead, restart?")){
      window.location = "/Examen1/game.html";
    }
    return
  }
  window.requestAnimationFrame(update)
  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
  if(secondsSinceLastRender < 1 / snake_speed) return;

  console.log("Render");
  lastRenderTime = currentTime;

  updateSnake();
  drawSnake();
  updateFood();
  drawFood();
  checkDeath();
 }

window.requestAnimationFrame(update)

function checkDeath(){
  gameOver = outsideGrid(snakePos[0]) || snakeIntersection()
}

function outsideGrid(position){
  return (
    position.x < 1|| position.x > 21 || 
    position.y < 1 || position.y > 21
    )
}



function snakeIntersection(){
  return onSnake(snakePos[0], {ignoreHead: true})
}


function updateSnake(){
  addSegments();
  for(let i = snakePos.length - 2; i >= 0; i--){
    snakePos[i+1] = {...snakePos[i]}
  }

  snakePos[0].x += inputDir.x;
  snakePos[0].y += inputDir.y;
  lastInput = inputDir;

}

function drawSnake(){
  gameCanvas.innerHTML= " ";

  snakePos.forEach(segment =>{
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameCanvas.appendChild(snakeElement);
  })

}

function updateFood(){
 if(onSnake(food)){
  expandSnake(snake_growth)
  food = randomizeFood();
 }
}

function drawFood(){
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameCanvas.appendChild(foodElement);
}

function expandSnake(amount){
  newSegments += amount;
}

function onSnake(position, {ignoreHead = false} = {}){
  return snakePos.some((segment,index) =>{
    if (ignoreHead && index === 0 ) return false
    return equalPosition(segment, position)
  })
}

function equalPosition(pos1, pos2){
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments(){
  for(let i = 0; i < newSegments; i++){
    snakePos.push({...snakePos[snakePos-1]})
  }
  newSegments = 0;
}

function randomizeFood(){
  let newPos;
  while(newPos == null || onSnake(newPos)){
    newPos = randomGridPosition();
  }
  return newPos
}

function randomGridPosition(){
  return{
    x: Math.floor(Math.random() * 21) + 1,
    y: Math.floor(Math.random() * 21) + 1
  }
}


window.addEventListener("keydown", e =>{
  switch (e.key){
    case 'w':
      if(lastInput.y !==0)break;
      inputDir = {x: 0,y: -1}
      break;
    case 's':
      if(lastInput.y !==0)break;
      inputDir = {x: 0,y: 1}
      break;
    case 'a':
      if(lastInput.x !==0)break;
      inputDir = {x: -1,y: 0}
      break;
    case 'd':
      if(lastInput.x !==0)break;
      inputDir = {x: 1,y: 0}
      break;
  }
})
