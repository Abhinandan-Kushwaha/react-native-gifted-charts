import React from 'react';
import {View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {getTopAndLeftForStripAndLabel} from 'gifted-charts-core';

export const StripAndLabel = (props: {
  autoAdjustPointerLabelPosition?: boolean | undefined;
  pointerX: any;
  pointerLabelWidth: any;
  activatePointersOnLongPress?: boolean | undefined;
  yAxisLabelWidth?: number;
  pointerRadius: any;
  pointerWidth: any;
  shiftPointerLabelX?: number;
  pointerLabelHeight?: number;
  pointerYLocal: any;
  pointerStripUptoDataPoint: any;
  pointerStripHeight: any;
  shiftPointerLabelY?: number;
  pointerItemLocal?: any;
  showPointerStrip?: any;
  pointerStripWidth?: any;
  containerHeight?: any;
  xAxisThickness?: any;
  pointerStripColor?: any;
  pointerConfig?: any;
  pointerLabelComponent?: any;
  scrollX?: number;
  pointerEvents?: any;
  isBarChart?: any;
  secondaryPointerItem?: any;
  width?: number | undefined;
}) => {
  const {
    pointerX,
    pointerLabelWidth,
    pointerRadius,
    pointerWidth,
    pointerYLocal,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    pointerItemLocal,
    showPointerStrip,
    pointerStripWidth,
    containerHeight,
    xAxisThickness,
    pointerStripColor,
    pointerConfig,
    pointerLabelComponent,
    secondaryPointerItem,
    pointerEvents,
    isBarChart,
  } = props;

  const {top, left} = getTopAndLeftForStripAndLabel(props);

  return (
    <View
      style={{
        position: 'absolute',
        left: pointerX + (pointerItemLocal[0]?.pointerShiftX || 0),
        top: pointerYLocal,
      }}>
      {(
        isBarChart
          ? showPointerStrip && !pointerLabelComponent
          : showPointerStrip
      ) ? (
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
      ) : null}

      {pointerLabelComponent ? (
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
          {pointerLabelComponent?.(pointerItemLocal, secondaryPointerItem)}
        </View>
      ) : null}
    </View>
  );
};
