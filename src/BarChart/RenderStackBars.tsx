import {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, Animated} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import LinearGradient from '../Components/common/LinearGradient';
import {
  useRenderStackBars,
  BarDefaults,
  StackedBarChartPropsType,
} from 'gifted-charts-core';
import Tooltip from '../Components/BarSpecificComponents/tooltip';

const RenderStackBars = (props: StackedBarChartPropsType) => {
  const {
    barBackgroundPattern,
    patternId,
    stackData,
    item,
    index,
    containerHeight,
    spacing,
    rotateLabel,
    label,
    labelTextStyle,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    renderTooltip,
    selectedIndex,
    setSelectedIndex,
    activeOpacity,
    animationDuration = BarDefaults.animationDuration,
    barBorderWidth,
    barBorderColor,
    stackBorderRadius,
    stackBorderTopLeftRadius,
    stackBorderTopRightRadius,
    stackBorderBottomLeftRadius,
    stackBorderBottomRightRadius,
    showValuesAsTopLabel,
    autoShiftLabelsForNegativeStacks = true,
    labelsDistanceFromXaxis = 0,
    horizontal,
    secondaryStepHeight,
    secondaryStepValue,
    secondaryNegativeStepHeight,
    secondaryNegativeStepValue,
    barMarginBottom,
    highlightEnabled,
    highlightedBarIndex,
    lowlightOpacity,
    stackHighlightEnabled,
    selectedStackIndex,
    setSelectedStackIndex,
  } = props;
  const {
    containsNegativeValue,
    noAnimation,
    localBarInnerComponent,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    disablePress,
    totalHeight,
    height,
    setHeight,
    getBarHeight,
    getPosition,
    lowestBarPosition,
    getStackBorderRadii,
    tooltipProps,
  } = useRenderStackBars({
    ...props,
    secondaryStepHeight,
    secondaryStepValue,
    secondaryNegativeStepHeight,
    secondaryNegativeStepValue,
  });

  const renderLabel = (label: string, labelTextStyle: any) => {
    return (
      <TouchableOpacity
        disabled={disablePress || (stackHighlightEnabled && !highlightEnabled)}
        activeOpacity={activeOpacity}
        onPress={() => {
          setSelectedIndex(index);
          if (item.onPress) {
            item.onPress();
          } else if (props.onPress) {
            props.onPress(item, index);
          }
        }}
        onLongPress={() => {
          if (item.onLongPress) {
            item.onLongPress();
          } else if (props.onLongPress) {
            props.onLongPress(item, index);
          }
        }}
        onPressOut={() => {
          if (item.onPressOut) {
            item.onPressOut();
          } else if (props.onPressOut) {
            props.onPressOut(item, index);
          }
        }}
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.stacks[0].barWidth ||
                props.barWidth ||
                30) +
              spacing / 2,
            position: 'absolute',
            bottom:
              !labelsDistanceFromXaxis && autoShiftLabelsForNegativeStacks
                ? containsNegativeValue
                  ? -0
                  : -6 - xAxisTextNumberOfLines * 18
                : -labelsDistanceFromXaxis - 6 - xAxisTextNumberOfLines * 18,
          },
          rotateLabel
            ? horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {transform: [{rotate: '60deg'}]}
            : horizontal
              ? {transform: [{rotate: '-90deg'}]}
              : {},
        ]}>
        {item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text style={[labelTextStyle]} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const elevate = () => {
    Animated.timing(animatedHeight, {
      toValue: totalHeight,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (!noAnimation) {
      elevate();
    }
  }, []);

  const static2DSimple = () => {
    let remainingBarMarginBottom = barMarginBottom;
    return (
      <>
        <TouchableOpacity
          disabled={
            disablePress || (stackHighlightEnabled && !highlightEnabled)
          }
          activeOpacity={activeOpacity}
          onPress={() => {
            setSelectedIndex(index);
            if (item.onPress) {
              item.onPress();
            } else if (props.onPress) {
              props.onPress(item, index);
            }
          }}
          onLongPress={() => {
            if (item.onLongPress) {
              item.onLongPress();
            } else if (props.onLongPress) {
              props.onLongPress(item, index);
            }
          }}
          onPressOut={() => {
            if (item.onPressOut) {
              item.onPressOut();
            } else if (props.onPressOut) {
              props.onPressOut(item, index);
            }
          }}
          style={[
            {
              position: 'absolute',
              width: item.stacks[0].barWidth || props.barWidth || 30,
              height: '100%',
              borderTopLeftRadius:
                borderTopLeftRadius ??
                borderRadius ??
                stackBorderTopLeftRadius ??
                stackBorderRadius,
              borderTopRightRadius:
                borderTopRightRadius ??
                borderRadius ??
                stackBorderTopRightRadius ??
                stackBorderRadius,
              borderBottomLeftRadius:
                borderBottomLeftRadius ??
                borderRadius ??
                stackBorderBottomLeftRadius ??
                stackBorderRadius,
              borderBottomRightRadius:
                borderBottomRightRadius ??
                borderRadius ??
                stackBorderBottomRightRadius ??
                stackBorderRadius,
              overflow: lowestBarPosition ? 'visible' : 'hidden',
              // bottom: barMarginBottom
            },
          ]}>
          {item.stacks.map((stackItem, index) => {
            const borderRadii = getStackBorderRadii(item, index);

            // compute marginBottom here

            let barHeight = getBarHeight(stackItem.value, 0);

            const marginBottom = Math.max(
              stackItem.marginBottom ?? 0,
              remainingBarMarginBottom,
            );
            const deductedMargin = Math.min(barHeight, marginBottom);

            remainingBarMarginBottom = Math.max(
              0,
              remainingBarMarginBottom - deductedMargin,
            );

            barHeight -= deductedMargin;

            return (
              <TouchableOpacity
                key={index}
                onPress={(e: any) => {
                  if (stackHighlightEnabled) {
                    setSelectedStackIndex(index);
                  }
                  stackItem.onPress?.(e);
                }}
                activeOpacity={activeOpacity}
                disabled={
                  disablePress ||
                  highlightEnabled ||
                  (!stackHighlightEnabled && !stackItem.onPress)
                }
                style={{
                  opacity: stackHighlightEnabled
                    ? selectedStackIndex === index || selectedStackIndex === -1
                      ? 1
                      : lowlightOpacity
                    : 1,
                  position: 'absolute',
                  bottom: getPosition(index, barHeight) + deductedMargin,
                  width: '100%',
                  height: barHeight,
                  backgroundColor:
                    stackItem.color || item.color || props.color || 'black',
                  borderWidth: barBorderWidth ?? 0,
                  borderColor: barBorderColor,
                  ...borderRadii,
                }}>
                {stackItem.showGradient ||
                item.showGradient ||
                props.showGradient ? (
                  <LinearGradient
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      ...borderRadii,
                    }}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={[
                      stackItem.gradientColor ||
                        item.gradientColor ||
                        props.gradientColor ||
                        'white',
                      stackItem.color || item.color || props.color || 'black',
                    ]}
                  />
                ) : null}
                {stackItem.innerBarComponent && stackItem.innerBarComponent()}
              </TouchableOpacity>
            );
          })}
          {(item.barBackgroundPattern || barBackgroundPattern) && (
            <Svg>
              <Defs>
                {item.barBackgroundPattern
                  ? item.barBackgroundPattern()
                  : barBackgroundPattern?.()}
              </Defs>
              <Rect
                stroke="none"
                x="0"
                y="0"
                width="100%"
                height={totalHeight}
                fill={`url(#${item.patternId || patternId})`}
              />
            </Svg>
          )}
        </TouchableOpacity>
        {localBarInnerComponent ? (
          <View style={{height: '100%', width: '100%'}}>
            {localBarInnerComponent(item, index)}
          </View>
        ) : null}
        {(item.topLabelComponent || showValuesAsTopLabel) && (
          <View
            style={[
              {
                position: 'absolute',
                top: containsNegativeValue
                  ? 0
                  : (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent: 'center',
                alignItems: 'center',
              },
              containsNegativeValue && {
                transform: [{translateY: totalHeight * 2}],
              },
              horizontal &&
                !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
              item.topLabelContainerStyle,
            ]}>
            {showValuesAsTopLabel ? (
              <Text style={item.topLabelTextStyle ?? props.topLabelTextStyle}>
                {stackData[index].stacks.reduce(
                  (acc, stack) => acc + stack.value,
                  0,
                )}
              </Text>
            ) : (
              item.topLabelComponent?.()
            )}
          </View>
        )}
      </>
    );
  };

  const barWrapper = () => {
    return noAnimation ? (
      static2DSimple()
    ) : (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          height: animatedHeight,
          width: '100%',
        }}>
        {static2DSimple()}
      </Animated.View>
    );
  };

  return (
    <>
      <View
        pointerEvents={
          props.pointerConfig
            ? (props.pointerConfig.pointerEvents ?? 'none')
            : 'auto'
        }
        style={[
          {
            // overflow: 'visible',
            opacity: highlightEnabled
              ? highlightedBarIndex === -1
                ? 1
                : highlightedBarIndex === index
                  ? 1
                  : lowlightOpacity
              : 1,
            marginBottom: 60 + xAxisLabelsVerticalShift,
            width: item.stacks[0].barWidth || props.barWidth || 30,
            height: totalHeight,
            marginRight: spacing,
            transform: [
              {
                translateY:
                  (containerHeight || 200) -
                  (totalHeight - 10 + xAxisLabelsVerticalShift),
              },
            ],
          },
        ]}>
        {(props.showXAxisIndices || item.showXAxisIndex) && (
          <View
            style={{
              zIndex: 2,
              position: 'absolute',
              height: props.xAxisIndicesHeight,
              width: props.xAxisIndicesWidth,
              bottom: props.xAxisIndicesHeight / -2,
              left:
                ((item.barWidth || props.barWidth || 30) -
                  props.xAxisIndicesWidth) /
                2,
              backgroundColor: props.xAxisIndicesColor,
            }}
          />
        )}
        {barWrapper()}
        {renderLabel(label || '', labelTextStyle)}
      </View>
      {renderTooltip && selectedIndex === index && (
        <Tooltip {...tooltipProps} />
      )}
    </>
  );
};

export default RenderStackBars;
