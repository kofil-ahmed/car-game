const game_score = document.querySelector(".game_score");
const start_screen = document.querySelector(".start_screen");
const gameArea = document.querySelector(".gameArea");

start_screen.addEventListener("click",start);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let player = {
    speed : 5,
    score : 0
}
let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}
function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys)
};
function iscollide(a,b){
    aRact = a.getBoundingClientRect();
    bRact = b.getBoundingClientRect();

    return !((aRact.top > bRact.bottom || aRact.bottom < bRact.top || aRact.left > bRact.right || bRact.left > aRact.right)) 
}
function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function endGame(){
    player.start = false;
    start_screen.classList.remove("hide");
    start_screen.innerHTML = "Game Over <br> Your final score is" + player.score + "<br> Press here to restart the game"
}
function moveEnemyCar(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(iscollide(car , item)){
            endGame();
        }
        if(item.y >= 700){
            item.y = -150;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function startGame(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        moveEnemyCar(car);
        if(keys.ArrowUp && player.y > (road.top + 70)){
            player.y -= player.speed
        }
        else if(keys.ArrowDown && player.y < (road.bottom - 110)){
            player.y += player.speed
        }
        else if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed
        }
        else if(keys.ArrowRight && player.x < (road.width - 63)){
            player.x += player.speed
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(startGame)
        player.score++;
        let ps = player.score -1 ;
        game_score.innerText ="score : " + ps;
    }
}
function start(){
    start_screen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(startGame);

    for(var i=0;i<5;i++){
        let road_line = document.createElement('div');
        road_line.setAttribute('class','lines');
        road_line.y = (i*150)
        road_line.style.top = road_line.y + "px";
        gameArea.appendChild(road_line);
    }
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
   
    for(var i=0;i<3;i++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((i+1)*250) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        // enemyCar.style.background = "blue"
        enemyCar.style.left = Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemyCar);
    } 
}