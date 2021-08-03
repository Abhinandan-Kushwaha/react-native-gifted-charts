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
  labelTextStyle?: any;
  topLabelComponent?: Function;
  topLabelContainerStyle?: any;
  disablePress?: any;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  labelComponent?: Function;
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
  } = props;
  const renderLabel = (label: String, labelTextStyle: any) => {
    return (
      <View
        style={[
          {
            width: rotateLabel ? '150%' : '120%',
            position: 'absolute',
            bottom: rotateLabel ? -40 : -25,
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
          <Text
            style={[labelTextStyle, {textAlign: 'center'}]}
            numberOfLines={1}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (label: String, labelTextStyle: any) => {
    return (
      <Animated.View
        style={[
          {
            width: rotateLabel ? '150%' : '120%',
            position: 'absolute',
            bottom: rotateLabel ? -40 : -25,
            opacity: appearingOpacity,
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
          <Text
            style={[labelTextStyle, {textAlign: 'center'}]}
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
                  props.horizontal && !props.intactTopLabel
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
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

  const static2DSimple = (item: itemType) => {
    // console.log('comes to static2DSimple', item);
    return (
      <>
        <View
          style={[
            {
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: item.frontColor || props.frontColor || 'black',
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
        </View>
        {item.topLabelComponent && (
          <View
            style={[
              {
                position: 'absolute',
                top: (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent:
                  props.horizontal && !props.intactTopLabel
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
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
            ((item.value || maxValue / 2) * (containerHeight || 200)) /
            (maxValue || 200),
          marginRight: spacing,
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
              ((item.value || maxValue / 2) * (containerHeight || 200)) /
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
              ((item.value || maxValue / 2) * (containerHeight || 200)) /
              (maxValue || 200)
            }
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
            height={
              ((item.value || maxValue / 2) * (containerHeight || 200)) /
              (maxValue || 200)
            }
            cappedBars={props.cappedBars}
            capThickness={props.capThickness}
            capColor={props.capColor}
            capRadius={props.capRadius}
            horizontal={props.horizontal}
            intactTopLabel={props.intactTopLabel}
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
          height={
            ((item.value || maxValue / 2) * (containerHeight || 200)) /
            (maxValue || 200)
          }
          cappedBars={props.cappedBars}
          capThickness={props.capThickness}
          capColor={props.capColor}
          capRadius={props.capRadius}
          horizontal={props.horizontal}
          intactTopLabel={props.intactTopLabel}
        />
      ) : (
        static2DSimple(item)
      )}
      {isAnimated
        ? renderAnimatedLabel(item.label || '', item.labelTextStyle)
        : renderLabel(item.label || '', item.labelTextStyle)}
    </TouchableOpacity>
  );
};

export default RenderBars;
