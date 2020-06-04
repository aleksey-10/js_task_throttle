'use strict';

function throttle(f, delay) {
  let timer;

  return function(event) {
    if (timer !== undefined) {
      return;
    }
    
    f.call(this, event);

    timer = setInterval(() => {
      setTimeout(() => f.call(this, event), delay);
      clearInterval(timer)
      timer = undefined;
    }, delay);
  }
}

function onMove(event) {
  throttlePositionElement.textContent = `x: ${ event.clientX }, y: ${ event.clientY }`
}

function onMoveRealtime(event) {
  realtimePositionElement.textContent = `x: ${ event.clientX }, y: ${ event.clientY }`
}

const realtimePositionElement = document.querySelector('#realtime');
const throttlePositionElement = document.querySelector('#throttle');

const wrapper = throttle(onMove, 1000);

document.addEventListener('mousemove', wrapper);
document.addEventListener('mousemove', onMoveRealtime);
