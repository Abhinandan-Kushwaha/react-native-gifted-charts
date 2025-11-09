import {useEffect, useRef, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import Cap from '../Components/BarSpecificComponents/cap';
import LinearGradient from '../Components/common/LinearGradient';
import {Animated2DWithGradientPropsType} from 'gifted-charts-core';

const Animated2DWithGradient = (props: Animated2DWithGradientPropsType) => {
  const {
    barBackgroundPattern,
    patternId,
    barWidth: bWidth,
    barStyle,
    item,
    index,
    opacity,
    animationDuration,
    noGradient,
    noAnimation,
    barInnerComponent,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
    commonStyleForBar,
    barStyleWithBackground,
    yAxisOffset,
    height,
  } = props;
  const barWidth = item.barWidth ?? bWidth; // setting width in state for animation purpose
  const topLabelPosition = (item.barWidth || barWidth || 30) * -1;
  const animatedHeight = useRef(new Animated.Value(0)).current; // initial height = 0
  const animatedLabelHeight = useRef(
    new Animated.Value(height + topLabelPosition),
  ).current;

  const elevate = () => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(animatedLabelHeight, {
        toValue: topLabelPosition,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (!noAnimation) {
      elevate();
    }
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: barWidth,
            overflow: 'hidden',
            height: noAnimation ? height : animatedHeight,
          },
          item.barStyle || barStyle,
        ]}>
        {noGradient ? (
          <View style={barStyleWithBackground}>
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
          </View>
        ) : (
          <LinearGradient
            style={commonStyleForBar}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
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
                  backgroundColor: item.capColor || props.capColor || 'black',
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
        )}
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
              width={item.barWidth || barWidth || 30}
              height={noAnimation ? Math.abs(height) : height}
              fill={`url(#${item.patternId || patternId})`}
            />
          </Svg>
        )}
        {barInnerComponent ? (
          <View style={{height: '100%', width: '100%'}}>
            {barInnerComponent(item, index)}
          </View>
        ) : null}
      </Animated.View>
      {item.topLabelComponent || showValuesAsTopLabel ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: noAnimation ? topLabelPosition : animatedLabelHeight,
              height: item.barWidth || barWidth || 30,
              width: item.barWidth || barWidth || 30,
              justifyContent:
                (props.horizontal && !intactTopLabel) || item.value < 0
                  ? 'center'
                  : 'flex-end',
              alignItems: 'center',
              opacity: opacity,
            },
            item.value < 0 && {transform: [{rotate: '180deg'}]},
            props.horizontal &&
              !intactTopLabel && {transform: [{rotate: '270deg'}]},
            topLabelContainerStyle ?? item.topLabelContainerStyle,
          ]}>
          {showValuesAsTopLabel ? (
            <Text style={topLabelTextStyle}>{item.value + yAxisOffset}</Text>
          ) : (
            item.topLabelComponent?.()
          )}
        </Animated.View>
      ) : null}
    </>
  );
};

export default Animated2DWithGradient;
