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
  ScrollView,
  Animated,
  Easing,
  Text,
  ColorValue,
} from 'react-native';
import {styles} from './styles';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
} from 'react-native-svg';
import Rule from '../Components/lineSvg';

let initialData = null;

type propTypes = {
  height?: number;
  noOfSections?: number;
  maxValue?: number;
  minValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  initialSpacing?: number;
  data?: Array<itemType>;
  data2?: Array<itemType>;
  data3?: Array<itemType>;
  data4?: Array<itemType>;
  data5?: Array<itemType>;
  zIndex1?: number;
  zIndex2?: number;
  zIndex3?: number;
  zIndex4?: number;
  zIndex5?: number;
  thickness?: number;
  thickness1?: number;
  thickness2?: number;
  thickness3?: number;
  thickness4?: number;
  thickness5?: number;
  strokeDashArray?: Array<number>;
  strokeDashArray1?: Array<number>;
  strokeDashArray2?: Array<number>;
  strokeDashArray3?: Array<number>;
  strokeDashArray4?: Array<number>;
  strokeDashArray5?: Array<number>;
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
  pressEnabled?: Boolean;
  showDataPointOnPress?: Boolean;
  showStripOnPress?: Boolean;
  showTextOnPress?: Boolean;
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
  showReferenceLine4?: Boolean;
  referenceLine4Config?: referenceConfigType;
  referenceLine4Position?: number;
  showReferenceLine5?: Boolean;
  referenceLine5Config?: referenceConfigType;
  referenceLine5Position?: number;

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
  pointerConfig?: Pointer;
  showScrollIndicator?: Boolean;
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
  startIndex1?: number;
  startIndex2?: number;
  startIndex3?: number;
  startIndex4?: number;
  startIndex5?: number;
  endIndex?: number;
  endIndex1?: number;
  endIndex2?: number;
  endIndex3?: number;
  endIndex4?: number;
  endIndex5?: number;

  color?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
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
  hideDataPoints1?: Boolean;
  dataPointsHeight1?: number;
  dataPointsWidth1?: number;
  dataPointsRadius1?: number;
  dataPointsColor1?: string;
  dataPointsShape1?: string;
  hideDataPoints2?: Boolean;
  dataPointsHeight2?: number;
  dataPointsWidth2?: number;
  dataPointsRadius2?: number;
  dataPointsColor2?: string;
  dataPointsShape2?: string;
  hideDataPoints3?: Boolean;
  dataPointsHeight3?: number;
  dataPointsWidth3?: number;
  dataPointsRadius3?: number;
  dataPointsColor3?: string;
  dataPointsShape3?: string;
  hideDataPoints4?: Boolean;
  dataPointsHeight4?: number;
  dataPointsWidth4?: number;
  dataPointsRadius4?: number;
  dataPointsColor4?: string;
  dataPointsShape4?: string;
  hideDataPoints5?: Boolean;
  dataPointsHeight5?: number;
  dataPointsWidth5?: number;
  dataPointsRadius5?: number;
  dataPointsColor5?: string;
  dataPointsShape5?: string;
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
  startOpacity?: number;
  endOpacity?: number;
  startFillColor1?: string;
  endFillColor1?: string;
  startOpacity1?: number;
  endOpacity1?: number;
  startFillColor2?: string;
  endFillColor2?: string;
  startOpacity2?: number;
  endOpacity2?: number;
  startFillColor3?: string;
  endFillColor3?: string;
  startOpacity3?: number;
  endOpacity3?: number;
  startFillColor4?: string;
  endFillColor4?: string;
  startOpacity4?: number;
  endOpacity4?: number;
  startFillColor5?: string;
  endFillColor5?: string;
  startOpacity5?: number;
  endOpacity5?: number;
  gradientDirection?: string;

  textFontSize?: number;
  textColor?: string;
  textFontSize1?: number;
  textColor1?: string;
  textFontSize2?: number;
  textColor2?: string;
  textFontSize3?: number;
  textColor3?: string;
  textFontSize4?: number;
  textColor4?: string;
  textFontSize5?: number;
  textColor5?: string;
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
  value?: number;
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

export const LineChartBicolor = (props: propTypes) => {
  const scrollRef = useRef();
  const [points, setPoints] = useState('');
  const [pointsArray, setPointsArray] = useState([]);
  const [fillPointsArray, setFillPointsArray] = useState([]);
  const [fillPoints, setFillPoints] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  let data = useMemo(() => {
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
  const data2 = useMemo(() => {
    if (!props.data2) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data2.map(item => {
        item.value = item.value - props.yAxisOffset;
        return item;
      });
    }
    return props.data2;
  }, [props.yAxisOffset, props.data2]);
  const data3 = useMemo(() => {
    if (!props.data3) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data3.map(item => {
        item.value = item.value - props.yAxisOffset;
        return item;
      });
    }
    return props.data3;
  }, [props.yAxisOffset, props.data3]);
  const data4 = useMemo(() => {
    if (!props.data4) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data4.map(item => {
        item.value = item.value - props.yAxisOffset;
        return item;
      });
    }
    return props.data4;
  }, [props.yAxisOffset, props.data4]);
  const data5 = useMemo(() => {
    if (!props.data5) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data5.map(item => {
        item.value = item.value - props.yAxisOffset;
        return item;
      });
    }
    return props.data5;
  }, [props.yAxisOffset, props.data5]);

  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;

  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const widthValue2 = useMemo(() => new Animated.Value(0), []);
  const widthValue3 = useMemo(() => new Animated.Value(0), []);
  const widthValue4 = useMemo(() => new Animated.Value(0), []);
  const widthValue5 = useMemo(() => new Animated.Value(0), []);
  const labelsExtraHeight = props.labelsExtraHeight || 0;

  const animationDuration = props.animationDuration || 800;
  const animateTogether = props.animateTogether || false;

  const yAxisLabelPrefix = props.yAxisLabelPrefix || '';
  const yAxisLabelSuffix = props.yAxisLabelSuffix || '';
  const yAxisSide = props.yAxisSide || 'left';

  const startIndex1 =
    props.startIndex1 === 0 ? 0 : props.startIndex1 || props.startIndex || 0;

  let endIndex1;
  if (props.endIndex1 === undefined || props.endIndex1 === null) {
    if (props.endIndex === undefined || props.endIndex === null) {
      endIndex1 = data.length - 1;
    } else {
      endIndex1 = props.endIndex;
    }
  } else {
    endIndex1 = props.endIndex1;
  }

  const startIndex2 = props.startIndex2 || 0;
  const endIndex2 =
    props.endIndex2 === 0 ? 0 : props.endIndex2 || data2.length - 1;

  const startIndex3 = props.startIndex3 || 0;
  const endIndex3 =
    props.endIndex3 === 0 ? 0 : props.endIndex3 || data3.length - 1;
  const startIndex4 = props.startIndex4 || 0;
  const endIndex4 =
    props.endIndex4 === 0 ? 0 : props.endIndex4 || data4.length - 1;
  const startIndex5 = props.startIndex5 || 0;
  const endIndex5 =
    props.endIndex5 === 0 ? 0 : props.endIndex5 || data5.length - 1;

  if (!initialData) {
    initialData = [...data];
  }

  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  const thickness = props.thickness || 2;

  const adjustToWidth = props.adjustToWidth || false;

  const spacing =
    props.spacing === 0
      ? 0
      : props.spacing ||
        (adjustToWidth
          ? ((props.width || 200) - initialSpacing) / data.length
          : 60);

  const xAxisLength = props.xAxisLength;
  const xAxisThickness =
    props.xAxisThickness === 0 ? 0 : props.xAxisThickness || 1;
  const dataPointsHeight1 =
    props.dataPointsHeight1 || props.dataPointsHeight || 2;
  const dataPointsWidth1 = props.dataPointsWidth1 || props.dataPointsWidth || 2;
  const dataPointsRadius1 =
    props.dataPointsRadius1 || props.dataPointsRadius || 3;
  const dataPointsColor1 =
    props.dataPointsColor1 || props.dataPointsColor || 'black';
  const dataPointsShape1 =
    props.dataPointsShape1 || props.dataPointsShape || 'circular';

  const dataPointsHeight2 =
    props.dataPointsHeight2 || props.dataPointsHeight || 2;
  const dataPointsWidth2 = props.dataPointsWidth2 || props.dataPointsWidth || 2;
  const dataPointsRadius2 =
    props.dataPointsRadius2 || props.dataPointsRadius || 3;
  const dataPointsColor2 =
    props.dataPointsColor2 || props.dataPointsColor || 'blue';
  const dataPointsShape2 =
    props.dataPointsShape2 || props.dataPointsShape || 'circular';

  const dataPointsHeight3 =
    props.dataPointsHeight3 || props.dataPointsHeight || 2;
  const dataPointsWidth3 = props.dataPointsWidth3 || props.dataPointsWidth || 2;
  const dataPointsRadius3 =
    props.dataPointsRadius3 || props.dataPointsRadius || 3;
  const dataPointsColor3 =
    props.dataPointsColor3 || props.dataPointsColor || 'red';
  const dataPointsShape3 =
    props.dataPointsShape3 || props.dataPointsShape || 'circular';

  const dataPointsHeight4 =
    props.dataPointsHeight4 || props.dataPointsHeight || 2;
  const dataPointsWidth4 = props.dataPointsWidth4 || props.dataPointsWidth || 2;
  const dataPointsRadius4 =
    props.dataPointsRadius4 || props.dataPointsRadius || 3;
  const dataPointsColor4 =
    props.dataPointsColor4 || props.dataPointsColor || 'red';
  const dataPointsShape4 =
    props.dataPointsShape4 || props.dataPointsShape || 'circular';

  const dataPointsHeight5 =
    props.dataPointsHeight5 || props.dataPointsHeight || 2;
  const dataPointsWidth5 = props.dataPointsWidth5 || props.dataPointsWidth || 2;
  const dataPointsRadius5 =
    props.dataPointsRadius5 || props.dataPointsRadius || 3;
  const dataPointsColor5 =
    props.dataPointsColor5 || props.dataPointsColor || 'red';
  const dataPointsShape5 =
    props.dataPointsShape5 || props.dataPointsShape || 'circular';

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

  const decreaseWidth2 = useCallback(() => {
    widthValue2.setValue(0);
    Animated.timing(widthValue2, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue2]);

  const decreaseWidth3 = useCallback(() => {
    widthValue3.setValue(0);
    Animated.timing(widthValue3, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue3]);

  const decreaseWidth4 = useCallback(() => {
    widthValue4.setValue(0);
    Animated.timing(widthValue4, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue4]);

  const decreaseWidth5 = useCallback(() => {
    widthValue5.setValue(0);
    Animated.timing(widthValue5, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue5]);

  const areaChart = props.areaChart || false;
  const textFontSize1 = props.textFontSize1 || props.textFontSize || 10;
  const textFontSize2 = props.textFontSize2 || props.textFontSize || 10;
  const textFontSize3 = props.textFontSize3 || props.textFontSize || 10;
  const textFontSize4 = props.textFontSize4 || props.textFontSize || 10;
  const textFontSize5 = props.textFontSize5 || props.textFontSize || 10;
  const textColor1 = props.textColor1 || props.textColor || 'gray';
  const textColor2 = props.textColor2 || props.textColor || 'gray';
  const textColor3 = props.textColor3 || props.textColor || 'gray';
  const textColor4 = props.textColor4 || props.textColor || 'gray';
  const textColor5 = props.textColor5 || props.textColor || 'gray';
  const xAxisColor = props.xAxisColor || 'black';

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
    // console.log('comes here............')
    decreaseWidth();
    labelsAppear();
    setTimeout(
      () => {
        decreaseWidth2();
      },
      animateTogether ? 0 : animationDuration,
    );
    setTimeout(
      () => {
        decreaseWidth3();
      },
      animateTogether ? 0 : animationDuration * 2,
    );
    setTimeout(
      () => {
        decreaseWidth4();
      },
      animateTogether ? 0 : animationDuration * 3,
    );
    setTimeout(
      () => {
        decreaseWidth5();
      },
      animateTogether ? 0 : animationDuration * 4,
    );
  }, [
    animateTogether,
    animationDuration,
    decreaseWidth,
    decreaseWidth2,
    decreaseWidth3,
    decreaseWidth4,
    decreaseWidth5,
    labelsAppear,
  ]);

  useEffect(() => {
    let ppArray = [];
    let pp = '',
      y;
    for (let i = 0; i < data.length; i++) {
      let x;
      if (i === 0) {
        pp +=
          'L' +
          (initialSpacing - dataPointsWidth1 / 2) +
          ' ' +
          (containerHeight +
            10 -
            (data[0].value * containerHeight) / maxValue) +
          ' ' +
          'L' +
          (initialSpacing - dataPointsWidth1 / 2 + spacing) +
          ' ' +
          (containerHeight +
            10 -
            (data[1].value * containerHeight) / maxValue) +
          '';
        let pointsOb = {
          points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
          color: data[0].value > 0 ? 'green' : 'red',
        };
        ppArray.push(pointsOb);
        setPoints(pp.startsWith('L') ? pp.replace('L', 'M') : pp);
        setPointsArray([...ppArray]);
      } else {
        if (data[i].value < 0 && data[i - 1].value > 0) {
          y = containerHeight + 10;
          let prevX =
            i === 0
              ? initialSpacing - dataPointsWidth1 / 2
              : initialSpacing - dataPointsWidth1 / 2 + spacing * (i - 1);
          let prevY =
            i === 0
              ? containerHeight + 10
              : containerHeight +
                10 -
                (data[i - 1].value * containerHeight) / maxValue;
          let nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * i;
          let nextY =
            containerHeight + 10 - (data[i].value * containerHeight) / maxValue;
          let slope = (nextY - prevY) / (nextX - prevX);
          console.log('prevX---->', prevX);
          console.log('prevY---->', prevY);
          console.log('nextX---->', nextX);
          console.log('nextY---->', nextY);
          console.log('slope---->', slope);
          console.log('..........|||||||||||||||||||.........');
          x = (y - prevY) / slope + prevX;
          pp += 'L' + x + ' ' + y + ' ';

          let pointsOb = {
            points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
            color: data[i].value < 0 && data[i - 1].value > 0 ? 'green' : 'red',
          };
          ppArray.push(pointsOb);
          //   setPoints(pp);
          setPointsArray([...ppArray]);
          pp = 'M' + x + ' ' + y + ' L' + nextX + ' ' + nextY + ' ';
          pointsOb = {
            points: pp,
            color: 'red',
          };
          ppArray.push(pointsOb);
          if (i !== data.length - 1 && data[i + 1].value > 0) {
            prevX = nextX;
            prevY = nextY;
            nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * (i + 1);
            nextY =
              containerHeight +
              10 -
              (data[i + 1].value * containerHeight) / maxValue;
            slope = (nextY - prevY) / (nextX - prevX);
            let newX = (y - prevY) / slope + prevX;
            pp = 'M' + prevX + ' ' + prevY + ' L' + newX + ' ' + y;

            let pointsOb = {
              points: pp,
              color: 'red',
            };
            ppArray.push(pointsOb);
            //   setPoints(pp);
            setPointsArray([...ppArray]);

            pp = 'M' + newX + ' ' + y + ' ';
          }
        }
        // else if(data[i] < 0 && data[i + 1].value > 0){
        //     pp +=
        //     'L' +
        //     (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
        //     ' ' +
        //     (containerHeight +
        //       10 -
        //       (data[i].value * containerHeight) / maxValue) +
        //     ' ';
        // }
        else if (!(data[i].value < 0 && data[i + 1].value > 0)) {
          pp +=
            'L' +
            (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data[i].value * containerHeight) / maxValue) +
            ' ';
        }
      }
    }
    let pointsOb = {
      points: pp,
      color: data[data.length - 1].value > 0 ? 'green' : 'red',
    };
    ppArray.push(pointsOb);
    // setPoints(pp);
    setPointsArray([...ppArray]);
    // setTimeout(()=>setPoints(pp),800)

    /***************************          For Area Charts          *************************/

    let startIndex = -1,
      endIndex = -1,
      startX,
      startY,
      endY,
      color = 'green',
      localArray = [];
    pointsArray.forEach((item, index) => {
      console.log('item...', item);
      let splitArray = item.points
        .split(' ')
        .filter(spItem => spItem && spItem !== ' ');

      if (splitArray[1] === y + '') {
        console.log(
          'found startIndex at index' +
            index +
            ' and the value of x here is ' +
            splitArray[0],
        );
        startIndex = index;
        startX = splitArray[0].replace('M', '').replace('L', '');
        console.log('splitArray------>>', splitArray);
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
      if (splitArray[splitArray.length - 1] === y + '') {
        console.log(
          'found endIndex at index' +
            index +
            ' and the value of x here is ' +
            splitArray[splitArray.length - 2],
        );
        endIndex = index;
      }
      if (startX) {
        let filPts = '';
        for (let j = startIndex; j <= endIndex; j++) {
          if (pointsArray[j]) {
            filPts += pointsArray[j].points.replaceAll('M', 'L');
          }
        }
        filPts += 'L ' + startX + ' ' + y;
        // console.log('filPts --- for index ' + index + ' = ' + filPts);
        localArray.push({points: filPts.replace('L', 'M'), color});
      }
    });
    setFillPointsArray([...localArray]);

    //   if (areaChart) {
    //     let ppp = '';

    //     if (data.length && !animateOnDataChange) {
    //       ppp =
    //         'L' +
    //         (initialSpacing - dataPointsWidth1 / 2) +
    //         ' ' +
    //         (containerHeight + 10 - xAxisThickness) +
    //         ' ';
    //       ppp += pp;
    //       ppp +=
    //         'L' +
    //         (initialSpacing -
    //           dataPointsWidth1 / 2 +
    //           spacing * (data.length - 1)) +
    //         ' ' +
    //         (containerHeight + 10 - xAxisThickness);
    //       ppp +=
    //         'L' +
    //         (initialSpacing - dataPointsWidth1 / 2) +
    //         ' ' +
    //         (containerHeight + 10 - xAxisThickness) +
    //         ' ';
    //       setFillPoints(ppp.replace('L', 'M'));
    //     }
    //   }
    /*************************************************************************************/
  }, [
    areaChart,
    containerHeight,
    points,
    data,
    data2,
    data3,
    data4,
    data5,
    dataPointsWidth1,
    dataPointsWidth2,
    dataPointsWidth3,
    dataPointsWidth4,
    dataPointsWidth5,
    initialSpacing,
    maxValue,
    props.curved,
    spacing,
    xAxisThickness,
    startIndex1,
    endIndex1,
    startIndex2,
    endIndex2,
    startIndex3,
    endIndex3,
    startIndex4,
    endIndex4,
    startIndex5,
    endIndex5,
  ]);

  const horizSections = [{value: '0'}];
  const horizSectionsBelow = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
  const thickness1 =
    props.thickness1 === 0 ? 0 : props.thickness1 || props.thickness || 1;
  const thickness2 =
    props.thickness2 === 0 ? 0 : props.thickness2 || props.thickness || 1;
  const thickness3 =
    props.thickness3 === 0 ? 0 : props.thickness3 || props.thickness || 1;
  const thickness4 =
    props.thickness4 === 0 ? 0 : props.thickness4 || props.thickness || 1;
  const thickness5 =
    props.thickness5 === 0 ? 0 : props.thickness5 || props.thickness || 1;

  const zIndex1 = props.zIndex1 || 0;
  const zIndex2 = props.zIndex2 || 0;
  const zIndex3 = props.zIndex3 || 0;
  const zIndex4 = props.zIndex4 || 0;
  const zIndex5 = props.zIndex5 || 0;

  const strokeDashArray1 = props.strokeDashArray1 || props.strokeDashArray;
  const strokeDashArray2 = props.strokeDashArray2 || props.strokeDashArray;
  const strokeDashArray3 = props.strokeDashArray3 || props.strokeDashArray;
  const strokeDashArray4 = props.strokeDashArray4 || props.strokeDashArray;
  const strokeDashArray5 = props.strokeDashArray5 || props.strokeDashArray;

  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const hideDataPoints1 =
    props.hideDataPoints || props.hideDataPoints1 || false;
  const hideDataPoints2 =
    props.hideDataPoints || props.hideDataPoints2 || false;
  const hideDataPoints3 =
    props.hideDataPoints || props.hideDataPoints3 || false;
  const hideDataPoints4 =
    props.hideDataPoints || props.hideDataPoints4 || false;
  const hideDataPoints5 =
    props.hideDataPoints || props.hideDataPoints5 || false;

  const color1 = props.color1 || props.color || 'black';
  const color2 = props.color2 || props.color || 'black';
  const color3 = props.color3 || props.color || 'black';
  const color4 = props.color4 || props.color || 'black';
  const color5 = props.color5 || props.color || 'black';

  const startFillColor1 =
    props.startFillColor1 || props.startFillColor || 'gray';
  const endFillColor1 = props.endFillColor1 || props.endFillColor || 'white';
  const startOpacity = props.startOpacity === 0 ? 0 : props.startOpacity || 1;
  const endOpacity = props.endOpacity === 0 ? 0 : props.endOpacity || 1;
  const startOpacity1 =
    props.startOpacity1 === 0 ? 0 : props.startOpacity1 || startOpacity;
  const endOpacity1 =
    props.endOpacity1 === 0 ? 0 : props.endOpacity1 || endOpacity;

  const startFillColor2 =
    props.startFillColor2 || props.startFillColor || 'gray';
  const endFillColor2 = props.endFillColor2 || props.endFillColor || 'white';
  const startOpacity2 =
    props.startOpacity2 === 0 ? 0 : props.startOpacity2 || startOpacity;
  const endOpacity2 =
    props.endOpacity2 === 0 ? 0 : props.endOpacity2 || endOpacity;

  const startFillColor3 =
    props.startFillColor3 || props.startFillColor || 'gray';
  const endFillColor3 = props.endFillColor3 || props.endFillColor || 'white';
  const startOpacity3 =
    props.startOpacity3 === 0 ? 0 : props.startOpacity3 || startOpacity;
  const endOpacity3 =
    props.endOpacity3 === 0 ? 0 : props.endOpacity3 || endOpacity;

  const startFillColor4 =
    props.startFillColor4 || props.startFillColor || 'gray';
  const endFillColor4 = props.endFillColor4 || props.endFillColor || 'white';
  const startOpacity4 =
    props.startOpacity4 === 0 ? 0 : props.startOpacity4 || startOpacity;
  const endOpacity4 =
    props.endOpacity4 === 0 ? 0 : props.endOpacity4 || endOpacity;

  const startFillColor5 =
    props.startFillColor5 || props.startFillColor || 'gray';
  const endFillColor5 = props.endFillColor5 || props.endFillColor || 'white';
  const startOpacity5 =
    props.startOpacity5 === 0 ? 0 : props.startOpacity5 || startOpacity;
  const endOpacity5 =
    props.endOpacity5 === 0 ? 0 : props.endOpacity5 || endOpacity;

  const rulesThickness =
    props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
  const rulesLength = props.rulesLength;
  const rulesColor = props.rulesColor || 'lightgray';
  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesHeight = props.verticalLinesHeight;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;

  const gradientDirection = props.gradientDirection || 'vertical';
  // const animationEasing = props.animationEasing || Easing.ease
  // const opacity = props.opacity || 1;

  const hideRules = props.hideRules || false;
  const showVerticalLines = props.showVerticalLines || false;
  const verticalLinesUptoDataPoint = props.verticalLinesUptoDataPoint || false;
  let verticalLinesAr = [];
  props.noOfVerticalLines
    ? (verticalLinesAr = [...Array(props.noOfVerticalLines).keys()])
    : (verticalLinesAr = [...Array(data.length).keys()]);

  const verticalLinesSpacing = props.verticalLinesSpacing || 0;

  const showYAxisIndices = props.showYAxisIndices || false;
  const showXAxisIndices = props.showXAxisIndices || false;
  const yAxisIndicesHeight = props.yAxisIndicesHeight || 4;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const yAxisIndicesWidth = props.yAxisIndicesWidth || 2;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';
  const yAxisIndicesColor = props.yAxisIndicesColor || 'black';

  const yAxisThickness =
    props.yAxisThickness === 0 ? 0 : props.yAxisThickness || 1;
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

  const disableScroll = props.disableScroll;
  const showScrollIndicator = props.showScrollIndicator || false;
  const hideOrigin = props.hideOrigin || false;

  const rulesType = props.rulesType || 'line';
  const xAxisType = props.xAxisType || 'solid';
  const dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
  const dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;

  const pressEnabled = props.pressEnabled || false;
  const showDataPointOnPress = props.showDataPointOnPress || false;
  const showStripOnPress = props.showStripOnPress || false;
  const showTextOnPress = props.showTextOnPress || false;
  const stripHeight = props.stripHeight;
  const stripWidth = props.stripWidth === 0 ? 0 : props.stripWidth || 2;
  const stripColor = props.stripColor || color1;
  const stripOpacity = props.stripOpacity || (startOpacity1 + endOpacity1) / 2;
  const unFocusOnPressOut = props.unFocusOnPressOut === false ? false : true;
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus === 0 ? 0 : props.delayBeforeUnFocus || 300;

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: (props.width || totalWidth) + 11,
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
        width:
          (props.referenceLine1Config.width || props.width || totalWidth) + 11,
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
        width:
          (props.referenceLine2Config.width || props.width || totalWidth) + 11,
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
        width:
          (props.referenceLine3Config.width || props.width || totalWidth) + 11,
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

  // console.log('data', data);
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
                ? initialSpacing + spacing * index - spacing / 2 + 8
                : initialSpacing + spacing * index - spacing / 2,
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
    // console.log('label', label);
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
                ? initialSpacing + spacing * index - spacing / 2 + 8
                : initialSpacing + spacing * index - spacing / 2,
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

  const animatedWidth2 = widthValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth3 = widthValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth4 = widthValue4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth5 = widthValue5.interpolate({
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
        {props.hideAxesAndRules !== true &&
          horizSections.map((sectionItems, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.horizBar,
                  {
                    width: (props.width ? props.width : totalWidth) + 15,
                  },
                  yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
                  horizontalRulesStyle,
                ]}>
                <View
                  style={[
                    styles.leftLabel,
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
                    {
                      borderLeftWidth: yAxisThickness,
                      borderColor: yAxisColor,
                      backgroundColor: backgroundColor,
                    },
                  ]}>
                  {index === noOfSections ? (
                    <Rule
                      config={{
                        thickness: xAxisThickness,
                        color: xAxisColor,
                        width: xAxisLength || (props.width || totalWidth) + 11,
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
                        width: rulesLength || (props.width || totalWidth) + 11,
                        dashWidth: dashWidth,
                        dashGap: dashGap,
                        type: rulesType,
                      }}
                    />
                  )}
                  {showXAxisIndices && index !== noOfSections ? (
                    <View
                      style={{
                        height: xAxisIndicesHeight,
                        width: xAxisIndicesWidth,
                        left: xAxisIndicesWidth / -2,
                        backgroundColor: xAxisIndicesColor,
                      }}
                    />
                  ) : null}
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
                            (props.width ? props.width : totalWidth) - 15,
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

        {horizSectionsBelow.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (props.width ? props.width : totalWidth) + 15,
                },
                index === 0 && {marginTop: stepHeight / 2},
                yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    borderRightWidth: yAxisThickness,
                    borderColor: yAxisColor,
                    marginLeft: yAxisThickness,
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
                      width: rulesLength || (props.width || totalWidth) + 11,
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
                            (props.width ? props.width : totalWidth) - 15,
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
                            (props.width ? props.width : totalWidth) - 15,
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
                            ? yAxisLabelWidth + yAxisThickness + 5
                            : yAxisLabelWidth + yAxisThickness,
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
                            ? yAxisLabelWidth + yAxisThickness + 5
                            : yAxisLabelWidth + yAxisThickness,
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
                            ? yAxisLabelWidth + yAxisThickness + 5
                            : yAxisLabelWidth + yAxisThickness,
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

  const onStripPress = (item, index) => {
    setSelectedIndex(index);
    if (props.onPress) {
      props.onPress(item, index);
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
          item.focusedDataPointColor ||
          props.focusedDataPointColor ||
          item.dataPointColor ||
          dataPtsColor;
        dataPointsRadius =
          item.focusedDataPointRadius ||
          props.focusedDataPointRadius ||
          item.dataPointRadius ||
          dataPtsRadius;
        if (showTextOnPress) {
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
        if (showTextOnPress) {
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
          {pressEnabled ? (
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
                  height={containerHeight - 0}
                  fill={'none'}
                />
              ) : (
                <Rect
                  onPress={() => onStripPress(item, index)}
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight - 0}
                  fill={'none'}
                />
              )}
            </>
          ) : null}
          {item.showStrip ||
          (pressEnabled && index === selectedIndex && showStripOnPress) ? (
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
                    containerHeight -
                    dataPointsHeight / 2 +
                    10 -
                    (item.value * containerHeight) / maxValue
                  }
                  width={dataPointsWidth}
                  height={dataPointsHeight}
                  fill={
                    showDataPointOnPress
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress ? item.onPress(item, index) : null;
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
                    containerHeight +
                    10 -
                    (item.value * containerHeight) / maxValue
                  }
                  r={dataPointsRadius}
                  fill={
                    showDataPointOnPress
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress ? item.onPress(item, index) : null;
                  }}
                />
              )}
            </Fragment>
          )}
          {dataPointLabelComponent ? (
            !showTextOnPress || index === selectedIndex ? (
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
            !showTextOnPress || index === selectedIndex ? (
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
                  containerHeight -
                  dataPointsHeight / 2 +
                  10 -
                  (item.value * containerHeight) / maxValue +
                  (item.textShiftY || props.textShiftY || 0)
                }>
                {!showTextOnPress ? item.dataPointText : text}
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
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <Svg>
        {false
          ? pointsArray.map(points => (
              <Path
                d={points}
                fill="none"
                stroke={color}
                strokeWidth={currentLineThickness || thickness}
                strokeDasharray={strokeDashArray}
              />
            ))
          : pointsArray.map(points => {
              //   console.log('points...', points);
              return (
                <Path
                  d={points.points}
                  fill="none"
                  stroke={points.color}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })}

        {/***********************      For Area Chart        ************/}

        {areaChart && (
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
        )}
        {areaChart
          ? fillPointsArray.map(item => {
              console.log('item---for fill.......', item);
              return (
                <Path
                  d={item.points}
                  fill={item.color}
                  stroke={'transparent'}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })
          : null}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data)}
        {renderSpecificVerticalLines(data2)}
        {renderSpecificVerticalLines(data3)}
        {renderSpecificVerticalLines(data4)}
        {renderSpecificVerticalLines(data5)}

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
        {!hideDataPoints2
          ? renderDataPoints(
              data2,
              dataPointsShape2,
              dataPointsWidth2,
              dataPointsHeight2,
              dataPointsColor2,
              dataPointsRadius2,
              textColor2,
              textFontSize2,
              startIndex2,
              endIndex2,
            )
          : null}
        {!hideDataPoints3
          ? renderDataPoints(
              data3,
              dataPointsShape3,
              dataPointsWidth3,
              dataPointsHeight3,
              dataPointsColor3,
              dataPointsRadius3,
              textColor3,
              textFontSize3,
              startIndex3,
              endIndex3,
            )
          : null}
        {!hideDataPoints4
          ? renderDataPoints(
              data4,
              dataPointsShape4,
              dataPointsWidth4,
              dataPointsHeight4,
              dataPointsColor4,
              dataPointsRadius4,
              textColor4,
              textFontSize4,
              startIndex4,
              endIndex4,
            )
          : null}
        {!hideDataPoints5
          ? renderDataPoints(
              data5,
              dataPointsShape5,
              dataPointsWidth5,
              dataPointsHeight5,
              dataPointsColor5,
              dataPointsRadius5,
              textColor5,
              textFontSize5,
              startIndex5,
              endIndex5,
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
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    console.log('pointsArray.....', pointsArray);
    return (
      <View
        style={{
          position: 'absolute',
          height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
          bottom: 60 + labelsExtraHeight,
          width: totalWidth,
          zIndex: zIndex,
        }}>
        {pointsArray.length
          ? lineSvgComponent(
              pointsArray,
              currentLineThickness,
              color,
              fillPoints,
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
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    // console.log('animatedWidth is-------->', animatedWidth);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: zIndex,
          // backgroundColor: 'wheat',
        }}>
        {lineSvgComponent(
          points,
          currentLineThickness,
          color,
          fillPoints,
          startFillColor,
          endFillColor,
          startOpacity,
          endOpacity,
          strokeDashArray,
        )}
      </Animated.View>
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
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      {/* {sectionsOverlay()} */}
      <ScrollView
        horizontal
        contentContainerStyle={[
          {
            height:
              containerHeight +
              130 +
              horizSectionsBelow.length * stepHeight +
              labelsExtraHeight,
            width: totalWidth - 20,
            paddingBottom:
              horizSectionsBelow.length * stepHeight + labelsExtraHeight,
            // backgroundColor: 'yellow'
          },
          !props.width && {width: totalWidth - 20},
        ]}
        scrollEnabled={!disableScroll}
        ref={scrollRef}
        onContentSizeChange={() => {
          if (scrollRef.current && scrollToEnd) {
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          }
        }}
        showsHorizontalScrollIndicator={showScrollIndicator}
        indicatorStyle={props.indicatorColor}
        style={[
          {
            marginLeft:
              yAxisSide === 'right'
                ? -yAxisLabelWidth - yAxisThickness + 6
                : yAxisLabelWidth + yAxisThickness,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60, //stepHeight * -0.5 + xAxisThickness,
            paddingRight: 100,
          },
          props.width && {width: props.width + 10},
        ]}>
        {showVerticalLines &&
          verticalLinesAr.map((item: itemType, index: number) => {
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  zIndex: verticalLinesZIndex || -1,
                  marginBottom: xAxisThickness,
                  height: verticalLinesUptoDataPoint
                    ? index < data.length
                      ? (data[index].value * containerHeight) / maxValue -
                        xAxisThickness
                      : verticalLinesHeight || 0
                    : verticalLinesHeight ||
                      containerHeight + 15 - xAxisThickness,
                  width: verticalLinesThickness,
                  backgroundColor: verticalLinesColor,
                  bottom: 60 + labelsExtraHeight,
                  left: verticalLinesSpacing
                    ? verticalLinesSpacing * (index + 1)
                    : index * spacing + (initialSpacing - dataPointsWidth1 / 2),
                }}
              />
            );
          })}

        {showYAxisIndices &&
          data.map((item: itemType, index: number) => {
            return (
              <View
                key={index + '' + item.value}
                style={{
                  position: 'absolute',
                  height: yAxisIndicesHeight,
                  width: yAxisIndicesWidth,
                  backgroundColor: yAxisIndicesColor,
                  bottom: 60 - yAxisIndicesHeight / 2,
                  left:
                    index * spacing +
                    (initialSpacing - yAxisIndicesWidth / 2) -
                    3,
                }}
              />
            );
          })}

        {isAnimated
          ? renderAnimatedLine(
              zIndex1,
              pointsArray,
              animatedWidth,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
              strokeDashArray1,
            )
          : renderLine(
              zIndex1,
              pointsArray,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
              strokeDashArray1,
            )}
        {data.map((item: itemType, index: number) => {
          // console.log('item', item)
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
      </ScrollView>
    </View>
  );
};
