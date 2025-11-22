import {TooltipProps} from 'gifted-charts-core/dist/utils/types';
import {useState} from 'react';
import {View} from 'react-native';

const Tooltip = (props: TooltipProps) => {
  const {
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
    bottom,
  } = props;

  const [leftShiftTooltipForCentering, setLeftShiftTooltipForCentering] =
    useState(0);

  return (
    <View
      style={{
        position: 'absolute',
        bottom,
        left:
          leftSpacing -
          (isLast ? leftShiftForLastIndexTooltip : leftShiftForTooltip) -
          leftShiftTooltipForCentering,
        zIndex: 300000,
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
