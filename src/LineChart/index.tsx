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
  Dimensions,
} from 'react-native';
import {styles} from './styles';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
  Line,
} from 'react-native-svg';
import {svgPath, bezierCommand} from '../utils';
import Rule from '../Components/lineSvg';

let initialData = null;
let animations = [];

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
  animateOnDataChange?: Boolean;
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
  showArrows?: boolean;
  arrowConfig?: arrowType;
  showArrow1?: boolean;
  arrowConfig1?: arrowType;
  showArrow2?: boolean;
  arrowConfig2?: arrowType;
  showArrow3?: boolean;
  arrowConfig3?: arrowType;
  showArrow4?: boolean;
  arrowConfig4?: arrowType;
  showArrow5?: boolean;
  arrowConfig5?: arrowType;
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

type Pointer = {
  height?: number;
  width?: number;
  radius?: number;
  pointerColor?: ColorValue;
  pointer1Color?: ColorValue;
  pointer2Color?: ColorValue;
  pointer3Color?: ColorValue;
  pointer4Color?: ColorValue;
  pointer5Color?: ColorValue;
  pointerComponent?: Function;
  showPointerStrip?: boolean;
  pointerStripWidth?: number;
  pointerStripHeight?: number;
  pointerStripColor?: ColorValue;
  pointerStripUptoDataPoint?: boolean;
  pointerLabelComponent?: Function;
  stripOverPointer?: boolean;
  autoAdjustPointerLabelPosition?: boolean;
  shiftPointerLabelX?: number;
  shiftPointerLabelY?: number;
  pointerLabelWidth?: number;
  pointerLabelHeight?: number;
  pointerVanishDelay?: number;
  activatePointersOnLongPress?: boolean;
  activatePointersDelay?: number;
  hidePointer1?: boolean;
  hidePointer2?: boolean;
  hidePointer3?: boolean;
  hidePointer4?: boolean;
  hidePointer5?: boolean;
  strokeDashArray?: Array<number>;
};

