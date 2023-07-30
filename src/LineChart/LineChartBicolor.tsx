import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {View, Animated, Easing, Text, ColorValue} from 'react-native';
import {styles} from './styles';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
} from 'react-native-svg';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {chartTypes, getAxesAndRulesProps, getExtendedContainerHeightWithPadding} from '../utils';

let initialData: Array<itemType> | null = null;

type propTypes = {
  height?: number;
  overflowTop?: number;
  noOfSections?: number;
  maxValue?: number;
  minValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  initialSpacing?: number;
  endSpacing?: number;
  data?: Array<itemType>;
  zIndex?: number;
  thickness?: number;
  strokeDashArray?: Array<number>;
  rotateLabel?: Boolean;
  isAnimated?: Boolean;
  animationDuration?: number;
  onDataChangeAnimationDuration?: number;
  animationEasing?: any;
  animateTogether?: boolean;
  xAxisLength?: number;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  xAxisType?: String;
  hideRules?: Boolean;
  rulesLength?: number;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  focusEnabled?: Boolean;
  onFocus?: Function;
  showDataPointOnFocus?: Boolean;
  showStripOnFocus?: Boolean;
  showTextOnFocus?: Boolean;
  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;
  onPress?: Function;
  unFocusOnPressOut?: Boolean;
  delayBeforeUnFocus?: number;

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
  verticalLinesUptoDataPoint?: Boolean;
  verticalLinesThickness?: number;
  verticalLinesHeight?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesZIndex?: number;
  noOfVerticalLines?: number;
  verticalLinesSpacing?: number;
  hideAxesAndRules?: Boolean;
  areaChart?: Boolean;

  disableScroll?: Boolean;
  showScrollIndicator?: boolean;
  indicatorColor?: 'black' | 'default' | 'white';

  //Indices

  showYAxisIndices?: Boolean;
  showXAxisIndices?: Boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;
  yAxisSide?: string;
  yAxisOffset?: number;

  startIndex?: number;
  endIndex?: number;

  color?: string;
  colorNegative?: string;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisLabelContainerStyle?: any;
  horizontalRulesStyle?: any;
  yAxisTextStyle?: any;
  yAxisTextNumberOfLines?: number;
  xAxisTextNumberOfLines?: number;
  showFractionalValues?: Boolean;
  roundToDigits?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;

  backgroundColor?: ColorValue;
  curved?: Boolean;
  horizSections?: Array<sectionType>;

  //Data points

  hideDataPoints?: Boolean;
  dataPointsHeight?: number;
  dataPointsWidth?: number;
  dataPointsRadius?: number;
  dataPointsColor?: string;
  dataPointsShape?: string;
  customDataPoint?: Function;

  focusedDataPointShape?: String;
  focusedDataPointWidth?: number;
  focusedDataPointHeight?: number;
  focusedDataPointColor?: ColorValue | String | any;
  focusedDataPointRadius?: number;
  focusedCustomDataPoint?: Function;
  dataPointLabelWidth?: number;
  dataPointLabelShiftX?: number;
  dataPointLabelShiftY?: number;

  startFillColor?: string;
  endFillColor?: string;
  startFillColorNegative?: string;
  endFillColorNegative?: string;
  startOpacity?: number;
  endOpacity?: number;
  startOpacityNegative?: number;
  endOpacityNegative?: number;
  gradientDirection?: string;

  textFontSize?: number;
  textColor?: string;
  hideOrigin?: Boolean;
  textShiftX?: number;
  textShiftY?: number;
  yAxisLabelTexts?: Array<string>;
  xAxisLabelTexts?: Array<string>;
  xAxisLabelTextStyle?: any;
  width?: number;
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  scrollToEnd?: Boolean;
  scrollAnimation?: Boolean;
  noOfSectionsBelowXAxis?: number;
  labelsExtraHeight?: number;
  adjustToWidth?: Boolean;
  getPointerProps?: Function;
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
type itemType = {
  value: number;
  label: String;
  labelComponent: Function;
  labelTextStyle?: any;
  dataPointText?: string;
  textShiftX?: number;
  textShiftY?: number;
  textColor?: string;
  textFontSize?: number;

  hideDataPoint?: Boolean;
  dataPointHeight?: number;
  dataPointWidth?: number;
  dataPointRadius?: number;
  dataPointColor?: string;
  dataPointShape?: string;
  customDataPoint?: Function;

  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;

  focusedDataPointShape?: String;
  focusedDataPointWidth?: number;
  focusedDataPointHeight?: number;
  focusedDataPointColor?: ColorValue | String | any;
  focusedDataPointRadius?: number;
  focusedCustomDataPoint?: Function;

  dataPointLabelComponent?: Function;
  focusedDataPointLabelComponent?: Function;
  dataPointLabelWidth?: number;
  dataPointLabelShiftX?: number;
  dataPointLabelShiftY?: number;
  showStrip?: Boolean;

  showVerticalLine?: Boolean;
  verticalLineUptoDataPoint?: Boolean;
  verticalLineColor?: string;
  verticalLineThickness?: number;
  pointerShiftX?: number;
  pointerShiftY?: number;
  onPress?: Function;
};

type sectionType = {
  value: string;
};

type Points = {
  points: string;
  color: string;
}

export const LineChartBicolor = (props: propTypes) => {
  const scrollRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [pointsArray, setPointsArray] = useState<Array<Points>>([]);
  const [fillPointsArray, setFillPointsArray] = useState<Array<Points>>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerHeight = (props.height || 200);
  const noOfSections = props.noOfSections || 10;
  let data = useMemo(() => {
    if (!props.data) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
    return props.data;
  }, [props.yAxisOffset, props.data]);

  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;

  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const labelsExtraHeight = props.labelsExtraHeight || 0;

  const animationDuration = props.animationDuration || 800;
  const animateTogether = props.animateTogether || false;


  const startIndex1 = props.startIndex || 0;

  let endIndex1;
  if (props.endIndex === undefined || props.endIndex === null) {
    endIndex1 = data.length - 1;
  } else {
    endIndex1 = props.endIndex;
  }

  if (!initialData) {
    initialData = [...data];
  }

  const adjustToWidth = props.adjustToWidth || false;

  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 20;
  const endSpacing = props.endSpacing ?? (adjustToWidth ? 0 : 20);
  const thickness = props.thickness || 2;

  const spacing =
    props.spacing ??
    (adjustToWidth
      ? ((props.width || 200) - initialSpacing) / data.length
      : 50);

  const xAxisThickness =
    props.xAxisThickness === 0 ? 0 : props.xAxisThickness || 1;
  const dataPointsHeight1 = props.dataPointsHeight || 4;
  const dataPointsWidth1 = props.dataPointsWidth || 4;
  const dataPointsRadius1 = props.dataPointsRadius || 3;
  const dataPointsColor1 = props.dataPointsColor || 'black';
  const dataPointsShape1 = props.dataPointsShape || 'circular';

  const labelsAppear = useCallback(() => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacValue]);

  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  const areaChart = props.areaChart || false;
  const textFontSize1 = props.textFontSize || 10;
  const textColor1 = props.textColor || 'gray';

  let totalWidth = initialSpacing;
  let maxItem = 0,
    minItem = 0;
  data.forEach((item: itemType) => {
    if (item.value > maxItem) {
      maxItem = item.value;
    }
    if (item.value < minItem) {
      minItem = item.value;
    }
    totalWidth += spacing;
  });

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

  useEffect(() => {
    decreaseWidth();
    labelsAppear();
  }, [animateTogether, animationDuration, decreaseWidth, labelsAppear]);

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(containerHeight,props.overflowTop);

  let yAtxAxis = extendedContainerHeight - xAxisThickness / 2;
  const getX = index => initialSpacing + spacing * index;
  const getY = index =>
    yAtxAxis - (data[index].value * containerHeight) / maxValue;

  useEffect(() => {
    let ppArray: Array<Points> = [];
    let pp = 'M' + initialSpacing + ' ' + getY(0),
      prevValuev,
      nextValue;
    for (let i = 0; i < data.length - 1; i++) {
      prevValuev = data[i].value;
      nextValue = data[i + 1].value;

      if (prevValuev < 0 && nextValue < 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
      } else if (prevValuev < 0 && nextValue > 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
        let prevX = getX(i);
        let prevY = getY(i);
        let nextX = getX(i + 1);
        let nextY = getY(i + 1);
        let slope = (nextY - prevY) / (nextX - prevX);
        let x = (yAtxAxis - prevY) / slope + prevX;
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';

        let pointsOb = {
          points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
          color: 'red',
        };
        ppArray.push(pointsOb);
        setPointsArray([...ppArray]);
        pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
        pointsOb = {
          points: pp,
          color: 'green',
        };
        ppArray.push(pointsOb);
      } else if (prevValuev > 0 && nextValue < 0) {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
        let prevX = getX(i);
        let prevY = getY(i);
        let nextX = getX(i + 1);
        let nextY = getY(i + 1);
        let slope = (nextY - prevY) / (nextX - prevX);

        let x = (yAtxAxis - prevY) / slope + prevX;
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';

        let pointsOb = {
          points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
          color: 'green',
        };
        ppArray.push(pointsOb);
        setPointsArray([...ppArray]);
        pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
        pointsOb = {
          points: pp,
          color: 'red',
        };
        ppArray.push(pointsOb);
      } else {
        pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
      }
    }
    let i = data.length - 1;
    prevValuev = data[i - 1].value;
    nextValue = data[i].value;
    if ((prevValuev > 0 && nextValue > 0) || (prevValuev < 0 && nextValue < 0)) {
      pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
    }
    let pointsOb = {
      points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
      color: nextValue > 0 ? 'green' : 'red',
    };
    ppArray.push(pointsOb);
    setPointsArray([...ppArray]);

    /***************************          For Area Charts          *************************/

    let startIndex = -1,
      endIndex = -1,
      startX,
      startY,
      endY,
      color = 'green',
      localArray: Array<Points> = [],
      broken = false;

    pp = 'M' + initialSpacing + ' ' + yAtxAxis;
    for (i = 0; i < data.length - 1; i++) {
      prevValuev = data[i].value;
      nextValue = data[i + 1].value;
      pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
      if ((prevValuev > 0 && nextValue < 0) || (prevValuev < 0 && nextValue > 0)) {
        let prevX = getX(i);
        let prevY = getY(i);
        let nextX = getX(i + 1);
        let nextY = getY(i + 1);
        let slope = (nextY - prevY) / (nextX - prevX);

        let x = (yAtxAxis - prevY) / slope + prevX;
        pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
        broken = true;
        break;
      }
    }
    if (!broken) {
      i = data.length - 1;
      pp +=
        'L' +
        getX(i) +
        ' ' +
        getY(i) +
        ' L' +
        getX(i) +
        ' ' +
        (yAtxAxis - xAxisThickness / 2);
    }
    localArray.push({points: pp, color: data[0].value >= 0 ? 'green' : 'red'});

    let xs: Array<string> = [];
    data.forEach((item, index) => {
      let x = getX(index);
      xs.push(x + '');
    });

    pointsArray.forEach((item:any, index) => {
      let splitArray = item.points
        .split(' ')
        .filter(spItem => spItem && spItem !== ' ');

      if (
        splitArray[1] === yAtxAxis + '' &&
        !xs.includes(splitArray[0].replace('M', '').replace('L', ''))
      ) {
        startIndex = index;
        startX = splitArray[0].replace('M', '').replace('L', '');
        if (splitArray.length > 3) {
          startY = splitArray[1].replace('M', '').replace('L', '');
          endY = splitArray[3].replace('M', '').replace('L', '');
          if (Number(startY) < Number(endY)) {
            color = 'red';
          } else {
            color = 'green';
          }
        }
      }
      if (
        splitArray[splitArray.length - 1] === yAtxAxis + '' &&
        !xs.includes(
          splitArray[splitArray.length - 2].replace('M', '').replace('L', ''),
        )
      ) {
        endIndex = index;
      }
      if (startX) {
        let filPts = '';
        for (let j = startIndex; j <= endIndex; j++) {
          if (pointsArray[j]) {
            filPts += pointsArray[j].points.replaceAll('M', 'L');
          }
        }
        filPts += 'L ' + startX + ' ' + yAtxAxis;
        localArray.push({points: filPts.replace('L', 'M'), color});
      }
    });
    if (broken) {
      pp = 'M' + getX(data.length - 1) + ' ' + yAtxAxis;
      for (let i = data.length - 1; i > 0; i--) {
        prevValuev = data[i].value;
        nextValue = data[i - 1].value;
        pp += 'L' + getX(i) + ' ' + getY(i) + ' ';
        if ((prevValuev > 0 && nextValue < 0) || (prevValuev < 0 && nextValue > 0)) {
          let prevX = getX(i);
          let prevY = getY(i);
          let nextX = getX(i - 1);
          let nextY = getY(i - 1);
          let slope = (nextY - prevY) / (nextX - prevX);

          let x = (yAtxAxis - prevY) / slope + prevX;
          pp += 'L' + x + ' ' + yAtxAxis + ' ';
          break;
        }
      }

      localArray.push({
        points: pp,
        color: data[data.length - 1].value > 0 ? 'green' : 'red',
      });
    }

    setFillPointsArray([...localArray]);
    setToggle(true);
  }, [
    areaChart,
    containerHeight,
    data,
    dataPointsWidth1,
    initialSpacing,
    spacing,
    xAxisThickness,
    toggle,
    maxValue,
  ]);

  const horizSections = [{value: '0'}];
  const horizSectionsBelow: Array<Object> = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
  const thickness1 = props.thickness || 1;
  const zIndex = props.zIndex || 0;

  const strokeDashArray1 = props.strokeDashArray;

  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const hideDataPoints1 = props.hideDataPoints || false;

  const color = props.color || 'green';
  const colorNegative = props.colorNegative || 'red';

  const startFillColor = props.startFillColor || 'lightgreen';
  const endFillColor = props.endFillColor || 'white';
  const startOpacity = props.startOpacity === 0 ? 0 : props.startOpacity || 1;
  const endOpacity = props.endOpacity === 0 ? 0 : props.endOpacity || 1;
  const startFillColorNegative = props.startFillColorNegative || 'pink';
  const endFillColorNegative = props.endFillColorNegative || 'white';
  const startOpacityNegative =
    props.startOpacityNegative === 0 ? 0 : props.startOpacityNegative || 1;
  const endOpacityNegative =
    props.endOpacityNegative === 0 ? 0 : props.endOpacityNegative || 1;

  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesHeight = props.verticalLinesHeight;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;

  const gradientDirection = props.gradientDirection || 'vertical';

  const showVerticalLines = props.showVerticalLines || false;
  const verticalLinesUptoDataPoint = props.verticalLinesUptoDataPoint || false;
  let verticalLinesAr: Array<number> = [];
  props.noOfVerticalLines
    ? (verticalLinesAr = [...Array(props.noOfVerticalLines).keys()])
    : (verticalLinesAr = [...Array(data.length).keys()]);

  const verticalLinesSpacing = props.verticalLinesSpacing || 0;

  const showXAxisIndices = props.showXAxisIndices || false;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';

  const yAxisThickness =
    props.yAxisThickness === 0 ? 0 : props.yAxisThickness || 1;
  const xAxisTextNumberOfLines = props.xAxisTextNumberOfLines || 1;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const showFractionalValues = props.showFractionalValues || false;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;

  const horizontal = false;
  const yAxisAtTop = false;

  const disableScroll = props.disableScroll;
  const showScrollIndicator = props.showScrollIndicator || false;


  const focusEnabled = props.focusEnabled || false;
  const showDataPointOnFocus = props.showDataPointOnFocus || false;
  const showStripOnFocus = props.showStripOnFocus || false;
  const showTextOnFocus = props.showTextOnFocus || false;
  const stripHeight = props.stripHeight;
  const stripWidth = props.stripWidth === 0 ? 0 : props.stripWidth || 2;
  const stripColor = props.stripColor || color;
  const stripOpacity = props.stripOpacity || (startOpacity + endOpacity) / 2;
  const unFocusOnPressOut = props.unFocusOnPressOut === false ? false : true;
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus === 0 ? 0 : props.delayBeforeUnFocus || 300;

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

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 30,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left:
              index === 0 && initialSpacing < 10
                ? getX(index) - spacing / 2 + 8
                : getX(index) - spacing / 2,
            justifyContent: 'center',
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function,
  ) => {
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel ? 40 : 20,
            // backgroundColor: 'yellow',
            position: 'absolute',
            bottom: rotateLabel ? 10 : 30,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? getX(index) - spacing / 2 + 8
                : getX(index) - spacing / 2,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const onStripPress = (item, index) => {
    setSelectedIndex(index);
    if (props.onFocus) {
      props.onFocus(item, index);
    }
  };

  const renderDataPoints = (
    dataForRender,
    dataPtsShape,
    dataPtsWidth,
    dataPtsHeight,
    dataPtsColor,
    dataPtsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
  ) => {
    return dataForRender.map((item: itemType, index: number) => {
      if (index < startIndex || index > endIndex) return null;
      if (item.hideDataPoint) {
        return null;
      }
      let dataPointsShape,
        dataPointsWidth,
        dataPointsHeight,
        dataPointsColor,
        dataPointsRadius,
        text,
        customDataPoint,
        dataPointLabelComponent;
      if (index === selectedIndex) {
        dataPointsShape =
          item.focusedDataPointShape ||
          props.focusedDataPointShape ||
          item.dataPointShape ||
          dataPtsShape;
        dataPointsWidth =
          item.focusedDataPointWidth ||
          props.focusedDataPointWidth ||
          item.dataPointWidth ||
          dataPtsWidth;
        dataPointsHeight =
          item.focusedDataPointHeight ||
          props.focusedDataPointHeight ||
          item.dataPointHeight ||
          dataPtsHeight;
        dataPointsColor =
          item.focusedDataPointColor || props.focusedDataPointColor || 'orange';
        dataPointsRadius =
          item.focusedDataPointRadius ||
          props.focusedDataPointRadius ||
          item.dataPointRadius ||
          dataPtsRadius;
        if (showTextOnFocus) {
          text = item.dataPointText;
        }
        customDataPoint =
          item.focusedCustomDataPoint ||
          props.focusedCustomDataPoint ||
          item.customDataPoint ||
          props.customDataPoint;
        dataPointLabelComponent =
          item.focusedDataPointLabelComponent || item.dataPointLabelComponent;
      } else {
        dataPointsShape = item.dataPointShape || dataPtsShape;
        dataPointsWidth = item.dataPointWidth || dataPtsWidth;
        dataPointsHeight = item.dataPointHeight || dataPtsHeight;
        dataPointsColor = item.dataPointColor || dataPtsColor;
        dataPointsRadius = item.dataPointRadius || dataPtsRadius;
        if (showTextOnFocus) {
          text = '';
        }
        customDataPoint = item.customDataPoint || props.customDataPoint;
        dataPointLabelComponent = item.dataPointLabelComponent;
      }

      const currentStripHeight =
        item.stripHeight === 0 ? 0 : item.stripHeight || stripHeight;
      const currentStripWidth =
        item.stripWidth === 0 ? 0 : item.stripWidth || stripWidth;
      const currentStripOpacity =
        item.stripOpacity === 0 ? 0 : item.stripOpacity || stripOpacity;
      const currentStripColor = item.stripColor || stripColor;

      return (
        <Fragment key={index}>
          {focusEnabled ? (
            <>
              {unFocusOnPressOut ? (
                <Rect
                  onPressIn={() => onStripPress(item, index)}
                  onPressOut={() =>
                    setTimeout(() => setSelectedIndex(-1), delayBeforeUnFocus)
                  }
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight}
                  fill={'none'}
                />
              ) : (
                <Rect
                  onPress={() => onStripPress(item, index)}
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight}
                  fill={'none'}
                />
              )}
            </>
          ) : null}
          {item.showStrip ||
          (focusEnabled && index === selectedIndex && showStripOnFocus) ? (
            <Rect
              x={initialSpacing + (spacing * index - dataPointsWidth / 2)}
              y={
                currentStripHeight
                  ? containerHeight - currentStripHeight + 8
                  : containerHeight -
                    dataPointsHeight / 2 +
                    20 -
                    (item.value * containerHeight) / maxValue
              }
              width={currentStripWidth}
              height={
                currentStripHeight ||
                containerHeight - dataPointsHeight / 2 + 20
              }
              opacity={currentStripOpacity}
              fill={currentStripColor}
            />
          ) : null}
          {customDataPoint ? (
            <View
              style={[
                styles.customDataPointContainer,
                {
                  height: dataPointsHeight,
                  width: dataPointsWidth,
                  top:
                    containerHeight - (item.value * containerHeight) / maxValue,
                  left: initialSpacing - dataPointsWidth + spacing * index,
                },
              ]}>
              {customDataPoint()}
            </View>
          ) : null}
          {dataPointsShape === 'rectangular' ? (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Rect
                  x={initialSpacing - dataPointsWidth + spacing * index}
                  y={
                    extendedContainerHeight +
                    dataPointsHeight / 2 -
                    (item.value * containerHeight) / maxValue
                  }
                  width={dataPointsWidth}
                  height={dataPointsHeight}
                  fill={
                    showDataPointOnFocus
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress
                      ? item.onPress(item, index)
                      : props.onPress
                      ? props.onPress(item, index)
                      : null;
                  }}
                />
              )}
            </Fragment>
          ) : (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Circle
                  cx={initialSpacing - dataPointsWidth / 2 + spacing * index}
                  cy={
                    extendedContainerHeight -
                    (item.value * containerHeight) / maxValue
                  }
                  r={dataPointsRadius}
                  fill={
                    showDataPointOnFocus
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress
                      ? item.onPress(item, index)
                      : props.onPress
                      ? props.onPress(item, index)
                      : null;
                  }}
                />
              )}
            </Fragment>
          )}
          {dataPointLabelComponent ? (
            !showTextOnFocus || index === selectedIndex ? (
              <View
                style={[
                  styles.customDataPointContainer,
                  {
                    top:
                      containerHeight +
                      (item.dataPointLabelShiftY ||
                        props.dataPointLabelShiftY ||
                        0) -
                      (item.value * containerHeight) / maxValue,
                    left:
                      initialSpacing +
                      (item.dataPointLabelShiftX ||
                        props.dataPointLabelShiftX ||
                        0) -
                      (item.dataPointLabelWidth
                        ? item.dataPointLabelWidth + 20
                        : props.dataPointLabelWidth
                        ? props.dataPointLabelWidth + 20
                        : 50) /
                        2 +
                      spacing * index,
                  },
                ]}>
                {dataPointLabelComponent()}
              </View>
            ) : null
          ) : text || item.dataPointText ? (
            !showTextOnFocus || index === selectedIndex ? (
              <CanvasText
                fill={item.textColor || textColor}
                fontSize={item.textFontSize || textFontSize}
                x={
                  initialSpacing -
                  dataPointsWidth +
                  spacing * index +
                  (item.textShiftX || props.textShiftX || 0)
                }
                y={
                  extendedContainerHeight -
                  dataPointsHeight / 2 -
                  (item.value * containerHeight) / maxValue +
                  (item.textShiftY || props.textShiftY || 0)
                }>
                {!showTextOnFocus ? item.dataPointText : text}
              </CanvasText>
            ) : null
          ) : null}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: itemType, index: number) => {
      if (item.showVerticalLine) {
        return (
          <Rect
            key={index}
            x={
              initialSpacing -
              (item.verticalLineThickness || 1) / 2 -
              1 +
              spacing * index
            }
            y={
              item.verticalLineUptoDataPoint
                ? containerHeight -
                  (item.value * containerHeight) / maxValue +
                  10
                : -xAxisThickness
            }
            width={item.verticalLineThickness || 1}
            height={
              item.verticalLineUptoDataPoint
                ? (item.value * containerHeight) / maxValue - xAxisThickness
                : containerHeight + 10 - xAxisThickness
            }
            fill={item.verticalLineColor || 'lightgray'}
          />
        );
      }
      return null;
    });
  };

  const lineSvgComponent = (
    pointsArray: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <Svg>
        {strokeDashArray &&
        strokeDashArray.length === 2 &&
        typeof strokeDashArray[0] === 'number' &&
        typeof strokeDashArray[1] === 'number'
          ? pointsArray.map((points, index) => (
              <Path
                key={index}
                d={points.points}
                fill="none"
                stroke={points.color === 'green' ? color : colorNegative}
                strokeWidth={currentLineThickness || thickness}
                strokeDasharray={strokeDashArray}
              />
            ))
          : pointsArray.map((points, index) => {
              return (
                <Path
                  key={index}
                  d={points.points}
                  fill="none"
                  stroke={points.color === 'green' ? color : colorNegative}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })}

        {/***********************      For Area Chart        ************/}

        {areaChart && (
          <>
            <LinearGradient
              id="Gradient"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="0"
                stopColor={startFillColor}
                stopOpacity={startOpacity.toString()}
              />
              <Stop
                offset="1"
                stopColor={endFillColor}
                stopOpacity={endOpacity.toString()}
              />
            </LinearGradient>
            <LinearGradient
              id="GradientNegative"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="1"
                stopColor={startFillColorNegative}
                stopOpacity={startOpacityNegative.toString()}
              />
              <Stop
                offset="0"
                stopColor={endFillColorNegative}
                stopOpacity={endOpacityNegative.toString()}
              />
            </LinearGradient>
          </>
        )}
        {areaChart
          ? fillPointsArray.map((item, index) => {
              return (
                <Path
                  key={index}
                  d={item.points}
                  fill={
                    item.color === 'green'
                      ? 'url(#Gradient)'
                      : 'url(#GradientNegative)'
                  }
                  stroke={'transparent'}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })
          : null}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data)}

        {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
        {!hideDataPoints1
          ? renderDataPoints(
              data,
              dataPointsShape1,
              dataPointsWidth1,
              dataPointsHeight1,
              dataPointsColor1,
              dataPointsRadius1,
              textColor1,
              textFontSize1,
              startIndex1,
              endIndex1,
            )
          : null}
      </Svg>
    );
  };

  const renderLine = (
    zIndex: number,
    pointsArray: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <View
        style={{
          position: 'absolute',
          height: extendedContainerHeight + horizSectionsBelow.length * stepHeight,
          bottom: 60 + labelsExtraHeight,
          width: totalWidth,
          zIndex: zIndex,
        }}>
        {pointsArray.length
          ? lineSvgComponent(
              pointsArray,
              currentLineThickness,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray,
            )
          : null}
      </View>
    );
  };

  const renderAnimatedLine = (
    zIndex: number,
    points: any,
    animatedWidth: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: extendedContainerHeight + horizSectionsBelow.length * stepHeight,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: zIndex,
          // backgroundColor: 'wheat',
        }}>
        {lineSvgComponent(
          points,
          currentLineThickness,
          color,
          startFillColor,
          endFillColor,
          startOpacity,
          endOpacity,
          strokeDashArray,
        )}
      </Animated.View>
    );
  };

  const renderChartContent = () => {
    return (
      <>
        {isAnimated
          ? renderAnimatedLine(
              zIndex,
              pointsArray,
              animatedWidth,
              thickness1,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray1,
            )
          : renderLine(
              zIndex,
              pointsArray,
              thickness1,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray1,
            )}
        {data.map((item: itemType, index: number) => {
          return (
            <View key={index}>
              {isAnimated
                ? renderAnimatedLabel(
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )
                : renderLabel(
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )}
              {/* {renderLabel(index, item.label, item.labelTextStyle)} */}
            </View>
          );
        })}
      </>
    );
  };

  const barAndLineChartsWrapperProps = {
    chartType: chartTypes.LINE_BI_COLOR,
    containerHeight,
    horizSectionsBelow,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    yAxisThickness,
    horizontal,
    scrollRef,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    barWidth: 0, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollAnimation,
    setSelectedIndex,
    showVerticalLines,
    verticalLinesAr,
    verticalLinesSpacing,
    spacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesUptoDataPoint,
    showLine: false,
    lineConfig: null,
    maxValue,
    lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    animatedWidth,
    lineBehindBars: false,
    points: pointsArray,
    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    renderChartContent,
    remainingScrollViewProps: {},

    //horizSectionProps-
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props),

    referenceLinesConfig: {
      showReferenceLine1: props.showReferenceLine1,
      referenceLine1Position: props.referenceLine1Position,
      referenceLine1Config: props.referenceLine1Config,
      showReferenceLine2: props.showReferenceLine2,
      referenceLine2Position: props.referenceLine2Position,
      referenceLine2Config: props.referenceLine2Config,
      showReferenceLine3: props.showReferenceLine3,
      referenceLine3Position: props.referenceLine3Position,
      referenceLine3Config: props.referenceLine3Config,
    },
    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    pointerConfig: null,
    getPointerProps: null,
    pointerIndex: 0,
    pointerX: 0,
    pointerY: 0,
  };

  return <BarAndLineChartsWrapper {...barAndLineChartsWrapperProps} />;
};
