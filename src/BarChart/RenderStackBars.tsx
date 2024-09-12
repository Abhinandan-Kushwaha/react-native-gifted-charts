import {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import LinearGradient from '../Components/common/LinearGradient';
import {
  useRenderStackBars,
  BarDefaults,
  StackedBarChartPropsType,
} from 'gifted-charts-core';
import Tooltip from '../Components/BarSpecificComponents/tooltip';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RenderStackBars = (props: StackedBarChartPropsType) => {
  const {
    barBackgroundPattern,
    patternId,
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
      <View
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
            bottom: autoShiftLabelsForNegativeStacks
              ? -6 - xAxisTextNumberOfLines * 18 + lowestBarPosition
              : -labelsDistanceFromXaxis,
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
      </View>
    );
  };

  useEffect(() => {
    if (!noAnimation) {
      layoutAppear();
    }
  }, [totalHeight]);

  const elevate = () => {
    LayoutAnimation.configureNext({
      duration: animationDuration,
      update: {type: 'linear', property: 'scaleXY'},
    });
    setHeight(totalHeight);
  };

  const layoutAppear = () => {
    LayoutAnimation.configureNext({
      duration: Platform.OS == 'ios' ? animationDuration : 20,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', property: 'scaleXY'},
    });
    setTimeout(() => elevate(), Platform.OS == 'ios' ? 10 : 100);
  };

  const static2DSimple = () => {
    return (
      <>
        <TouchableOpacity
          disabled={disablePress}
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
            },
          ]}>
          {item.stacks.map((stackItem, index) => {
            const borderRadii = getStackBorderRadii(item, index);
            const barHeight = getBarHeight(
              stackItem.value,
              stackItem.marginBottom,
            );

            return (
              <TouchableOpacity
                key={index}
                onPress={stackItem.onPress}
                activeOpacity={activeOpacity}
                disabled={disablePress || !stackItem.onPress}
                style={{
                  position: 'absolute',
                  bottom: getPosition(index) + (stackItem.marginBottom || 0),
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
                x="1"
                y="1"
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
                {item.stacks.reduce((acc, stack) => acc + stack.value, 0)}
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: height,
          width: '100%',
        }}>
        {static2DSimple()}
      </View>
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
