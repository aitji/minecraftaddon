/**
 * official oneko.js: https://github.com/adryd325/oneko.js
 * im modifier a little bit :) 
*/
(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (isReducedMotion) return;
  const element = document.createElement("div");
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  let pox = screenWidth / 2 - 16;
  let poy = screenHeight / 2 + 120;
  let mPox = pox;
  let mPoy = poy;
  let frame_var = 0;
  let idleTime = 0;
  let idleAnim = null;
  let idleAF = 0;
  const speed = 20;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0],],
    scratchWallN: [[0, 0], [0, -1],],
    scratchWallS: [[-7, -1], [-6, -2],],
    scratchWallE: [[-2, -2], [-2, -3],],
    scratchWallW: [[-4, 0], [-4, -1],],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1],],
    N: [[-1, -2], [-1, -3],],
    NE: [[0, -2], [0, -3],],
    E: [[-3, 0], [-3, -1],],
    SE: [[-5, -1], [-5, -2],],
    S: [[-6, -3], [-7, -2],],
    SW: [[-5, -3], [-6, -1],],
    W: [[-4, -2], [-4, -3],],
    NW: [[-1, 0], [-1, -1],],
  };
  function init() {
    element.id = "oneko";
    element.ariaHidden = true;
    element.style.width = "32px";
    element.style.height = "32px";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    element.style.imageRendering = "pixelated";
    element.style.left = `${pox - 16}px`;
    element.style.top = `${poy - 16}px`;
    element.style.zIndex = Number.MAX_VALUE;
    let file = "../mewo/oneko.gif"
    const curScript = document.currentScript
    if (curScript && curScript.dataset.cat) file = curScript.dataset.cat
    element.style.backgroundImage = `url(${file})`;
    document.body.appendChild(element);
    document.addEventListener("mousemove", function (event) { mPox = event.clientX; mPoy = event.clientY; });
    window.requestAnimationFrame(onAF);
  }
  let lfTS;
  function onAF(ts) {
    if (!element.isConnected) return;
    if (!lfTS) lfTS = ts;
    if (ts - lfTS > 100) {
      lfTS = ts
      frame()
    }
    window.requestAnimationFrame(onAF);
  }
  function sS(n, f) {
    const i = spriteSets[n][f % spriteSets[n].length];
    element.style.backgroundPosition = `${i[0] * 32}px ${i[1] * 32}px`;
  }

  function rid() {
    idleAnim = null;
    idleAF = 0;
  }

  function idle() {
    idleTime += 1;
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnim == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (pox < 32) avalibleIdleAnimations.push("scratchWallW");
      if (poy < 32) avalibleIdleAnimations.push("scratchWallN");
      if (pox > window.innerWidth - 32) avalibleIdleAnimations.push("scratchWallE");
      if (poy > window.innerHeight - 32) avalibleIdleAnimations.push("scratchWallS");
      idleAnim = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
    }
    switch (idleAnim) {
      case "sleeping":
        if (idleAF < 8) {
          sS("tired", 0);
          break;
        }
        sS("sleeping", Math.floor(idleAF / 4));
        if (idleAF > 192) {
          rid();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        sS(idleAnim, idleAF);
        if (idleAF > 9) rid();
        break;
      default:
        sS("idle", 0);
        return;
    }
    idleAF += 1;
  }
  function frame() {
    frame_var += 1;
    const diffX = pox - mPox;
    const diffY = poy - mPoy;
    const dis = Math.sqrt(diffX ** 2 + diffY ** 2);
    if (dis < speed || dis < 48) {
      idle();
      return;
    }
    idleAnim = null;
    idleAF = 0;
    if (idleTime > 1) {
      sS("alert", 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }
    let direction;
    direction = diffY / dis > 0.5 ? "N" : "";
    direction += diffY / dis < -0.5 ? "S" : "";
    direction += diffX / dis > 0.5 ? "W" : "";
    direction += diffX / dis < -0.5 ? "E" : "";
    sS(direction, frame_var);
    pox -= (diffX / dis) * speed;
    poy -= (diffY / dis) * speed;
    pox = Math.min(Math.max(16, pox), window.innerWidth - 16);
    poy = Math.min(Math.max(16, poy), window.innerHeight - 16);
    element.style.left = `${pox - 16}px`;
    element.style.top = `${poy - 16}px`;
  }
  init();
})();