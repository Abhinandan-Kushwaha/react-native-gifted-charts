import React from 'react';
import {ColorValue, View} from 'react-native';
import Canvas from 'react-native-canvas';

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
export const PieChart = (props: propTypes) => {
  const {data, isThreeD} = props;
  const radius = props.radius || 120;
  const shadowWidth = props.shadowWidth || (4 * radius) / 3;
  const backgroundColor = props.backgroundColor || 'white';
  const shadowColor = props.shadowColor || 'lightgray';
  let total = 0;
  let pi = Math.PI;
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
  const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;

  const showTextBackground = props.showTextBackground || false;
  const showValuesAsLabels = props.showValuesAsLabels || false;
  const semiCircle = props.semiCircle || false;
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
  const initialAngle = props.initialAngle || 0;

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

  const canvasHeight = isThreeD ? radius * 2.5 + 60 : radius * 2 + 60;
  const canvasWidth = radius * 2 + 60;

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
    if (!semiCircle && isThreeD && shadow) {
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
      angleSum = initialAngle;
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
    data.forEach((dataItem, index) => {
      if (!dataItem.value) {
        return;
      }
      const shiftX = dataItem.shiftX || 0;
      const shiftY = dataItem.shiftY || 0;

      const shiftTextX = dataItem.shiftTextX || 0;
      const shiftTextY = dataItem.shiftTextY || 0;

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

        // Stroke at the end again

        ctx.moveTo(
          radius + initialValue + shiftX,
          radius + initialValue + shiftY,
        );
        ctx.lineTo(
          radius + initialValue + shiftX,
          radius + initialValue + shiftY,
        );
        ctx.stroke();
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

      ctx.fillStyle = dataItem.color || colors[i++ % 9];
      ctx.fill();

      // Stroke at the end again

      ctx.moveTo(
        radius + initialValue + shiftX,
        radius + initialValue + shiftY,
      );
      ctx.lineTo(
        radius + initialValue + shiftX,
        radius + initialValue + shiftY,
      );
      ctx.stroke();

      /*************************        Displaying Text Labels      **********************/

      if (index !== 0 && showText) {
        let fontSize, font;

        /***************        Font size      **************/
        if (dataItem.textSize) {
          fontSize = Math.min(dataItem.textSize, radius / 5);
        } else if (props.textSize) {
          fontSize = Math.min(props.textSize, radius / 5);
        } else {
          fontSize = 16;
        }

        /***************        Font family      **************/
        if (dataItem.font) {
          font = dataItem.font;
        } else if (props.font) {
          font = props.font;
        } else {
          font = 'Comic Sans MS';
        }

        let fontText = fontSize + 'px ' + font;

        /***************        Font weight      **************/
        if (
          dataItem.fontWeight &&
          fontWeightList.includes(dataItem.fontWeight)
        ) {
          fontText = dataItem.fontWeight + ' ' + fontText;
        } else if (
          props.fontWeight &&
          fontWeightList.includes(props.fontWeight)
        ) {
          fontText = props.fontWeight + ' ' + fontText;
        }

        /***************        Font style      **************/
        if (dataItem.fontStyle && fontStyleList.includes(dataItem.fontStyle)) {
          fontText = dataItem.fontStyle + ' ' + fontText;
        } else if (props.fontStyle && fontStyleList.includes(props.fontStyle)) {
          fontText = props.fontStyle + ' ' + fontText;
        }

        ctx.font = fontText;
        semiSum = angleSum + (pi * dataItem.value) / total;
        yy = Math.sin(semiSum) * radius + (radius + initialValue + shiftX);
        xx = Math.cos(semiSum) * radius + (radius + initialValue + shiftY);

        // console.log('semisum==>>', semiSum);
        // console.log('sin(semisum)==>>', Math.sin(semiSum));
        if (semiCircle) {
          if (semiSum > 0 && semiSum <= pi / 2) {
            yy -= 6;
          } else if (semiSum > pi / 2 && semiSum <= pi) {
            yy -= 10;
          } else if (semiSum > pi && semiSum <= 1.5 * pi) {
            xx += 10;
            yy -= 20;
          } else {
            xx += 25;
            yy -= 8;
          }
        } else {
          if (semiSum > 0 && semiSum <= pi / 2) {
            xx -= 20;
          } else if (semiSum > pi && semiSum <= 1.5 * pi) {
            xx += 10;
            yy += 16;
          } else if (semiSum > 1.5 * pi) {
            xx -= 16;
            yy += 16;
          }
        }

        if (showTextBackground && (dataItem.text || showValuesAsLabels)) {
          let textBackgroundX =
            xx -
            (semiCircle ? 18 : 0) +
            (props.textBackgroundRadius ||
              dataItem.textBackgroundRadius ||
              textSize) /
              2;
          let textBackgroundY =
            yy +
            (semiCircle ? 8 : 0) -
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
            2 * Math.PI,
            false,
          );
          ctx.fillStyle =
            props.textBackgroundColor ||
            dataItem.textBackgroundColor ||
            'white';
          ctx.fill();
        }

        xx += shiftTextX;
        yy += shiftTextY;

        ctx.fillStyle = dataItem.textColor || textColor || colors[i++ % 9];
        let labelText = dataItem.text || '';
        if (showValuesAsLabels && !labelText) {
          labelText = dataItem.value.toString();
        }
        if (semiCircle) {
          ctx.translate(xx, yy);
          ctx.rotate(Math.PI);
          ctx.fillText(labelText, 4, 4);
          ctx.rotate(Math.PI);
          ctx.translate(-xx, -yy);
        } else {
          ctx.fillText(labelText, xx, yy);
        }
      }
      /*******************************************************************************************************/

      angleSum += (2 * pi * dataItem.value) / total;
    });

    /**********************************************************************************************************/
    /*******************        Displaying Text Labels for the 1st pie, to avoid overlapping      *************/
    /**********************************************************************************************************/
    if (showText) {
      let dataItem = data[0];
      angleSum = initialAngle;
      const shiftX = dataItem.shiftX || 0;
      const shiftY = dataItem.shiftY || 0;

      const shiftTextX = dataItem.shiftTextX || 0;
      const shiftTextY = dataItem.shiftTextY || 0;
      let fontSize, font;

      /***************        Font size      **************/
      if (dataItem.textSize) {
        fontSize = Math.min(dataItem.textSize, radius / 5);
      } else if (props.textSize) {
        fontSize = Math.min(props.textSize, radius / 5);
      } else {
        fontSize = 16;
      }

      /***************        Font family      **************/
      if (dataItem.font) {
        font = dataItem.font;
      } else if (props.font) {
        font = props.font;
      } else {
        font = 'Comic Sans MS';
      }

      let fontText = fontSize + 'px ' + font;

      /***************        Font weight      **************/
      if (dataItem.fontWeight && fontWeightList.includes(dataItem.fontWeight)) {
        fontText = dataItem.fontWeight + ' ' + fontText;
      } else if (
        props.fontWeight &&
        fontWeightList.includes(props.fontWeight)
      ) {
        fontText = props.fontWeight + ' ' + fontText;
      }

      /***************        Font style      **************/
      if (dataItem.fontStyle && fontStyleList.includes(dataItem.fontStyle)) {
        fontText = dataItem.fontStyle + ' ' + fontText;
      } else if (props.fontStyle && fontStyleList.includes(props.fontStyle)) {
        fontText = props.fontStyle + ' ' + fontText;
      }

      ctx.font = fontText;
      semiSum = angleSum + (pi * dataItem.value) / total;
      yy = Math.sin(semiSum) * radius + (radius + initialValue + shiftX);
      xx = Math.cos(semiSum) * radius + (radius + initialValue + shiftY);

      // console.log('semisum==>>', semiSum);
      // console.log('sin(semisum)==>>', Math.sin(semiSum));
      if (semiCircle) {
        if (semiSum > 0 && semiSum <= pi / 2) {
          yy -= 6;
        } else if (semiSum > pi / 2 && semiSum <= pi) {
          yy -= 10;
        } else if (semiSum > pi && semiSum <= 1.5 * pi) {
          xx += 10;
          yy -= 20;
        } else {
          xx += 25;
          yy -= 8;
        }
      } else {
        if (semiSum > 0 && semiSum <= pi / 2) {
          xx -= 20;
        } else if (semiSum > pi && semiSum <= 1.5 * pi) {
          xx += 10;
          yy += 16;
        } else if (semiSum > 1.5 * pi) {
          xx -= 16;
          yy += 16;
        }
      }

      if (showTextBackground && (dataItem.text || showValuesAsLabels)) {
        let textBackgroundX =
          xx -
          (semiCircle ? 18 : 0) +
          (props.textBackgroundRadius ||
            dataItem.textBackgroundRadius ||
            textSize) /
            2;
        let textBackgroundY =
          yy +
          (semiCircle ? 8 : 0) -
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
          2 * Math.PI,
          false,
        );
        ctx.fillStyle =
          props.textBackgroundColor || dataItem.textBackgroundColor || 'white';
        ctx.fill();
      }

      xx += shiftTextX;
      yy += shiftTextY;

      ctx.fillStyle = dataItem.textColor || textColor || colors[i++ % 9];
      let labelText = dataItem.text || '';
      if (showValuesAsLabels && !labelText) {
        labelText = dataItem.value.toString();
      }
      if (semiCircle) {
        ctx.translate(xx, yy);
        ctx.rotate(Math.PI);
        ctx.fillText(labelText, 4, 4);
        ctx.rotate(Math.PI);
        ctx.translate(-xx, -yy);
      } else {
        ctx.fillText(labelText, xx, yy);
      }
    }

    /*******************************************************************************************************/
  };

  return total === 0 ? null : (
    <View style={{transform: [{scaleY: tilt}]}}>
      <Canvas
        style={semiCircle && {transform: [{rotate: '180deg'}]}}
        ref={handleCanvas}
      />
      {(props.centerLabelComponent || (donut && !isDataShifted)) && (
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
                shiftInnerCenterY +
                (isThreeD && semiCircle ? radius / 2 : 0),
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
