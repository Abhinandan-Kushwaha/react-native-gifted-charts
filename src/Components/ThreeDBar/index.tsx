import React from 'react';
import {View, StyleSheet, ColorValue} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

type PropTypes = {
  style: any;
  width: number;
  sideWidth: number;
  height: number;
  color: ColorValue;
  showGradient: Boolean;
  gradientColor: any;
  frontColor: ColorValue;
  sideColor: ColorValue;
  topColor: ColorValue;
  topLabelComponent: Function;
  topLabelContainerStyle: any;
  opacity: number;
  side: String;
  horizontal: Boolean;
  intactTopLabel: Boolean;
};

type TriangleProps = {
  color: ColorValue;
  width: number;
  style: any;
};

const TriangleCorner = (props: TriangleProps) => {
  return (
    <View
      style={[
        aStyles.triangleCorner,
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

const aStyles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
  },
});

const ThreeDBar = (props: PropTypes) => {
  const width = props.width;
  const sideWidth = props.sideWidth;
  const height = props.height;

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
      {props.height ? (
        <View
          style={[
            styles.row,
            props.side === 'right' && {transform: [{rotateY: '180deg'}]},
          ]}>
          {/*******************          Top View             *****************/}

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
                height: (3 * width) / 4,
                // left: width / -8,
                backgroundColor: topColor,
                opacity: opacity,
              }}
            />
          </View>
          <View
            style={{position: 'absolute', top: sideWidth / -2, left: width}}>
            <TriangleCorner
              color={topColor}
              width={sideWidth}
              style={{transform: [{rotate: '-90deg'}], opacity: opacity}}
            />
          </View>

          {/*******************************************************************/}

          <View style={{marginTop: sideWidth / -2}}>
            <TriangleCorner
              color={sideColor}
              width={sideWidth}
              style={{transform: [{rotate: '-90deg'}], opacity: opacity}}
            />
            <View
              style={{
                width: sideWidth / 2,
                height: height - sideWidth / 2,
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

          <View
            style={{
              width: width,
              height: height,
              backgroundColor: frontColor,
              borderLeftWidth: StyleSheet.hairlineWidth,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: 'white',
              opacity: opacity,
            }}>
            {showGradient && (
              <LinearGradient
                style={{position: 'absolute', width: '100%', height: '100%'}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[gradientColor, frontColor]}
              />
            )}
          </View>
        </View>
      ) : null}

      {/*******************          Top Label            *****************/}

      {topLabelComponent && (
        <View
          style={[
            {
              position: 'absolute',
              top: width * -2,
              height: (width * 3) / 2,
              width: width,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            props.horizontal &&
              !props.intactTopLabel && {transform: [{rotate: '270deg'}]},
            props.side === 'right'
              ? {right: (-1 * width) / 4}
              : {left: (-1 * width) / 4},
            topLabelContainerStyle,
          ]}>
          {topLabelComponent()}
        </View>
      )}

      {/*******************************************************************/}
    </View>
  );
};

export default ThreeDBar;
