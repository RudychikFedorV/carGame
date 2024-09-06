(() => {
  let isRause = false;
  let animationId = null;
  const speed = 3;

  const car = document.querySelector(".car");
  const trees = document.querySelectorAll(".trees");
  const gameBtn = document.querySelector(".game-btn");

  const tree1 = trees[0];

  //window.innerHeight

  const startGame = () => {
    animationId = requestAnimationFrame(startGame);
    treesAnimation();
  };

  const treesAnimation = () => {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];

      let newYCoord = coords.y + speed;

      if (newYCoord > window.innerHeight) {
        newYCoord = -370;
      }
      treesCoords[i].y = newYCoord;
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
    }
  };

  const getCoords = (element) => {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const x = array[array.length - 2];
    const y = array[array.length - 1];
    const numericX = parseFloat(x);
    const numericY = parseFloat(y);
    return { x: numericX, y: numericY };
  };
  const coordsTree1 = getCoords(tree1);
  const carCoords = getCoords(car);
  
  const carMoveInfo = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };

  const treesCoords = [];
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }

  document.addEventListener("keydown", (event) => {
    const code = event.code;
    if (code === "ArrowUp" && carMoveInfo.top === null) {
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    } else if (code === "ArrowDown" && carMoveInfo.bottom === null) {
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (code === "ArrowLeft" && carMoveInfo.left === null) {
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    } else if (code === "ArrowRight" && carMoveInfo.right === null) {
      carMoveInfo.right = requestAnimationFrame(carMoveToRight);
    }
  });
  document.addEventListener("keyup", (event) => {
    const code = event.code;
    if (code === "ArrowUp") {
      cancelAnimationFrame(carMoveInfo.top);
      carMoveInfo.top = null;
    } else if (code === "ArrowDown") {
      cancelAnimationFrame(carMoveInfo.bottom);
      carMoveInfo.bottom = null;
    } else if (code === "ArrowLeft") {
      cancelAnimationFrame(carMoveInfo.left);
      carMoveInfo.left = null;
    } else if (code === "ArrowRight") {
      cancelAnimationFrame(carMoveInfo.right);
      carMoveInfo.right = null;
    }
  });
  const carMoveToTop = () => {
    const newX = carCoords.x;
    const newY = carCoords.y - 5;
    carCoords.y = newY;
    carMove(newX, newY);
    carMoveInfo.top = requestAnimationFrame(carMoveToTop);
  };
  const carMoveToBottom = () => {
    const newX = carCoords.x;
    const newY = carCoords.y + 5;
    carCoords.y = newY;
    carMove(newX, newY);
    carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
  };
  const carMoveToLeft = () => {
    const newX = carCoords.x - 5;
    carCoords.x = newX;
    const newY = carCoords.y;
    carMove(newX, newY);
    carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
  };
  const carMoveToRight = () => {
    const newX = carCoords.x + 5;
    carCoords.x = newX;
    const newY = carCoords.y;
    carMove(newX, newY);
    carMoveInfo.right = requestAnimationFrame(carMoveToRight);
  };
  const carMove = (x, y) => {
    car.style.transform = `translate(${x}px, ${y}px)`;
  };
  animationId = requestAnimationFrame(startGame);

  gameBtn.addEventListener("click", () => {
    isRause = !isRause;
    if (isRause) {
      cancelAnimationFrame(animationId);
      gameBtn.children[0].style.display = "none";
      gameBtn.children[1].style.display = "block";
    } else {
      animationId = requestAnimationFrame(startGame);
      gameBtn.children[0].style.display = "block";
      gameBtn.children[1].style.display = "none";
    }
  });
})();
