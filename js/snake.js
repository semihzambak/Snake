canvas = document.getElementById("snake");
context = canvas.getContext("2d");
document.addEventListener("keydown", onKeyDown.bind(this));

function play() {
  posX = 20;
  posY = 14;
  appleX = 25;
  appleY = 14;
  tailSize = 5;
  trail = [];
  gridSize = 20;
  tileCountX = 45;
  tileCountY = 30;
  velocityX = 0;
  velocityY = 0;
  borderWidth = 2;
  press = false;
  speed = 7;

  timer = setInterval(loop.bind(this), 500 / speed);
}
function updateScore() {
  document.getElementById("score").innerText = tailSize - 5;
}
function reset() {
  clearInterval(timer);
  play();
}

function loop() {
  press = false;
  update();
  draw();
}
function setApplePosition() {
  collide = false;
  appleX = Math.floor(Math.random() * tileCountX);
  appleY = Math.floor(Math.random() * tileCountY);

  for (let i = 0; i < trail.length; i++) {
    if (this.appleX === trail[i].posX && this.appleY === trail[i].posY) {
      collide = true;
      break;
    }
  }
  if (collide) {
    setApplePosition();
  }
}
function update() {
  posX += velocityX;
  posY += velocityY;

  if (posX < 0) {
    posX = tileCountX - 1;
  }
  if (posY < 0) {
    posY = tileCountY - 1;
  }
  if (posX > tileCountX - 1) {
    posX = 0;
  }
  if (posY > tileCountY - 1) {
    posY = 0;
  }

  trail.forEach(t => {
    if (posX === t.posX && posY === t.posY) {
      reset();
    }
  });

  trail.push({
    posX: posX,
    posY: posY
  });

  while (trail.length > tailSize) {
    trail.shift();
  }

  if (appleX === posX && appleY === posY) {
    tailSize++;
    setApplePosition();
    updateScore();
  }
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "blue";
  trail.forEach(t => {
    context.fillRect(
      t.posX * gridSize,
      t.posY * gridSize,
      gridSize - borderWidth,
      gridSize - borderWidth
    );
  });

  context.fillStyle = "red";
  context.fillRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - borderWidth,
    gridSize - borderWidth
  );
}

function onKeyDown(event) {
  console.log(press);
  if (!press) {
    if (event.keyCode === 37 && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
      press = true;
    } else if (event.keyCode === 39 && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
      press = true;
    } else if (event.keyCode === 38 && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
      press = true;
    } else if (event.keyCode === 40 && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
      press = true;
    }
  }
}
function onButton(button) {
  if (button === "left" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (button === "right" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (button === "up" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (button === "down" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
}

play();
updateScore();
