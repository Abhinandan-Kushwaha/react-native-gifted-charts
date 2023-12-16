import React, {Component, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ColorValue,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Defs, Rect} from 'react-native-svg';
import {BarDefaults} from '../utils/constants';
import {stackItemType} from './types';
import {Pointer} from '../utils/types';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  style?: any;
  width?: number;
  height?: number;
  color?: ColorValue;
  topLabelComponent?: Component;
  topLabelContainerStyle?: any;
  opacity?: number;
  label: String;
  labelTextStyle?: any;
  disablePress?: boolean;

  item: stackItemType;
  index: number;
  containerHeight?: number;
  maxValue: number;
  spacing: number;
  propSpacing?: number;
  data?: any;
  barWidth?: number;
  onPress?: Function;

  rotateLabel?: boolean;
  showXAxisIndices: boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;
  horizontal: boolean;
  intactTopLabel: boolean;
  barBorderWidth?: number;
  barBorderColor: ColorValue;
  barBorderRadius?: number;
  barBorderTopLeftRadius?: number;
  barBorderTopRightRadius?: number;
  barBorderBottomLeftRadius?: number;
  barBorderBottomRightRadius?: number;
  stackBorderRadius?: number;
  stackBorderTopLeftRadius?: number;
  stackBorderTopRightRadius?: number;
  stackBorderBottomLeftRadius?: number;
  stackBorderBottomRightRadius?: number;
  xAxisThickness: number;
  barBackgroundPattern?: Function;
  patternId?: String;
  xAxisTextNumberOfLines: number;
  xAxisLabelsHeight?: number;
  xAxisLabelsVerticalShift: number;
  renderTooltip: Function | undefined;
  leftShiftForTooltip?: number;
  leftShiftForLastIndexTooltip: number;
  initialSpacing: number;
  selectedIndex: number;
  setSelectedIndex: Function;
  activeOpacity: number;
  showGradient?: boolean;
  gradientColor?: any;
  stackData: Array<stackItemType>;
  isAnimated?: boolean;
  animationDuration?: number;
  pointerConfig?: Pointer;
  showValuesAsTopLabel?: boolean;
};

