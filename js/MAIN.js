const API = "http://10.69.4.208:3000/v1/";

const $DiaMenu = document.querySelector("#Menu");
const $BTNmenu = document.querySelector("#BTNmenu");
const $body = document.querySelector("body");
const $close = document.querySelector("#close");

let div = document.createElement("div");

$BTNmenu.addEventListener("click", () => {
    div = document.createElement("div");
    div.classList.add("voile");
    $body.appendChild(div);
    $DiaMenu.showModal();
});

$close.addEventListener("click", () => {
    div.remove();
    $DiaMenu.close();
});
