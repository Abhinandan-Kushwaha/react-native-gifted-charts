import React, {useEffect, useState} from 'react';
import {ColorValue, View} from 'react-native';
import Canvas from 'react-native-canvas';

const pi = Math.PI;

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

  showText?: Boolean;
  textColor?: string;
  textSize?: number;
  showTextBackground?: Boolean;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
  showValuesAsLabels?: Boolean;

  centerLabelComponent?: Function;
};
type itemType = {
  value: number;
  shiftX?: number;
  shiftY?: number;
  color?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  textBackgroundColor?: string;
  textBackgroundRadius?: number;
};
export const PieChart = (props: propTypes) => {
  const {data, isThreeD} = props;
  const radius = props.radius || 120;
  const shadowWidth = props.shadowWidth || (4 * radius) / 3;
  const backgroundColor = props.backgroundColor || 'white';
  const shadowColor = props.shadowColor || 'lightgray';
  let total = 0;
  const shadow = props.shadow || false;
  const donut = props.donut || false;
  const innerRadius = props.innerRadius || radius / 2;
  const innerCircleColor = props.innerCircleColor || 'white';
  const innerCircleBorderWidth =
    props.innerCircleBorderWidth || (props.innerCircleBorderColor ? 5 : 0);
  const innerCircleBorderColor = props.innerCircleBorderColor || 'gray';
  const shiftInnerCenterX = props.shiftInnerCenterX || 0;
  const shiftInnerCenterY = props.shiftInnerCenterY || 0;
  const strokeWidth = props.strokeWidth || 0;
  const strokeColor =
    props.strokeColor || (strokeWidth ? 'gray' : 'transparent');

  const showText = props.showText || false;
  const textColor = props.textColor || '';
  const textSize = props.textSize ? Math.min(props.textSize, radius / 5) : 16;

  const showTextBackground = props.showTextBackground || false;
  const showValuesAsLabels = props.showValuesAsLabels || false;

  let isDataShifted = false;
  data.forEach((item: any) => {
    total += item.value;
    if (item.shiftX || item.shiftY) {
      isDataShifted = true;
    }
  });

  const canvasHeight = isThreeD ? radius * 2.5 + 60 : radius * 2 + 60;
  const canvasWidth = radius * 2 + 60;

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisibility(true), 410);
  }, []);

  const handleCanvas = async (canvas: Canvas) => {
    if (!canvas) {
      return null;
    }

    if (isThreeD) {
      canvas.height = canvasHeight;
    } else {
      canvas.height = canvasHeight;
    }
    canvas.width = canvasWidth;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    const initialValue = 30;

    /******************       SHADOW        ***************/
    if (isThreeD && shadow) {
      ctx.beginPath();
      ctx.moveTo(initialValue, radius + initialValue);
      ctx.lineTo(initialValue, shadowWidth + initialValue);
      ctx.arc(
        radius + initialValue,
        shadowWidth + initialValue,
        radius,
        pi,
        0,
        true,
      );
      ctx.lineTo(2 * radius + initialValue, radius + initialValue);
      ctx.fillStyle = shadowColor;
      ctx.fill();
    }
    /******************************************************/

    let i = 0,
      angleSum = 0;
    let colors = [
      'cyan',
      'green',
      'orange',
      'purple',
      'yellow',
      'red',
      'blue',
      'pink',
    ];

    i = 0;
    let semiSum, yy, xx;
    data.forEach(dataItem => {
      if (!dataItem.value) {
        return;
      }
      const shiftX = dataItem.shiftX || 0;
      const shiftY = dataItem.shiftY || 0;

      /****************     This section is to prevent the shadow from         ***************/
      /****************     being visible inside the chart content if          ***************/
      /****************     the color of sections is transparent               ***************/

      if (isThreeD && shadow) {
        ctx.beginPath();

        ctx.moveTo(
          radius + initialValue + shiftX,
          radius + initialValue + shiftY,
        );
        ctx.arc(
          radius + initialValue + shiftX,
          radius + initialValue + shiftY,
          radius,
          angleSum,
          angleSum + (2 * pi * dataItem.value) / total,
        );
        ctx.stroke();
        ctx.lineTo(
          radius + initialValue + shiftX,
          radius + initialValue + shiftY,
        );

        ctx.fillStyle = backgroundColor;
        ctx.fill();
      }

      /*************************************************************************************/
      /*************************************************************************************/

      ctx.beginPath();

      ctx.moveTo(
        radius + initialValue + shiftX,
        radius + initialValue + shiftY,
      );
      ctx.arc(
        radius + initialValue + shiftX,
        radius + initialValue + shiftY,
        radius,
        angleSum,
        angleSum + (2 * pi * dataItem.value) / total,
      );
      ctx.stroke();
      ctx.lineTo(
        radius + initialValue + shiftX,
        radius + initialValue + shiftY,
      );

      ctx.fillStyle = dataItem.color || colors[i++ % 8];
      ctx.fill();

      /*************************        Displaying Text Labels      **********************/

      if (showText) {
        let fontSize;
        if (props.textSize) {
          fontSize = Math.min(props.textSize, radius / 5);
        } else if (dataItem.textSize) {
          fontSize = Math.min(dataItem.textSize, radius / 5);
        } else {
          fontSize = 16;
        }
        ctx.font = fontSize + 'px Comic Sans MS';
        semiSum = angleSum + (pi * dataItem.value) / total;
        yy = Math.sin(semiSum) * radius + (radius + initialValue + shiftX);
        xx = Math.cos(semiSum) * radius + (radius + initialValue + shiftY);

        // console.log('semisum==>>', semiSum);
        // console.log('sin(semisum)==>>', Math.sin(semiSum));
        if (semiSum > 0 && semiSum <= pi / 2) {
          xx -= 40;
          yy -= 10;
        } else if (semiSum > pi / 2 && semiSum <= pi) {
          xx += 10;
          yy -= 10;
        } else if (semiSum > pi && semiSum <= 1.5 * pi) {
          xx += 10;
          yy += 24;
        } else {
          xx -= 40;
          yy += 24;
        }

        if (showTextBackground && (dataItem.text || showValuesAsLabels)) {
          let textBackgroundX =
            xx +
            (props.textBackgroundRadius ||
              dataItem.textBackgroundRadius ||
              textSize) /
              2;
          let textBackgroundY =
            yy -
            (props.textBackgroundRadius ||
              dataItem.textBackgroundRadius ||
              textSize) /
              3;
          ctx.beginPath();
          ctx.arc(
            textBackgroundX,
            textBackgroundY,
            props.textBackgroundRadius ||
              dataItem.textBackgroundRadius ||
              textSize,
            0,
            2 * pi,
            false,
          );
          ctx.fillStyle =
            props.textBackgroundColor ||
            dataItem.textBackgroundColor ||
            'white';
          ctx.fill();
        }

        ctx.fillStyle = dataItem.textColor || textColor || colors[i++ % 8];
        let labelText = dataItem.text || '';
        if (showValuesAsLabels && !labelText) {
          labelText = dataItem.value.toString();
        }
        ctx.fillText(labelText, xx, yy);
      }

      /****************************************************************************************/

      angleSum += (2 * pi * dataItem.value) / total;
    });
  };

  return (
    <View style={isThreeD && {transform: [{scaleY: 0.5}]}}>
      <Canvas ref={handleCanvas} />
      {visibility && (props.centerLabelComponent || (donut && !isDataShifted)) && (
        <View
          style={[
            {
              height: innerRadius * 2,
              width: innerRadius * 2,
              borderRadius: innerRadius,
              position: 'absolute',
              alignSelf: 'center',
              left: canvasWidth / 2 - innerRadius + shiftInnerCenterX,
              top:
                canvasHeight / 2 -
                innerRadius * (isThreeD ? 1.5 : 1) +
                shiftInnerCenterY,
              borderWidth: innerCircleBorderWidth,
              borderColor: innerCircleBorderColor,
              backgroundColor: innerCircleColor,
              justifyContent: 'center',
              alignItems: 'center',
            },
            isThreeD && {
              borderTopWidth: innerCircleBorderWidth * 5,
              borderLeftWidth: shiftInnerCenterX
                ? innerCircleBorderWidth * 2
                : innerCircleBorderWidth,
            },
          ]}>
          {props.centerLabelComponent ? props.centerLabelComponent() : null}
        </View>
      )}
    </View>
  );
};