export const LineChart = (props: propTypes) => {
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);
  const [arrow1Points, setArrow1Points] = useState('');
  const [arrow2Points, setArrow2Points] = useState('');
  const [arrow3Points, setArrow3Points] = useState('');
  const [arrow4Points, setArrow4Points] = useState('');
  const [arrow5Points, setArrow5Points] = useState('');
  const [pointerIndex, setPointerIndex] = useState(-1);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);
  const [pointerItem, setPointerItem] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [pointerY2, setPointerY2] = useState(0);
  const [pointerItem2, setPointerItem2] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [pointerY3, setPointerY3] = useState(0);
  const [pointerItem3, setPointerItem3] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [pointerY4, setPointerY4] = useState(0);
  const [pointerItem4, setPointerItem4] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [pointerY5, setPointerY5] = useState(0);
  const [pointerItem5, setPointerItem5] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [responderStartTime, setResponderStartTime] = useState(0);
  const [responderActive, setResponderActive] = useState(false);
  const [points, setPoints] = useState('');
  const [points2, setPoints2] = useState('');
  const [points3, setPoints3] = useState('');
  const [points4, setPoints4] = useState('');
  const [points5, setPoints5] = useState('');
  const [fillPoints, setFillPoints] = useState('');
  const [fillPoints2, setFillPoints2] = useState('');
  const [fillPoints3, setFillPoints3] = useState('');
  const [fillPoints4, setFillPoints4] = useState('');
  const [fillPoints5, setFillPoints5] = useState('');
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
  const onDataChangeAnimationDuration =
    props.onDataChangeAnimationDuration || 400;
  const animateTogether = props.animateTogether || false;
  const animateOnDataChange = props.yAxisOffset
    ? false
    : props.animateOnDataChange || false;

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
    animations = initialData.map(item => new Animated.Value(item.value));
  }

  let newPoints = '',
    newFillPoints = '';
  let counter = 0;

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

  if (animateOnDataChange) {
    animations.forEach((item, index) => {
      item.addListener(val => {
        data[index].value = val.value;
        let pp = '',
          ppp = '';
        if (!props.curved) {
          for (let i = 0; i < data.length; i++) {
            pp +=
              'L' +
              (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
              ' ' +
              (containerHeight +
                10 -
                (data[i].value * containerHeight) / maxValue) +
              ' ';
          }
          if (areaChart) {
            ppp =
              'L' +
              (initialSpacing - dataPointsWidth1 / 2) +
              ' ' +
              (containerHeight + 10 - xAxisThickness) +
              ' ';
            ppp += pp;
            ppp +=
              'L' +
              (initialSpacing -
                dataPointsWidth1 / 2 +
                spacing * (data.length - 1)) +
              ' ' +
              (containerHeight + 10 - xAxisThickness);
            ppp +=
              'L' +
              (initialSpacing - dataPointsWidth1 / 2) +
              ' ' +
              (containerHeight + 10 - xAxisThickness) +
              ' ';
          }
          newPoints = pp;
          newFillPoints = ppp;
          setPointsOnChange();
        }
        counter++;
      });
    });
  }

  const setPointsOnChange = () => {
    if (counter === data.length) {
      // console.log('here.......');
      if (!props.curved) {
        setPoints(newPoints.replace('L', 'M'));
        if (areaChart) {
          setFillPoints(newFillPoints.replace('L', 'M'));
        }
      }
    }
  };

  useEffect(() => {
    if (animateOnDataChange) {
      Animated.parallel(
        animations.map((anItem, index) =>
          Animated.timing(anItem, {
            toValue: data[index].value,
            useNativeDriver: true,
            duration: onDataChangeAnimationDuration,
          }),
        ),
      ).start();
    }
  }, [animateOnDataChange, data, onDataChangeAnimationDuration]);

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

  const defaultArrowConfig = {
    length: 10,
    width: 10,
    strokeWidth: thickness1,
    strokeColor: color1,
    fillColor: 'none',
    showArrowBase: true,
  };

  const arrowLength1 =
    props.arrowConfig1?.length ??
    props.arrowConfig?.length ??
    defaultArrowConfig.length;
  const arrowWidth1 =
    props.arrowConfig1?.width ??
    props.arrowConfig?.width ??
    defaultArrowConfig.width;
  const arrowStrokeWidth1 =
    props.arrowConfig1?.strokeWidth ??
    props.arrowConfig?.strokeWidth ??
    defaultArrowConfig.strokeWidth;
  const arrowStrokeColor1 =
    props.arrowConfig1?.strokeColor ??
    props.arrowConfig?.strokeColor ??
    defaultArrowConfig.strokeColor;
  const arrowFillColor1 =
    props.arrowConfig1?.fillColor ??
    props.arrowConfig?.fillColor ??
    defaultArrowConfig.fillColor;
  const showArrowBase1 =
    props.arrowConfig1?.showArrowBase ??
    props.arrowConfig?.showArrowBase ??
    defaultArrowConfig.showArrowBase;

  const arrowLength2 =
    props.arrowConfig2?.length ??
    props.arrowConfig?.length ??
    defaultArrowConfig.length;
  const arrowWidth2 =
    props.arrowConfig2?.width ??
    props.arrowConfig?.width ??
    defaultArrowConfig.width;
  const arrowStrokeWidth2 =
    props.arrowConfig2?.strokeWidth ??
    props.arrowConfig?.strokeWidth ??
    defaultArrowConfig.strokeWidth;
  const arrowStrokeColor2 =
    props.arrowConfig2?.strokeColor ??
    props.arrowConfig?.strokeColor ??
    defaultArrowConfig.strokeColor;
  const arrowFillColor2 =
    props.arrowConfig2?.fillColor ??
    props.arrowConfig?.fillColor ??
    defaultArrowConfig.fillColor;
  const showArrowBase2 =
    props.arrowConfig2?.showArrowBase ??
    props.arrowConfig?.showArrowBase ??
    defaultArrowConfig.showArrowBase;

  const arrowLength3 =
    props.arrowConfig3?.length ??
    props.arrowConfig?.length ??
    defaultArrowConfig.length;
  const arrowWidth3 =
    props.arrowConfig3?.width ??
    props.arrowConfig?.width ??
    defaultArrowConfig.width;
  const arrowStrokeWidth3 =
    props.arrowConfig3?.strokeWidth ??
    props.arrowConfig?.strokeWidth ??
    defaultArrowConfig.strokeWidth;
  const arrowStrokeColor3 =
    props.arrowConfig3?.strokeColor ??
    props.arrowConfig?.strokeColor ??
    defaultArrowConfig.strokeColor;
  const arrowFillColor3 =
    props.arrowConfig3?.fillColor ??
    props.arrowConfig?.fillColor ??
    defaultArrowConfig.fillColor;
  const showArrowBase3 =
    props.arrowConfig3?.showArrowBase ??
    props.arrowConfig?.showArrowBase ??
    defaultArrowConfig.showArrowBase;

  const arrowLength4 =
    props.arrowConfig4?.length ??
    props.arrowConfig?.length ??
    defaultArrowConfig.length;
  const arrowWidth4 =
    props.arrowConfig4?.width ??
    props.arrowConfig?.width ??
    defaultArrowConfig.width;
  const arrowStrokeWidth4 =
    props.arrowConfig4?.strokeWidth ??
    props.arrowConfig?.strokeWidth ??
    defaultArrowConfig.strokeWidth;
  const arrowStrokeColor4 =
    props.arrowConfig4?.strokeColor ??
    props.arrowConfig?.strokeColor ??
    defaultArrowConfig.strokeColor;
  const arrowFillColor4 =
    props.arrowConfig4?.fillColor ??
    props.arrowConfig?.fillColor ??
    defaultArrowConfig.fillColor;
  const showArrowBase4 =
    props.arrowConfig4?.showArrowBase ??
    props.arrowConfig?.showArrowBase ??
    defaultArrowConfig.showArrowBase;

  const arrowLength5 =
    props.arrowConfig5?.length ??
    props.arrowConfig?.length ??
    defaultArrowConfig.length;
  const arrowWidth5 =
    props.arrowConfig5?.width ??
    props.arrowConfig?.width ??
    defaultArrowConfig.width;
  const arrowStrokeWidth5 =
    props.arrowConfig5?.strokeWidth ??
    props.arrowConfig?.strokeWidth ??
    defaultArrowConfig.strokeWidth;
  const arrowStrokeColor5 =
    props.arrowConfig5?.strokeColor ??
    props.arrowConfig?.strokeColor ??
    defaultArrowConfig.strokeColor;
  const arrowFillColor5 =
    props.arrowConfig5?.fillColor ??
    props.arrowConfig?.fillColor ??
    defaultArrowConfig.fillColor;
  const showArrowBase5 =
    props.arrowConfig5?.showArrowBase ??
    props.arrowConfig?.showArrowBase ??
    defaultArrowConfig.showArrowBase;

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
    let pp = '',
      pp2 = '',
      pp3 = '',
      pp4 = '',
      pp5 = '';
    if (!props.curved) {
      for (let i = 0; i < data.length; i++) {
        if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
          pp +=
            'L' +
            (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data[i].value * containerHeight) / maxValue) +
            ' ';
          // setPoints(pp.replace('L', 'M'));
        }
        if (data2.length && i >= startIndex2 && i <= endIndex2) {
          pp2 +=
            'L' +
            (initialSpacing - dataPointsWidth2 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data2[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data3.length && i >= startIndex3 && i <= endIndex3) {
          pp3 +=
            'L' +
            (initialSpacing - dataPointsWidth3 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data3[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data4.length && i >= startIndex4 && i <= endIndex4) {
          pp4 +=
            'L' +
            (initialSpacing - dataPointsWidth4 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data4[i].value * containerHeight) / maxValue) +
            ' ';
        }
        if (data5.length && i >= startIndex5 && i <= endIndex5) {
          pp5 +=
            'L' +
            (initialSpacing - dataPointsWidth5 / 2 + spacing * i) +
            ' ' +
            (containerHeight +
              10 -
              (data5[i].value * containerHeight) / maxValue) +
            ' ';
        }
      }
      setPoints2(pp2.replace('L', 'M'));
      setPoints3(pp3.replace('L', 'M'));
      setPoints4(pp4.replace('L', 'M'));
      setPoints5(pp5.replace('L', 'M'));

      setPoints(pp.replace('L', 'M'));

      if (data.length > 1 && (props.showArrow1 || props.showArrows)) {
        let ppArray = pp.trim().split(' ');
        let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
        let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
        let y1 = parseInt(ppArray[ppArray.length - 3]);
        let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength1,
          arrowWidth1,
          showArrowBase1,
        );

        setArrow1Points(arrowPoints);
      }

      if (data2.length > 1 && (props.showArrow2 || props.showArrows)) {
        let ppArray = pp2.trim().split(' ');
        let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
        let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
        let y1 = parseInt(ppArray[ppArray.length - 3]);
        let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength2,
          arrowWidth2,
          showArrowBase2,
        );

        setArrow2Points(arrowPoints);
      }

      if (data3.length > 1 && (props.showArrow3 || props.showArrows)) {
        let ppArray = pp3.trim().split(' ');
        let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
        let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
        let y1 = parseInt(ppArray[ppArray.length - 3]);
        let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength3,
          arrowWidth3,
          showArrowBase3,
        );

        setArrow3Points(arrowPoints);
      }

      if (data4.length > 1 && (props.showArrow4 || props.showArrows)) {
        let ppArray = pp4.trim().split(' ');
        let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
        let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
        let y1 = parseInt(ppArray[ppArray.length - 3]);
        let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength4,
          arrowWidth4,
          showArrowBase4,
        );

        setArrow4Points(arrowPoints);
      }

      if (data5.length > 1 && (props.showArrow5 || props.showArrows)) {
        let ppArray = pp5.trim().split(' ');
        let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
        let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
        let y1 = parseInt(ppArray[ppArray.length - 3]);
        let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength5,
          arrowWidth5,
          showArrowBase5,
        );

        setArrow5Points(arrowPoints);
      }

      /***************************          For Area Charts          *************************/
      if (areaChart) {
        let ppp = '',
          ppp2 = '',
          ppp3 = '',
          ppp4 = '',
          ppp5 = '';

        if (data.length && !animateOnDataChange) {
          ppp =
            'L' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp += pp;
          ppp +=
            'L' +
            (initialSpacing -
              dataPointsWidth1 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp +=
            'L' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints(ppp.replace('L', 'M'));
        }

        if (data2.length) {
          ppp2 =
            'L' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp2 += pp2;
          ppp2 +=
            'L' +
            (initialSpacing -
              dataPointsWidth2 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp2 +=
            'L' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints2(ppp2.replace('L', 'M'));
        }

        if (data3.length) {
          ppp3 =
            'L' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp3 += pp3;
          ppp3 +=
            'L' +
            (initialSpacing -
              dataPointsWidth3 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp3 +=
            'L' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints3(ppp3.replace('L', 'M'));
        }
        if (data4.length) {
          ppp4 =
            'L' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp4 += pp4;
          ppp4 +=
            'L' +
            (initialSpacing -
              dataPointsWidth4 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp4 +=
            'L' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints4(ppp4.replace('L', 'M'));
        }

        if (data5.length) {
          ppp5 =
            'L' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          ppp5 += pp5;
          ppp5 +=
            'L' +
            (initialSpacing -
              dataPointsWidth5 / 2 +
              spacing * (data.length - 1)) +
            ' ' +
            (containerHeight + 10 - xAxisThickness);
          ppp5 +=
            'L' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ' ' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints5(ppp5.replace('L', 'M'));
        }
      }

      // console.log('pp-------->', pp);
      // console.log('ppp-------->', ppp);
      // console.log('pp2-------->', pp2);
      // console.log('ppp2-------->', ppp2);

      /*************************************************************************************/
    } else {
      let p1Array = [],
        p2Array = [],
        p3Array = [],
        p4Array = [],
        p5Array = [];
      for (let i = 0; i < data.length; i++) {
        if (i >= startIndex1 && i <= endIndex1) {
          p1Array.push([
            initialSpacing - dataPointsWidth1 / 2 + spacing * i,
            containerHeight + 10 - (data[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data2.length && i >= startIndex2 && i <= endIndex2) {
          p2Array.push([
            initialSpacing - dataPointsWidth2 / 2 + spacing * i,
            containerHeight +
              10 -
              (data2[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data3.length && i >= startIndex3 && i <= endIndex3) {
          p3Array.push([
            initialSpacing - dataPointsWidth3 / 2 + spacing * i,
            containerHeight +
              10 -
              (data3[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data4.length && i >= startIndex4 && i <= endIndex4) {
          p4Array.push([
            initialSpacing - dataPointsWidth4 / 2 + spacing * i,
            containerHeight +
              10 -
              (data4[i].value * containerHeight) / maxValue,
          ]);
        }
        if (data5.length && i >= startIndex5 && i <= endIndex5) {
          p5Array.push([
            initialSpacing - dataPointsWidth5 / 2 + spacing * i,
            containerHeight +
              10 -
              (data5[i].value * containerHeight) / maxValue,
          ]);
        }
      }

      let xx = svgPath(p1Array, bezierCommand);
      let xx2 = svgPath(p2Array, bezierCommand);
      let xx3 = svgPath(p3Array, bezierCommand);
      let xx4 = svgPath(p4Array, bezierCommand);
      let xx5 = svgPath(p5Array, bezierCommand);
      // console.log('xx', xx);

      setPoints(xx);
      setPoints2(xx2);
      setPoints3(xx3);
      setPoints4(xx4);
      setPoints5(xx5);

      if (data.length > 1 && (props.showArrow1 || props.showArrows)) {
        let arrowTipY = p1Array[p1Array.length - 1][1];
        let arrowTipX = p1Array[p1Array.length - 1][0];
        let y1 = p1Array[p1Array.length - 2][1];
        let x1 = p1Array[p1Array.length - 2][0];

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength1,
          arrowWidth1,
          showArrowBase1,
        );

        setArrow1Points(arrowPoints);
      }

      if (data2.length > 1 && (props.showArrow2 || props.showArrows)) {
        let arrowTipY = p2Array[p2Array.length - 1][1];
        let arrowTipX = p2Array[p2Array.length - 1][0];
        let y1 = p2Array[p2Array.length - 2][1];
        let x1 = p2Array[p2Array.length - 2][0];

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength2,
          arrowWidth2,
          showArrowBase2,
        );

        setArrow2Points(arrowPoints);
      }

      if (data3.length > 1 && (props.showArrow3 || props.showArrows)) {
        let arrowTipY = p3Array[p3Array.length - 1][1];
        let arrowTipX = p3Array[p3Array.length - 1][0];
        let y1 = p3Array[p3Array.length - 2][1];
        let x1 = p3Array[p3Array.length - 2][0];

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength3,
          arrowWidth3,
          showArrowBase3,
        );

        setArrow2Points(arrowPoints);
      }

      if (data4.length > 1 && (props.showArrow4 || props.showArrows)) {
        let arrowTipY = p4Array[p4Array.length - 1][1];
        let arrowTipX = p4Array[p4Array.length - 1][0];
        let y1 = p4Array[p4Array.length - 2][1];
        let x1 = p4Array[p4Array.length - 2][0];

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength4,
          arrowWidth4,
          showArrowBase4,
        );

        setArrow2Points(arrowPoints);
      }

      if (data5.length > 1 && (props.showArrow5 || props.showArrows)) {
        let arrowTipY = p5Array[p5Array.length - 1][1];
        let arrowTipX = p5Array[p5Array.length - 1][0];
        let y1 = p5Array[p5Array.length - 2][1];
        let x1 = p5Array[p5Array.length - 2][0];

        let arrowPoints = getArrowPoints(
          arrowTipX,
          arrowTipY,
          x1,
          y1,
          arrowLength5,
          arrowWidth5,
          showArrowBase5,
        );

        setArrow2Points(arrowPoints);
      }

      /***************************          For Area Charts          *************************/

      // console.log('xx---->>>', xx)
      if (areaChart) {
        if (data.length) {
          xx =
            'M ' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data[0].value * containerHeight) / maxValue) +
            ' ' +
            xx +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth1 / 2 +
              spacing * (data.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints(xx);
          // console.log('xx later ---->>>', xx)
        }

        if (data2.length) {
          xx2 =
            'M ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data2[0].value * containerHeight) / maxValue) +
            ' ' +
            xx2 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth2 / 2 +
              spacing * (data2.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth2 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints2(xx2);
        }

        if (data3.length) {
          xx3 =
            'M ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data3[0].value * containerHeight) / maxValue) +
            ' ' +
            xx3 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth3 / 2 +
              spacing * (data3.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth3 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints3(xx3);
        }

        if (data4.length) {
          xx4 =
            'M ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data4[0].value * containerHeight) / maxValue) +
            ' ' +
            xx4 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth4 / 2 +
              spacing * (data4.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth4 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints4(xx4);
        }

        if (data5.length) {
          xx5 =
            'M ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight +
              10 -
              (data5[0].value * containerHeight) / maxValue) +
            ' ' +
            xx5 +
            ' ' +
            'L ' +
            (initialSpacing -
              dataPointsWidth5 / 2 +
              spacing * (data5.length - 1)) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ' +
            'L ' +
            (initialSpacing - dataPointsWidth5 / 2) +
            ',' +
            (containerHeight + 10 - xAxisThickness) +
            ' ';
          setFillPoints5(xx5);
        }
      }

      /*************************************************************************************/
    }
  }, [
    animateOnDataChange,
    areaChart,
    containerHeight,
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
    arrowLength1,
    arrowWidth1,
    showArrowBase1,
    props.showArrow1,
    props.showArrows,
    props.showArrow2,
    props.showArrow3,
    props.showArrow4,
    props.showArrow5,
    arrowLength2,
    arrowWidth2,
    showArrowBase2,
    arrowLength3,
    arrowWidth3,
    showArrowBase3,
    arrowLength4,
    arrowWidth4,
    showArrowBase4,
    arrowLength5,
    arrowWidth5,
    showArrowBase5,
  ]);

  const horizSections = [{value: '0'}];
  const horizSectionsBelow = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
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

  const defaultPointerConfig = {
    height: 0,
    width: 0,
    radius: 5,
    pointerColor: 'red',
    pointerComponent: null,
    showPointerStrip: true,
    pointerStripHeight: containerHeight,
    pointerStripWidth: 1,
    pointerStripColor: 'black',
    pointerStripUptoDataPoint: false,
    pointerLabelComponent: null,
    stripOverPointer: false,
    shiftPointerLabelX: 0,
    shiftPointerLabelY: 0,
    pointerLabelWidth: 20,
    pointerLabelHeight: 20,
    autoAdjustPointerLabelPosition: true,
    pointerVanishDelay: 150,
    activatePointersOnLongPress: false,
    activatePointersDelay: 150,
    hidePointer1: false,
    hidePointer2: false,
    hidePointer3: false,
    hidePointer4: false,
    hidePointer5: false,
  };
  const pointerConfig = props.pointerConfig || null;
  const getPointerProps = props.getPointerProps || null;
  const pointerHeight =
    pointerConfig && pointerConfig.height
      ? pointerConfig.height
      : defaultPointerConfig.height;
  const pointerWidth =
    pointerConfig && pointerConfig.width
      ? pointerConfig.width
      : defaultPointerConfig.width;
  const pointerRadius =
    pointerConfig && pointerConfig.radius
      ? pointerConfig.radius
      : defaultPointerConfig.radius;
  const pointerColor =
    pointerConfig && pointerConfig.pointerColor
      ? pointerConfig.pointerColor
      : defaultPointerConfig.pointerColor;
  const pointerComponent =
    pointerConfig && pointerConfig.pointerComponent
      ? pointerConfig.pointerComponent
      : defaultPointerConfig.pointerComponent;

  const showPointerStrip =
    pointerConfig && pointerConfig.showPointerStrip === false
      ? false
      : defaultPointerConfig.showPointerStrip;
  const pointerStripHeight =
    pointerConfig && pointerConfig.pointerStripHeight
      ? pointerConfig.pointerStripHeight
      : defaultPointerConfig.pointerStripHeight;
  const pointerStripWidth =
    pointerConfig && pointerConfig.pointerStripWidth
      ? pointerConfig.pointerStripWidth
      : defaultPointerConfig.pointerStripWidth;
  const pointerStripColor =
    pointerConfig && pointerConfig.pointerStripColor
      ? pointerConfig.pointerStripColor
      : defaultPointerConfig.pointerStripColor;
  const pointerStripUptoDataPoint =
    pointerConfig && pointerConfig.pointerStripUptoDataPoint
      ? pointerConfig.pointerStripUptoDataPoint
      : defaultPointerConfig.pointerStripUptoDataPoint;
  const pointerLabelComponent =
    pointerConfig && pointerConfig.pointerLabelComponent
      ? pointerConfig.pointerLabelComponent
      : defaultPointerConfig.pointerLabelComponent;
  const stripOverPointer =
    pointerConfig && pointerConfig.stripOverPointer
      ? pointerConfig.stripOverPointer
      : defaultPointerConfig.stripOverPointer;
  const shiftPointerLabelX =
    pointerConfig && pointerConfig.shiftPointerLabelX
      ? pointerConfig.shiftPointerLabelX
      : defaultPointerConfig.shiftPointerLabelX;
  const shiftPointerLabelY =
    pointerConfig && pointerConfig.shiftPointerLabelY
      ? pointerConfig.shiftPointerLabelY
      : defaultPointerConfig.shiftPointerLabelY;
  const pointerLabelWidth =
    pointerConfig && pointerConfig.pointerLabelWidth
      ? pointerConfig.pointerLabelWidth
      : defaultPointerConfig.pointerLabelWidth;
  const pointerLabelHeight =
    pointerConfig && pointerConfig.pointerLabelHeight
      ? pointerConfig.pointerLabelHeight
      : defaultPointerConfig.pointerLabelHeight;
  const autoAdjustPointerLabelPosition =
    pointerConfig && pointerConfig.autoAdjustPointerLabelPosition === false
      ? false
      : defaultPointerConfig.autoAdjustPointerLabelPosition;
  const pointerVanishDelay =
    pointerConfig && pointerConfig.pointerVanishDelay
      ? pointerConfig.pointerVanishDelay
      : defaultPointerConfig.pointerVanishDelay;
  const activatePointersOnLongPress =
    pointerConfig && pointerConfig.activatePointersOnLongPress
      ? pointerConfig.activatePointersOnLongPress
      : defaultPointerConfig.activatePointersOnLongPress;
  const activatePointersDelay =
    pointerConfig && pointerConfig.activatePointersDelay
      ? pointerConfig.activatePointersDelay
      : defaultPointerConfig.activatePointersDelay;
  const hidePointer1 =
    pointerConfig && pointerConfig.hidePointer1
      ? pointerConfig.hidePointer1
      : defaultPointerConfig.hidePointer1;
  const hidePointer2 =
    pointerConfig && pointerConfig.hidePointer2
      ? pointerConfig.hidePointer2
      : defaultPointerConfig.hidePointer2;
  const hidePointer3 =
    pointerConfig && pointerConfig.hidePointer3
      ? pointerConfig.hidePointer3
      : defaultPointerConfig.hidePointer3;
  const hidePointer4 =
    pointerConfig && pointerConfig.hidePointer4
      ? pointerConfig.hidePointer4
      : defaultPointerConfig.hidePointer4;
  const hidePointer5 =
    pointerConfig && pointerConfig.hidePointer5
      ? pointerConfig.hidePointer5
      : defaultPointerConfig.hidePointer5;
  const disableScroll =
    props.disableScroll ||
    (pointerConfig
      ? activatePointersOnLongPress
        ? responderActive
          ? true
          : false
        : true
      : false);
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

  // const sectionsOverlay = () => {
  //     return (
  //         <Animated.View
  //             style={{
  //                 backgroundColor: 'white',
  //                 position: 'absolute',
  //                 zIndex: 1,
  //                 width: animatedWidth
  //             }}>
  //             {renderHorizSections()}
  //         </Animated.View>
  //     )
  // }

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

  const renderPointer = (lineNumber: number) => {
    if (lineNumber === 1 && hidePointer1) return;
    if (lineNumber === 2 && hidePointer2) return;
    if (lineNumber === 3 && hidePointer3) return;
    if (lineNumber === 4 && hidePointer4) return;
    if (lineNumber === 5 && hidePointer5) return;
    let pointerItemLocal, pointerYLocal, pointerColorLocal;
    switch (lineNumber) {
      case 1:
        pointerItemLocal = pointerItem;
        pointerYLocal = pointerY;
        pointerColorLocal = pointerConfig.pointer1Color || pointerColor;
        break;
      case 2:
        pointerItemLocal = pointerItem2;
        pointerYLocal = pointerY2;
        pointerColorLocal = pointerConfig.pointer2Color || pointerColor;
        break;
      case 3:
        pointerItemLocal = pointerItem3;
        pointerYLocal = pointerY3;
        pointerColorLocal = pointerConfig.pointer3Color || pointerColor;
        break;
      case 4:
        pointerItemLocal = pointerItem4;
        pointerYLocal = pointerY4;
        pointerColorLocal = pointerConfig.pointer4Color || pointerColor;
        break;
      case 5:
        pointerItemLocal = pointerItem5;
        pointerYLocal = pointerY5;
        pointerColorLocal = pointerConfig.pointer5Color || pointerColor;
        break;
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: pointerX + (pointerItemLocal.pointerShiftX || 0),
          top: pointerYLocal,
        }}>
        {pointerComponent ? (
          pointerComponent()
        ) : (
          <View
            style={{
              height: pointerHeight || pointerRadius * 2,
              width: pointerWidth || pointerRadius * 2,
              marginTop: pointerItemLocal.pointerShiftY || 0,
              backgroundColor: pointerColorLocal,
              borderRadius: pointerRadius || 0,
            }}
          />
        )}
      </View>
    );
  };

  const renderStripAndLabel = () => {
    let pointerItemLocal, pointerYLocal;

    pointerItemLocal = [pointerItem];
    let arr = [pointerY];
    if (pointerY2 !== 0) {
      arr.push(pointerY2);
      pointerItemLocal.push(pointerItem2);
    }
    if (pointerY3 !== 0) {
      arr.push(pointerY3);
      pointerItemLocal.push(pointerItem3);
    }
    if (pointerY4 !== 0) {
      arr.push(pointerY4);
      pointerItemLocal.push(pointerItem4);
    }
    if (pointerY5 !== 0) {
      arr.push(pointerY5);
      pointerItemLocal.push(pointerItem5);
    }
    pointerYLocal = Math.min(...arr);

    let left = 0,
      top = 0;
    if (autoAdjustPointerLabelPosition) {
      if (pointerX < pointerLabelWidth / 2) {
        left = 7;
      } else if (
        activatePointersOnLongPress &&
        pointerX - scrollX < pointerLabelWidth / 2 - 10
      ) {
        left = 7;
      } else {
        if (
          !activatePointersOnLongPress &&
          pointerX >
            (props.width ||
              Dimensions.get('window').width - yAxisLabelWidth - 15) -
              pointerLabelWidth / 2
        ) {
          left = -pointerLabelWidth - 4;
        } else if (
          activatePointersOnLongPress &&
          pointerX - scrollX >
            (props.width + 10 ||
              Dimensions.get('window').width - yAxisLabelWidth - 15) -
              pointerLabelWidth / 2
        ) {
          left = -pointerLabelWidth - 4;
        } else {
          left = -pointerLabelWidth / 2 + 5;
        }
      }
    } else {
      left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX;
    }

    if (autoAdjustPointerLabelPosition) {
      if (pointerLabelHeight - pointerYLocal > 10) {
        top = 10;
      } else {
        top = -pointerLabelHeight;
      }
    } else {
      top =
        (pointerStripUptoDataPoint
          ? pointerRadius || pointerStripHeight / 2
          : -pointerYLocal + 8) -
        pointerLabelWidth / 2 +
        shiftPointerLabelY;
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: pointerX + (pointerItemLocal[0].pointerShiftX || 0),
          top: pointerYLocal,
        }}>
        {showPointerStrip && (
          <View
            style={{
              position: 'absolute',
              left: (pointerRadius || pointerWidth) - pointerStripWidth / 4,
              top: pointerStripUptoDataPoint
                ? pointerRadius || pointerStripHeight / 2
                : -pointerYLocal + 8,
              width: pointerStripWidth,
              height: pointerStripUptoDataPoint
                ? containerHeight - pointerYLocal + 5 - xAxisThickness
                : pointerStripHeight,
              marginTop: pointerStripUptoDataPoint
                ? 0
                : containerHeight - pointerStripHeight,
            }}>
            <Svg>
              <Line
                stroke={pointerStripColor}
                strokeWidth={pointerStripWidth}
                strokeDasharray={
                  pointerConfig.strokeDashArray
                    ? pointerConfig.strokeDashArray
                    : ''
                }
                x1={0}
                y1={0}
                x2={0}
                // strokeLinecap="round"
                y2={
                  pointerStripUptoDataPoint
                    ? containerHeight - pointerYLocal + 5 - xAxisThickness
                    : pointerStripHeight
                }
              />
            </Svg>
          </View>
        )}

        {pointerLabelComponent && (
          <View
            style={[
              {
                position: 'absolute',
                left: left,
                top: top,
                marginTop: pointerStripUptoDataPoint
                  ? 0
                  : containerHeight - pointerStripHeight,
                width: pointerLabelWidth,
              },
            ]}>
            {pointerLabelComponent(pointerItemLocal)}
          </View>
        )}
      </View>
    );
  };

  const lineSvgComponent = (
    points: any,
    currentLineThickness: number | undefined,
    color: string,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
    showArrow: boolean,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
  ) => {
    return (
      <Svg>
        {strokeDashArray &&
        strokeDashArray.length === 2 &&
        typeof strokeDashArray[0] === 'number' &&
        typeof strokeDashArray[1] === 'number' ? (
          <Path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth={currentLineThickness || thickness}
            strokeDasharray={strokeDashArray}
          />
        ) : (
          <Path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth={currentLineThickness || thickness}
          />
        )}

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
        {areaChart && (
          <Path
            d={fillPoints}
            fill="url(#Gradient)"
            stroke={'transparent'}
            strokeWidth={currentLineThickness || thickness}
          />
        )}

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
        {showArrow && (
          <Path
            d={arrowPoints}
            fill={arrowFillColor}
            stroke={arrowStrokeColor}
            strokeWidth={arrowStrokeWidth}
          />
        )}
      </Svg>
    );
  };

  const renderLine = (
    zIndex: number,
    points: any,
    currentLineThickness: number | undefined,
    color: string,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
    showArrow,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
  ) => {
    return (
      <View
        onStartShouldSetResponder={evt => (pointerConfig ? true : false)}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, data.length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            2;
          setPointerX(z);
          setPointerIndex(factor);
          let item, y;
          item = data[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY2(y);
              setPointerItem2(item);
            }
          }
          if (data3 && data3.length) {
            item = data3[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY3(y);
              setPointerItem3(item);
            }
          }
          if (data4 && data4.length) {
            item = data4[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY4(y);
              setPointerItem4(item);
            }
          }
          if (data5 && data5.length) {
            item = data5[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY5(y);
              setPointerItem5(item);
            }
          }
        }}
        onResponderMove={evt => {
          // console.log('onResponderMove++++++++++',evt);
          if (!pointerConfig) return;
          if (
            activatePointersOnLongPress &&
            evt.timeStamp - responderStartTime < activatePointersDelay
          ) {
            return;
          } else {
            setResponderActive(true);
          }
          let x = evt.nativeEvent.locationX;
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, data.length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            2;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = data[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY2(y);
              setPointerItem2(item);
            }
          }
          if (data3 && data3.length) {
            item = data3[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY3(y);
              setPointerItem3(item);
            }
          }
          if (data4 && data4.length) {
            item = data4[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY4(y);
              setPointerItem4(item);
            }
          }
          if (data5 && data5.length) {
            item = data5[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY5(y);
              setPointerItem5(item);
            }
          }
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          // console.log('evt...end.......',evt);
          setResponderStartTime(0);
          setPointerIndex(-1);
          setResponderActive(false);
          setTimeout(() => setPointerX(0), pointerVanishDelay);
        }}
        onResponderTerminationRequest={evt => false}
        // onResponderTerminate={evt => {
        //   console.log('evt...terminate.......',evt);
        // }}
        // onResponderRelease={evt => {
        //   setResponderStartTime(0);
        //   setResponderActive(false);
        //   setTimeout(() => setPointerX(0), pointerVanishDelay);
        // }}
        style={{
          position: 'absolute',
          height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
          bottom: 60 + labelsExtraHeight,
          width: totalWidth,
          zIndex: zIndex,
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
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
        )}
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
    showArrow,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
  ) => {
    // console.log('animatedWidth is-------->', animatedWidth);
    return (
      <Animated.View
        onStartShouldSetResponder={evt => (pointerConfig ? true : false)}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, data.length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            2;
          setPointerX(z);
          setPointerIndex(factor);
          let item, y;
          item = data[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY2(y);
              setPointerItem2(item);
            }
          }
          if (data3 && data3.length) {
            item = data3[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY3(y);
              setPointerItem3(item);
            }
          }
          if (data4 && data4.length) {
            item = data4[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY4(y);
              setPointerItem4(item);
            }
          }
          if (data5 && data5.length) {
            item = data5[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY5(y);
              setPointerItem5(item);
            }
          }
        }}
        onResponderMove={evt => {
          if (!pointerConfig) return;
          if (
            activatePointersOnLongPress &&
            evt.timeStamp - responderStartTime < activatePointersDelay
          ) {
            return;
          } else {
            setResponderActive(true);
          }
          let x = evt.nativeEvent.locationX;
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, data.length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            2;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = data[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY2(y);
              setPointerItem2(item);
            }
          }
          if (data3 && data3.length) {
            item = data3[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY3(y);
              setPointerItem3(item);
            }
          }
          if (data4 && data4.length) {
            item = data4[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY4(y);
              setPointerItem4(item);
            }
          }
          if (data5 && data5.length) {
            item = data5[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setPointerY5(y);
              setPointerItem5(item);
            }
          }
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          // console.log('evt...end.......',evt);
          setResponderStartTime(0);
          setPointerIndex(-1);
          setResponderActive(false);
          setTimeout(() => setPointerX(0), pointerVanishDelay);
        }}
        onResponderTerminationRequest={evt => false}
        // onResponderTerminate={evt => {
        //   console.log('evt...terminate.......',evt);
        // }}
        // onResponderRelease={evt => {
        //   setResponderStartTime(0);
        //   setResponderActive(false);
        //   setTimeout(() => setPointerX(0), pointerVanishDelay);
        // }}
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
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
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
        onScroll={ev => {
          if (
            pointerConfig &&
            pointerConfig.activatePointersOnLongPress &&
            pointerConfig.autoAdjustPointerLabelPosition
          ) {
            setScrollX(ev.nativeEvent.contentOffset.x);
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
              points,
              animatedWidth,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
              strokeDashArray1,
              props.showArrow1 || props.showArrows,
              arrow1Points,
              arrowStrokeWidth1,
              arrowStrokeColor1,
              arrowFillColor1,
            )
          : renderLine(
              zIndex1,
              points,
              thickness1,
              color1,
              fillPoints,
              startFillColor1,
              endFillColor1,
              startOpacity1,
              endOpacity1,
              strokeDashArray1,
              props.showArrow1 || props.showArrows,
              arrow1Points,
              arrowStrokeWidth1,
              arrowStrokeColor1,
              arrowFillColor1,
            )}
        {points2
          ? isAnimated
            ? renderAnimatedLine(
                zIndex2,
                points2,
                animatedWidth2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
                strokeDashArray2,
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
              )
            : renderLine(
                zIndex2,
                points2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
                strokeDashArray2,
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
              )
          : null}
        {points3
          ? isAnimated
            ? renderAnimatedLine(
                zIndex3,
                points3,
                animatedWidth3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
                strokeDashArray3,
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
              )
            : renderLine(
                zIndex3,
                points3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
                strokeDashArray3,
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
              )
          : null}
        {points4
          ? isAnimated
            ? renderAnimatedLine(
                zIndex4,
                points4,
                animatedWidth4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
                strokeDashArray4,
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
              )
            : renderLine(
                zIndex4,
                points4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
                strokeDashArray4,
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
              )
          : null}
        {points5
          ? isAnimated
            ? renderAnimatedLine(
                zIndex5,
                points5,
                animatedWidth5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
                strokeDashArray5,
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
              )
            : renderLine(
                zIndex5,
                points5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
                strokeDashArray5,
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
              )
          : null}
        {pointerX > 0 ? (
          <View
            style={{
              position: 'absolute',
              height:
                containerHeight + 10 + horizSectionsBelow.length * stepHeight,
              bottom: 60 + labelsExtraHeight,
              width: totalWidth,
              zIndex: 20,
            }}>
            {!stripOverPointer && renderStripAndLabel()}
            {renderPointer(1)}
            {points2 ? renderPointer(2) : null}
            {points3 ? renderPointer(3) : null}
            {points4 ? renderPointer(4) : null}
            {points5 ? renderPointer(5) : null}
            {stripOverPointer && renderStripAndLabel()}
          </View>
        ) : null}
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
      {pointerConfig &&
        getPointerProps &&
        getPointerProps({pointerIndex, pointerX, pointerY})}
    </View>
  );
};
