import React from 'react';
import {ColorValue, View, Text} from 'react-native';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
  Line,
} from 'react-native-svg';
import {svgPath, bezierCommand} from '../utils';

type propTypes = {
  radius?: number;
  isThreeD?: Boolean;
  donut?: Boolean;
  innerRadius?: number;
  shadow?: Boolean;
  innerCircleColor?: ColorValue;
  innerCircleBorderWidth?: number;
  innerCircleBorderColor?: ColorValue;
  shiftInnerCenterX?: number;
  shiftInnerCenterY?: number;
  shadowColor?: string;
  shadowWidth?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  data: Array<itemType>;
  semiCircle?: Boolean;

  showText?: Boolean;
  textColor?: string;
  textSize?: number;
  fontStyle?: string;
  fontWeight?: string;
  font?: string;
  showTextBackground?: Boolean;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  showValuesAsLabels?: Boolean;

  centerLabelComponent?: Function;
  tilt?: number;
  initialAngle?: number;
  labelsPosition?: 'outward' | 'inward' | 'mid';
};
type itemType = {
  value: number;
  shiftX?: number;
  shiftY?: number;
  color?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  fontStyle?: string;
  fontWeight?: string;
  font?: string;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  shiftTextX?: number;
  shiftTextY?: number;
};

export const SvgPie = (props: propTypes) => {
  const {data, isThreeD} = props;
  const radius = props.radius || 120;
  const canvasWidth = radius * 2;
  const canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
  const shadowWidth = props.shadowWidth || (6 * radius) / 5;
  const backgroundColor = props.backgroundColor || 'transparent';
  const shadowColor = props.shadowColor || 'lightgray';
  const semiCircle = props.semiCircle || false;
  let pi = Math.PI;
  const initialAngle = props.initialAngle || (semiCircle ? pi / -2 : 0);
  const shadow = props.shadow || false;
  const donut = props.donut || false;
  const innerRadius = props.innerRadius || radius / 2;
  const innerCircleColor =
    props.innerCircleColor || props.backgroundColor || 'white';
  const innerCircleBorderWidth =
    props.innerCircleBorderWidth || (props.innerCircleBorderColor ? 5 : 0);
  const innerCircleBorderColor = props.innerCircleBorderColor || 'lightgray';
  const shiftInnerCenterX = props.shiftInnerCenterX || 0;
  const shiftInnerCenterY = props.shiftInnerCenterY || 0;
  const strokeWidth = props.strokeWidth || 0;
  const strokeColor =
    props.strokeColor || (strokeWidth ? 'gray' : 'transparent');

  const showText = props.showText || false;
  const textColor = props.textColor || '';
  const textSize = props.textSize ? Math.min(props.textSize, radius / 5) : 16;
  const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
  const labelsPosition = props.labelsPosition
    ? props.labelsPosition
    : donut
    ? 'outward'
    : 'mid';

  const showTextBackground = props.showTextBackground || false;
  const textBackgroundColor = props.textBackgroundColor || 'white';
  const showValuesAsLabels = props.showValuesAsLabels || false;
  const fontStyleList = ['normal', 'italic', 'oblique'];
  const fontWeightList = [
    'normal',
    'bold',
    'bolder',
    'lighter',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ];

  const colors = [
    'cyan',
    'green',
    'orange',
    'purple',
    'yellow',
    'red',
    'blue',
    'pink',
  ];
  let isDataShifted = false;
  data.forEach((item: any) => {
    total += item.value;
    if (item.shiftX || item.shiftY) {
      isDataShifted = true;
    }
  });

  if (semiCircle) {
    pi = Math.PI / 2;
  }

  let cx = radius,
    cy = radius;

  let total = data.map(item => item.value).reduce((v, a) => v + a);
  console.log('total ------->', total);
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
  // mData = [0, ...mData];
  console.log('pdata----....----....---->>>>', pData);

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          height: canvasHeight,
          width: canvasWidth,
        },
        isThreeD && {transform: [{rotateX: '55deg'}]},
      ]}>
      <Svg>
        {isThreeD && shadow && !semiCircle && (
          <Circle
            cx={cx}
            cy={shadowWidth}
            r={radius}
            stroke={shadowColor}
            strokeWidth="1.5"
            fill={shadowColor}
          />
        )}
        {data.map((item, index) => {
          console.log('index', index);
          let nextItem;
          if (index === pData.length - 1) nextItem = pData[0];
          else nextItem = pData[index + 1];
          let sx = cx * (1 + Math.sin(2 * pi * pData[index] + initialAngle));
          let sy = cy * (1 - Math.cos(2 * pi * pData[index] + initialAngle));
          let ax = cx * (1 + Math.sin(2 * pi * nextItem + initialAngle));
          let ay = cy * (1 - Math.cos(2 * pi * nextItem + initialAngle));

          // console.log('sx', sx);
          // console.log('sy', sy);
          // console.log('ax', ax);
          // console.log('ay', ay);
          return (
            <Path
              d={`M ${cx} ${cy} L ${sx} ${sy} A ${radius} ${radius} 0 ${
                semiCircle ? 0 : data[index].value > total / 2 ? 1 : 0
              } 1 ${ax} ${ay} L ${cx} ${cy}`}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill={item.color || colors[index % 9]}
            />
          );
        })}

        {showText &&
          data.map((item, index) => {
            console.log('index', index);

            let mx = cx * (1 + Math.sin(2 * pi * mData[index] + initialAngle));
            let my = cy * (1 - Math.cos(2 * pi * mData[index] + initialAngle));

            let midx = (mx + cx) / 2;
            let midy = (my + cy) / 2;

            let x = midx,
              y = midy;

            if (labelsPosition === 'outward') {
              x = (midx + mx) / 2;
              y = (midy + my) / 2;
            } else if (labelsPosition === 'inward') {
              x = (midx + cx) / 2;
              y = (midy + cy) / 2;
            }

            // console.log('sx', sx);
            // console.log('sy', sy);
            // console.log('ax', ax);
            // console.log('ay', ay);
            return (
              <>
                {/* <Line x1={mx} x2={cx} y1={my} y2={cy} stroke="black" /> */}
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
                />
                <CanvasText
                  fill={item.textColor || textColor || colors[(index + 2) % 9]}
                  fontSize={item.textSize || textSize}
                  fontFamily={item.font || props.font}
                  fontWeight={item.fontWeight || props.fontWeight}
                  x={x + (item.shiftTextX || 0) - (item.textSize || textSize)/1.8}
                  y={y + (item.shiftTextY || 0)}>
                  {item.text || (showValuesAsLabels ? item.value + '' : '')}
                </CanvasText>
              </>
            );
          })}
      </Svg>
      {(props.centerLabelComponent || (donut && !isDataShifted)) && (
        <View
          style={[
            {
              height: innerRadius * 2,
              width: innerRadius * 2,
              borderRadius: innerRadius,
              position: 'absolute',
              zIndex: 100,
              alignSelf: 'center',
              backgroundColor: innerCircleColor,
              left: canvasWidth / 2 - innerRadius + shiftInnerCenterX,
              top:
                canvasHeight / 2 -
                innerRadius +
                shiftInnerCenterY -
                (isThreeD ? radius / 5 : 0),
              borderWidth: innerCircleBorderWidth,
              borderColor: innerCircleBorderColor,
              justifyContent: 'center',
              alignItems: 'center',
            },
            isThreeD && {
              borderTopWidth: innerCircleBorderWidth * 5,
              borderLeftWidth: shiftInnerCenterX
                ? innerCircleBorderWidth * 2
                : innerCircleBorderWidth,
            },
            semiCircle && {
              borderTopWidth: isThreeD
                ? innerCircleBorderWidth * 5
                : innerCircleBorderWidth,
              borderLeftWidth: 0.5,
              borderLeftColor: innerCircleColor,
              borderBottomWidth: 0,
              borderRightWidth: 0.5,
              borderRightColor: innerCircleColor,
            },
          ]}>
          {props.centerLabelComponent ? props.centerLabelComponent() : null}
        </View>
      )}
    </View>
  );
};
