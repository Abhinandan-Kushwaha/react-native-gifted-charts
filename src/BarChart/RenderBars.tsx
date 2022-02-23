import React, {Component} from 'react';
import {View, TouchableOpacity, Animated, Text, ColorValue} from 'react-native';
import ThreeDBar from '../Components/ThreeDBar';
import AnimatedBar from '../Components/AnimatedBar';
import LinearGradient from 'react-native-linear-gradient';
import Animated2DWithGradient from './Animated2DWithGradient';
import {Style} from 'util';

type Props = {
  style?: any;
  width?: number;
  height?: number;
  color?: ColorValue;
  showGradient?: Boolean;
  gradientColor?: any;
  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  topLabelComponent?: Component;
  topLabelContainerStyle?: Style;
  opacity?: number;
  side?: String;
  labelTextStyle?: any;

  item: itemType;
  index: number;
  containerHeight?: number;
  maxValue: number;
  spacing?: number;
  data?: any;
  barWidth?: number;
  sideWidth?: number;
  labelWidth?: number;

  isThreeD?: Boolean;
  isAnimated?: Boolean;
  rotateLabel?: Boolean;
  animatedHeight?: any;
  appearingOpacity?: any;
  animationDuration?: number;
  roundedTop?: Boolean;
  roundedBottom?: Boolean;
  disablePress?: Boolean;
  activeOpacity?: number;
  cappedBars?: Boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  showVerticalLines: Boolean;
  verticalLinesThickness: number;
  verticalLinesColor: ColorValue;
  verticalLinesZIndex: number;
  showXAxisIndices: Boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;
  horizontal: Boolean;
  intactTopLabel: Boolean;
  barBorderRadius?: number;
  autoShiftLabels?: Boolean;
};
type itemType = {
  value?: number;
  onPress?: any;
  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  showGradient?: Boolean;
  gradientColor?: any;
  label?: String;
  barWidth?: number;
  sideWidth?: number;
  labelTextStyle?: any;
  topLabelComponent?: Function;
  topLabelContainerStyle?: any;
  disablePress?: any;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  labelComponent?: Function;
  barBorderRadius?: number;
  topLabelComponentHeight?: number;
  spacing?: number;
  labelWidth?: number;
};
const RenderBars = (props: Props) => {
  const {
    item,
    index,
    containerHeight,
    maxValue,
    spacing,
    side,
    data,
    // oldValue,

    isThreeD,
    isAnimated,
    rotateLabel,
    appearingOpacity,
    opacity,
    animationDuration,
    autoShiftLabels,
  } = props;
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
                30) +
              spacing / 2,
            left: -6,
            position: 'absolute',
            bottom: rotateLabel ? -40 : -25,
          },
          rotateLabel
            ? props.horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {
                  transform: [
                    {rotate: value < 0 ? '240deg' : '60deg'},
                    {translateX: value < 0 ? 56 : 0},
                    {translateY: value < 0 ? 32 : 0},
                  ],
                }
            : props.horizontal
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
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={1}>
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
                30) +
              spacing / 2,
            position: 'absolute',
            left: -4,
            bottom: rotateLabel ? -40 : -25,
            opacity: appearingOpacity,
          },
          value < 0 && {transform: [{rotate: '180deg'}]},
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
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={1}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  const static2DWithGradient = (item: itemType) => {
    // console.log('comes to static2DWithGradient', item);
    return (
      <>
        <LinearGradient
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: props.barBorderRadius || item.barBorderRadius || 0,
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
          {props.cappedBars && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height:
                  item.capThickness === 0
                    ? 0
                    : item.capThickness || props.capThickness || 6,
                backgroundColor: item.capColor || props.capColor || 'gray',
                borderTopLeftRadius:
                  item.capRadius === 0
                    ? 0
                    : item.capRadius || props.capRadius || 0,
                borderTopRightRadius:
                  item.capRadius === 0
                    ? 0
                    : item.capRadius || props.capRadius || 0,
              }}
            />
          )}
        </LinearGradient>
        {item.topLabelComponent && (
          <View
            style={[
              {
                position: 'absolute',
                top: (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent:
                  (props.horizontal && !props.intactTopLabel) || item.value < 0
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
              item.value < 0 && {transform: [{rotate: '180deg'}]},
              props.horizontal &&
                !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
              item.topLabelContainerStyle,
            ]}>
            {item.topLabelComponent()}
          </View>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      disabled={item.disablePress || props.disablePress}
      activeOpacity={props.activeOpacity || 0.2}
      onPress={item.onPress}
      style={[
        {
          // overflow: 'visible',
          marginBottom: 60,
          width: item.barWidth || props.barWidth || 30,
          height:
            item.value >= 0 &&
            (!isThreeD || isAnimated) &&
            item.topLabelComponent
              ? (item.topLabelComponentHeight || 30) +
                (Math.abs(item.value) * (containerHeight || 200)) /
                  (maxValue || 200)
              : (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200),
          marginRight: spacing,
        },
        item.value < 0 && {
          transform: [
            {
              translateY:
                (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200),
            },
            {rotateZ: '180deg'},
          ],
        },
        // !isThreeD && !item.showGradient && !props.showGradient &&
        // { backgroundColor: item.frontColor || props.frontColor || 'black' },
        side !== 'right' && {zIndex: data.length - index},
      ]}>
      {props.showVerticalLines && (
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
      )}
      {props.showXAxisIndices && (
        <View
          style={{
            zIndex: 2,
            position: 'absolute',
            height: props.xAxisIndicesHeight,
            width: props.xAxisIndicesWidth,
            bottom: 0,
            left: (item.barWidth || props.barWidth || 30) / 2,
            backgroundColor: props.xAxisIndicesColor,
          }}
        />
      )}
      {isThreeD ? (
        isAnimated ? (
          <AnimatedBar
            topLabelContainerStyle={item.topLabelContainerStyle}
            width={item.barWidth || props.barWidth || 30}
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
            height={
              (Math.abs(item.value) * (containerHeight || 200)) /
              (maxValue || 200)
            }
            intactTopLabel={props.intactTopLabel}
            horizontal={props.horizontal}
          />
        ) : (
          <ThreeDBar
            style={{}}
            color={''}
            topLabelContainerStyle={item.topLabelContainerStyle}
            width={item.barWidth || props.barWidth || 30}
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
            topLabelComponent={item.topLabelComponent || Function}
            opacity={opacity || 1}
            horizontal={props.horizontal}
            intactTopLabel={props.intactTopLabel}
            height={
              (Math.abs(item.value) * (containerHeight || 200)) /
              (maxValue || 200)
            }
            value={item.value}
          />
        )
      ) : item.showGradient || props.showGradient ? (
        isAnimated ? (
          <Animated2DWithGradient
            barWidth={0}
            item={item}
            opacity={opacity}
            animationDuration={animationDuration || 800}
            roundedBottom={props.roundedBottom || false}
            roundedTop={props.roundedTop || false}
            gradientColor={props.gradientColor}
            frontColor={props.frontColor || 'black'}
            containerHeight={containerHeight}
            maxValue={maxValue}
            height={
              (Math.abs(item.value) * (containerHeight || 200)) /
              (maxValue || 200)
            }
            cappedBars={props.cappedBars}
            capThickness={props.capThickness}
            capColor={props.capColor}
            capRadius={props.capRadius}
            horizontal={props.horizontal}
            intactTopLabel={props.intactTopLabel}
            barBorderRadius={props.barBorderRadius || 0}
          />
        ) : (
          static2DWithGradient(item)
        )
      ) : isAnimated ? (
        <Animated2DWithGradient
          barWidth={0}
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
          height={
            (Math.abs(item.value) * (containerHeight || 200)) /
            (maxValue || 200)
          }
          cappedBars={props.cappedBars}
          capThickness={props.capThickness}
          capColor={props.capColor}
          capRadius={props.capRadius}
          horizontal={props.horizontal}
          intactTopLabel={props.intactTopLabel}
          barBorderRadius={props.barBorderRadius || 0}
        />
      ) : (
        <Animated2DWithGradient
          barWidth={0}
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
          height={
            (Math.abs(item.value) * (containerHeight || 200)) /
            (maxValue || 200)
          }
          cappedBars={props.cappedBars}
          capThickness={props.capThickness}
          capColor={props.capColor}
          capRadius={props.capRadius}
          horizontal={props.horizontal}
          intactTopLabel={props.intactTopLabel}
          barBorderRadius={props.barBorderRadius || 0}
        />
      )}
      {isAnimated
        ? renderAnimatedLabel(item.label || '', item.labelTextStyle, item.value)
        : renderLabel(item.label || '', item.labelTextStyle, item.value)}
    </TouchableOpacity>
  );
};

export default RenderBars;
