export const getCumulativeWidth = (
  data: any,
  index: number,
  spacing: number,
) => {
  let cumWidth = 0;
  for (let i = 0; i < index; i++) {
    let {barWidth} = data[i];
    barWidth = barWidth || 30;
    cumWidth += barWidth + (spacing ? spacing : spacing === 0 ? 0 : 20);
  }
  return cumWidth;
};

export const getLighterColor = (color: String) => {
  let r,
    g,
    b,
    lighter = '#';
  if (color.startsWith('#')) {
    if (color.length < 7) {
      r = parseInt(color[1], 16);
      g = parseInt(color[2], 16);
      b = parseInt(color[3], 16);
      // console.log('r', r);
      // console.log('g', g);
      // console.log('b', b);
      if (r < 14) {
        r += 2;
        lighter += r.toString(16);
      }
      if (g < 14) {
        g += 2;
        lighter += g.toString(16);
      }
      if (b < 14) {
        b += 2;
        lighter += b.toString(16);
      }
      // console.log('lighter', lighter);
    } else {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
      // console.log('r', r);
      // console.log('g', g);
      // console.log('b', b);

      if (r < 224) {
        r += 32;
        lighter += r.toString(16);
      }
      if (g < 224) {
        g += 32;
        lighter += g.toString(16);
      }
      if (b < 224) {
        b += 32;
        lighter += b.toString(16);
      }
      // console.log('lighter', lighter);
    }
  }
  return lighter;
};

export const svgPath = (points: Array<Array<number>>, command: Function) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? // if first point
          `M ${point[0]},${point[1]}`
        : // else
          `${acc} ${command(point, i, a)}`,
    '',
  );
  return d;
};

const line = (pointA: Array<number>, pointB: Array<number>) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const controlPoint = (
  current: Array<number>,
  previous: Array<number>,
  next: Array<number>,
  reverse?: any,
) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // The smoothing ratio
  const smoothing = 0.2;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

export const bezierCommand = (
  point: Array<number>,
  i: number,
  a: Array<Array<number>>,
) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};
