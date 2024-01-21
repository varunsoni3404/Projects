let rn;
function makebubble() {
  let clutter = "";
  for (let index = 1; index <= 140; index++) {
    let x = Math.floor(Math.random() * 10);
    clutter += `<button class="buble">${x}</button>`;
  }
  document.querySelector(".pbtm").innerHTML = clutter;
}
var timer = 60;
function runtimer() {
  var timerint = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").textContent = timer;
    } else {
      clearInterval(timerint);
      endGame();
    }
  }, 1000);
}
function getnewhit() {
  rn = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = rn;
}
var score = 0;
function increasescore() {
  score += 10;
  document.querySelector("#scoreval").textContent = score;
}
function handleBubbleClick(event) {
  const clickedButton = event.target;
  if (
    clickedButton.classList.contains("buble") 
    // !clickedButton.classList.contains("disabled")
  ) {
    if (clickedButton.innerHTML == rn) {
      increasescore();
      makebubble();
      getnewhit();
    }
    //   clickedButton.classList.add("disabled");
    //   clickedButton.disabled = true;
    //   makebubble();
    //   getnewhit();
  }
}
function endGame() {
  alert("Time up");
  document
    .querySelector(".pbtm")
    .removeEventListener("click", handleBubbleClick);
}
makebubble();
runtimer();
getnewhit();

document.querySelector(".pbtm").addEventListener("click", handleBubbleClick);
// makebubble();
// runtimer();
// getnewhit();
// let boxes=document.querySelectorAll(".buble");
// boxes.forEach((box)=>{
//     box.addEventListener("click",()=>{
//         if(box.innerHTML==rn){
//             increasescore();
//             box.disabled=true;
//         }
//     })
// })
// let boxes=document.querySelectorAll(".buble");
// boxes.forEach((box)=>{
//     box.addEventListener("click",()=>{
//         if(box.innerHTML==rn){
//             increasescore();
//             makebubble();
//             getnewhit();
//         }
//     })
// })
