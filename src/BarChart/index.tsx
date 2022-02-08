import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  ColorValue,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import Rule from '../Components/lineSvg';
import {bezierCommand, svgPath} from '../utils';
import Svg, {Circle, Path, Rect, Text as CanvasText} from 'react-native-svg';
import { useRef } from 'react';

type PropTypes = {
  width?: number;
  height?: number;
  noOfSections?: number;
  noOfSectionsBelowXAxis?: number;
  maxValue?: number;
  minValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  data?: any;
  stackData?: any;
  side?: String;
  rotateLabel?: Boolean;
  isAnimated?: Boolean;
  animationDuration?: number;
  // animationEasing?: any;
  opacity?: number;
  isThreeD?: Boolean;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisTextStyle?: any;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;
  yAxisSide?: string;
  initialSpacing?: number;
  barWidth?: number;
  sideWidth?: number;
  showLine?: Boolean;
  lineConfig?: lineConfigType;

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
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  autoShiftLabels?: Boolean;
  scrollToEnd?: Boolean;
  scrollAnimation?: Boolean
};
type lineConfigType = {
  curved?: Boolean;
  isAnimated?: Boolean;
  delay?: number;
  thickness?: number;
  color?: ColorValue | String | any;
  hideDataPoints?: Boolean;
  dataPointsShape?: String;
  dataPointsWidth?: number;
  dataPointsHeight?: number;
  dataPointsColor?: ColorValue | String | any;
  dataPointsRadius?: number;
  textColor?: ColorValue | String | any;
  textFontSize?: number;
  textShiftX?: number;
  textShiftY?: number;
  shiftY?: number;
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
  const scrollRef = useRef();
  const [points, setPoints] = useState('');
  const showLine = props.showLine || false;
  const defaultLineConfig = {
    curved: false,
    isAnimated: false,
    thickness: 1,
    color: 'black',
    hideDataPoints: false,
    dataPointsShape: 'circular',
    dataPointsWidth: 2,
    dataPointsHeight: 2,
    dataPointsColor: 'black',
    dataPointsRadius: 3,
    textColor: 'gray',
    textFontSize: 10,
    textShiftX: 0,
    textShiftY: 0,
    shiftY: 0,
    delay: 0,
  };
  const lineConfig = props.lineConfig
    ? {
        curved: props.lineConfig.curved || defaultLineConfig.curved,
        isAnimated: props.lineConfig.isAnimated || defaultLineConfig.isAnimated,
        thickness: props.lineConfig.thickness || defaultLineConfig.thickness,
        color: props.lineConfig.color || defaultLineConfig.color,
        hideDataPoints:
          props.lineConfig.hideDataPoints || defaultLineConfig.hideDataPoints,
        dataPointsShape:
          props.lineConfig.dataPointsShape || defaultLineConfig.dataPointsShape,
        dataPointsHeight:
          props.lineConfig.dataPointsHeight ||
          defaultLineConfig.dataPointsHeight,
        dataPointsWidth:
          props.lineConfig.dataPointsWidth || defaultLineConfig.dataPointsWidth,
        dataPointsColor:
          props.lineConfig.dataPointsColor || defaultLineConfig.dataPointsColor,
        dataPointsRadius:
          props.lineConfig.dataPointsRadius ||
          defaultLineConfig.dataPointsRadius,
        textColor: props.lineConfig.textColor || defaultLineConfig.textColor,
        textFontSize:
          props.lineConfig.textFontSize || defaultLineConfig.textFontSize,
        textShiftX: props.lineConfig.textShiftX || defaultLineConfig.textShiftX,
        textShiftY: props.lineConfig.textShiftY || defaultLineConfig.textShiftY,
        shiftY: props.lineConfig.shiftY || defaultLineConfig.shiftY,
        delay: props.lineConfig.delay || defaultLineConfig.delay,
      }
    : defaultLineConfig;
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  const horizSections = [{value: '0'}];
  const horizSectionsBelow = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const data = useMemo(() => props.data || [], [props.data]);
  const spacing = props.spacing === 0 ? 0 : props.spacing ? props.spacing : 20;
  const labelWidth = props.labelWidth || 0;
  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;

  let totalWidth = spacing;
  let maxItem = 0, minItem = 0;
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
      if(stackSum < minItem){
        minItem = stackSum;
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
      if(item.value < minItem){
        minItem = item.value;
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
    if(minItem !== 0){
      minItem *= 10 * (props.roundToDigits || 1);
      minItem = minItem - (10 + (minItem % 10));
      minItem /= 10 * (props.roundToDigits || 1);
      minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
    if(minItem !== 0){
      minItem = minItem - (10 + (minItem % 10))
    }
  }

  const maxValue = props.maxValue || maxItem;
  const minValue = props.minValue || minItem;

  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis || (-minValue / stepValue);
  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  // const oldData = props.oldData || [];
  const side = props.side || '';
  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const animationDuration = props.animationDuration || 800;
  // const animationEasing = props.animationEasing || Easing.ease;
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

  const yAxisLabelPrefix = props.yAxisLabelPrefix || '';
  const yAxisLabelSuffix = props.yAxisLabelSuffix || '';
  const yAxisSide = props.yAxisSide || 'left';

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

  const heightValue = useMemo(() => new Animated.Value(0), []);
  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const autoShiftLabels = props.autoShiftLabels || false;

  const labelsAppear = useCallback(() => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacValue]);
  // const moveBar = useCallback(() => {
  //   heightValue.setValue(0);
  //   Animated.timing(heightValue, {
  //     toValue: 1,
  //     duration: animationDuration,
  //     easing: animationEasing,
  //     useNativeDriver: false,
  //   }).start();
  // }, [animationDuration, animationEasing, heightValue]);

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);
  // console.log('olddata', oldData);

  useEffect(() => {
    if (showLine) {
      let pp = '';
      if (!lineConfig.curved) {
        for (let i = 0; i < data.length; i++) {
          const currentBarWidth =
            (data && data[i] && data[i].barWidth) || props.barWidth || 30;
          pp +=
            'L' +
            (yAxisLabelWidth +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * i) +
            ' ' +
            (containerHeight -
              lineConfig.shiftY +
              10 -
              (data[i].value * containerHeight) / maxValue) +
            ' ';
        }
        setPoints(pp.replace('L', 'M'));
      } else {
        let p1Array = [];
        for (let i = 0; i < data.length; i++) {
          const currentBarWidth =
            (data && data[i] && data[i].barWidth) || props.barWidth || 30;
          p1Array.push([
            yAxisLabelWidth +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * i,
            containerHeight -
              lineConfig.shiftY +
              10 -
              (data[i].value * containerHeight) / maxValue,
          ]);
          let xx = svgPath(p1Array, bezierCommand);
          setPoints(xx);
        }
      }
      if (lineConfig.isAnimated) {
        setTimeout(() => decreaseWidth(), lineConfig.delay || 0);
      }
    }
    // moveBar();
    setTimeout(() => labelsAppear(), animationDuration);
  }, [
    animationDuration,
    containerHeight,
    data,
    decreaseWidth,
    initialSpacing,
    labelsAppear,
    lineConfig.curved,
    lineConfig.dataPointsWidth,
    lineConfig.shiftY,
    lineConfig.isAnimated,
    lineConfig.delay,
    maxValue,
    // moveBar,
    props.barWidth,
    showLine,
    spacing,
    yAxisLabelWidth,
  ]);

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
  if(noOfSectionsBelowXAxis){
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (props.showFractionalValues || props.roundToDigits) {
        value = parseFloat(value.toFixed(props.roundToDigits || 1));
      }
      horizSectionsBelow.push({
        value: props.yAxisLabelTexts
        ? props.yAxisLabelTexts[noOfSectionsBelowXAxis - i] ?? value.toString()
        : value.toString(),
      })
    }
  }

  const animatedHeight = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const getLabel = val => {
    let label = '';
    if (showFractionalValues) {
      if (val) {
        label = val;
      } else {
        label = '0';
      }
    } else {
      if (val) {
        label = val.toString().split('.')[0];
      } else {
        label = '0';
      }
    }

    return yAxisLabelPrefix + label + yAxisLabelSuffix;
  };

  const renderHorizSections = () => {
    return (
      <>
        {horizSections.map((sectionItems, index) => {
          let label = getLabel(sectionItems.value);
          if (hideOrigin && index === horizSections.length - 1) {
            label = '';
          }
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
                yAxisSide === 'right' && {transform:[{rotateY:'180deg'}]}
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
                      horizontal ? {
                        transform: [
                          {rotate: '270deg'},
                          {translateY: yAxisAtTop ? 0 : 50},
                        ],
                      }:
                      yAxisSide === 'right' && {transform:[{rotateY:'180deg'}]}
                    ]}>
                    {label}
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
        {horizSectionsBelow.map((sectionItems, index) => {
          let label = getLabel(sectionItems.value);
          if (hideOrigin && index === horizSections.length - 1) {
            label = '';
          }
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
                index===0&&{marginTop:stepHeight/2}
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
                    height: index===0?stepHeight*1.5:stepHeight,
                    width: yAxisLabelWidth,
                  },
                  index===0&&{marginTop:-stepHeight/2}
                ]}>
                {!hideYAxisText ? (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      index === 0 && {marginBottom: stepHeight / -2},
                      horizontal && {
                        transform: [
                          {rotate: '270deg'},
                          {translateY: yAxisAtTop ? 0 : 50},
                        ],
                      },
                    ]}>
                    {label}
                  </Text>
                ) : null}
              </View>
              <View
                style={[
                   styles.leftPart,
                   {backgroundColor: backgroundColor},
                ]}>
                {hideRules ? null : (
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
              </View>
            </View>
          )
        })}
      </>
    );
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: any, index: number) => {
      if (item.showVerticalLine) {
        const currentBarWidth = item.barWidth || props.barWidth || 30;
        return (
          <Rect
            x={
              yAxisLabelWidth +
              6 -
              (item.verticalLineThickness || 1) / 2 -
              1 -
              (initialSpacing - currentBarWidth / 2) +
              (currentBarWidth + spacing) * index
            }
            y={
              containerHeight -
              lineConfig.shiftY -
              (item.value * containerHeight) / maxValue +
              9
            }
            width={item.verticalLineThickness || 1}
            height={
              (item.value * containerHeight) / maxValue + lineConfig.shiftY
            }
            fill={item.verticalLineColor || 'lightgray'}
          />
        );
      }
      return null;
    });
  };

  const renderDataPoints = () => {
    return data.map((item: any, index: number) => {
      // console.log('comes in');
      const currentBarWidth = item.barWidth || props.barWidth || 30;
      if (lineConfig.dataPointsShape === 'rectangular') {
        return (
          <Fragment key={index}>
            <Rect
              x={
                yAxisLabelWidth +
                6 -
                (initialSpacing - currentBarWidth / 2) -
                lineConfig.dataPointsWidth +
                (currentBarWidth + spacing) * index
              }
              y={
                containerHeight -
                lineConfig.shiftY -
                lineConfig.dataPointsHeight / 2 +
                10 -
                (item.value * containerHeight) / maxValue
              }
              width={lineConfig.dataPointsWidth}
              height={lineConfig.dataPointsHeight}
              fill={lineConfig.dataPointsColor}
            />
            {item.dataPointText && (
              <CanvasText
                fill={item.textColor || lineConfig.textColor}
                fontSize={item.textFontSize || lineConfig.textFontSize}
                x={
                  yAxisLabelWidth +
                  6 -
                  (initialSpacing - currentBarWidth / 2) -
                  lineConfig.dataPointsWidth +
                  (currentBarWidth + spacing) * index +
                  (item.textShiftX || lineConfig.textShiftX || 0)
                }
                y={
                  containerHeight -
                  lineConfig.shiftY -
                  lineConfig.dataPointsHeight / 2 +
                  10 -
                  (item.value * containerHeight) / maxValue +
                  (item.textShiftY || lineConfig.textShiftY || 0)
                }>
                {item.dataPointText}
              </CanvasText>
            )}
          </Fragment>
        );
      }
      return (
        <Fragment key={index}>
          <Circle
            cx={
              yAxisLabelWidth +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * index
            }
            cy={
              containerHeight -
              lineConfig.shiftY +
              10 -
              (item.value * containerHeight) / maxValue
            }
            r={lineConfig.dataPointsRadius}
            fill={lineConfig.dataPointsColor}
          />
          {item.dataPointText && (
            <CanvasText
              fill={item.textColor || lineConfig.textColor}
              fontSize={item.textFontSize || lineConfig.textFontSize}
              x={
                yAxisLabelWidth +
                6 -
                (initialSpacing - currentBarWidth / 2) -
                lineConfig.dataPointsWidth +
                (currentBarWidth + spacing) * index +
                (item.textShiftX || lineConfig.textShiftX || 0)
              }
              y={
                containerHeight -
                lineConfig.shiftY -
                lineConfig.dataPointsHeight / 2 +
                10 -
                (item.value * containerHeight) / maxValue +
                (item.textShiftY || lineConfig.textShiftY || 0)
              }>
              {item.dataPointText}
            </CanvasText>
          )}
        </Fragment>
      );
    });
  };
  const renderSpecificDataPoints = dataForRender => {
    return dataForRender.map((item: any, index: number) => {
      const currentBarWidth = item.barWidth || props.barWidth || 30;
      if (item.showDataPoint) {
        if (item.dataPointShape === 'rectangular') {
          return (
            <Fragment key={index}>
              <Rect
                x={
                  initialSpacing -
                  (item.dataPointWidth || 2) / 2 -
                  1 +
                  (currentBarWidth + spacing) * index
                }
                y={
                  containerHeight -
                  lineConfig.shiftY -
                  (item.dataPointHeight || 2) / 2 +
                  10 -
                  (item.value * containerHeight) / maxValue
                }
                width={item.dataPointWidth || 2}
                height={item.dataPointHeight || 2}
                fill={item.dataPointColor || 'black'}
              />
              {item.dataPointText && (
                <CanvasText
                  fill={item.textColor || 'black'}
                  fontSize={item.textFontSize || 10}
                  x={
                    initialSpacing -
                    (item.dataPointWidth || 2) +
                    spacing * index +
                    (item.textShiftX || lineConfig.textShiftX || 0)
                  }
                  y={
                    containerHeight -
                    lineConfig.shiftY -
                    (item.dataPointHeight || 2) / 2 +
                    10 -
                    (item.value * containerHeight) / maxValue +
                    (item.textShiftY || lineConfig.textShiftY || 0)
                  }>
                  {item.dataPointText}
                </CanvasText>
              )}
            </Fragment>
          );
        } else {
          return (
            <Fragment key={index}>
              <Circle
                cx={
                  initialSpacing -
                  (item.dataPointWidth || 2) / 2 +
                  spacing * index
                }
                cy={
                  containerHeight -
                  lineConfig.shiftY +
                  10 -
                  (item.value * containerHeight) / maxValue
                }
                r={item.dataPointRadius || 3}
                fill={item.dataPointColor || 'black'}
              />
              {item.dataPointText && (
                <CanvasText
                  fill={item.textColor || 'black'}
                  fontSize={item.textFontSize || 10}
                  x={
                    initialSpacing -
                    (item.dataPointWidth || 2) +
                    spacing * index +
                    (item.textShiftX || lineConfig.textShiftX || 0)
                  }
                  y={
                    containerHeight -
                    lineConfig.shiftY -
                    (item.dataPointHeight || 2) / 2 +
                    10 -
                    (item.value * containerHeight) / maxValue +
                    (item.textShiftY || lineConfig.textShiftY || 0)
                  }>
                  {item.dataPointText}
                </CanvasText>
              )}
            </Fragment>
          );
        }
      }
      return null;
    });
  };

  const renderAnimatedLine = () => {
    // console.log('animatedWidth is-------->', animatedWidth);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: containerHeight + 10,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: -1,
          // backgroundColor: 'wheat',
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
          />

          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints()
            : renderSpecificDataPoints(data)}
        </Svg>
      </Animated.View>
    );
  };

  const renderLine = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: containerHeight + 10,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: totalWidth,
          zIndex: -1,
          // backgroundColor: 'rgba(200,150,150,0.1)'
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
          />
          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints()
            : renderSpecificDataPoints(data)}
        </Svg>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: containerHeight + horizSectionsBelow.length * stepHeight,
        },
        yAxisSide === 'right' && {marginLeft: yAxisLabelWidth + yAxisThickness },
        props.width && {width: props.width},
        horizontal && {transform: [{rotate: '90deg'}, {translateY: -15}]},
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={()=>{
          if(scrollRef.current && scrollToEnd){        
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          }
        }}
        style={[
          {
            marginLeft: yAxisSide === 'right' ? -yAxisLabelWidth+10 : yAxisLabelWidth,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60 + xAxisThickness,
          },
          props.width && {width: props.width - 11},
          horizontal && {width: totalWidth},
        ]}
        scrollEnabled={!disableScroll}
        contentContainerStyle={[
          {
            // backgroundColor: 'yellow',
            height: containerHeight + 130 + horizSectionsBelow.length * stepHeight,
            paddingLeft: initialSpacing,
            paddingBottom:horizSectionsBelow.length * stepHeight,
            alignItems: 'flex-end',
          },
          !props.width && {width: totalWidth},
        ]}
        showsHorizontalScrollIndicator={showScrollIndicator}
        horizontal
        // data={props.stackData || data}
        keyExtractor={(item, index) => index.toString()}>
        <Fragment>
          {showLine
            ? lineConfig.isAnimated
              ? renderAnimatedLine()
              : renderLine()
            : null}
          {props.stackData
            ? props.stackData.map((item, index) => {
                return (
                  <RenderStackBars
                    key={index}
                    item={item}
                    index={index}
                    containerHeight={containerHeight}
                    maxValue={maxValue}
                    spacing={spacing}
                    xAxisThickness={xAxisThickness}
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
              })
            : data.map((item, index) => (
                <RenderBars
                  key={index}
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
                  autoShiftLabels={autoShiftLabels}
                />
              ))}
        </Fragment>
      </ScrollView>
    </View>
  );
};