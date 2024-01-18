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
} from 'react-native-svg';
import {pieColors} from '../utils/constants';
import {rnVersion} from '../utils';
import {PieChartPropsType, pieDataItem} from './types';

interface propTypes extends PieChartPropsType {
  setSelectedIndex: Function;
  isBiggerPie?: boolean;
}

export const PieChartMain = (props: propTypes) => {
  const {isThreeD, isBiggerPie} = props;
  const propData = props.data;
  const data: Array<pieDataItem> = [];
  let itemHasInnerComponent = false;
  if (propData) {
    for (let i = 0; i < propData.length; i++) {
      if(propData[i].pieInnerComponent) itemHasInnerComponent = true;
      if (propData[i].value !== 0) {
        data.push(propData[i]);
      } else {
        data.push({
          ...propData[i],
          value:
            props.data.map(item => item.value).reduce((v, a) => v + a) / 160000,
        });
      }
    }
  }
  const showInnerComponent = (!!props.pieInnerComponent) || itemHasInnerComponent;

  const radius = props.radius || 120;
  const canvasWidth = radius * 2;
  const canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
  const shadowWidth = props.shadowWidth || radius / 5;
  const backgroundColor = props.backgroundColor || 'transparent';
  const shadowColor = props.shadowColor || 'lightgray';
  const semiCircle = props.semiCircle || false;
  let pi = Math.PI;
  const initialAngle = props.initialAngle || (semiCircle ? pi / -2 : 0);
  const shadow = props.shadow || false;
  const donut = props.donut || false;
  const strokeWidth = props.strokeWidth || 0;
  const strokeColor =
    props.strokeColor || (strokeWidth ? 'gray' : 'transparent');
  const innerRadius = props.innerRadius || radius / 2.5;

  const showText = props.showText || false;
  const textColor = props.textColor || '';
  const textSize = props.textSize ? Math.min(props.textSize, radius / 5) : 16;
  let tiltAngle = props.tiltAngle || '55deg';
  if (
    tiltAngle &&
    !isNaN(Number(tiltAngle)) &&
    !(tiltAngle + '').endsWith('deg')
  ) {
    tiltAngle += 'deg';
  }
  // const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
  const labelsPosition = props.labelsPosition
    ? props.labelsPosition
    : donut || props.centerLabelComponent
      ? 'outward'
      : 'mid';

  const showTextBackground = props.showTextBackground || false;
  const textBackgroundColor = props.textBackgroundColor || 'white';
  const showValuesAsLabels = props.showValuesAsLabels || false;
  const showGradient = props.showGradient || false;
  const gradientCenterColor = props.gradientCenterColor || 'white';
  const toggleFocusOnPress = props.toggleFocusOnPress ?? true;

  let minShiftX = 0,
    maxShiftX = 0,
    minShiftY = 0,
    maxShiftY = 0,
    total = 0;

  data.forEach((item: any) => {
    if (item.shiftX || item.shiftY) {
      if (minShiftX > item.shiftX) {
        minShiftX = item.shiftX;
      }
      if (minShiftY > item.shiftY) {
        minShiftY = item.shiftY;
      }
      if (maxShiftX < item.shiftX) {
        maxShiftX = item.shiftX;
      }
      if (maxShiftY < item.shiftY) {
        maxShiftY = item.shiftY;
      }
    }
  });

  const horizAdjustment = maxShiftX - minShiftX;
  const vertAdjustment = maxShiftY - minShiftY;

  if (semiCircle) {
    pi = Math.PI / 2;
  }

  let cx = radius,
    cy = radius;

  total =
    data && data.length
      ? data.map(item => item.value).reduce((v, a) => v + a)
      : 0;
  let acc = 0;
  let pData = data.map(item => {
    acc += item.value / total;
    return acc;
  });
  acc = 0;
  let mData = data.map(item => {
    let pAcc = acc;
    acc += item.value / total;
    return pAcc + (acc - pAcc) / 2;
  });
  pData = [0, ...pData];

  return (
    <View
      pointerEvents="box-none"
      style={[
        {
          backgroundColor: backgroundColor,
          height: semiCircle ? canvasHeight / 2 : canvasHeight,
          width: canvasWidth,
          overflow: 'hidden',
        },
        isThreeD && {transform: [{rotateX: tiltAngle}]},
      ]}>
      <Svg
        pointerEvents={rnVersion >= 720000 ? 'box-none' : 'auto'} // use 'box-none' react-native version 0.72 onwards
        viewBox={`${strokeWidth / -2 + minShiftX} ${
          strokeWidth / -2 + minShiftY
        } ${
          (radius + strokeWidth) * 2 +
          horizAdjustment +
          (horizAdjustment ? strokeWidth : 0)
        } ${
          (radius + strokeWidth) * 2 +
          +vertAdjustment +
          (vertAdjustment ? strokeWidth : 0)
        }`}
        height={radius * 2 + strokeWidth}
        width={radius * 2 + strokeWidth}>
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
                onPress={() => {
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

        {(showText || showInnerComponent) &&
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

            return (
              <React.Fragment key={index}>
                {/* <Line x1={mx} x2={cx} y1={my} y2={cy} stroke="black" /> */}
                {showTextBackground ? (
                  <Circle
                    cx={x}
                    cy={y - (item.textSize || textSize) / 4}
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
            top: shadowWidth,
            zIndex: -1,
          }}
        />
      ) : null}
    </View>
  );
};
