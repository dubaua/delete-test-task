export const importAll = function(r) {
  r.keys().forEach(r);
};

export function forEachNode(nodeList, callback) {
  for (let index = 0; index < nodeList.length; index++) {
    const node = nodeList[index];
    callback(node, index, nodeList);
  }
}

export const isNatural = number => !isNaN(number) && number >= 0 && number % 1 === 0;

export function addClass(node, classname) {
  node.classList.add(classname);
}

export function removeClass(node, classname) {
  node.classList.remove(classname);
}

export function animate({ duration, timing, draw, rafLink }) {
  const start = performance.now();

  let raf = requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      rafLink.raf = requestAnimationFrame(animate);
    }
  });

  return raf;
}
