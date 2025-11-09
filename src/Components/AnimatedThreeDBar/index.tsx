import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import {styles} from './styles';
import LinearGradient from '../common/LinearGradient';
import {
  useAnimatedThreeDBar,
  animatedBarPropTypes,
  trianglePropTypes,
} from 'gifted-charts-core';

const TriangleCorner = (props: trianglePropTypes) => {
  return (
    <View
      style={[
        triangleStyles.triangleCorner,
        props.style,
        {
          borderRightWidth: props.width / 2,
          borderTopWidth: props.width / 2,
          borderTopColor: props.color,
        },
      ]}
    />
  );
};

const triangleStyles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
  },
});

const AnimatedThreeDBar = (props: animatedBarPropTypes) => {
  const {height, side} = props;

  const {
    isAnimated,
    animationDuration,
    item,
    index,
    barWidth,
    sideWidth,
    barStyle,
    barBackgroundPattern,
    barInnerComponent,
    patternId,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
    containerHeight,
  } = props;

  const {
    showGradient,
    gradientColor,
    frontColor,
    sideColor,
    topColor,
    opacity,
  } = useAnimatedThreeDBar(props);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const elevate = () => {
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isAnimated) {
      elevate();
    }
  }, []);

  return (
    <View style={[styles.container, {height: containerHeight}]}>
      <Animated.View
        style={[
          styles.row,
          {
            height: isAnimated ? animatedHeight : height,
            opacity: opacity,
            position: 'absolute',
            bottom: 0,
          },
          props.side === 'right' && {transform: [{rotateY: '180deg'}]},
        ]}>
        {/*******************          Top View             *****************/}
        {props.height ? (
          <>
            <View style={{position: 'absolute', top: sideWidth / -2}}>
              <TriangleCorner
                color={topColor}
                width={sideWidth}
                style={{transform: [{rotate: '90deg'}], opacity: opacity}}
              />
            </View>
            <View style={{position: 'absolute', top: sideWidth / -2}}>
              <View
                style={{
                  width: barWidth,
                  height: barWidth,
                  // left: width / 2,
                  backgroundColor: topColor,
                  opacity: opacity,
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: sideWidth / -2,
                left: barWidth - 1,
              }}>
              <TriangleCorner
                color={topColor}
                width={sideWidth}
                style={{transform: [{rotate: '-90deg'}], opacity: opacity}}
              />
            </View>
          </>
        ) : null}

        {/*******************************************************************/}

        <View style={{marginTop: sideWidth / -2 - 1}}>
          <TriangleCorner
            color={height ? sideColor : 'transparent'}
            width={sideWidth}
            style={{transform: [{rotate: '-90deg'}], opacity: opacity}}
          />
          <View
            style={{
              width: sideWidth / 2 + 1,
              height: height - sideWidth / 2, //animatedSideHeight
              backgroundColor: sideColor,
              opacity: opacity,
            }}
          />
          <TriangleCorner
            color={height ? sideColor : 'transparent'}
            width={sideWidth + 1}
            style={{
              transform: [{rotate: '90deg'}],
              opacity: opacity,
              right: -0.5,
            }}
          />
        </View>

        <View
          style={[
            {
              width: barWidth,
              height: height, //animatedHeight
              backgroundColor: frontColor,
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: 'white',
              opacity: opacity,
            },
            item.barStyle || barStyle,
          ]}>
          {showGradient && (
            <LinearGradient
              style={{position: 'absolute', width: '100%', height: '100%'}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[gradientColor, frontColor]}
            />
          )}
          {barBackgroundPattern && (
            <Svg>
              <Defs>{barBackgroundPattern()}</Defs>
              <Rect
                stroke="none"
                x="1"
                y="1"
                width={barWidth || 30}
                height={height}
                fill={`url(#${patternId})`}
              />
            </Svg>
          )}
          {barInnerComponent ? (
            <View style={{height: '100%', width: '100%'}}>
              {barInnerComponent(item, index)}
            </View>
          ) : null}
        </View>

        {/*******************          Top Label            *****************/}

        {(item.topLabelComponent || showValuesAsTopLabel) && (
          <View
            style={[
              {
                position: 'absolute',
                top: barWidth * -2,
                marginLeft:
                  side === 'right' ? 0 : -Math.min(barWidth / 2 - 4, 8),
                height: (barWidth * 3) / 2,
                width: (barWidth * 3) / 2,
                justifyContent: 'flex-end',
                alignItems: 'center',
                opacity: opacity,
              },
              props.horizontal &&
                !intactTopLabel && {transform: [{rotate: '270deg'}]},
              props.side === 'right' && {transform: [{rotateY: '180deg'}]},
              topLabelContainerStyle ?? item.topLabelContainerStyle,
            ]}>
            {showValuesAsTopLabel ? (
              <Text style={topLabelTextStyle}>{item.value}</Text>
            ) : (
              item.topLabelComponent?.()
            )}
          </View>
        )}

        {/*******************************************************************/}
      </Animated.View>
    </View>
  );
};

export default AnimatedThreeDBar;
