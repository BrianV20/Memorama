const timerEl = document.querySelector(".timer");

//game logic
let icons = [];
let selects = [];
let contMovimientos = 0;
let cont = document.querySelector(".movimientos");
let adivinadas = 0;
// var contadorMovimientos = 0;

// window.onload = () => {
//   // genBoard(z);
// };

function loadIcons() {
  icons = [
    '<img src="src/grace.png" alt="pic1" style="width: 90%; height: 90%;">',
    '<img src="src/bibilceta.png" alt="pic2" style="width: 90%; height: 90%;">',
    '<img src="src/chaco.png" alt="pic3" style="width: 90%; height: 90%;">',
    '<img src="src/clics.png" alt="pic4" style="width: 90%; height: 90%;">',
    '<img src="src/horno.png" alt="pic5" style="width: 90%; height: 90%;">',
    '<img src="src/live.png" alt="pic6" style="width: 90%; height: 90%;">',
    '<img src="src/planetary.png" alt="pic7" style="width: 90%; height: 90%;">',
    '<img src="src/rage.png" alt="pic8" style="width: 90%; height: 90%;">',
    '<img src="src/peliculas.png" alt="pic9" style="width: 90%; height: 90%;">',
    '<img src="src/yeezus.png" alt="pic10" style="width: 90%; height: 90%;">',
    '<img src="src/madvillain.png" alt="pic11" style="width: 90%; height: 90%;">',
    '<img src="src/carasbonitas.png" alt="pic12" style="width: 90%; height: 90%;">',
  ];
}


let cantCartas = 0;

function genBoard(z) {
  loadIcons();
  cantCartas = z;
  selects = [];
  let board = document.getElementById("board");
  let newGame = document.querySelector(".new-game");
  let cards = [];
  newGame.setAttribute("onclick", "genBoard(z)");

  for (let i = 0; i < z; i++) {
    cards.push(`
                <div class="area-card" onclick="selectCard(${i})">
                    <div class="card" id="card${i}">
                        <div class="face back" id="back${i}">
                            ${icons[0]}
                        </div>
                        <div class="face top">
                            <i class="fa-solid fa-compact-disc"></i>
                        </div>
                    </div>
                </div>
                `);
    if (i % 2 == 1) {
      icons.splice(0, 1);
    }
  }
  cards.sort(() => Math.random() - 0.5);
  board.innerHTML = cards.join(" ");
}

function selectCard(i) {
  let card = document.getElementById("card" + i);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selects.push(i);
  }
  if (selects.length == 2) {
    deselect(selects);
    selects = [];
    contMovimientos += 1;
    cont.innerHTML = contMovimientos;
    // console.log(movs);
  }
}

function deselect(selects) {
  setTimeout(() => {
    let back1 = document.getElementById("back" + selects[0]);
    let back2 = document.getElementById("back" + selects[1]);

    if (back1.innerHTML != back2.innerHTML) {
      let card1 = document.getElementById("card" + selects[0]);
      let card2 = document.getElementById("card" + selects[1]);
      card1.style.transform = "rotateY(0deg)";
      card2.style.transform = "rotateY(0deg)";
    } else {
      back1.style.background = "var(--card-correct-color)";
      back2.style.background = "var(--card-correct-color)";
      adivinadas += 2;
      if(adivinadas === cantCartas){
        ganador();
        adivinadas = 0;
      }
    }
  }, 800);
}

function contarMovimiento(movs) {
  movs++;
  console.log(movs);
  let contMovimientosEl = document.querySelector(".cantidadMovimientos");
  contMovimientosEl.innerHTML = movs;

  return movs;
}


// btn dark mode
const btnChangeModeEl = document.querySelector(".btnChangeMode");
const cambiarModo = () => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    btnChangeModeEl.textContent = "Modo oscuro";
  } else {
    html.classList.add("dark");
    btnChangeModeEl.textContent = "Modo claro";
  }
};
btnChangeModeEl.addEventListener("click", cambiarModo);


// timer
var timeSecond = 0;
let timer = 0;


const btnNewGame = document.querySelector(".new-game");
const newGameDiv = document.querySelector(".newGameDiv");
newGameDiv.addEventListener("click", () => {
  genBoard(cantCartas);
  timeSecond = 0;
  displayTime(timeSecond);
  clearInterval(timer);
  timer = setInterval(countDown, 1000);
  contMovimientos = 0;
  cont.innerHTML = contMovimientos;
});

function countDown(){
  timeSecond++;
  displayTime(timeSecond);
}

function displayTime(second){
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timerEl.innerHTML = `Tu tiempo: ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function ganador() {
  swal({
    title: "Felicitaciones!",
    text: "Has ganado!\n" + timerEl.innerHTML + "\nMovimientos: " + contMovimientos,
    icon: "success",
    button: "Aceptar",
  });
  clearInterval(timer);
}