const RenderStackBars = (props: Props) => {
  const {
    barBackgroundPattern,
    patternId,
    item,
    index,
    containerHeight,
    maxValue,
    spacing,
    propSpacing,
    rotateLabel,
    xAxisThickness,
    label,
    labelTextStyle,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    renderTooltip,
    leftShiftForTooltip,
    leftShiftForLastIndexTooltip,
    initialSpacing,
    selectedIndex,
    setSelectedIndex,
    activeOpacity,
    stackData,
    isAnimated,
    animationDuration = BarDefaults.animationDuration,
    barBorderWidth,
    barBorderColor,
    stackBorderRadius,
    stackBorderTopLeftRadius,
    stackBorderTopRightRadius,
    stackBorderBottomLeftRadius,
    stackBorderBottomRightRadius,
    showValuesAsTopLabel,
  } = props;
  const cotainsNegative = item.stacks.some(item => item.value < 0);
  const noAnimation = cotainsNegative || !isAnimated;

  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = item;

  let leftSpacing = initialSpacing;
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (stackData[i].spacing ?? propSpacing ?? 0) +
      (stackData[i].stacks[0].barWidth ?? props.barWidth ?? 30);
  }
  const disablePress = props.disablePress || false;

  const getBarHeight = (value: number, marginBottom?: number) => {
    return (
      (Math.abs(value) * (containerHeight || 200)) / (maxValue || 200) -
      (marginBottom || 0)
    );
  };

  const getPosition = (index: number) => {
    /* Returns bottom position for stack item
       negative values are below origin (-> negative position) */
    const height = getBarHeight(
      item.stacks[index].value,
      item.stacks[index].marginBottom,
    );

    const itemValue = item.stacks[index].value;
    const isNegative = itemValue <= 0;
    let position = isNegative ? -(height || 0) : 0;

    for (let i = 0; i < index; i++) {
      const valueOnIndex = item.stacks[i].value;
      if (isNegative && valueOnIndex <= 0) {
        position +=
          (valueOnIndex * (containerHeight || 200)) / (maxValue || 200);
      } else if (!isNegative && valueOnIndex >= 0) {
        position +=
          (valueOnIndex * (containerHeight || 200)) / (maxValue || 200);
      }
    }
    return position;
  };

  const getLowestPosition = () => {
    return (
      item.stacks
        .map((_, index) => getPosition(index))
        .sort((a, b) => a - b)?.[0] || 0
    );
  };

  const lowestBarPosition = getLowestPosition();

  const renderLabel = (label: String, labelTextStyle: any) => {
    return (
      <View
        style={[
          {
            width:
              (item.stacks[0].barWidth || props.barWidth || 30) + spacing / 2,
            position: 'absolute',
            bottom: rotateLabel
              ? -40
              : -6 - xAxisTextNumberOfLines * 18 + lowestBarPosition,
          },
          rotateLabel
            ? props.horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {transform: [{rotate: '60deg'}]}
            : props.horizontal
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

  const totalHeight = props.item.stacks.reduce(
    (acc, stack) =>
      acc +
      (Math.abs(stack.value) * (containerHeight || 200)) / (maxValue || 200),
    0,
  );

  const [height, setHeight] = useState(noAnimation ? totalHeight : 1);

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
          overflow: 'hidden',
        }}>
        {static2DSimple()}
      </View>
    );
  };

  const static2DSimple = () => {
    const getStackBorderRadii = (item: stackItemType, index: number) => {
      const stackItem = item.stacks[index];
      const borderRadii = {
        borderTopLeftRadius:
          stackItem.borderTopLeftRadius ??
          stackItem.borderRadius ??
          props.barBorderTopLeftRadius ??
          props.barBorderRadius ??
          0,
        borderTopRightRadius:
          stackItem.borderTopRightRadius ??
          stackItem.borderRadius ??
          props.barBorderTopRightRadius ??
          props.barBorderRadius ??
          0,
        borderBottomLeftRadius:
          stackItem.borderBottomLeftRadius ??
          stackItem.borderRadius ??
          props.barBorderBottomLeftRadius ??
          props.barBorderRadius ??
          0,
        borderBottomRightRadius:
          stackItem.borderBottomRightRadius ??
          stackItem.borderRadius ??
          props.barBorderBottomRightRadius ??
          props.barBorderRadius ??
          0,
      };
      return borderRadii;
    };

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
                stroke="transparent"
                x="1"
                y="1"
                width="100%"
                height="100%"
                fill={`url(#${item.patternId || patternId})`}
              />
            </Svg>
          )}
        </TouchableOpacity>
        {(item.topLabelComponent || showValuesAsTopLabel) && (
          <View
            style={[
              {
                position: 'absolute',
                top: cotainsNegative
                  ? 0
                  : (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent: 'center',
                alignItems: 'center',
              },
              cotainsNegative && {transform: [{translateY: totalHeight * 2}]},
              props.horizontal &&
                !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
              item.topLabelContainerStyle,
            ]}>
            {showValuesAsTopLabel ? (
              <Text style={item.topLabelTextStyle}>
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

  return (
    <>
      <View
        pointerEvents={
          props.pointerConfig
            ? props.pointerConfig.pointerEvents ?? 'none'
            : 'auto'
        }
        style={[
          {
            // overflow: 'visible',
            marginBottom: 60 + xAxisLabelsVerticalShift,
            width: item.stacks[0].barWidth || props.barWidth || 30,
            height: totalHeight,
            marginRight: spacing,
          },

          props.pointerConfig
            ? {
                transform: [
                  {
                    translateY:
                      (containerHeight || 200) -
                      (totalHeight - 10 + xAxisLabelsVerticalShift),
                  },
                ],
              }
            : null,
        ]}>
        {/* {props.showVerticalLines && (
          <View
            style={{
              zIndex: props.verticalLinesZIndex,
              position: 'absolute',
              height: (containerHeight || 200) + 15,
              width: props.verticalLinesThickness,
              bottom: 0,
              left: (item.barWidth || props.barWidth || 30) / 2,
              backgroundColor: props.verticalLinesColor,
            }}
          />
        )} */}
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
        <View
          style={{
            position: 'absolute',
            bottom: totalHeight + 60,
            left:
              index === stackData.length - 1
                ? leftSpacing - leftShiftForLastIndexTooltip
                : leftSpacing -
                  (item.leftShiftForTooltip ?? leftShiftForTooltip ?? 0),
            zIndex: 1000,
          }}>
          {renderTooltip(item, index)}
        </View>
      )}
    </>
  );
};

export default RenderStackBars;
