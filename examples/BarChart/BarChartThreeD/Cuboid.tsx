import React from 'react';
import {Path, G} from 'react-native-svg';
const Cuboid = props => {
  const {ix, iy, size, height, angle} = props;

  const cos = size * Math.cos(angle);
  const sin = size * Math.sin(angle);

  const ax = ix,
    ay = iy;
  const bx = ix + cos,
    by = iy + sin;
  const cx = ix,
    cy = iy + sin * 2;
  const dx = ix - cos,
    dy = iy + sin;

  const ex = ax,
    ey = ay - height;
  const fx = bx,
    fy = by - height;
  const gx = cx,
    gy = cy - height;
  const hx = dx,
    hy = dy - height;

  return (
    <G>
      {/* <Path
          d={`M${ax} ${ay} L${bx} ${by} L${cx} ${cy} L${dx} ${dy} L${ax} ${ay}`}
          fill={'lightgreen'}
          stroke="black"
          strokeWidth={1}
        /> */}

      <Path
        d={`M${dx} ${dy} L${hx} ${hy} L${gx} ${gy} L${cx} ${cy} L${dx} ${dy}`}
        fill={'lightgreen'}
        // stroke="black"
        // strokeWidth={1}
      />

      <Path
        d={`M${cx} ${cy} L${gx} ${gy} L${fx} ${fy} L${bx} ${by} L${cx} ${cy}`}
        fill={'green'}
        // stroke="black"
        // strokeWidth={1}
      />

      <Path
        d={`M${hx} ${hy} L${ex} ${ey} L${fx} ${fy} L${gx} ${gy} L${hx} ${hy}`}
        fill={'rgb(150,200,150)'}
        // stroke="black"
        // strokeWidth={1}
      />
    </G>
  );
};

export default Cuboid;
