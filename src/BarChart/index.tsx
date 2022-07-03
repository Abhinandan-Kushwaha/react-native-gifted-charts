import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
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

type PropTypes = {
  width?: number;
  height?: number;
  minHeight?: number;
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
  xAxisLength?: number;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  xAxisType?: String;
  yAxisLabelContainerStyle?: any;
  horizontalRulesStyle?: any;
  yAxisTextStyle?: any;
  yAxisTextNumberOfLines?: number;
  xAxisTextNumberOfLines?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;
  yAxisSide?: string;
  yAxisOffset?: number;
  initialSpacing?: number;
  barWidth?: number;
  sideWidth?: number;
  showLine?: Boolean;
  lineData?: any;
  lineConfig?: lineConfigType;
  lineBehindBars?: boolean;

  cappedBars?: Boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;

  hideAxesAndRules?: Boolean;
  hideRules?: Boolean;
  rulesLength?: number;
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
  verticalLinesHeight?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesZIndex?: number;
  noOfVerticalLines?: number;
  verticalLinesSpacing?: number;

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
  indicatorColor?: 'black' | 'default' | 'white';
  roundedTop?: Boolean;
  roundedBottom?: Boolean;
  disablePress?: boolean;

  frontColor?: ColorValue;
  color?: ColorValue;
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
  xAxisLabelTexts?: Array<string>;
  xAxisLabelTextStyle?: any;
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  autoShiftLabels?: Boolean;
  scrollToEnd?: Boolean;
  scrollAnimation?: Boolean;
  labelsExtraHeight?: number;
  barBackgroundPattern?: Function;
  patternId?: String;
  barMarginBottom?: number;
  onPress?: Function;
  renderTooltip?: Function;
  leftShiftForTooltip?: number;
  leftShiftForLastIndexTooltip?: number;
  barStyle?: object;
};
type lineConfigType = {
  initialSpacing?: number;
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
  startIndex?: number;
  endIndex?: number;
  showArrow?: boolean;
  arrowConfig?: arrowType;
};
type arrowType = {
  length?: number;
  width?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  showArrowBase?: boolean;
};
type referenceConfigType = {
  thickness: number;
  width: number;
  color: ColorValue | String | any;
  type: String;
  dashWidth: number;
  dashGap: number;
  labelText: String;
  labelTextStyle: any;
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
  barBackgroundPattern?: Function;
  patternId?: String;
  barStyle?: object;
};

