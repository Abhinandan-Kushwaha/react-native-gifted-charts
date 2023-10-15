import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ColorValue,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Defs, Rect} from 'react-native-svg';
import {styles} from './styles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type trianglePropTypes = {
  style: any;
  width: number;
  color: ColorValue;
};

type animatedBarPropTypes = {
  animationDuration: number;
  width: number;
  sideWidth: number;
  height: number;
  showGradient: boolean;
  gradientColor: any;
  frontColor: ColorValue;
  sideColor: ColorValue;
  topColor: ColorValue;
  topLabelComponent: any;
  topLabelContainerStyle: any;
  opacity: number;
  side: String;
  horizontal: boolean;
  intactTopLabel: boolean;
  barBackgroundPattern?: Function;
  patternId?: String;
  barStyle?: object;
  item: any;
};

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

const AnimatedBar = (props: animatedBarPropTypes) => {
  const [initialRender, setInitialRender] = useState(true);
  const [height, setHeight] = useState(Platform.OS === 'ios' ? 0 : 20);

  const animationDuration = props.animationDuration || 800;

  useEffect(() => {
    if (initialRender) {
      // labelsAppear();
      // increaseOpacity();
      setTimeout(() => {
        layoutAppear();
      }, 20);
    } else {
      elevate();
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

  const {item, width, sideWidth, barStyle} = props;

  const {barBackgroundPattern, patternId} = props;

  const showGradient = props.showGradient || false;
  const gradientColor = props.gradientColor || 'white';

  const frontColor = props.frontColor || '#fe2233';
  const sideColor = props.sideColor || '#cc2233';
  const topColor = props.topColor || '#ff4433';

  const topLabelComponent = props.topLabelComponent || null;
  const topLabelContainerStyle = props.topLabelContainerStyle || {};

  const opacity = props.opacity || 1;

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
                    width: width,
                    height: width * 0.4,
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
                  left: width,
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

          {props.height ? (
            <View style={{marginTop: sideWidth / -2}}>
              <TriangleCorner
                color={sideColor}
                width={sideWidth}
                style={{transform: [{rotate: '-90deg'}], opacity: opacity}}
              />
              <View
                style={{
                  width: sideWidth / 2,
                  height: height - sideWidth / 2, //animatedSideHeight
                  backgroundColor: sideColor,
                  opacity: opacity,
                }}
              />
              <TriangleCorner
                color={sideColor}
                width={sideWidth}
                style={{transform: [{rotate: '90deg'}], opacity: opacity}}
              />
            </View>
          ) : null}

          <View
            style={[{
              width: width,
              height: height, //animatedHeight
              backgroundColor: frontColor,
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: 'white',
              opacity: opacity,
            },
            item.barStyle || barStyle
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
                  width={width || 30}
                  height={height}
                  fill={`url(#${patternId})`}
                />
              </Svg>
            )}
          </View>

          {/*******************          Top Label            *****************/}

          {topLabelComponent && (
            <View
              style={[
                {
                  position: 'absolute',
                  top: width * -2,
                  height: (width * 3) / 2,
                  width: (width * 3) / 2,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  opacity: opacity,
                },
                props.horizontal &&
                  !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
                props.side === 'right' && {transform: [{rotateY: '180deg'}]},
                topLabelContainerStyle,
              ]}>
              {topLabelComponent()}
            </View>
          )}

          {/*******************************************************************/}
        </View>
      )}
    </View>
  );
};

export default AnimatedBar;
