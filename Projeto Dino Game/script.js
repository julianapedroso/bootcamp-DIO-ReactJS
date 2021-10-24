const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJuping = false;
let isGameOver = false;
let position = 0;

const handleKeyup = (event) => {
  if (event.keyCode === 32) {
    if (!isJuping) {
      jump();
    }
  }
};

const jump = () => {
  isJuping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      isJuping = false;

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
};

const createCactus = () => {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    cactusPosition -= 10;
    cactus.style.left = cactusPosition + 'px';

    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftInterval);
      isGameOver = true;

      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo :(</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 40);

  setTimeout(createCactus, randomTime);
};

createCactus();

document.addEventListener('keyup', handleKeyup);
