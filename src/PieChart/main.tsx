import React from 'react';
import {View} from 'react-native';
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
import {rnVersion} from '../utils';

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
    toggleFocusOnPress,
    minShiftX,
    minShiftY,
    total,
    horizAdjustment,
    vertAdjustment,
    cx,
    cy,
    pData,
    mData,
    paddingHorizontal,
    paddingVertical,
    extraRadius,
    showExternalLabels,
    getExternaLabelProperties,
  } = getPieChartMainProps(props);

  let prevSide = 'right';
  let prevLabelComponentX = 0;
  let wasFirstItemOnPole = false;

  return (
    <View
      pointerEvents="box-none"
      style={[
        {
          backgroundColor: backgroundColor,
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
        {data.length === 1 ? (
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
              onPress={() => {
                data[0].onPress
                  ? data[0].onPress()
                  : props.onPress
                    ? props.onPress(data[0], 0)
                    : null;
              }}
            />
          </>
        ) : (
          data.map((item, index) => {
            // console.log('index', index);
            let nextItem;
            if (index === pData.length - 1) nextItem = pData[0];
            else nextItem = pData[index + 1];
            let sx =
              cx * (1 + Math.sin(2 * pi * pData[index] + initialAngle)) +
              (item.shiftX || 0);
            let sy =
              cy * (1 - Math.cos(2 * pi * pData[index] + initialAngle)) +
              (item.shiftY || 0);
            let ax =
              cx * (1 + Math.sin(2 * pi * nextItem + initialAngle)) +
              (item.shiftX || 0);
            let ay =
              cy * (1 - Math.cos(2 * pi * nextItem + initialAngle)) +
              (item.shiftY || 0);

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
                    ? 'transparent'
                    : showGradient
                      ? `url(#grad${index})`
                      : item.color || pieColors[index % 9]
                }
                onPressIn={() => {
                  if (item.onPress) {
                    item.onPress();
                  } else if (props.onPress) {
                    props.onPress(item, index);
                  }
                  if (props.focusOnPress) {
                    if (props.selectedIndex === index || props.isBiggerPie) {
                      if (toggleFocusOnPress) {
                        props.setSelectedIndex(-1);
                      }
                    } else {
                      props.setSelectedIndex(index);
                    }
                  }
                }}
              />
            );
          })
        )}

        {(showText || showInnerComponent || showExternalLabels) &&
          data.map((item, index) => {
            const localPieInnerComponent =
              item.pieInnerComponent ?? props.pieInnerComponent;
            if (isBiggerPie && index) return null;
            if (!props.data[index].value) return null;
            let mx = cx * (1 + Math.sin(2 * pi * mData[index] + initialAngle));
            let my = cy * (1 - Math.cos(2 * pi * mData[index] + initialAngle));

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
                    cx={x + (item.shiftTextBackgroundX ?? item.shiftTextX ?? 0)}
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
                    onPress={() => {
                      item.onLabelPress
                        ? item.onLabelPress()
                        : props.onLabelPress
                          ? props.onLabelPress(item, index)
                          : item.onPress
                            ? item.onPress()
                            : props.onPress
                              ? props.onPress(item, index)
                              : null;
                      if (props.focusOnPress) {
                        if (props.selectedIndex === index) {
                          if (toggleFocusOnPress) {
                            props.setSelectedIndex(-1);
                          }
                        } else {
                          props.setSelectedIndex(index);
                        }
                      }
                    }}
                  />
                ) : null}
                {showText && (
                  <SvgText
                    fill={
                      item.textColor || textColor || pieColors[(index + 2) % 9]
                    }
                    fontSize={item.textSize || textSize}
                    fontFamily={item.font || props.font}
                    fontWeight={item.fontWeight || props.fontWeight}
                    fontStyle={item.fontStyle || props.fontStyle || 'normal'}
                    x={
                      x +
                      (item.shiftTextX || 0) -
                      (item.textSize || textSize) / 1.8
                    }
                    y={y + (item.shiftTextY || 0)}
                    onPress={() => {
                      item.onLabelPress
                        ? item.onLabelPress()
                        : props.onLabelPress
                          ? props.onLabelPress(item, index)
                          : item.onPress
                            ? item.onPress()
                            : props.onPress
                              ? props.onPress(item, index)
                              : null;
                      if (props.focusOnPress) {
                        if (props.selectedIndex === index) {
                          if (toggleFocusOnPress) {
                            props.setSelectedIndex(-1);
                          }
                        } else {
                          props.setSelectedIndex(index);
                        }
                      }
                    }}>
                    {item.text || (showValuesAsLabels ? item.value + '' : '')}
                  </SvgText>
                )}
                {localPieInnerComponent ? (
                  <G x={x} y={y}>
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
  );
};
