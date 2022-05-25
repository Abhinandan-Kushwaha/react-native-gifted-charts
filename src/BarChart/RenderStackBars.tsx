import React, {Component} from 'react';
import {View, TouchableOpacity, Text, ColorValue} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import {Style} from 'util';

type Props = {
  style?: any;
  width?: number;
  height?: number;
  color?: ColorValue;
  topLabelComponent?: Component;
  topLabelContainerStyle?: Style;
  opacity?: number;
  label: String;
  labelTextStyle?: any;
  disablePress?: boolean;

  item: itemType;
  index: number;
  containerHeight?: number;
  maxValue: number;
  spacing?: number;
  propSpacing?: number;
  data?: any;
  barWidth?: number;

  rotateLabel?: Boolean;
  showXAxisIndices: Boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;
  horizontal: Boolean;
  intactTopLabel: Boolean;
  barBorderRadius?: number;
  xAxisThickness: number;
  barBackgroundPattern?: Function;
  patternId?: String;
  xAxisTextNumberOfLines: number;
  renderTooltip: Function;
  initialSpacing: number;
  selectedIndex: number;
  setSelectedIndex: Function;
  activeOpacity: number;
  stackData: Array<itemType>;
};
type itemType = {
  value?: number;
  onPress?: any;
  label?: String;
  barWidth?: number;
  spacing?: number;
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
  barBackgroundPattern?: Function;
  patternId?: String;
};
const RenderStackBars = (props: Props) => {
  const {
    barBackgroundPattern,
    patternId,
    item,
    index,
    containerHeight,
    maxValue,
    spacing,
    propSpacing,
    rotateLabel,
    xAxisThickness,
    label,
    labelTextStyle,
    xAxisTextNumberOfLines,
    renderTooltip,
    initialSpacing,
    selectedIndex,
    setSelectedIndex,
    activeOpacity,
    stackData,
  } = props;
  let leftSpacing = initialSpacing;
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (stackData[i].spacing === 0 ? 0 : stackData[i].spacing || propSpacing) +
      (stackData[i].stacks[0].barWidth || props.barWidth || 30);
  }
  const disablePress = props.disablePress || false;
  const renderLabel = (label: String, labelTextStyle: any) => {
    return (
      <View
        style={[
          {
            width:
              (item.stacks[0].barWidth || props.barWidth || 30) + spacing / 2,
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
          <Text style={[labelTextStyle]} numberOfLines={xAxisTextNumberOfLines}>
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
        (Math.abs(props.item.stacks[i].value) * (containerHeight || 200)) /
        (maxValue || 200);
    }
    return position;
  };

  const totalHeight = props.item.stacks.reduce(
    (acc, stack) =>
      acc +
      (Math.abs(stack.value) * (containerHeight || 200)) / (maxValue || 200),
    0,
  );

  const static2DSimple = (item: itemType) => {
    const cotainsNegative = item.stacks.some(item => item.value < 0);
    return (
      <>
        <TouchableOpacity
          disabled={disablePress}
          activeOpacity={activeOpacity}
          onPress={() => {
            setSelectedIndex(index);
            if (item.onPress) {
              item.onPress();
            }
          }}
          style={[
            {
              position: 'absolute',
              width: item.stacks[0].barWidth || props.barWidth || 30,
              height: '100%',
            },
            cotainsNegative && {
              transform: [
                {translateY: totalHeight + xAxisThickness / 2},
                {rotate: '180deg'},
              ],
            },
          ]}>
          {item.stacks.map((stackItem, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={stackItem.onPress}
                activeOpacity={activeOpacity}
                disabled={disablePress || !stackItem.onPress}
                style={[
                  {
                    position: 'absolute',
                    bottom: getPosition(index) + (stackItem.marginBottom || 0),
                    width: '100%',
                    height:
                      (Math.abs(stackItem.value) * (containerHeight || 200)) /
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
                ]}>
                {stackItem.innerBarComponent && stackItem.innerBarComponent()}
              </TouchableOpacity>
            );
          })}
          {(item.barBackgroundPattern || barBackgroundPattern) && (
            <Svg>
              <Defs>
                {item.barBackgroundPattern
                  ? item.barBackgroundPattern()
                  : barBackgroundPattern()}
              </Defs>
              <Rect
                stroke="transparent"
                x="1"
                y="1"
                width="100%"
                height="100%"
                fill={`url(#${item.patternId || patternId})`}
              />
            </Svg>
          )}
        </TouchableOpacity>
        {item.topLabelComponent && (
          <View
            style={[
              {
                position: 'absolute',
                top: cotainsNegative
                  ? 0
                  : (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent: 'center',
                alignItems: 'center',
              },
              cotainsNegative && {transform: [{translateY: totalHeight * 2}]},
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
    <>
      <View
        style={[
          {
            // overflow: 'visible',
            marginBottom: 60,
            width: item.stacks[0].barWidth || props.barWidth || 30,
            height: totalHeight,
            marginRight: spacing,
          },
        ]}>
        {/* {props.showVerticalLines && (
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
        )} */}
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
        {renderLabel(label || '', labelTextStyle)}
      </View>
      {renderTooltip && selectedIndex === index && (
        <View
          style={{
            position: 'absolute',
            bottom: totalHeight + 60,
            left: leftSpacing,
            zIndex: 1000,
          }}>
          {renderTooltip(item, index)}
        </View>
      )}
    </>
  );
};

export default RenderStackBars;
