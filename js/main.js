(() => {
  let isPause = false;
  let animationId = null;
  const speed = 3;

  const car = document.querySelector(".car");
  const carWidth = car.clientWidth / 2;
  const carHeight = car.clientHeight;

  const coin = document.querySelector(".coin");
  const coinWidth = coin.clientWidth / 2;

  const arrow = document.querySelector(".arrow");
  const arrowWidth = arrow.clientWidth / 2;

  const danger = document.querySelector(".danger");
  const dangerWidth = danger.clientWidth / 2;

  const road = document.querySelector(".road");
  const roadHeight = road.clientHeight;
  const roadWidth = road.clientWidth / 2;

  const trees = document.querySelectorAll(".trees");
  const gameBtn = document.querySelector(".game-btn");

  const tree1 = trees[0];

  //window.innerHeight

  const startGame = () => {
    animationId = requestAnimationFrame(startGame);
    treesAnimation();
    elementAnimation(coin, coinCoord, coinWidth, -100);
    elementAnimation(danger, dangerCoord, dangerWidth, -250);
    elementAnimation(arrow, arrowCoord, arrowWidth, -600);
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

  const elementAnimation = (
    element,
    elementCoord,
    elementWidth,
    elementInitialCoord
  ) => {
    let newYCoord = elementCoord.y + speed;
    let newXCoord = elementCoord.x;
    if (newYCoord > window.innerHeight) {
      newYCoord = -100;

      const direction = parseInt(Math.random() * 2);
      const maxXCoord = roadWidth + 1 - elementWidth;
      const randomXCoord = parseInt(Math.random() * maxXCoord);
      if (direction === 0) {
        newXCoord = -randomXCoord;
      } else if (direction === 1) {
        newXCoord = randomXCoord;
      }
    }
    elementCoord.y = newYCoord;
    elementCoord.x = newXCoord;
    element.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  };
  // const coinAnimation = () => {
  //   let newYCoord = coinCoord.y + speed;
  //   let newXCoord = coinCoord.x;
  //   if (newYCoord > window.innerHeight) {
  //     newYCoord = -100;

  //     const direction = parseInt(Math.random() * 2);
  //     const maxXCoord = roadWidth + 1 - coinWidth;
  //     const randomXCoord = parseInt(Math.random() * maxXCoord);
  //     if (direction === 0) {
  //       newXCoord = -randomXCoord;
  //     } else if (direction === 1) {
  //       newXCoord = randomXCoord;
  //     }
  //   }
  //   coinCoord.y = newYCoord;
  //   coinCoord.x = newXCoord;
  //   coin.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  // };
  // const arrowAnimation = () => {
  //   let newYCoord = arrowCoord.y + speed;
  //   let newXCoord = arrowCoord.x;
  //   if (newYCoord > window.innerHeight) {
  //     newYCoord = -600;

  //     const direction = parseInt(Math.random() * 2);
  //     const maxXCoord = roadWidth + 1 - arrowWidth;
  //     const randomXCoord = parseInt(Math.random() * maxXCoord);
  //     newXCoord = direction === 0 ? -randomXCoord : randomXCoord;
  //   }
  //   arrowCoord.y = newYCoord;
  //   arrowCoord.x = newXCoord;
  //   arrow.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  // };
  // const dangerAnimation = () => {
  //   let newYCoord = dangerCoord.y + speed;
  //   let newXCoord = dangerCoord.x;
  //   if (newYCoord > window.innerHeight) {
  //     newYCoord = -250;

  //     const direction = parseInt(Math.random() * 2);
  //     const maxXCoord = roadWidth + 1 - dangerWidth;
  //     const randomXCoord = parseInt(Math.random() * maxXCoord);
  //     newXCoord = direction === 0 ? -randomXCoord : randomXCoord;
  //   }
  //   dangerCoord.y = newYCoord;
  //   dangerCoord.x = newXCoord;
  //   danger.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  // };

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
  const coinCoord = getCoords(coin);
  const arrowCoord = getCoords(arrow);
  const dangerCoord = getCoords(danger);

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
    if (isPause) {
      return;
    }
    const code = event.code;
    if (code === "ArrowUp" && carMoveInfo.top === null) {
      if (carMoveInfo.bottom) {
        return;
      }
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    } else if (code === "ArrowDown" && carMoveInfo.bottom === null) {
      if (carMoveInfo.top) {
        return;
      }
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (code === "ArrowLeft" && carMoveInfo.left === null) {
      if (carMoveInfo.right) {
        return;
      }
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    } else if (code === "ArrowRight" && carMoveInfo.right === null) {
      if (carMoveInfo.left) {
        return;
      }
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

    if (newY < 0) {
      return;
    }
    carCoords.y = newY;
    carMove(newX, newY);
    carMoveInfo.top = requestAnimationFrame(carMoveToTop);
  };
  const carMoveToBottom = () => {
    const newX = carCoords.x;
    const newY = carCoords.y + 5;

    if (newY + carHeight > roadHeight) {
      return;
    }
    carCoords.y = newY;
    carMove(newX, newY);
    carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
  };
  const carMoveToLeft = () => {
    const newX = carCoords.x - 5;
    if (newX < -roadWidth + carWidth) {
      return;
    }
    carCoords.x = newX;
    const newY = carCoords.y;
    carMove(newX, newY);
    carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
  };
  const carMoveToRight = () => {
    const newX = carCoords.x + 5;
    if (newX > roadWidth - carWidth) {
      return;
    }
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
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(carMoveToTop);
      cancelAnimationFrame(carMoveToBottom);
      cancelAnimationFrame(carMoveToLeft);
      cancelAnimationFrame(carMoveToRight);
      gameBtn.children[0].style.display = "none";
      gameBtn.children[1].style.display = "block";
    } else {
      animationId = requestAnimationFrame(startGame);
      gameBtn.children[0].style.display = "block";
      gameBtn.children[1].style.display = "none";
    }
  });
})();