export const BarChart = (props: PropTypes) => {
  const scrollRef = useRef();
  const [points, setPoints] = useState('');
  const [arrowPoints, setArrowPoints] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const showLine = props.showLine || false;
  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  const data = useMemo(() => {
    if (!props.data) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data.map(item => {
        item.value = item.value - props.yAxisOffset;
        return item;
      });
    }
    return props.data;
  }, [props.yAxisOffset, props.data]);
  const lineData = props.lineData || data;
  const lineBehindBars = props.lineBehindBars || false;
  const defaultLineConfig = {
    initialSpacing: initialSpacing,
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
    startIndex: 0,
    endIndex: lineData.length - 1,
    showArrow: false,
    arrowConfig: {
      length: 10,
      width: 10,
      strokeWidth: 1,
      strokeColor: 'black',
      fillColor: 'none',
      showArrowBase: true,
    },
  };
  const lineConfig = props.lineConfig
    ? {
        initialSpacing:
          props.lineConfig.initialSpacing === 0
            ? 0
            : props.lineConfig.initialSpacing ||
              defaultLineConfig.initialSpacing,
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
        startIndex: props.lineConfig.startIndex || defaultLineConfig.startIndex,
        endIndex:
          props.lineConfig.endIndex === 0
            ? 0
            : props.lineConfig.endIndex || defaultLineConfig.endIndex,

        showArrow: props.lineConfig.showArrow ?? defaultLineConfig.showArrow,
        arrowConfig: {
          length:
            props.lineConfig.arrowConfig?.length ??
            defaultLineConfig.arrowConfig.length,
          width:
            props.lineConfig.arrowConfig?.width ??
            defaultLineConfig.arrowConfig.width,

          strokeWidth:
            props.lineConfig.arrowConfig?.strokeWidth ??
            defaultLineConfig.arrowConfig.strokeWidth,

          strokeColor:
            props.lineConfig.arrowConfig?.strokeColor ??
            defaultLineConfig.arrowConfig.strokeColor,

          fillColor:
            props.lineConfig.arrowConfig?.fillColor ??
            defaultLineConfig.arrowConfig.fillColor,

          showArrowBase:
            props.lineConfig.arrowConfig?.showArrowBase ??
            defaultLineConfig.arrowConfig.showArrowBase,
        },
      }
    : defaultLineConfig;
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  const horizSections = [{value: '0'}];
  const horizSectionsBelow = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const spacing = props.spacing === 0 ? 0 : props.spacing || 20;
  const labelWidth = props.labelWidth || 0;
  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;
  const labelsExtraHeight = props.labelsExtraHeight || 0;

  let totalWidth = spacing;
  let maxItem = 0,
    minItem = 0;
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
      if (stackSum < minItem) {
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
      if (item.value < minItem) {
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
    if (minItem !== 0) {
      minItem *= 10 * (props.roundToDigits || 1);
      minItem = minItem - (10 + (minItem % 10));
      minItem /= 10 * (props.roundToDigits || 1);
      minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
    if (minItem !== 0) {
      minItem = minItem - (10 + (minItem % 10));
    }
  }

  const maxValue = props.maxValue || maxItem;
  const minValue = props.minValue || minItem;

  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
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
  const rulesLength = props.rulesLength;
  const rulesColor = props.rulesColor || 'lightgray';
  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesHeight = props.verticalLinesHeight;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;
  let verticalLinesAr = [];
  props.noOfVerticalLines
    ? (verticalLinesAr = [...Array(props.noOfVerticalLines).keys()])
    : (verticalLinesAr = [
        ...Array(props.stackData ? props.stackData.length : data.length).keys(),
      ]);
  const verticalLinesSpacing = props.verticalLinesSpacing || 0;

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
  const xAxisLength = props.xAxisLength;
  const xAxisColor = props.xAxisColor || 'black';

  const hideRules = props.hideRules || false;

  const yAxisThickness =
    props.yAxisThickness === 0
      ? props.yAxisThickness
      : props.yAxisThickness || 1;
  const yAxisColor = props.yAxisColor || 'black';
  const yAxisTextStyle = props.yAxisTextStyle;
  const yAxisTextNumberOfLines = props.yAxisTextNumberOfLines || 1;
  const xAxisTextNumberOfLines = props.xAxisTextNumberOfLines || 1;
  const yAxisLabelContainerStyle = props.yAxisLabelContainerStyle;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const showFractionalValues = props.showFractionalValues || false;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;
  const hideYAxisText = props.hideYAxisText || false;

  const backgroundColor = props.backgroundColor || 'transparent';
  const horizontal = props.horizontal || false;
  const yAxisAtTop = props.yAxisAtTop || false;
  const intactTopLabel = props.intactTopLabel || false;
  const hideOrigin = props.hideOrigin || false;

  const rulesType = props.rulesType || 'line';
  const xAxisType = props.xAxisType || 'solid';
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

  const getArrowPoints = (
    arrowTipX,
    arrowTipY,
    x1,
    y1,
    arrowLength,
    arrowWidth,
    showArrowBase,
  ) => {
    let dataLineSlope = (arrowTipY - y1) / (arrowTipX - x1);
    let d = arrowLength;
    let d2 = arrowWidth / 2;
    let interSectionX =
      arrowTipX - Math.sqrt((d * d) / (dataLineSlope * dataLineSlope + 1));
    let interSectionY = arrowTipY - dataLineSlope * (arrowTipX - interSectionX);

    let arrowBasex1, arrowBaseY1, arrowBaseX2, arrowBaseY2;
    if (dataLineSlope === 0) {
      arrowBasex1 = interSectionX;
      arrowBaseY1 = interSectionY - d2;
      arrowBaseX2 = interSectionX;
      arrowBaseY2 = interSectionY + d2;
    } else {
      let arrowBaseSlope = -1 / dataLineSlope;
      arrowBasex1 =
        interSectionX -
        Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
      arrowBaseY1 =
        interSectionY - arrowBaseSlope * (interSectionX - arrowBasex1);

      arrowBaseX2 =
        interSectionX +
        Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
      arrowBaseY2 =
        interSectionY + arrowBaseSlope * (interSectionX - arrowBasex1);
    }
    let arrowPoints = ` M${interSectionX} ${interSectionY}`;
    arrowPoints += ` ${showArrowBase ? 'L' : 'M'}${arrowBasex1} ${arrowBaseY1}`;
    arrowPoints += ` L${arrowTipX} ${arrowTipY}`;
    arrowPoints += ` M${interSectionX} ${interSectionY}`;
    arrowPoints += ` ${showArrowBase ? 'L' : 'M'}${arrowBaseX2} ${arrowBaseY2}`;
    arrowPoints += ` L${arrowTipX} ${arrowTipY}`;

    return arrowPoints;
  };

  useEffect(() => {
    if (showLine) {
      let pp = '';
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth =
            (data && data[i] && data[i].barWidth) || props.barWidth || 30;
          pp +=
            'L' +
            (yAxisLabelWidth +
              lineConfig.initialSpacing +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * i) +
            ' ' +
            (containerHeight -
              lineConfig.shiftY -
              (lineData[i].value * containerHeight) / maxValue) +
            ' ';
        }
        setPoints(pp.replace('L', 'M'));
        if (lineData.length > 1 && lineConfig.showArrow) {
          let ppArray = pp.trim().split(' ');
          let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
          let arrowTipX = parseInt(
            ppArray[ppArray.length - 2].replace('L', ''),
          );
          let y1 = parseInt(ppArray[ppArray.length - 3]);
          let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

          let arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            lineConfig.arrowConfig.length,
            lineConfig.arrowConfig.width,
            lineConfig.arrowConfig.showArrowBase,
          );

          setArrowPoints(arrowPoints);
        }
      } else {
        let p1Array = [];
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth =
            (data && data[i] && data[i].barWidth) || props.barWidth || 30;
          p1Array.push([
            yAxisLabelWidth +
              lineConfig.initialSpacing +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * i,
            containerHeight -
              lineConfig.shiftY -
              (lineData[i].value * containerHeight) / maxValue,
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
    lineData,
    decreaseWidth,
    initialSpacing,
    labelsAppear,
    lineConfig.initialSpacing,
    lineConfig.curved,
    lineConfig.dataPointsWidth,
    lineConfig.shiftY,
    lineConfig.isAnimated,
    lineConfig.delay,
    lineConfig.startIndex,
    lineConfig.endIndex,
    maxValue,
    props.barWidth,
    showLine,
    spacing,
    yAxisLabelWidth,
    lineConfig.showArrow,
    lineConfig.arrowConfig.length,
    lineConfig.arrowConfig.width,
    lineConfig.arrowConfig.showArrowBase,
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
    labelText: '',
    labelTextStyle: null,
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
        labelText:
          props.referenceLine1Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          props.referenceLine1Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
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
        labelText:
          props.referenceLine2Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          props.referenceLine2Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
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
        labelText:
          props.referenceLine3Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          props.referenceLine3Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
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
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (props.showFractionalValues || props.roundToDigits) {
        value = parseFloat(value.toFixed(props.roundToDigits || 1));
      }
      horizSectionsBelow.push({
        value: props.yAxisLabelTexts
          ? props.yAxisLabelTexts[noOfSectionsBelowXAxis - i] ??
            value.toString()
          : value.toString(),
      });
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

  const getLabel = (val, index) => {
    let label = '';
    if (
      showFractionalValues ||
      (props.yAxisLabelTexts && props.yAxisLabelTexts[index] !== undefined)
    ) {
      if (val) {
        label = props.yAxisOffset
          ? (Number(val) + props.yAxisOffset).toString()
          : val;
      } else {
        label = props.yAxisOffset ? props.yAxisOffset.toString() : '0';
      }
    } else {
      if (val) {
        label = val.toString().split('.')[0];
        if (props.yAxisOffset) {
          label = (Number(label) + props.yAxisOffset).toString();
        }
      } else {
        label = props.yAxisOffset ? props.yAxisOffset.toString() : '0';
      }
    }

    return yAxisLabelPrefix + label + yAxisLabelSuffix;
  };

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
                    ? props.width || Math.min(300, totalWidth)
                    : props.width || totalWidth + 11,
                },
                yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
                horizontalRulesStyle,
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
                      transform: [
                        {
                          translateX:
                            (props.width || Math.min(300, totalWidth)) +
                            yAxisThickness,
                        },
                      ],
                    },
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                  yAxisLabelContainerStyle,
                ]}
              />
              <View
                style={[
                  index === noOfSections
                    ? styles.lastLeftPart
                    : styles.leftPart,
                  {backgroundColor: backgroundColor},
                ]}>
                {index === noOfSections ? (
                  <Rule
                    config={{
                      thickness: xAxisThickness,
                      color: xAxisColor,
                      width:
                        xAxisLength ||
                        (horizontal
                          ? props.width || Math.min(300, totalWidth)
                          : (props.width || totalWidth) + 11),
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: xAxisType,
                    }}
                  />
                ) : hideRules ? null : (
                  <Rule
                    config={{
                      thickness: rulesThickness,
                      color: rulesColor,
                      width:
                        rulesLength ||
                        (horizontal
                          ? props.width || Math.min(300, totalWidth)
                          : (props.width || totalWidth) + 11),
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: rulesType,
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}

        {
          /***********************************************************************************************/
          /**************************      Render the y axis labels separately      **********************/
          /***********************************************************************************************/
          props.hideAxesAndRules !== true &&
            !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              let label = getLabel(sectionItems.value, index);
              if (hideOrigin && index === horizSections.length - 1) {
                label = '';
              }
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      top: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === 'right' && {
                      transform: [
                        {
                          translateX:
                            (props.width ? props.width : totalWidth) - 30,
                        },
                        {rotateY: '180deg'},
                      ],
                    },
                    horizontal &&
                      !yAxisAtTop && {
                        transform: [
                          {
                            translateX:
                              (props.width || Math.min(300, totalWidth)) +
                              yAxisThickness +
                              yAxisLabelWidth,
                          },
                        ],
                      },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      yAxisSide === 'right' && {
                        transform: [{rotateY: '180deg'}],
                      },
                      index === noOfSections && {
                        marginBottom: stepHeight / -2,
                      },
                    ]}>
                    {label}
                  </Text>
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }
        {horizSectionsBelow.map((sectionItems, index) => {
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
                yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
                index === 0 && {marginTop: stepHeight / 2},
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
                    height: index === 0 ? stepHeight * 1.5 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                  index === 0 && {marginTop: -stepHeight / 2},
                ]}
              />
              <View
                style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
                {hideRules ? null : (
                  <Rule
                    config={{
                      thickness: rulesThickness,
                      color: rulesColor,
                      width:
                        rulesLength ||
                        (horizontal
                          ? props.width || totalWidth
                          : (props.width || totalWidth) + 11),
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: rulesType,
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}
        {
          /***********************************************************************************************/
          /*************************      Render the y axis labels below origin      *********************/
          /***********************************************************************************************/
          props.hideAxesAndRules !== true &&
            !hideYAxisText &&
            horizSectionsBelow.map((sectionItems, index) => {
              let label = getLabel(
                horizSectionsBelow[horizSectionsBelow.length - 1 - index].value,
                index,
              );
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      bottom: stepHeight * (index - 1),
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === 'right' && {
                      transform: [
                        {
                          translateX:
                            (props.width ? props.width : totalWidth) - 30,
                        },
                        {rotateY: '180deg'},
                      ],
                    },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      yAxisSide === 'right' && {
                        transform: [{rotateY: '180deg'}],
                      },
                      index === noOfSections && {
                        marginBottom: stepHeight / -2,
                      },
                    ]}>
                    {label}
                  </Text>
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }

        {
          /***********************************************************************************************/
          /*************************      Render the reference lines separately      *********************/
          /***********************************************************************************************/
          props.hideAxesAndRules !== true &&
            !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              let label = getLabel(sectionItems.value, index);
              if (hideOrigin && index === horizSections.length - 1) {
                label = '';
              }
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      top: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === 'right' && {
                      transform: [
                        {
                          translateX:
                            (props.width ? props.width : totalWidth) - 30,
                        },
                        {rotateY: '180deg'},
                      ],
                    },
                  ]}>
                  {index === noOfSections && showReferenceLine1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine1Position * containerHeight) / maxValue,
                        left:
                          yAxisSide === 'right'
                            ? yAxisLabelWidth + yAxisThickness
                            : yAxisLabelWidth + yAxisThickness - 5,
                      }}>
                      <Rule config={referenceLine1Config} />
                      {referenceLine1Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            yAxisSide === 'right' && {
                              transform: [{rotateY: '180deg'}],
                            },
                            referenceLine1Config.labelTextStyle,
                          ]}>
                          {referenceLine1Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  {index === noOfSections && showReferenceLine2 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine2Position * containerHeight) / maxValue,
                        left:
                          yAxisSide === 'right'
                            ? yAxisLabelWidth + yAxisThickness
                            : yAxisLabelWidth + yAxisThickness - 5,
                      }}>
                      <Rule config={referenceLine2Config} />
                      {referenceLine2Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            yAxisSide === 'right' && {
                              transform: [{rotateY: '180deg'}],
                            },
                            referenceLine2Config.labelTextStyle,
                          ]}>
                          {referenceLine2Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  {index === noOfSections && showReferenceLine3 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          (referenceLine3Position * containerHeight) / maxValue,
                        left:
                          yAxisSide === 'right'
                            ? yAxisLabelWidth + yAxisThickness
                            : yAxisLabelWidth + yAxisThickness - 5,
                      }}>
                      <Rule config={referenceLine3Config} />
                      {referenceLine3Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            yAxisSide === 'right' && {
                              transform: [{rotateY: '180deg'}],
                            },
                            referenceLine3Config.labelTextStyle,
                          ]}>
                          {referenceLine3Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }
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
    return lineData.map((item: any, index: number) => {
      if (index < lineConfig.startIndex || index > lineConfig.endIndex) {
        return null;
      }
      // console.log('comes in');
      const currentBarWidth = item.barWidth || props.barWidth || 30;
      if (lineConfig.dataPointsShape === 'rectangular') {
        return (
          <Fragment key={index}>
            <Rect
              x={
                yAxisLabelWidth +
                lineConfig.initialSpacing +
                6 -
                (initialSpacing - currentBarWidth / 2) -
                lineConfig.dataPointsWidth +
                (currentBarWidth + spacing) * index
              }
              y={
                containerHeight -
                lineConfig.shiftY -
                lineConfig.dataPointsHeight / 2 -
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
                  lineConfig.initialSpacing +
                  6 -
                  (initialSpacing - currentBarWidth / 2) -
                  lineConfig.dataPointsWidth +
                  (currentBarWidth + spacing) * index +
                  (item.textShiftX || lineConfig.textShiftX || 0)
                }
                y={
                  containerHeight -
                  lineConfig.shiftY -
                  lineConfig.dataPointsHeight / 2 -
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
              lineConfig.initialSpacing +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * index
            }
            cy={
              containerHeight -
              lineConfig.shiftY -
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
                lineConfig.initialSpacing +
                6 -
                (initialSpacing - currentBarWidth / 2) -
                lineConfig.dataPointsWidth +
                (currentBarWidth + spacing) * index +
                (item.textShiftX || lineConfig.textShiftX || 0)
              }
              y={
                containerHeight -
                lineConfig.shiftY -
                lineConfig.dataPointsHeight / 2 -
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
          zIndex: lineBehindBars ? -1 : 100000,
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
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig.fillColor}
              stroke={lineConfig.arrowConfig.strokeColor}
              strokeWidth={lineConfig.arrowConfig.strokeWidth}
            />
          )}
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
          zIndex: lineBehindBars ? -1 : 100000,
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
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig.fillColor}
              stroke={lineConfig.arrowConfig.strokeColor}
              strokeWidth={lineConfig.arrowConfig.strokeWidth}
            />
          )}
        </Svg>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          height:
            containerHeight +
            horizSectionsBelow.length * stepHeight +
            labelsExtraHeight,
        },
        yAxisSide === 'right' && {marginLeft: yAxisLabelWidth + yAxisThickness},
        props.width && !horizontal && {width: props.width},
        horizontal && {transform: [{rotate: '90deg'}, {translateY: 15}]},
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      <ScrollView
        ref={scrollRef}
        onTouchStart={evt => {
          if (props.renderTooltip) {
            setSelectedIndex(-1);
          }
        }}
        onContentSizeChange={() => {
          if (scrollRef.current && scrollToEnd) {
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          }
        }}
        style={[
          {
            marginLeft:
              yAxisSide === 'right' ? -yAxisLabelWidth + 10 : yAxisLabelWidth,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60 + xAxisThickness,
          },
          props.width && {width: props.width - 11},
          horizontal && {width: props.width || Math.min(300, totalWidth)},
        ]}
        scrollEnabled={!disableScroll}
        contentContainerStyle={[
          {
            // backgroundColor: 'yellow',
            height:
              containerHeight +
              130 +
              horizSectionsBelow.length * stepHeight +
              labelsExtraHeight,
            paddingLeft: initialSpacing,
            paddingBottom:
              horizSectionsBelow.length * stepHeight + labelsExtraHeight,
            alignItems: 'flex-end',
          },
          !props.width && {width: totalWidth},
        ]}
        showsHorizontalScrollIndicator={showScrollIndicator}
        indicatorStyle={props.indicatorColor}
        horizontal
        // data={props.stackData || data}
        keyExtractor={(item, index) => index.toString()}>
        <Fragment>
          {showVerticalLines &&
            verticalLinesAr.map((item: itemType, index: number) => {
              let totalSpacing = initialSpacing;
              if (verticalLinesSpacing) {
                totalSpacing = verticalLinesSpacing * (index + 1);
              } else {
                if (props.stackData) {
                  totalSpacing +=
                    (props.stackData[0].barWidth || props.barWidth || 30) / 2;
                } else {
                  totalSpacing +=
                    (props.data[0].barWidth || props.barWidth || 30) / 2;
                }
                for (let i = 0; i < index; i++) {
                  let actualSpacing = spacing;
                  if (props.stackData) {
                    if (i >= props.stackData.length - 1) {
                      actualSpacing += (props.barWidth || 30) / 2;
                    } else {
                      if (
                        props.stackData[i].spacing ||
                        props.stackData[i].spacing === 0
                      ) {
                        actualSpacing = props.stackData[i].spacing;
                      }
                      if (props.stackData[i + 1].barWidth) {
                        actualSpacing += props.stackData[i + 1].barWidth;
                      } else {
                        actualSpacing += props.barWidth || 30;
                      }
                    }
                  } else {
                    if (i >= props.data.length - 1) {
                      actualSpacing += (props.barWidth || 30) / 2;
                    } else {
                      if (
                        props.data[i].spacing ||
                        props.data[i].spacing === 0
                      ) {
                        console.log('here for index ' + index + ' and i ' + i);
                        actualSpacing = props.data[i].spacing;
                      }
                      if (props.data[i + 1].barWidth) {
                        actualSpacing += props.data[i + 1].barWidth;
                      } else {
                        actualSpacing += props.barWidth || 30;
                      }
                    }
                  }
                  console.log('i = ' + i + ' actualSpacing ' + actualSpacing);
                  totalSpacing += actualSpacing;
                }
              }

              return (
                <View
                  key={index}
                  style={{
                    position: 'absolute',
                    zIndex: verticalLinesZIndex || -1,
                    marginBottom: xAxisThickness,
                    height:
                      verticalLinesHeight ||
                      containerHeight + 15 - xAxisThickness,
                    width: verticalLinesThickness,
                    backgroundColor: verticalLinesColor,
                    bottom: 60 + labelsExtraHeight,
                    left: totalSpacing,
                  }}
                />
              );
            })}
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
                    stackData={props.stackData}
                    item={item}
                    index={index}
                    data={data}
                    containerHeight={containerHeight}
                    maxValue={maxValue}
                    spacing={item.spacing === 0 ? 0 : item.spacing || spacing}
                    propSpacing={spacing}
                    xAxisThickness={xAxisThickness}
                    barWidth={props.barWidth}
                    opacity={opacity}
                    disablePress={item.disablePress || props.disablePress}
                    rotateLabel={rotateLabel}
                    showXAxisIndices={showXAxisIndices}
                    xAxisIndicesHeight={xAxisIndicesHeight}
                    xAxisIndicesWidth={xAxisIndicesWidth}
                    xAxisIndicesColor={xAxisIndicesColor}
                    horizontal={horizontal}
                    intactTopLabel={intactTopLabel}
                    barBorderRadius={props.barBorderRadius}
                    color={props.color}
                    showGradient={props.showGradient}
                    gradientColor={props.gradientColor}
                    barBackgroundPattern={props.barBackgroundPattern}
                    patternId={props.patternId}
                    label={
                      item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : '')
                    }
                    labelTextStyle={
                      item.labelTextStyle || props.xAxisLabelTextStyle
                    }
                    onPress={props.onPress}
                    xAxisTextNumberOfLines={xAxisTextNumberOfLines}
                    renderTooltip={props.renderTooltip}
                    leftShiftForTooltip={props.leftShiftForTooltip || 0}
                    leftShiftForLastIndexTooltip={
                      props.leftShiftForLastIndexTooltip || 0
                    }
                    initialSpacing={initialSpacing}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    activeOpacity={props.activeOpacity || 0.2}
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
                  propSpacing={spacing}
                  side={side}
                  data={data}
                  minHeight={props.minHeight || 0}
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
                  showXAxisIndices={showXAxisIndices}
                  xAxisIndicesHeight={xAxisIndicesHeight}
                  xAxisIndicesWidth={xAxisIndicesWidth}
                  xAxisIndicesColor={xAxisIndicesColor}
                  horizontal={horizontal}
                  intactTopLabel={intactTopLabel}
                  barBorderRadius={props.barBorderRadius}
                  autoShiftLabels={autoShiftLabels}
                  barBackgroundPattern={props.barBackgroundPattern}
                  patternId={props.patternId}
                  barMarginBottom={props.barMarginBottom}
                  label={
                    item.label ||
                    (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                      ? props.xAxisLabelTexts[index]
                      : '')
                  }
                  labelTextStyle={
                    item.labelTextStyle || props.xAxisLabelTextStyle
                  }
                  onPress={props.onPress}
                  xAxisTextNumberOfLines={xAxisTextNumberOfLines}
                  renderTooltip={props.renderTooltip}
                  leftShiftForTooltip={props.leftShiftForTooltip || 0}
                  leftShiftForLastIndexTooltip={
                    props.leftShiftForLastIndexTooltip || 0
                  }
                  initialSpacing={initialSpacing}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  barStyle={props.barStyle}
                />
              ))}
        </Fragment>
      </ScrollView>
    </View>
  );
};
