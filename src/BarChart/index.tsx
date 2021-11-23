import React, {useEffect} from 'react';
import {View, FlatList, Animated, Easing, Text, ColorValue} from 'react-native';
import {styles} from './styles';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import Rule from '../Components/lineSvg';

type PropTypes = {
  width?: number;
  height?: number;
  noOfSections?: number;
  maxValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  data?: any;
  stackData?: any;
  side?: String;
  rotateLabel?: Boolean;
  isAnimated?: Boolean;
  animationDuration?: number;
  animationEasing?: any;
  opacity?: number;
  isThreeD?: Boolean;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisTextStyle?: any;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;
  initialSpacing?: number;
  barWidth?: number;
  sideWidth?: number;

  cappedBars?: Boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;

  hideAxesAndRules?: Boolean;
  hideRules?: Boolean;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  rulesType?: String;
  dashWidth?: number;
  dashGap?: number;
  showReferenceLine1?: Boolean;
  referenceLine1Config?: referenceConfigType;
  referenceLine1Position?: number;
  showReferenceLine2?: Boolean;
  referenceLine2Config?: referenceConfigType;
  referenceLine2Position?: number;
  showReferenceLine3?: Boolean;
  referenceLine3Config?: referenceConfigType;
  referenceLine3Position?: number;
  showVerticalLines?: Boolean;
  verticalLinesThickness?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesZIndex?: number;

  showYAxisIndices?: Boolean;
  showXAxisIndices?: Boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;

  showFractionalValues?: Boolean;
  roundToDigits?: number;
  backgroundColor?: ColorValue;

  disableScroll?: Boolean;
  showScrollIndicator?: Boolean;
  roundedTop?: Boolean;
  roundedBottom?: Boolean;
  disablePress?: boolean;

  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  gradientColor?: ColorValue;
  showGradient?: Boolean;
  activeOpacity?: number;

  horizontal?: Boolean;
  yAxisAtTop?: Boolean;

  intactTopLabel?: Boolean;

  horizSections?: Array<sectionType>;
  barBorderRadius?: number;
  hideOrigin?: Boolean;
  labelWidth?: number;
  yAxisLabelTexts?: Array<string>;
};
type referenceConfigType = {
  thickness: number;
  width: number;
  color: ColorValue | String | any;
  type: String;
  dashWidth: number;
  dashGap: number;
};
type sectionType = {
  value: string;
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
  sideWidth?: number;
  labelTextStyle?: any;
  topLabelComponent?: Function;
  topLabelContainerStyle?: any;
  disablePress?: any;
  labelComponent?: View;
  spacing?: number;
};

