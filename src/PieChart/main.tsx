import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import Svg, {
  Path,
  Circle,
  Text as SvgText,
  Defs,
  RadialGradient,
  Stop,
  G,
  Line,
} from 'react-native-svg';
import {
  getPieChartMainProps,
  PieChartMainProps,
  pieColors,
} from 'gifted-charts-core';
import {isWebApp, rnVersion} from '../utils';

export const PieChartMain = (props: PieChartMainProps) => {
  const {
    isThreeD,
    isBiggerPie,
    data,
    showInnerComponent,
    radius,
    canvasWidth,
    canvasHeight,
    shadowWidth,
    backgroundColor,
    shadowColor,
    semiCircle,
    pi,
    initialAngle,
    shadow,
    donut,
    strokeWidth,
    strokeColor,
    innerRadius,
    showText,
    textColor,
    textSize,
    tiltAngle,
    labelsPosition,
    showTextBackground,
    textBackgroundColor,
    showValuesAsLabels,
    showGradient,
    gradientCenterColor,
    minShiftX,
    minShiftY,
    total,
    horizAdjustment,
    vertAdjustment,
    cx,
    cy,
    mData,
    paddingHorizontal,
    paddingVertical,
    extraRadius,
    showExternalLabels,
    getExternaLabelProperties,
    coordinates,
    onPressed,
    font,
    fontWeight,
    fontStyle,
    edgesPressable,
  } = getPieChartMainProps(props);

  const{setTouchX,setTouchY} = props;

  let prevSide = 'right';
  let prevLabelComponentX = 0;
  let wasFirstItemOnPole = false;

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const onPressHandler = (e: any) => {
    let x = 0,
      y = 0;
    if (isWebApp) {
      x = e.clientX - left;
      y = e.clientY - top;
    } else {
      x = e.nativeEvent.locationX;
      y = e.nativeEvent.locationY;
    }
    x -= extraRadius;
    y -= extraRadius;
    setTouchX(x);
    setTouchY(y);
    const r = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (r > radius || (donut && r < innerRadius)) return;
    const a = Math.atan2(y - cy, x - cx);

    for (let index = 0; index < data.length; index++) {
      const angle = coordinates[index];
      const {sx, sy, ax, ay} = angle;

      const startAngle = Math.atan2(sy - cy, sx - cx);
      const endAngle = Math.atan2(ay - cy, ax - cx);

      if (startAngle < endAngle) {
        if (startAngle < a && a < endAngle) {
          onPressed(data[index], index);
          break;
        }
      } else {
        if (a > startAngle || a < endAngle) {
          onPressed(data[index], index);
          break;
        }
      }
    }
  };

  return (
    <Pressable
      onPress={onPressHandler}
      pointerEvents={isBiggerPie && !edgesPressable ? 'none' : 'auto'}>
      <View
        pointerEvents="box-only"
        onLayout={(e: any) => {
          if (!isWebApp) return;
          setTop(e.nativeEvent.layout.top);
          setLeft(e.nativeEvent.layout.left);
        }}
        style={[
          {
            backgroundColor,
            height: semiCircle
              ? (canvasHeight + paddingVertical) / 2 + extraRadius
              : canvasHeight + paddingVertical + extraRadius * 2,
            width: canvasWidth + paddingHorizontal + extraRadius * 2,
            overflow: 'hidden',
          },
          isThreeD && {transform: [{rotateX: tiltAngle}]},
        ]}>
        <Svg
          pointerEvents={rnVersion >= 720000 ? 'box-none' : 'auto'} // use 'box-none' react-native version 0.72 onwards
          viewBox={`${strokeWidth / -2 + minShiftX - extraRadius - paddingHorizontal / 2} ${
            strokeWidth / -2 + minShiftY - extraRadius - paddingVertical / 2
          } ${
            (radius + extraRadius + strokeWidth) * 2 +
            paddingHorizontal +
            horizAdjustment +
            (horizAdjustment ? strokeWidth : 0)
          } ${
            (radius + extraRadius + strokeWidth) * 2 +
            paddingVertical +
            vertAdjustment +
            (vertAdjustment ? strokeWidth : 0)
          }`}
          height={(radius + extraRadius) * 2 + strokeWidth + paddingVertical}
          width={(radius + extraRadius) * 2 + strokeWidth + paddingHorizontal}>
          <Defs>
            {data.map((item, index) => {
              return (
                <RadialGradient
                  key={index + ''}
                  id={'grad' + index}
                  cx="50%"
                  cy="50%"
                  rx="50%"
                  ry="50%"
                  fx="50%"
                  fy="50%"
                  gradientUnits="userSpaceOnUse">
                  <Stop
                    offset="0%"
                    stopColor={item.gradientCenterColor || gradientCenterColor}
                    stopOpacity="1"
                  />
                  <Stop
                    offset="100%"
                    stopColor={item.color || pieColors[index % 9]}
                    stopOpacity="1"
                  />
                </RadialGradient>
              );
            })}
          </Defs>
          {(data.length === 1 || !total) ? (
            <>
              <Circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={
                  showGradient
                    ? `url(#grad${0})`
                    : data[0].color || pieColors[0 % 9]
                }
              />
            </>
          ) : (
            data.map((item, index) => {
              const {sx, sy, ax, ay} = coordinates[index];
              if (isBiggerPie && index) return null;
              return (
                <Path
                  key={index + 'a'}
                  d={`M ${cx + (item.shiftX || 0)} ${
                    cy + (item.shiftY || 0)
                  } L ${sx} ${sy} A ${radius} ${radius} 0 ${
                    semiCircle ? 0 : data[index].value > total / 2 ? 1 : 0
                  } 1 ${ax} ${ay} L ${cx + (item.shiftX || 0)} ${
                    cy + (item.shiftY || 0)
                  }`}
                  stroke={item.strokeColor || strokeColor}
                  strokeWidth={
                    props.focusOnPress && props.selectedIndex === index
                      ? 0
                      : item.strokeWidth === 0
                        ? 0
                        : item.strokeWidth || strokeWidth
                  }
                  fill={
                    props.selectedIndex === index || item.peripheral
                      ? 'none'
                      : showGradient
                        ? `url(#grad${index})`
                        : item.color || pieColors[index % 9]
                  }
                />
              );
            })
          )}

          {(showText || showInnerComponent || showExternalLabels) &&
            data.map((item, index) => {
              const localPieInnerComponent =
                item.pieInnerComponent ?? props.pieInnerComponent;
              const pieInnerComponentHeight = props.pieInnerComponentHeight ?? 0
              const pieInnerComponentWidth = props.pieInnerComponentWidth ?? 0
              if (isBiggerPie && index) return null;
              if (!props.data[index].value) return null;
              let mx =
                cx * (1 + Math.sin(2 * pi * mData[index] + initialAngle));
              let my =
                cy * (1 - Math.cos(2 * pi * mData[index] + initialAngle));

              let midx = (mx + cx) / 2;
              let midy = (my + cy) / 2;

              let x = midx,
                y = midy;

              const labelPosition = item.labelPosition || labelsPosition;

              if (labelPosition === 'onBorder') {
                x = mx;
                y = my;
              } else if (labelPosition === 'outward') {
                x = (midx + mx) / 2;
                y = (midy + my) / 2;
              } else if (labelPosition === 'inward') {
                x = (midx + cx) / 2;
                y = (midy + cy) / 2;
              }

              x += item.shiftX || 0;
              y += item.shiftY || 0;

              if (data.length === 1) {
                if (donut) {
                  y =
                    (radius -
                      innerRadius +
                      (item.textBackgroundRadius ||
                        props.textBackgroundRadius ||
                        item.textSize ||
                        textSize)) /
                    2;
                } else {
                  y = cy;
                }
              }

              const {
                labelLineColor,
                labelLineThickness,
                labelComponentHeight,
                inX,
                inY,
                outX,
                outY,
                finalX,
                labelComponentX,
                labelComponentY,
                localExternalLabelComponent,
                isRightHalf,
              } = getExternaLabelProperties(
                item,
                mx,
                my,
                cx,
                cy,
                prevSide,
                prevLabelComponentX,
                index === data.length - 1, // isLast
                wasFirstItemOnPole,
              );
              prevSide = isRightHalf ? 'right' : 'left';
              prevLabelComponentX = labelComponentX;
              if (index === 0) wasFirstItemOnPole = labelComponentY !== outY;

              return (
                <React.Fragment key={index}>
                  {showExternalLabels ? (
                    <G>
                      <Line
                        x1={inX}
                        x2={outX}
                        y1={inY}
                        y2={outY}
                        stroke={labelLineColor}
                        strokeWidth={labelLineThickness}
                      />
                      <Line
                        x1={outX}
                        x2={finalX}
                        y1={outY}
                        y2={outY}
                        stroke={labelLineColor}
                        strokeWidth={labelLineThickness}
                      />
                      {localExternalLabelComponent ? (
                        <G
                          x={labelComponentX}
                          y={labelComponentY + labelComponentHeight / 2}>
                          {localExternalLabelComponent?.(item, index) ?? null}
                        </G>
                      ) : null}
                    </G>
                  ) : null}
                  {showTextBackground ? (
                    <Circle
                      cx={
                        x + (item.shiftTextBackgroundX ?? item.shiftTextX ?? 0)
                      }
                      cy={
                        y +
                        (item.shiftTextBackgroundY ?? item.shiftTextY ?? 0) -
                        (item.textSize || textSize) / 4
                      }
                      r={
                        item.textBackgroundRadius ||
                        props.textBackgroundRadius ||
                        item.textSize ||
                        textSize
                      }
                      fill={item.textBackgroundColor || textBackgroundColor}
                    />
                  ) : null}
                  {showText && (
                    <SvgText
                      fill={
                        item.textColor ||
                        textColor ||
                        pieColors[(index + 2) % 9]
                      }
                      fontSize={item.textSize || textSize}
                      fontFamily={item.font || font}
                      fontWeight={item.fontWeight || fontWeight}
                      fontStyle={item.fontStyle || fontStyle || 'normal'}
                      x={
                        x +
                        (item.shiftTextX || 0) -
                        (item.textSize || textSize) / 1.8
                      }
                      y={y + (item.shiftTextY || 0)}
                    >
                      {item.text || (showValuesAsLabels ? item.value + '' : '')}
                    </SvgText>
                  )}
                  {localPieInnerComponent ? (
                    <G 
                      x={x - pieInnerComponentHeight / 2} 
                      y={y - pieInnerComponentWidth / 2}
                    >
                      {localPieInnerComponent?.(item, index) ?? null}
                    </G>
                  ) : null}
                </React.Fragment>
              );
            })}
        </Svg>
        {isThreeD && shadow && !semiCircle ? (
          <View
            style={{
              width: radius * 2,
              height: radius * 2,
              backgroundColor: shadowColor,
              borderRadius: radius,
              position: 'absolute',
              top: shadowWidth + paddingVertical / 2,
              left: paddingHorizontal / 2,
              zIndex: -1,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
};
