import React, {Component} from 'react';
import {View, TouchableOpacity, Text, ColorValue} from 'react-native';
import {Style} from 'util';

type Props = {
  style?: any;
  width?: number;
  height?: number;
  color?: ColorValue;
  topLabelComponent?: Component;
  topLabelContainerStyle?: Style;
  opacity?: number;
  labelTextStyle?: any;
  disablePress?: boolean;

  item: itemType;
  index: number;
  containerHeight?: number;
  maxValue: number;
  spacing?: number;
  data?: any;
  barWidth?: number;

  rotateLabel?: Boolean;
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
};
type itemType = {
  value?: number;
  onPress?: any;
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
  borderRadius?: number;
  stacks?: Array<any>;
};
const RenderStackBars = (props: Props) => {
  const {item, containerHeight, maxValue, spacing, rotateLabel} = props;
  const disablePress = props.disablePress || false;
  const renderLabel = (label: String, labelTextStyle: any) => {
    return (
      <View
        style={[
          {
            width:
              (item.stacks[0].barWidth || props.barWidth || 30) + spacing / 2,
            left: -6,
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
          <Text style={[labelTextStyle]} numberOfLines={1}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const getPosition = (index: number) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position +=
        (props.item.stacks[i].value * (containerHeight || 200)) /
        (maxValue || 200);
    }
    return position;
  };

  const getTotalHeight = () => {
    return props.item.stacks.reduce((acc, stack) => acc + stack.value, 0);
  };

  const static2DSimple = (item: itemType) => {
    // console.log('comes to static2DSimple', item);
    return (
      <>
        <View
          style={[
            {
              position: 'absolute',
              width: item.stacks[0].barWidth || props.barWidth || 30,
              height: '100%',
            },
          ]}>
          {item.stacks.map((stackItem, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={stackItem.onPress}
                disabled={disablePress}
                style={[
                  {
                    position: 'absolute',
                    bottom: getPosition(index) + (stackItem.marginBottom || 0),
                    width: '100%',
                    height:
                      (stackItem.value * (containerHeight || 200)) /
                        (maxValue || 200) -
                      (stackItem.marginBottom || 0),
                    backgroundColor: stackItem.color || 'black',
                    borderRadius:
                      stackItem.borderRadius || props.barBorderRadius || 0,
                  },
                  !props.barBorderRadius &&
                    !stackItem.borderRadius && {
                      borderTopLeftRadius: stackItem.borderTopLeftRadius || 0,
                      borderTopRightRadius: stackItem.borderTopRightRadius || 0,
                      borderBottomLeftRadius:
                        stackItem.borderBottomLeftRadius || 0,
                      borderBottomRightRadius:
                        stackItem.borderBottomRightRadius || 0,
                    },
                ]}
              />
            );
          })}
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
    <View
      style={[
        {
          // overflow: 'visible',
          marginBottom: 60,
          width: item.stacks[0].barWidth || props.barWidth || 30,
          height: getTotalHeight(),
          marginRight: spacing,
        },
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
      {static2DSimple(item)}
      {renderLabel(item.label || '', item.labelTextStyle)}
    </View>
  );
};

export default RenderStackBars;
