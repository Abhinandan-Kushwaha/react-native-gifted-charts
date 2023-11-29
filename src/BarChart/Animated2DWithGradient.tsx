import React, {useEffect, useState} from 'react';
import {
  View,
  ColorValue,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Defs, Rect} from 'react-native-svg';
import Cap from '../Components/BarSpecificComponents/cap';
import {itemType} from './types';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type propTypes = {
  item: itemType;
  height: number;
  minHeight: number;
  opacity?: number;
  animationDuration: number;
  roundedTop: boolean;
  roundedBottom: boolean;
  barWidth: number;
  gradientColor: ColorValue;
  frontColor: ColorValue;
  noGradient?: boolean;
  noAnimation?: boolean;
  cappedBars?: boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  horizontal: boolean;
  intactTopLabel: boolean;
  showValuesAsTopLabel: boolean;
  topLabelContainerStyle?: any;
  topLabelTextStyle?: any;
  barBorderWidth?: number;
  barBorderColor: ColorValue;
  barBorderRadius?: number;
  barBorderTopLeftRadius?: number;
  barBorderTopRightRadius?: number;
  barBorderBottomLeftRadius?: number;
  barBorderBottomRightRadius?: number;
  containerHeight?: number;
  maxValue?: number;
  barBackgroundPattern?: Function;
  patternId?: String;
  barMarginBottom?: number;
  barStyle?: object;
};

const Animated2DWithGradient = (props: propTypes) => {
  const {
    barBackgroundPattern,
    patternId,
    barWidth,
    barStyle,
    item,
    opacity,
    animationDuration,
    noGradient,
    noAnimation,
    containerHeight,
    maxValue,
    barMarginBottom,
    barBorderWidth,
    barBorderColor,
    barBorderRadius,
    barBorderTopLeftRadius,
    barBorderTopRightRadius,
    barBorderBottomLeftRadius,
    barBorderBottomRightRadius,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
  } = props;
  const [height, setHeight] = useState(noAnimation ? props.height : 0.2);
  const [initialRender, setInitialRender] = useState(
    noAnimation ? false : true,
  );

  useEffect(() => {
    if (!noAnimation) {
      if (initialRender) {
        setTimeout(() => layoutAppear(), 20);
      } else {
        elevate();
      }
    }
  }, [props.height]);

  const elevate = () => {
    LayoutAnimation.configureNext({
      duration: animationDuration,
      update: {type: 'linear', property: 'scaleXY'},
    });
    setHeight(props.height);
  };

  const layoutAppear = () => {
    LayoutAnimation.configureNext({
      duration: Platform.OS == 'ios' ? animationDuration : 20,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', property: 'scaleXY'},
    });
    setInitialRender(false);
    setTimeout(() => elevate(), Platform.OS == 'ios' ? 10 : 100);
  };

  return (
    <>
      {!initialRender && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height:
              (noAnimation
                ? Math.max(
                    props.minHeight,
                    (Math.abs(item.value) * (containerHeight || 200)) /
                      (maxValue || 200),
                  )
                : height) - (barMarginBottom || 0),
          }}>
          <View
            style={[
              {
                width: '100%',
                height:
                  (noAnimation
                    ? Math.max(
                        props.minHeight,
                        (Math.abs(item.value) * (containerHeight || 200)) /
                          (maxValue || 200),
                      )
                    : height) - (barMarginBottom || 0),
              },
              item.barStyle || barStyle,
            ]}>
            {noGradient ? (
              <View
                style={[
                  {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor:
                      item.frontColor || props.frontColor || 'black',
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
                      (item.barWidth || barWidth || 30) / 2,
                    borderBottomRightRadius:
                      (item.barWidth || barWidth || 30) / 2,
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
                    borderTopLeftRadius: (item.barWidth || barWidth || 30) / 2,
                    borderTopRightRadius: (item.barWidth || barWidth || 30) / 2,
                  },
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
              </View>
            ) : (
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
                      (item.barWidth || barWidth || 30) / 2,
                    borderBottomRightRadius:
                      (item.barWidth || barWidth || 30) / 2,
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
                    borderTopLeftRadius: (item.barWidth || barWidth || 30) / 2,
                    borderTopRightRadius: (item.barWidth || barWidth || 30) / 2,
                  },
                ]}
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
                      backgroundColor:
                        item.capColor || props.capColor || 'black',
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
                  stroke="transparent"
                  x="1"
                  y="1"
                  width={item.barWidth || props.barWidth || 30}
                  height={
                    noAnimation
                      ? (Math.abs(item.value) * (containerHeight || 200)) /
                        (maxValue || 200)
                      : height
                  }
                  fill={`url(#${item.patternId || patternId})`}
                />
              </Svg>
            )}
          </View>
          {(item.topLabelComponent || showValuesAsTopLabel) && (
            <View
              style={[
                {
                  position: 'absolute',
                  top: (item.barWidth || barWidth || 30) * -1,
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
                <Text style={topLabelTextStyle}>{item.value}</Text>
              ) : (
                item.topLabelComponent?.()
              )}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Animated2DWithGradient;
