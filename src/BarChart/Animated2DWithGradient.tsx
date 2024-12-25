import {useEffect, useState} from 'react';
import {View, LayoutAnimation, Platform, UIManager, Text} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import Cap from '../Components/BarSpecificComponents/cap';
import LinearGradient from '../Components/common/LinearGradient';
import {Animated2DWithGradientPropsType} from 'gifted-charts-core';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  } = props;
  const [height, setHeight] = useState(noAnimation ? props.height : 0.4); // if animation fails, increase this constant value of 0.4
  const [initialRender, setInitialRender] = useState(!noAnimation);
  const [barWidth, setBarWidth] = useState(item.barWidth ?? bWidth); // setting width in state for animation purpose

  useEffect(() => {
    if (!noAnimation) {
      if (initialRender) {
        setTimeout(() => layoutAppear(), 20);
      } else {
        elevate();
      }
    } else {
      setHeight(props.height);
      setBarWidth(item.barWidth ?? bWidth);
    }
  }, [props.height, bWidth, item.barWidth]);

  const elevate = () => {
    LayoutAnimation.configureNext({
      duration: animationDuration,
      update: {type: 'linear', property: 'scaleXY'},
    });
    setHeight(props.height);
    setBarWidth(item.barWidth ?? bWidth);
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
            width: barWidth,
            overflow: 'hidden',
            height: noAnimation
              ? Math.max(props.minHeight, Math.abs(height))
              : height,
          }}>
          <View
            style={[
              {
                width: '100%',
                height: noAnimation
                  ? Math.max(props.minHeight, Math.abs(height))
                  : height,
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
          </View>
        </View>
      )}
      {item.topLabelComponent || showValuesAsTopLabel ? (
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
            <Text style={topLabelTextStyle}>{item.value + yAxisOffset}</Text>
          ) : (
            item.topLabelComponent?.()
          )}
        </View>
      ) : null}
    </>
  );
};

export default Animated2DWithGradient;
