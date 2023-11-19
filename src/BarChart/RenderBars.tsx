import React, {Component} from 'react';
import {View, TouchableOpacity, Animated, Text, ColorValue} from 'react-native';
import ThreeDBar from '../Components/ThreeDBar';
import AnimatedBar from '../Components/AnimatedBar';
import LinearGradient from 'react-native-linear-gradient';
import Animated2DWithGradient from './Animated2DWithGradient';
import Cap from '../Components/BarSpecificComponents/cap';
import BarBackgroundPattern from '../Components/BarSpecificComponents/barBackgroundPattern';
import {itemType} from './types';
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
  opacity?: number;
  side?: String;
  labelTextStyle?: any;

  item: itemType;
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
  barBorderRadius?: number;
  barBorderTopLeftRadius?: number;
  barBorderTopRightRadius?: number;
  barBorderBottomLeftRadius?: number;
  barBorderBottomRightRadius?: number;
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
    pointerConfig,
  } = props;

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

  const static2DWithGradient = (item: itemType) => {
    return (
      <>
        <LinearGradient
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
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
        {item.topLabelComponent && (
          <View
            style={[
              {
                position: 'absolute',
                top: (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent:
                  (horizontal && !props.intactTopLabel) || item.value < 0
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
              item.value < 0 && {transform: [{rotate: '180deg'}]},
              horizontal &&
                !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
              item.topLabelContainerStyle,
            ]}>
            {item.topLabelComponent()}
          </View>
        )}
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
          isAnimated ? (
            <AnimatedBar
              barBackgroundPattern={
                item.barBackgroundPattern || props.barBackgroundPattern
              }
              patternId={item.patternId || props.patternId}
              topLabelContainerStyle={item.topLabelContainerStyle}
              width={item.barWidth || props.barWidth || 30}
              barStyle={barStyle}
              item={item}
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
              topLabelComponent={item.topLabelComponent}
              opacity={opacity || 1}
              animationDuration={animationDuration || 800}
              height={barHeight}
              intactTopLabel={props.intactTopLabel}
              horizontal={horizontal}
            />
          ) : (
            <ThreeDBar
              barBackgroundPattern={
                item.barBackgroundPattern || props.barBackgroundPattern
              }
              patternId={item.patternId || props.patternId}
              style={{}}
              color={''}
              topLabelContainerStyle={item.topLabelContainerStyle}
              width={item.barWidth || props.barWidth || 30}
              sideWidth={
                item.sideWidth ||
                props.sideWidth ||
                (item.barWidth || props.barWidth || 30) / 2
              }
              barStyle={barStyle}
              item={item}
              side={side || 'left'}
              frontColor={item.frontColor || props.frontColor || ''}
              sideColor={item.sideColor || props.sideColor || ''}
              topColor={item.topColor || props.topColor || ''}
              showGradient={item.showGradient || props.showGradient || false}
              gradientColor={item.gradientColor || props.gradientColor}
              topLabelComponent={item.topLabelComponent || null}
              opacity={opacity || 1}
              horizontal={horizontal}
              intactTopLabel={props.intactTopLabel}
              height={barHeight}
              value={item.value}
            />
          )
        ) : item.showGradient || props.showGradient ? (
          isAnimated ? (
            <Animated2DWithGradient
              barBackgroundPattern={props.barBackgroundPattern}
              patternId={props.patternId}
              barWidth={props.barWidth || 30}
              barStyle={barStyle}
              item={item}
              opacity={opacity}
              animationDuration={animationDuration || 800}
              roundedBottom={props.roundedBottom || false}
              roundedTop={props.roundedTop || false}
              gradientColor={props.gradientColor}
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
              intactTopLabel={props.intactTopLabel}
              barBorderRadius={props.barBorderRadius || 0}
              barBorderTopLeftRadius={barBorderTopLeftRadius}
              barBorderTopRightRadius={barBorderTopRightRadius}
              barBorderBottomLeftRadius={barBorderBottomLeftRadius}
              barBorderBottomRightRadius={barBorderBottomRightRadius}
            />
          ) : (
            static2DWithGradient(item)
          )
        ) : isAnimated ? (
          <Animated2DWithGradient
            barBackgroundPattern={props.barBackgroundPattern}
            patternId={props.patternId}
            barWidth={props.barWidth || 30}
            barStyle={barStyle}
            item={item}
            opacity={opacity}
            animationDuration={animationDuration || 800}
            roundedBottom={props.roundedBottom || false}
            roundedTop={props.roundedTop || false}
            gradientColor={props.gradientColor}
            noGradient
            frontColor={props.frontColor || 'black'}
            containerHeight={containerHeight}
            maxValue={maxValue}
            height={barHeight}
            minHeight={minHeight || 0}
            barMarginBottom={barMarginBottom}
            cappedBars={props.cappedBars}
            capThickness={props.capThickness}
            capColor={props.capColor}
            capRadius={props.capRadius}
            horizontal={horizontal}
            intactTopLabel={props.intactTopLabel}
            barBorderRadius={props.barBorderRadius || 0}
            barBorderTopLeftRadius={barBorderTopLeftRadius}
            barBorderTopRightRadius={barBorderTopRightRadius}
            barBorderBottomLeftRadius={barBorderBottomLeftRadius}
            barBorderBottomRightRadius={barBorderBottomRightRadius}
          />
        ) : (
          <Animated2DWithGradient
            barBackgroundPattern={props.barBackgroundPattern}
            patternId={props.patternId}
            barWidth={props.barWidth || 30}
            barStyle={barStyle}
            item={item}
            opacity={opacity}
            animationDuration={animationDuration || 800}
            roundedBottom={props.roundedBottom || false}
            roundedTop={props.roundedTop || false}
            gradientColor={props.gradientColor}
            noGradient
            noAnimation
            frontColor={props.frontColor || 'black'}
            containerHeight={containerHeight}
            maxValue={maxValue}
            height={barHeight}
            minHeight={minHeight || 0}
            barMarginBottom={barMarginBottom}
            cappedBars={props.cappedBars}
            capThickness={props.capThickness}
            capColor={props.capColor}
            capRadius={props.capRadius}
            horizontal={horizontal}
            intactTopLabel={props.intactTopLabel}
            barBorderRadius={props.barBorderRadius || 0}
            barBorderTopLeftRadius={barBorderTopLeftRadius}
            barBorderTopRightRadius={barBorderTopRightRadius}
            barBorderBottomLeftRadius={barBorderBottomLeftRadius}
            barBorderBottomRightRadius={barBorderBottomRightRadius}
          />
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
