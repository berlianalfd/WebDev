const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");

let isGameOver = false;
let isJumping = false;

function jump() {
  if (!isJumping) {
    isJumping = true;
    dino.style.top = "-50px"; // Tinggi lompatan
    setTimeout(() => {
      dino.style.top = "50px"; // Kembali ke posisi awal
      isJumping = false;
    }, 300); // Durasi lompatan
  }
}

document.addEventListener("keydown", function (event){
  jump();
})

let dinoAlive = setInterval(function () {
  score.innerText++;
  if (!isGameOver) { // Periksa apakah permainan masih berlangsung
    // Dapatkan posisi y saat ini dari dino
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    // Dapatkan posisi x saat ini dari kaktus
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    // Deteksi tabrakan
    if (cactusLeft < 15 && cactusLeft > 0 && dinoTop >= 50) {
      // Tabrakan
      isGameOver = true; // Set isGameOver ke true untuk menghentikan permainan
      alert("Game Over!");
      score.innerText = 0;
      location.reload();
    }
  }
}, 10);


