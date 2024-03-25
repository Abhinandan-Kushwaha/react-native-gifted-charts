import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import {styles} from './styles';
import LinearGradient from "../common/LinearGradient";
import {
  useAnimatedThreeDBar,
  animatedBarPropTypes,
  trianglePropTypes,
} from 'gifted-charts-core';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const heightCopy = props.height;
  const [height, setHeight] = useState(
    props.isAnimated ? (Platform.OS === 'ios' ? 0 : 20) : heightCopy,
  );

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
  } = props;

  const {
    showGradient,
    gradientColor,
    frontColor,
    sideColor,
    topColor,
    opacity,
    initialRender,
    setInitialRender,
  } = useAnimatedThreeDBar(props);

  useEffect(() => {
    if (isAnimated) {
      if (initialRender) {
        setTimeout(() => {
          layoutAppear();
        }, 20);
      } else {
        elevate();
      }
    }
  }, [props.height]);

  const elevate = () => {
    LayoutAnimation.configureNext({
      duration: animationDuration,
      update: {type: 'linear', property: 'scaleY'},
    });
    setHeight(props.height);
  };

  const layoutAppear = () => {
    LayoutAnimation.configureNext({
      duration: Platform.OS == 'ios' ? animationDuration : 20,
      create: {type: 'linear', property: 'scaleY'},
      // update: { type: 'linear' }
    });
    setInitialRender(false);
    setTimeout(() => elevate(), Platform.OS == 'ios' ? 10 : 100);
  };

  return (
    <View style={styles.container}>
      {!initialRender && (
        <View
          style={[
            styles.row,
            {opacity: opacity, position: 'absolute', bottom: 0},
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
              style={{transform: [{rotate: '90deg'}], opacity: opacity}}
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
                  stroke="transparent"
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
        </View>
      )}
    </View>
  );
};

export default AnimatedThreeDBar;
