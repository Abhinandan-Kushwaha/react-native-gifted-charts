import React, {useState} from 'react';
import {View} from 'react-native';

interface TooltipProps {
  barHeight: number;
  barWidth: number;
  item: any;
  index: number;
  isLast: boolean;
  leftSpacing: number;
  leftShiftForLastIndexTooltip: number;
  leftShiftForTooltip: number;
  renderTooltip?: Function;
  autoCenterTooltip?: boolean;
  horizontal?: boolean;
}

const Tooltip = (props: TooltipProps) => {
  const {
    barHeight,
    barWidth,
    item,
    index,
    isLast,
    leftSpacing,
    leftShiftForLastIndexTooltip,
    leftShiftForTooltip,
    renderTooltip,
    autoCenterTooltip,
    horizontal,
  } = props;

  const [leftShiftTooltipForCentering, setLeftShiftTooltipForCentering] =
    useState(0);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: barHeight + 60,
        left:
          leftSpacing -
          (isLast ? leftShiftForLastIndexTooltip : leftShiftForTooltip) -
          leftShiftTooltipForCentering,
        zIndex: 1000,
        transform: [{rotate: horizontal ? '-90deg' : '0deg'}],
      }}
      onLayout={event => {
        if (!autoCenterTooltip) return;
        const {width} = event.nativeEvent.layout;
        setLeftShiftTooltipForCentering((width - barWidth) / 2);
      }}>
      {renderTooltip?.(item, index)}
    </View>
  );
};

export default Tooltip;
