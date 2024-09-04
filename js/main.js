(() => {
  let isRause = false;
  let animationId = null;
  const speed = 10;

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

  const treesCoords = [];
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }
  console.log(treesCoords);
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
