import React, {useEffect, useState} from 'react';
import {View, ColorValue, LayoutAnimation, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type propTypes = {
  item: itemType;
  height: number;
  opacity?: number;
  animationDuration: number;
  roundedTop: Boolean;
  roundedBottom: Boolean;
  barWidth: number;
  gradientColor: ColorValue;
  frontColor: ColorValue;
  noGradient?: Boolean;
  noAnimation?: Boolean;
  cappedBars?: Boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;
  horizontal: Boolean;
  intactTopLabel: Boolean;
  barBorderRadius?: number;
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
  barBorderRadius?: number;
};

const Animated2DWithGradient = (props: propTypes) => {
  const {item, opacity, animationDuration, noGradient, noAnimation} = props;
  const [height, setHeight] = useState(noAnimation ? props.height : 0);
  const [initialRender, setInitialRender] = useState(
    noAnimation ? false : true,
  );
  // console.log('comes to animated2DWithGradient', item);

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
            height: height,
          }}>
          <View style={{width: '100%', height: height}}>
            {noGradient ? (
              <View
                style={[
                  {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor:
                      item.frontColor || props.frontColor || 'black',
                    borderRadius:
                      props.barBorderRadius || item.barBorderRadius || 0,
                  },
                  props.roundedBottom && {
                    borderBottomLeftRadius: (item.barWidth || 30) / 2,
                    borderBottomRightRadius: (item.barWidth || 30) / 2,
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
                    borderTopLeftRadius: (item.barWidth || 30) / 2,
                    borderTopRightRadius: (item.barWidth || 30) / 2,
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
                          : item.capThickness || props.capThickness || 0,
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
              </View>
            ) : (
              <LinearGradient
                style={[
                  {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius:
                      props.barBorderRadius || item.barBorderRadius || 0,
                  },
                  props.roundedBottom && {
                    borderBottomLeftRadius: (item.barWidth || 30) / 2,
                    borderBottomRightRadius: (item.barWidth || 30) / 2,
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
                    borderTopLeftRadius: (item.barWidth || 30) / 2,
                    borderTopRightRadius: (item.barWidth || 30) / 2,
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
                      // position: 'absolute',
                      // width: '100%',
                      height:
                        item.capThickness === 0
                          ? 0
                          : item.capThickness || props.capThickness || 0,
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
          </View>
          {item.topLabelComponent && (
            <View
              style={[
                {
                  position: 'absolute',
                  top: (item.barWidth || 30) * -1,
                  height: item.barWidth || 30,
                  width: item.barWidth || 30,
                  justifyContent:
                    props.horizontal && !props.intactTopLabel
                      ? 'center'
                      : 'flex-end',
                  alignItems: 'center',
                  opacity: opacity,
                },
                props.horizontal &&
                  !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
                item.topLabelContainerStyle,
              ]}>
              {item.topLabelComponent()}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Animated2DWithGradient;
