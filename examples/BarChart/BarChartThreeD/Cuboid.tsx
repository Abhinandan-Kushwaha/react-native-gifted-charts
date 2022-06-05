import React from 'react';
import {Path, G, Text as SvgText} from 'react-native-svg';
const Cuboid = props => {
  const {
    ix,
    iy,
    size,
    height,
    angle,
    topColor,
    frontColor,
    sideColor,
    label,
    labelConfig = {},
    columnLabel,
    columnLabelConfig = {},
    rowLabel,
    rowLabelConfig = {},
  } = props;

  const cos = size * Math.cos(angle);
  const sin = size * Math.sin(angle);

  const {
    color: labelColor,
    fontSize: labelFontSize = 12,
    fontFamily: labelFontFamily,
    fontWeight: labelFontWeight,
    fontStyle: labelFontStyle,
  } = labelConfig;

  const {
    color: columnLabelColor,
    fontSize: columnLabelFontSize = 12,
    fontFamily: columnLabelFontFamily,
    fontWeight: columnLabelFontWeight,
    fontStyle: columnLabelFontStyle,
  } = columnLabelConfig;
  const {
    color: rowLabelColor,
    fontSize: rowLabelFontSize = 12,
    fontFamily: rowLabelFontFamily,
    fontWeight: rowLabelFontWeight,
    fontStyle: rowLabelFontStyle,
  } = rowLabelConfig;

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
        fill={frontColor}
        // stroke="black"
        // strokeWidth={1}
      />

      <Path
        d={`M${cx} ${cy} L${gx} ${gy} L${fx} ${fy} L${bx} ${by} L${cx} ${cy}`}
        fill={sideColor}
        // stroke="black"
        // strokeWidth={1}
      />

      <Path
        d={`M${hx} ${hy} L${ex} ${ey} L${fx} ${fy} L${gx} ${gy} L${hx} ${hy}`}
        fill={topColor}
        // stroke="black"
        // strokeWidth={1}
      />
      {columnLabel ? (
        <SvgText
          fill={columnLabelColor || 'black'}
          fontSize={columnLabelFontSize}
          fontFamily={columnLabelFontFamily}
          fontWeight={columnLabelFontWeight}
          fontStyle={columnLabelFontStyle}
          x={dx - (columnLabel.length * columnLabelFontSize) / 2}
          y={dy + columnLabelFontSize * 1.5}>
          {columnLabel}
        </SvgText>
      ) : null}

      {rowLabel ? (
        <SvgText
          rotate={30}
          fill={rowLabelColor || 'black'}
          fontSize={rowLabelFontSize}
          fontFamily={rowLabelFontFamily}
          fontWeight={rowLabelFontWeight}
          fontStyle={rowLabelFontStyle}
          x={(bx + cx) / 2}
          y={dy + 14}>
          {rowLabel}
        </SvgText>
      ) : null}
      {label ? (
        <SvgText
          rotate={30}
          fill={labelColor || 'black'}
          fontSize={labelFontSize}
          fontFamily={labelFontFamily}
          fontWeight={labelFontWeight}
          fontStyle={labelFontStyle}
          x={(dx + bx - labelFontSize) / 2}
          y={(ey + gy) / 2}>
          {label}
        </SvgText>
      ) : null}
    </G>
  );
};

export default Cuboid;
