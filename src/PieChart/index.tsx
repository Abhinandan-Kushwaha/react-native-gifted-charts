import {View, Text, TextStyle} from 'react-native';
import {PieChartMain} from './main';
import {PieChartPropsType, usePieChart} from 'gifted-charts-core';
import {isWebApp} from '../utils';
import {useState} from 'react';

export const PieChart = (props: PieChartPropsType) => {
  const {
    radius,
    extraRadius,
    selectedIndex,
    setSelectedIndex,
    startAngle,
    total,
    donut,
    isThreeD,
    semiCircle,
    inwardExtraLengthForFocused,
    canvasWidth,
    canvasHeight,
    innerRadius,
    innerCircleColor,
    innerCircleBorderWidth,
    innerCircleBorderColor,
    shiftInnerCenterX,
    shiftInnerCenterY,
    tiltAngle,
    isDataShifted,
    paddingHorizontal,
    paddingVertical,
    data,
    showTooltip,
    tooltipHorizontalShift,
    tooltipVerticalShift,
    tooltipComponent,
    getTooltipText,
    tooltipBackgroundColor,
    tooltipBorderRadius,
    tooltipWidth,
    tooltipTextNoOfLines,
    textColor,
    textSize,
    font,
    fontWeight,
    fontStyle,
    tooltipSelectedIndex,
    setTooltipSelectedIndex,
  } = usePieChart(props);

  const [touchX, setTouchX] = useState(0);
  const [touchY, setTouchY] = useState(0);

  const renderInnerCircle = (
    innerRadius: number,
    innerCircleBorderWidth: number,
  ) => {
    if (props.centerLabelComponent || (donut && !isDataShifted)) {
      return (
        <View
          style={[
            {
              height: innerRadius * 2,
              width: innerRadius * 2,
              borderRadius: innerRadius,
              position: 'absolute',
              // zIndex: 100,
              alignSelf: 'center',
              backgroundColor: innerCircleColor,
              left:
                canvasWidth / 2 -
                innerRadius +
                shiftInnerCenterX +
                extraRadius +
                paddingHorizontal / 2,
              top:
                canvasHeight / 2 -
                innerRadius +
                shiftInnerCenterY +
                extraRadius +
                paddingVertical / 2,
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
              transform: [{rotateX: tiltAngle}],
            },
            semiCircle &&
              isThreeD && {
                borderTopWidth: isThreeD
                  ? innerCircleBorderWidth * 5
                  : innerCircleBorderWidth,
                borderLeftWidth: 0.5,
                borderLeftColor: innerCircleColor,
                borderBottomWidth: 0,
                borderRightWidth: 0.5,
                borderRightColor: innerCircleColor,
              },
          ]}
          pointerEvents="box-none">
          <View style={{marginTop: semiCircle ? -0.5 * innerRadius : 0}}>
            {props.centerLabelComponent?.(selectedIndex) ?? null}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderTooltip = () => {
    return (
      <View
        style={{
          position: 'absolute',
          left:
            touchX > (radius + extraRadius) * 1.5
              ? props.tooltipHorizontalShift
                ? touchX - tooltipHorizontalShift
                : touchX -
                  (tooltipWidth ??
                    getTooltipText(tooltipSelectedIndex).length * 10)
              : touchX - tooltipHorizontalShift,
          top:
            touchY < 30
              ? props.tooltipVerticalShift
                ? touchY - tooltipVerticalShift
                : touchY
              : touchY - tooltipVerticalShift,
        }}>
        {data[tooltipSelectedIndex].tooltipComponent ? (
          data[tooltipSelectedIndex].tooltipComponent?.()
        ) : tooltipComponent ? (
          tooltipComponent(tooltipSelectedIndex)
        ) : (
          <View
            style={{
              backgroundColor: tooltipBackgroundColor,
              borderRadius: tooltipBorderRadius,
              paddingHorizontal: 8,
              paddingBottom: 8,
              paddingTop: 4,
              width: tooltipWidth,
            }}>
            <Text
              numberOfLines={tooltipTextNoOfLines}
              style={
                {
                  color:
                    data[tooltipSelectedIndex].textColor ||
                    textColor ||
                    'white',
                  textAlign: 'center',
                  fontSize: textSize,
                  fontFamily: font,
                  fontWeight,
                  fontStyle,
                } as TextStyle
              }>
              {getTooltipText(tooltipSelectedIndex)}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // if (!total) return null;

  return (
    <View
      style={{
        height:
          (radius + extraRadius + paddingVertical / 2) *
          (props.semiCircle ? 1 : 2),
        width: (radius + extraRadius + paddingHorizontal / 2) * 2,
        overflow: 'hidden',
      }}>
      <View style={{position: 'absolute'}}>
        <PieChartMain
          {...props}
          setTouchX={setTouchX}
          setTouchY={setTouchY}
          tooltipSelectedIndex={tooltipSelectedIndex}
          setTooltipSelectedIndex={setTooltipSelectedIndex}
          setSelectedIndex={setSelectedIndex}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
          extraRadius={extraRadius}
        />
      </View>
      {renderInnerCircle(innerRadius, innerCircleBorderWidth)}
      {props.data.length > 1 &&
        props.data[selectedIndex] && // don't forget to add this one so there are no errors when the data is empty / updating
        (props.focusOnPress || props.sectionAutoFocus) &&
        selectedIndex !== -1 && (
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              top: -extraRadius,
              left: -extraRadius,
              zIndex: isWebApp ? -1 : 0, // was not getting displayed in web (using Expo)
            }}>
            <PieChartMain
              {...props}
              setTouchX={setTouchX}
              setTouchY={setTouchY}
              tooltipSelectedIndex={tooltipSelectedIndex}
              setTooltipSelectedIndex={setTooltipSelectedIndex}
              data={[
                {
                  ...props.data[selectedIndex],
                },
                {
                  value: total - props.data[selectedIndex].value,
                  peripheral: true,
                  strokeWidth: 0,
                },
              ]}
              radius={radius + extraRadius}
              initialAngle={startAngle}
              innerRadius={props.innerRadius || radius / 2.5}
              isBiggerPie
              setSelectedIndex={setSelectedIndex}
              paddingHorizontal={paddingHorizontal}
              paddingVertical={paddingVertical}
              extraRadius={extraRadius}
            />
          </View>
        )}
      {renderInnerCircle(
        innerRadius - inwardExtraLengthForFocused,
        inwardExtraLengthForFocused ? 0 : innerCircleBorderWidth,
      )}
      {showTooltip && tooltipSelectedIndex !== -1 ? renderTooltip() : null}
    </View>
  );
};