export const BarChart = (props: PropTypes) => {
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  const horizSections = [{value: '0'}];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const data = props.data || [];
  const spacing = props.spacing === 0 ? 0 : props.spacing ? props.spacing : 20;
  const labelWidth = props.labelWidth || 0;

  let totalWidth = spacing;
  let maxItem = 0;
  if (props.stackData) {
    props.stackData.forEach(stackItem => {
      // console.log('stackItem', stackItem);
      let stackSum = stackItem.stacks.reduce(
        (acc, stack) => acc + stack.value,
        0,
      );
      // console.log('stackSum--->', stackSum);
      if (stackSum > maxItem) {
        maxItem = stackSum;
      }
      totalWidth +=
        (stackItem.stacks[0].barWidth || props.barWidth || 30) + spacing;
      // console.log('totalWidth for stack===', totalWidth);
    });
  } else {
    data.forEach((item: itemType) => {
      if (item.value > maxItem) {
        maxItem = item.value;
      }
      totalWidth +=
        (item.barWidth || props.barWidth || 30) +
        (item.spacing === 0 ? 0 : item.spacing || spacing);
      // console.log('totalWidth for bar===', totalWidth);
    });
  }
  if (props.showFractionalValues || props.roundToDigits) {
    maxItem *= 10 * (props.roundToDigits || 1);
    maxItem = maxItem + (10 - (maxItem % 10));
    maxItem /= 10 * (props.roundToDigits || 1);
    maxItem = parseFloat(maxItem.toFixed(props.roundToDigits || 1));
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
  }

  const maxValue = props.maxValue || maxItem;

  const stepValue = props.stepValue || maxValue / noOfSections;
  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  // const oldData = props.oldData || [];
  const side = props.side || '';
  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const animationDuration = props.animationDuration || 800;
  const animationEasing = props.animationEasing || Easing.ease;
  const opacity = props.opacity || 1;
  const isThreeD = props.isThreeD || false;

  const showVerticalLines = props.showVerticalLines || false;
  const rulesThickness =
    props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
  const rulesColor = props.rulesColor || 'lightgray';
  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;

  const showYAxisIndices = props.showYAxisIndices || false;
  const showXAxisIndices = props.showXAxisIndices || false;
  const yAxisIndicesHeight = props.yAxisIndicesHeight || 2;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const yAxisIndicesWidth = props.yAxisIndicesWidth || 4;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';
  const yAxisIndicesColor = props.yAxisIndicesColor || 'black';

  const xAxisThickness =
    props.xAxisThickness === 0
      ? props.xAxisThickness
      : props.xAxisThickness || 1;
  const xAxisColor = props.xAxisColor || 'black';

  const hideRules = props.hideRules || false;

  const yAxisThickness =
    props.yAxisThickness === 0
      ? props.yAxisThickness
      : props.yAxisThickness || 1;
  const yAxisColor = props.yAxisColor || 'black';
  const yAxisTextStyle = props.yAxisTextStyle;
  const showFractionalValues = props.showFractionalValues || false;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;
  const hideYAxisText = props.hideYAxisText || false;

  const backgroundColor = props.backgroundColor || 'transparent';
  const horizontal = props.horizontal || false;
  const yAxisAtTop = props.yAxisAtTop || false;
  const intactTopLabel = props.intactTopLabel || false;
  const hideOrigin = props.hideOrigin || false;

  const rulesType = props.rulesType || 'line';
  const dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
  const dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: horizontal
      ? props.width || totalWidth
      : (props.width || totalWidth) + 11,
    color: 'black',
    type: rulesType,
    dashWidth: dashWidth,
    dashGap: dashGap,
  };

  const showReferenceLine1 = props.showReferenceLine1 || false;
  const referenceLine1Position =
    props.referenceLine1Position === 0
      ? 0
      : props.referenceLine1Position || containerHeight / 2;
  const referenceLine1Config = props.referenceLine1Config
    ? {
        thickness: props.referenceLine1Config.thickness || rulesThickness,
        width: horizontal
          ? props.referenceLine1Config.width || props.width || totalWidth
          : (props.referenceLine1Config.width || props.width || totalWidth) +
            11,
        color: props.referenceLine1Config.color || 'black',
        type: props.referenceLine1Config.type || rulesType,
        dashWidth: props.referenceLine1Config.dashWidth || dashWidth,
        dashGap: props.referenceLine1Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  const showReferenceLine2 = props.showReferenceLine2 || false;
  const referenceLine2Position =
    props.referenceLine2Position === 0
      ? 0
      : props.referenceLine2Position || (3 * containerHeight) / 2;
  const referenceLine2Config = props.referenceLine2Config
    ? {
        thickness: props.referenceLine2Config.thickness || rulesThickness,
        width: horizontal
          ? props.referenceLine2Config.width || props.width || totalWidth
          : (props.referenceLine2Config.width || props.width || totalWidth) +
            11,
        color: props.referenceLine2Config.color || 'black',
        type: props.referenceLine2Config.type || rulesType,
        dashWidth: props.referenceLine2Config.dashWidth || dashWidth,
        dashGap: props.referenceLine2Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  const showReferenceLine3 = props.showReferenceLine3 || false;
  const referenceLine3Position =
    props.referenceLine3Position === 0
      ? 0
      : props.referenceLine3Position || containerHeight / 3;
  const referenceLine3Config = props.referenceLine3Config
    ? {
        thickness: props.referenceLine3Config.thickness || rulesThickness,
        width: horizontal
          ? props.referenceLine3Config.width || props.width || totalWidth
          : (props.referenceLine3Config.width || props.width || totalWidth) +
            11,
        color: props.referenceLine3Config.color || 'black',
        type: props.referenceLine3Config.type || rulesType,
        dashWidth: props.referenceLine3Config.dashWidth || dashWidth,
        dashGap: props.referenceLine3Config.dashGap || dashGap,
      }
    : defaultReferenceConfig;

  horizSections.pop();
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i;
    if (props.showFractionalValues || props.roundToDigits) {
      value = parseFloat(value.toFixed(props.roundToDigits || 1));
    }
    horizSections.push({
      value: props.yAxisLabelTexts
        ? props.yAxisLabelTexts[noOfSections - i] ?? value.toString()
        : value.toString(),
    });
  }

  const heightValue = new Animated.Value(0);
  const opacValue = new Animated.Value(0);

  const labelsAppear = () => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const moveBar = () => {
    heightValue.setValue(0);
    Animated.timing(heightValue, {
      toValue: 1,
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: false,
    }).start();
  };
  // console.log('olddata', oldData);

  useEffect(() => {
    moveBar();
    setTimeout(() => labelsAppear(), animationDuration);
  }, []);

  const animatedHeight = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderHorizSections = () => {
    return (
      <>
        {horizSections.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: horizontal
                    ? props.width || totalWidth
                    : props.width || totalWidth + 11,
                },
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    borderRightWidth: yAxisThickness,
                    borderColor: yAxisColor,
                  },
                  horizontal &&
                    !yAxisAtTop && {
                      transform: [{translateX: totalWidth + yAxisThickness}],
                    },
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                ]}>
                {!hideYAxisText ? (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      index === noOfSections && {marginBottom: stepHeight / -2},
                      horizontal && {
                        transform: [
                          {rotate: '270deg'},
                          {translateY: yAxisAtTop ? 0 : 50},
                        ],
                      },
                    ]}>
                    {showFractionalValues
                      ? sectionItems.value
                        ? sectionItems.value
                        : hideOrigin
                        ? ''
                        : '0'
                      : sectionItems.value
                      ? sectionItems.value.toString().split('.')[0]
                      : hideOrigin
                      ? ''
                      : '0'}
                  </Text>
                ) : null}
              </View>
              <View
                style={[
                  index === noOfSections
                    ? styles.lastLeftPart
                    : styles.leftPart,
                  {backgroundColor: backgroundColor},
                ]}>
                {index === noOfSections ? (
                  <View
                    style={[
                      styles.lastLine,
                      {height: xAxisThickness, backgroundColor: xAxisColor},
                    ]}
                  />
                ) : hideRules ? null : (
                  <Rule
                    config={{
                      thickness: rulesThickness,
                      color: rulesColor,
                      width: horizontal
                        ? props.width || totalWidth
                        : (props.width || totalWidth) + 11,
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: rulesType,
                    }}
                  />
                )}
                {index === 0 && showReferenceLine1 ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom:
                        (referenceLine1Position * containerHeight) / maxValue +
                        stepHeight / 2 -
                        referenceLine1Config.thickness / 2,
                      transform: [{translateY: containerHeight}],
                    }}>
                    <Rule config={referenceLine1Config} />
                  </View>
                ) : null}
                {index === 0 && showReferenceLine2 ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom:
                        (referenceLine2Position * containerHeight) / maxValue +
                        stepHeight / 2 -
                        referenceLine2Config.thickness / 2,
                      transform: [{translateY: containerHeight}],
                    }}>
                    <Rule config={referenceLine2Config} />
                  </View>
                ) : null}
                {index === 0 && showReferenceLine3 ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom:
                        (referenceLine3Position * containerHeight) / maxValue +
                        stepHeight / 2 -
                        referenceLine3Config.thickness / 2,
                      transform: [{translateY: containerHeight}],
                    }}>
                    <Rule config={referenceLine3Config} />
                  </View>
                ) : null}
                {showYAxisIndices && index !== noOfSections ? (
                  <View
                    style={[
                      {
                        position: 'absolute',
                        height: yAxisIndicesHeight,
                        width: yAxisIndicesWidth,
                        left: yAxisIndicesWidth / -2,
                        backgroundColor: yAxisIndicesColor,
                      },
                      horizontal &&
                        !yAxisAtTop && {
                          transform: [
                            {translateX: totalWidth + yAxisThickness},
                          ],
                        },
                    ]}
                  />
                ) : null}
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: containerHeight,
        },
        props.width && {width: props.width},
        horizontal && {transform: [{rotate: '90deg'}, {translateY: -15}]},
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      <FlatList
        style={[
          {
            marginLeft: initialSpacing + 6,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60 + xAxisThickness,
          },
          props.width && {width: props.width - 11},
          horizontal && {width: totalWidth},
        ]}
        scrollEnabled={!disableScroll}
        contentContainerStyle={[
          {
            height: containerHeight + 130,
            paddingLeft:
              ((data && data[0] && data[0].barWidth) || props.barWidth || 30) /
              2,
            alignItems: 'flex-end',
          },
          !props.width && {width: totalWidth},
        ]}
        showsHorizontalScrollIndicator={showScrollIndicator}
        horizontal
        data={props.stackData || data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          // console.log('index--->', index);
          // console.log('itemhere--->', item);
          if (props.stackData) {
            return (
              <RenderStackBars
                item={item}
                index={index}
                containerHeight={containerHeight}
                maxValue={maxValue}
                spacing={spacing}
                barWidth={props.barWidth}
                opacity={opacity}
                disablePress={props.disablePress}
                rotateLabel={rotateLabel}
                showVerticalLines={showVerticalLines}
                verticalLinesThickness={verticalLinesThickness}
                verticalLinesColor={verticalLinesColor}
                verticalLinesZIndex={verticalLinesZIndex}
                showXAxisIndices={showXAxisIndices}
                xAxisIndicesHeight={xAxisIndicesHeight}
                xAxisIndicesWidth={xAxisIndicesWidth}
                xAxisIndicesColor={xAxisIndicesColor}
                horizontal={horizontal}
                intactTopLabel={intactTopLabel}
                barBorderRadius={props.barBorderRadius}
              />
            );
          }
          return (
            <RenderBars
              item={item}
              index={index}
              containerHeight={containerHeight}
              maxValue={maxValue}
              spacing={item.spacing === 0 ? 0 : item.spacing || spacing}
              side={side}
              data={data}
              barWidth={props.barWidth}
              sideWidth={props.sideWidth}
              labelWidth={labelWidth}
              opacity={opacity}
              isThreeD={isThreeD}
              isAnimated={isAnimated}
              animationDuration={animationDuration}
              rotateLabel={rotateLabel}
              animatedHeight={animatedHeight}
              appearingOpacity={appearingOpacity}
              roundedTop={props.roundedTop}
              roundedBottom={props.roundedBottom}
              disablePress={props.disablePress}
              frontColor={props.frontColor}
              sideColor={props.sideColor}
              topColor={props.topColor}
              showGradient={props.showGradient}
              gradientColor={props.gradientColor}
              activeOpacity={props.activeOpacity}
              cappedBars={props.cappedBars}
              capThickness={props.capThickness}
              capColor={props.capColor}
              capRadius={props.capRadius}
              showVerticalLines={showVerticalLines}
              verticalLinesThickness={verticalLinesThickness}
              verticalLinesColor={verticalLinesColor}
              verticalLinesZIndex={verticalLinesZIndex}
              showXAxisIndices={showXAxisIndices}
              xAxisIndicesHeight={xAxisIndicesHeight}
              xAxisIndicesWidth={xAxisIndicesWidth}
              xAxisIndicesColor={xAxisIndicesColor}
              horizontal={horizontal}
              intactTopLabel={intactTopLabel}
              barBorderRadius={props.barBorderRadius}
            />
          );
        }}
      />
    </View>
  );
};
