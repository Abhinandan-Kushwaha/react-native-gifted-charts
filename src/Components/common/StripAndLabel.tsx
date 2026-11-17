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
    horizontalStripConfig,
    screenWidth,
    width,
  } = props;

  const containerHeightIncludingBelowXAxis = containsNegative
    ? props.containerHeightIncludingBelowXAxis
    : containerHeight;

  const isNegative = pointerItemLocal[0].value < 0;

  const {top, left} = getTopAndLeftForStripAndLabel(props);

  if (isNaN(top) || typeof top !== 'number') return null;

  return (
    <View
      style={{
        position: 'absolute',
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
            left: -pointerStripWidth / 4,
            top: -pointerYLocal + 8 + xAxisThickness,
            width,
            height: containerHeightIncludingBelowXAxis,
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
              x1={
                pointerX +
                pointerRadius +
                2 -
                pointerStripWidth / 2 +
                (pointerItemLocal[0]?.pointerShiftX || 0)
              }
              y1={
                pointerStripUptoDataPoint
                  ? isNegative
                    ? containerHeight
                    : pointerYLocal + pointerRadius - 4
                  : 0
              }
              x2={
                pointerX +
                pointerRadius +
                2 -
                pointerStripWidth / 2 +
                (pointerItemLocal[0]?.pointerShiftX || 0)
              }
              y2={
                pointerStripUptoDataPoint
                  ? isNegative
                    ? pointerYLocal + pointerRadius - 4
                    : containerHeight
                  : containerHeightIncludingBelowXAxis
              }
            />
            {horizontalStripConfig && (
              <Line
                stroke={horizontalStripConfig.color ?? pointerStripColor}
                strokeWidth={
                  horizontalStripConfig.thickness ?? pointerStripWidth
                }
                strokeDasharray={
                  (pointerConfig?.horizontalStripConfig?.strokeDashArray ??
                  pointerConfig?.strokeDashArray)
                    ? pointerConfig?.strokeDashArray
                    : ''
                }
                x1={0}
                y1={pointerYLocal - 7}
                x2={
                  horizontalStripConfig.horizontalStripUptoDataPoint
                    ? pointerX + 2
                    : screenWidth
                }
                y2={pointerYLocal - 7}
              />
            )}
          </Svg>
          {horizontalStripConfig?.labelComponent ? (
            <View
              pointerEvents={pointerEvents ?? 'none'}
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  top:
                    pointerYLocal -
                    3 -
                    (horizontalStripConfig.labelComponentHeight ?? 30) / 2,
                  width: pointerLabelWidth,
                },
              ]}>
              {horizontalStripConfig?.labelComponent?.(
                hasDataSet ? pointerItemsForSet : pointerItemLocal,
                hasDataSet
                  ? secondaryPointerItemsForSet
                  : [secondaryPointerItem],
                pointerIndex,
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      {pointerLabelComponent ? (
        <View
          pointerEvents={pointerEvents ?? 'none'}
          style={[
            {
              position: 'absolute',
              left: left + pointerX,
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
