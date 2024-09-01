import {View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {
  StripAndLabelProps,
  getTopAndLeftForStripAndLabel,
} from 'gifted-charts-core';

export const StripAndLabel = (props: StripAndLabelProps) => {
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
    pointerItemsForSet,
    secondaryPointerItemsForSet,
    pointerEvents,
    isBarChart,
    pointerIndex,
    hasDataSet,
    containsNegative,
  } = props;

  const {top, left} = getTopAndLeftForStripAndLabel(props);

  if (isNaN(top) || typeof top !== 'number') return null;

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
            top: containsNegative
              ? 0
              : pointerStripUptoDataPoint
                ? pointerRadius || pointerStripHeight / 2
                : -pointerYLocal + 8,
            width: pointerStripWidth,
            height: pointerStripUptoDataPoint
              ? containerHeight - pointerYLocal + 10 - xAxisThickness
              : pointerStripHeight + (containsNegative ? 10 : 0),
            marginTop: pointerStripUptoDataPoint
              ? 0
              : containsNegative
                ? -pointerYLocal
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
                  ? containerHeight - pointerYLocal + 10 - xAxisThickness
                  : pointerStripHeight + 10
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
          {pointerLabelComponent?.(
            hasDataSet ? pointerItemsForSet : pointerItemLocal,
            hasDataSet ? secondaryPointerItemsForSet : [secondaryPointerItem],
            pointerIndex,
          )}
        </View>
      ) : null}
    </View>
  );
};
