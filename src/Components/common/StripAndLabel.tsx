import React from 'react';
import {View, Dimensions} from 'react-native';
import Svg, {Line} from 'react-native-svg';

export const StripAndLabel = props => {
  const {
    autoAdjustPointerLabelPosition,
    pointerX,
    pointerLabelWidth,
    activatePointersOnLongPress,
    yAxisLabelWidth,
    pointerRadius,
    pointerWidth,
    shiftPointerLabelX,
    pointerLabelHeight,
    pointerYLocal,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    shiftPointerLabelY,
    pointerItemLocal,
    showPointerStrip,
    pointerStripWidth,
    containerHeight,
    xAxisThickness,
    pointerStripColor,
    pointerConfig,
    pointerLabelComponent,
    secondaryPointerItem,
    scrollX,
    pointerEvents,
  } = props;
  let left = 0,
    top = 0;
  if (autoAdjustPointerLabelPosition) {
    if (pointerX < pointerLabelWidth / 2) {
      left = 7;
    } else if (
      activatePointersOnLongPress &&
      pointerX - scrollX < pointerLabelWidth / 2 - 10
    ) {
      left = 7;
    } else {
      if (
        !activatePointersOnLongPress &&
        pointerX >
          (props.width ||
            Dimensions.get('window').width - yAxisLabelWidth - 15) -
            pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4;
      } else if (
        activatePointersOnLongPress &&
        pointerX - scrollX >
          ((props.width ?? 0) + 10 ||
            Dimensions.get('window').width - yAxisLabelWidth - 15) -
            pointerLabelWidth / 2
      ) {
        left = -pointerLabelWidth - 4;
      } else {
        left = -pointerLabelWidth / 2 + 5;
      }
    }
  } else {
    left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX;
  }

  if (autoAdjustPointerLabelPosition) {
    if (pointerLabelHeight - pointerYLocal > 10) {
      top = 10;
    } else {
      top = -pointerLabelHeight;
    }
  } else {
    top =
      (pointerStripUptoDataPoint
        ? pointerRadius || pointerStripHeight / 2
        : -pointerYLocal + 8) -
      pointerLabelWidth / 2 +
      shiftPointerLabelY;
  }

  return (
    <View
      style={{
        position: 'absolute',
        left: pointerX + (pointerItemLocal[0].pointerShiftX || 0),
        top: pointerYLocal,
      }}>
      {showPointerStrip && (
        <View
          style={{
            position: 'absolute',
            left: (pointerRadius || pointerWidth) - pointerStripWidth / 4,
            top: pointerStripUptoDataPoint
              ? pointerRadius || pointerStripHeight / 2
              : -pointerYLocal + 8,
            width: pointerStripWidth,
            height: pointerStripUptoDataPoint
              ? containerHeight - pointerYLocal + 5 - xAxisThickness
              : pointerStripHeight,
            marginTop: pointerStripUptoDataPoint
              ? 0
              : containerHeight - pointerStripHeight,
          }}>
          <Svg>
            <Line
              stroke={pointerStripColor}
              strokeWidth={pointerStripWidth}
              strokeDasharray={
                pointerConfig?.strokeDashArray
                  ? pointerConfig?.strokeDashArray
                  : ''
              }
              x1={0}
              y1={0}
              x2={0}
              y2={
                pointerStripUptoDataPoint
                  ? containerHeight - pointerYLocal + 5 - xAxisThickness
                  : pointerStripHeight
              }
            />
          </Svg>
        </View>
      )}

      {pointerLabelComponent && (
        <View
          pointerEvents={pointerEvents ?? 'none'}
          style={[
            {
              position: 'absolute',
              left: left,
              top: top,
              marginTop: pointerStripUptoDataPoint
                ? 0
                : containerHeight - pointerStripHeight,
              width: pointerLabelWidth,
            },
          ]}>
          {pointerLabelComponent(pointerItemLocal, secondaryPointerItem)}
        </View>
      )}
    </View>
  );
};
