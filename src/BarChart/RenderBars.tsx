import React, {Component, ReactNode} from 'react';
import {View, TouchableOpacity, Animated, Text, ColorValue} from 'react-native';
import AnimatedThreeDBar from '../Components/AnimatedThreeDBar';
import LinearGradient from 'react-native-linear-gradient';
import Animated2DWithGradient from './Animated2DWithGradient';
import Cap from '../Components/BarSpecificComponents/cap';
import BarBackgroundPattern from '../Components/BarSpecificComponents/barBackgroundPattern';
import {barDataItem} from './types';
import {Pointer} from '../utils/types';

type Props = {
  style?: any;
  width?: number;
  height?: number;
  minHeight: number;
  color?: ColorValue;
  showGradient?: boolean;
  gradientColor?: any;
  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  topLabelComponent?: Component;
  topLabelContainerStyle?: any;
  topLabelTextStyle?: any;
  opacity?: number;
  side?: String;
  labelTextStyle?: any;

  item: barDataItem;
  index: number;
  label: String;
  containerHeight?: number;
  maxValue: number;
  spacing: number;
  propSpacing?: number;
  data?: any;
  barWidth?: number;
  sideWidth?: number;
  labelWidth?: number;

  isThreeD?: boolean;
  isAnimated?: boolean;
  rotateLabel?: boolean;
  animatedHeight?: any;
  appearingOpacity?: any;
  animationDuration?: number;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  disablePress?: boolean;
  activeOpacity?: number;
  cappedBars?: boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  showXAxisIndices: boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;
  horizontal: boolean;
  rtl: boolean;
  intactTopLabel: boolean;
  showValuesAsTopLabel?: boolean;
  barBorderWidth?: number;
  barBorderColor: ColorValue;
  barBorderRadius?: number;
  barBorderTopLeftRadius?: number;
  barBorderTopRightRadius?: number;
  barBorderBottomLeftRadius?: number;
  barBorderBottomRightRadius?: number;
  barInnerComponent?: (item?: barDataItem, index?: number) => ReactNode;
  autoShiftLabels?: boolean;
  barBackgroundPattern?: Function;
  patternId?: String;
  barMarginBottom?: number;
  onPress?: Function;
  xAxisTextNumberOfLines: number;
  xAxisLabelsHeight?: number;
  xAxisLabelsVerticalShift: number;
  renderTooltip: Function | undefined;
  leftShiftForTooltip?: number;
  leftShiftForLastIndexTooltip: number;
  initialSpacing: number;
  selectedIndex: number;
  setSelectedIndex: Function;
  barStyle?: object;
  xAxisThickness?: number;
  pointerConfig?: Pointer;
};
const RenderBars = (props: Props) => {
  const {
    item,
    index,
    containerHeight,
    maxValue,
    minHeight,
    spacing,
    propSpacing,
    side,
    data,
    barStyle,
    barBorderWidth,
    barBorderColor,
    barBorderRadius,
    barBorderTopLeftRadius,
    barBorderTopRightRadius,
    barBorderBottomLeftRadius,
    barBorderBottomRightRadius,
    // oldValue,

    isThreeD,
    isAnimated,
    rotateLabel,
    appearingOpacity,
    opacity,
    animationDuration,
    autoShiftLabels,
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
    xAxisThickness,
    horizontal,
    rtl,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
    pointerConfig,
  } = props;

  const localBarInnerComponent = item.barInnerComponent ?? props.barInnerComponent;

  const barMarginBottom =
    item.barMarginBottom === 0
      ? 0
      : item.barMarginBottom || props.barMarginBottom || 0;

  const renderLabel = (label: String, labelTextStyle: any, value: number) => {
    return (
      <View
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.barWidth ||
                props.barWidth ||
                30) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            bottom:
              (rotateLabel
                ? -40
                : -6 - xAxisTextNumberOfLines * 18 - xAxisLabelsVerticalShift) -
              barMarginBottom,
          },
          rotateLabel
            ? horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {
                  transform: [
                    {rotate: value < 0 ? '240deg' : '60deg'},
                    {translateX: value < 0 ? 56 : 0},
                    {translateY: value < 0 ? 32 : 0},
                  ],
                }
            : horizontal
              ? {transform: [{rotate: '-90deg'}]}
              : value < 0
                ? {
                    transform: [
                      {rotate: '180deg'},
                      {translateY: autoShiftLabels ? 0 : 32},
                    ],
                  }
                : {},
        ]}>
        {item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text
            style={[
              {textAlign: 'center'},
              rtl && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    label: String,
    labelTextStyle: any,
    value: number,
  ) => {
    return (
      <Animated.View
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.barWidth ||
                props.barWidth ||
                30) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            bottom:
              (rotateLabel
                ? -40
                : -6 - xAxisTextNumberOfLines * 18 - xAxisLabelsVerticalShift) -
              barMarginBottom,
            opacity: appearingOpacity,
          },
          value < 0 && {transform: [{rotate: '180deg'}]},
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
          <Text
            style={[
              {textAlign: 'center'},
              rtl && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  const static2DWithGradient = (item: barDataItem) => {
    return (
      <>
        <LinearGradient
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderWidth: barBorderWidth ?? 0,
              borderColor: barBorderColor,
              borderRadius: item.barBorderRadius ?? barBorderRadius ?? 0,
              borderTopLeftRadius:
                item.barBorderTopLeftRadius ??
                barBorderTopLeftRadius ??
                item.barBorderRadius ??
                barBorderRadius,
              borderTopRightRadius:
                item.barBorderTopRightRadius ??
                barBorderTopRightRadius ??
                item.barBorderRadius ??
                barBorderRadius,
              borderBottomLeftRadius:
                item.barBorderBottomLeftRadius ??
                barBorderBottomLeftRadius ??
                item.barBorderRadius ??
                barBorderRadius,
              borderBottomRightRadius:
                item.barBorderBottomRightRadius ??
                barBorderBottomRightRadius ??
                item.barBorderRadius ??
                barBorderRadius,
            },
            props.roundedBottom && {
              borderBottomLeftRadius:
                (item.barWidth || props.barWidth || 30) / 2,
              borderBottomRightRadius:
                (item.barWidth || props.barWidth || 30) / 2,
            },
            props.cappedBars && {
              borderTopLeftRadius:
                item.capRadius === 0
                  ? 0
                  : item.capRadius || props.capRadius || 0,
              borderTopRightRadius:
                item.capRadius === 0
                  ? 0
                  : item.capRadius || props.capRadius || 0,
            },
            props.roundedTop && {
              borderTopLeftRadius: (item.barWidth || props.barWidth || 30) / 2,
              borderTopRightRadius: (item.barWidth || props.barWidth || 30) / 2,
            },
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            item.gradientColor || props.gradientColor || 'white',
            item.frontColor || props.frontColor || 'black',
          ]}>
          {props.cappedBars && item.value ? (
            <Cap
              capThicknessFromItem={item.capThickness}
              capThicknessFromProps={props.capThickness}
              capColorFromItem={item.capColor}
              capColorFromProps={props.capColor}
              capRadiusFromItem={item.capRadius}
              capRadiusFromProps={props.capRadius}
            />
          ) : null}
        </LinearGradient>
        {(item.barBackgroundPattern || props.barBackgroundPattern) && (
          <BarBackgroundPattern
            barBackgroundPatternFromItem={item.barBackgroundPattern}
            barBackgroundPatternFromProps={props.barBackgroundPattern}
            patternIdFromItem={item.patternId}
            patternIdFromProps={props.patternId}
          />
        )}
        {(item.topLabelComponent || showValuesAsTopLabel) && (
          <View
            style={[
              {
                position: 'absolute',
                top: (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent:
                  (horizontal && !intactTopLabel) || item.value < 0
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
              item.value < 0 && {transform: [{rotate: '180deg'}]},
              horizontal &&
                !intactTopLabel && {transform: [{rotate: '270deg'}]},
              topLabelContainerStyle ?? item.topLabelContainerStyle,
            ]}>
            {showValuesAsTopLabel ? (
              <Text style={topLabelTextStyle}>{item.value}</Text>
            ) : (
              item.topLabelComponent?.()
            )}
          </View>
        )}
        {localBarInnerComponent ? (
          <View style={{height: '100%', width: '100%'}}>
            {localBarInnerComponent(item, index)}
          </View>
        ) : null}
      </>
    );
  };

  const barHeight = Math.max(
    minHeight,
    (Math.abs(item.value) * (containerHeight || 200)) / (maxValue || 200) -
      (xAxisThickness ?? 0),
  );

  let leftSpacing = initialSpacing;
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (data[i].spacing ?? propSpacing) +
      (data[i].barWidth || props.barWidth || 30);
  }

  const barWrapperStyle = [
    {
      // overflow: 'visible',
      marginBottom: 60 + barMarginBottom + xAxisLabelsVerticalShift,
      width: item.barWidth || props.barWidth || 30,
      height: barHeight,
      marginRight: spacing,
    },
    item.value < 0
      ? {
          transform: [
            {
              translateY:
                (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200),
            },
            {rotateZ: '180deg'},
          ],
        }
      : pointerConfig
        ? {
            transform: [
              {
                translateY:
                  (containerHeight || 200) -
                  (barHeight - 10 + xAxisLabelsVerticalShift),
              },
            ],
          }
        : null,
    // !isThreeD && !item.showGradient && !props.showGradient &&
    // { backgroundColor: item.frontColor || props.frontColor || 'black' },
    side !== 'right' && {zIndex: data.length - index},
  ];

  const pressDisabled =
    item.disablePress ||
    props.disablePress ||
    (pointerConfig && pointerConfig.barTouchable !== true);

  const barContent = () => {
    const animated2DWithGradient = (noGradient, noAnimation) => (
      <Animated2DWithGradient
        barBackgroundPattern={props.barBackgroundPattern}
        patternId={props.patternId}
        barWidth={props.barWidth || 30}
        barStyle={barStyle}
        item={item}
        index={index}
        opacity={opacity}
        animationDuration={animationDuration || 800}
        roundedBottom={props.roundedBottom || false}
        roundedTop={props.roundedTop || false}
        noGradient={noGradient}
        noAnimation={noAnimation}
        gradientColor={noGradient ? undefined : props.gradientColor}
        frontColor={props.frontColor || 'black'}
        containerHeight={containerHeight}
        maxValue={maxValue}
        height={barHeight}
        minHeight={minHeight ?? 0}
        barMarginBottom={barMarginBottom}
        cappedBars={props.cappedBars}
        capThickness={props.capThickness}
        capColor={props.capColor}
        capRadius={props.capRadius}
        horizontal={horizontal}
        intactTopLabel={intactTopLabel}
        showValuesAsTopLabel={!!showValuesAsTopLabel}
        topLabelContainerStyle={topLabelContainerStyle}
        topLabelTextStyle={topLabelTextStyle}
        barBorderWidth={barBorderWidth}
        barBorderColor={barBorderColor}
        barBorderRadius={props.barBorderRadius || 0}
        barBorderTopLeftRadius={barBorderTopLeftRadius}
        barBorderTopRightRadius={barBorderTopRightRadius}
        barBorderBottomLeftRadius={barBorderBottomLeftRadius}
        barBorderBottomRightRadius={barBorderBottomRightRadius}
        barInnerComponent={localBarInnerComponent}
      />
    );
    return (
      <>
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
        {isThreeD ? (
          <AnimatedThreeDBar
            barBackgroundPattern={
              item.barBackgroundPattern || props.barBackgroundPattern
            }
            barInnerComponent={localBarInnerComponent}
            patternId={item.patternId || props.patternId}
            width={item.barWidth || props.barWidth || 30}
            barStyle={barStyle}
            item={item}
            index={index}
            sideWidth={
              item.sideWidth ||
              props.sideWidth ||
              (item.barWidth || props.barWidth || 30) / 2
            }
            side={side || 'left'}
            frontColor={item.frontColor || props.frontColor || ''}
            sideColor={item.sideColor || props.sideColor || ''}
            topColor={item.topColor || props.topColor || ''}
            showGradient={item.showGradient || props.showGradient || false}
            gradientColor={item.gradientColor || props.gradientColor}
            opacity={opacity || 1}
            height={barHeight}
            intactTopLabel={intactTopLabel}
            showValuesAsTopLabel={!!showValuesAsTopLabel}
            topLabelContainerStyle={topLabelContainerStyle}
            topLabelTextStyle={topLabelTextStyle}
            horizontal={horizontal}
            isAnimated={isAnimated}
            animationDuration={animationDuration || 800}
          />
        ) : item.showGradient || props.showGradient ? (
          isAnimated ? (
            animated2DWithGradient(false, false)
          ) : (
            static2DWithGradient(item)
          )
        ) : isAnimated ? (
          animated2DWithGradient(true, false)
        ) : (
          animated2DWithGradient(true, true)
        )}
        {isAnimated
          ? renderAnimatedLabel(label, labelTextStyle, item.value)
          : renderLabel(label, labelTextStyle, item.value)}
      </>
    );
  };

  return (
    <>
      {pressDisabled ? (
        <View pointerEvents="none" style={barWrapperStyle}>
          {barContent()}
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={props.activeOpacity || 0.2}
          onPress={() => {
            if (renderTooltip) {
              setSelectedIndex(index);
            }
            item.onPress
              ? item.onPress()
              : props.onPress
                ? props.onPress(item, index)
                : null;
          }}
          style={barWrapperStyle}>
          {barContent()}
        </TouchableOpacity>
      )}
      {renderTooltip && selectedIndex === index && (
        <View
          style={{
            position: 'absolute',
            bottom: barHeight + 60,
            left:
              index === data.length - 1
                ? leftSpacing - leftShiftForLastIndexTooltip
                : leftSpacing -
                  (item?.leftShiftForTooltip ?? leftShiftForTooltip ?? 0),
            zIndex: 1000,
          }}>
          {renderTooltip(item, index)}
        </View>
      )}
    </>
  );
};

export default RenderBars;
