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
  Dimensions,
  Platform,
  ColorValue,
  I18nManager,
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
import {
  svgPath,
  getArrowPoints,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getSecondaryDataWithOffsetIncluded,
  getAllArrowProperties,
  computeMaxAndMinItems,
  clone,
  getCurvePathWithSegments,
  getSegmentedPathObjects,
  getSegmentString,
  getRegionPathObjects,
  getPathWithHighlight,
} from '../utils';
import {
  AxesAndRulesDefaults,
  LineDefaults,
  RANGE_ENTER,
  RANGE_EXIT,
  SEGMENT_END,
  SEGMENT_START,
  STOP,
  chartTypes,
  defaultArrowConfig,
  defaultPointerConfig,
  screenWidth,
} from '../utils/constants';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {LineChartPropsType, lineDataItem} from './types';
import {
  BarAndLineChartsWrapperTypes,
  EdgePosition,
  LineSvgProps,
} from '../utils/types';
import {StripAndLabel} from '../Components/common/StripAndLabel';
import {Pointer} from '../Components/common/Pointer';

let initialData: Array<lineDataItem> | null = null;
let animations: Array<any> = [];

export const LineChart = (props: LineChartPropsType) => {
  const scrollRef = props.scrollRef ?? useRef(null);
  const curvature = props.curvature ?? LineDefaults.curvature;
  const curveType = props.curveType ?? LineDefaults.curveType;
  const [scrollX, setScrollX] = useState(0);
  const [arrow1Points, setArrow1Points] = useState('');
  const [arrow2Points, setArrow2Points] = useState('');
  const [arrow3Points, setArrow3Points] = useState('');
  const [arrow4Points, setArrow4Points] = useState('');
  const [arrow5Points, setArrow5Points] = useState('');
  const [secondaryArrowPoints, setSecondaryArrowPoints] = useState('');
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
  const [secondaryPointerY, setSecondaryPointerY] = useState(0);
  const [secondaryPointerItem, setSecondaryPointerItem] = useState({
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
  const [secondaryPoints, setSecondaryPoints] = useState('');
  const [fillPoints, setFillPoints] = useState('');
  const [fillPoints2, setFillPoints2] = useState('');
  const [fillPoints3, setFillPoints3] = useState('');
  const [fillPoints4, setFillPoints4] = useState('');
  const [fillPoints5, setFillPoints5] = useState('');
  const [secondaryFillPoints, setSecondaryFillPoints] = useState('');

  const [pointsFromSet, setPointsFromSet] = useState<string[]>([]);
  const [fillPointsFromSet, setFillPointsFromSet] = useState<string[]>([]);
  const [arrowPointsFromSet, setArrowPointsFromSet] = useState<string[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const noOfSections = props.noOfSections || 10;
  const containerHeight =
    props.height ??
    ((props.stepHeight ?? 0) * noOfSections ||
      AxesAndRulesDefaults.containerHeight);
  const data = useMemo(() => {
    if (!props.data) {
      return [];
    }
    if (props.yAxisOffset) {
      return clone(props.data).map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
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
      return clone(props.data2).map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
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
      return clone(props.data3).map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
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
      return clone(props.data4).map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
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
      return clone(props.data5).map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
    return props.data5;
  }, [props.yAxisOffset, props.data5]);

  const secondaryData =
    getSecondaryDataWithOffsetIncluded(
      props.secondaryData,
      props.secondaryYAxis,
    ) || [];

  const dataSet = props.dataSet;
  const data0 = useMemo(() => {
    if (props.yAxisOffset) {
      return dataSet?.[0]?.data;
    } else {
      return dataSet?.[0]?.data?.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
  }, [props.yAxisOffset, dataSet]);

  const scrollToEnd = props.scrollToEnd || LineDefaults.scrollToEnd;
  const scrollAnimation = props.scrollAnimation ?? LineDefaults.scrollAnimation;
  const scrollEventThrottle =
    props.scrollEventThrottle ?? LineDefaults.scrollEventThrottle;

  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const widthValue2 = useMemo(() => new Animated.Value(0), []);
  const widthValue3 = useMemo(() => new Animated.Value(0), []);
  const widthValue4 = useMemo(() => new Animated.Value(0), []);
  const widthValue5 = useMemo(() => new Animated.Value(0), []);

  const widthValuesFromSet = useMemo(
    () => dataSet?.map(set => new Animated.Value(0)),
    [],
  );

  const labelsExtraHeight = props.labelsExtraHeight || 0;

  const animationDuration =
    props.animationDuration || LineDefaults.animationDuration;
  const onDataChangeAnimationDuration =
    props.onDataChangeAnimationDuration || 400;
  const animateTogether = props.animateTogether || LineDefaults.animateTogether;
  const animateOnDataChange = props.yAxisOffset
    ? false
    : props.animateOnDataChange || false;

  const startIndex1 = props.startIndex1 ?? props.startIndex ?? 0;

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
  const endIndex2 = props.endIndex2 ?? data2.length - 1;

  const startIndex3 = props.startIndex3 || 0;
  const endIndex3 = props.endIndex3 ?? data3.length - 1;
  const startIndex4 = props.startIndex4 || 0;
  const endIndex4 = props.endIndex4 ?? data4.length - 1;
  const startIndex5 = props.startIndex5 || 0;
  const endIndex5 = props.endIndex5 ?? data5.length - 1;

  const lineSegments = props.lineSegments;
  const lineSegments2 = props.lineSegments2;
  const lineSegments3 = props.lineSegments3;
  const lineSegments4 = props.lineSegments4;
  const lineSegments5 = props.lineSegments5;

  const highlightedRange = props.highlightedRange;

  if (!initialData) {
    initialData = data0 ?? [...data];
    animations = initialData.map(item => new Animated.Value(item.value));
  }

  let newPoints = '',
    newFillPoints = '';
  let counter = 0;

  const adjustToWidth = props.adjustToWidth || false;

  const initialSpacing = props.initialSpacing ?? LineDefaults.initialSpacing;
  const endSpacing =
    props.endSpacing ?? (adjustToWidth ? 0 : LineDefaults.endSpacing);

  const thickness = props.thickness || LineDefaults.thickness;

  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth);

  const spacing =
    props.spacing ??
    (adjustToWidth
      ? ((props.width ?? screenWidth - yAxisLabelWidth) - initialSpacing) /
        Math.max((data0 ?? data).length - 1, 1)
      : LineDefaults.spacing);

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness;
  const dataPointsHeight1 =
    props.dataPointsHeight1 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight;
  const dataPointsWidth1 =
    props.dataPointsWidth1 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth;
  const dataPointsRadius1 =
    props.dataPointsRadius1 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius;
  const dataPointsColor1 =
    props.dataPointsColor1 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor;
  const dataPointsShape1 =
    props.dataPointsShape1 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape;

  const dataPointsHeight2 =
    props.dataPointsHeight2 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight;
  const dataPointsWidth2 =
    props.dataPointsWidth2 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth;
  const dataPointsRadius2 =
    props.dataPointsRadius2 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius;
  const dataPointsColor2 =
    props.dataPointsColor2 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor2;
  const dataPointsShape2 =
    props.dataPointsShape2 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape;

  const dataPointsHeight3 =
    props.dataPointsHeight3 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight;
  const dataPointsWidth3 =
    props.dataPointsWidth3 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth;
  const dataPointsRadius3 =
    props.dataPointsRadius3 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius;
  const dataPointsColor3 =
    props.dataPointsColor3 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor3;
  const dataPointsShape3 =
    props.dataPointsShape3 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape;

  const dataPointsHeight4 =
    props.dataPointsHeight4 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight;
  const dataPointsWidth4 =
    props.dataPointsWidth4 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth;
  const dataPointsRadius4 =
    props.dataPointsRadius4 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius;
  const dataPointsColor4 =
    props.dataPointsColor4 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor;
  const dataPointsShape4 =
    props.dataPointsShape4 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape;

  const dataPointsHeight5 =
    props.dataPointsHeight5 ??
    props.dataPointsHeight ??
    LineDefaults.dataPointsHeight;
  const dataPointsWidth5 =
    props.dataPointsWidth5 ??
    props.dataPointsWidth ??
    LineDefaults.dataPointsWidth;
  const dataPointsRadius5 =
    props.dataPointsRadius5 ??
    props.dataPointsRadius ??
    LineDefaults.dataPointsRadius;
  const dataPointsColor5 =
    props.dataPointsColor5 ??
    props.dataPointsColor ??
    LineDefaults.dataPointsColor;
  const dataPointsShape5 =
    props.dataPointsShape5 ??
    props.dataPointsShape ??
    LineDefaults.dataPointsShape;

  const areaChart = props.areaChart ?? false;
  const areaChart1 = props.areaChart1 ?? false;
  const areaChart2 = props.areaChart2 ?? false;
  const areaChart3 = props.areaChart3 ?? false;
  const areaChart4 = props.areaChart4 ?? false;
  const areaChart5 = props.areaChart5 ?? false;

  const atLeastOneAreaChart =
    dataSet?.some(set => set.areaChart) ||
    areaChart ||
    areaChart1 ||
    areaChart2 ||
    areaChart3 ||
    areaChart4 ||
    areaChart5;

  const stepChart = props.stepChart ?? false;
  const stepChart1 = props.stepChart1 ?? false;
  const stepChart2 = props.stepChart2 ?? false;
  const stepChart3 = props.stepChart3 ?? false;
  const stepChart4 = props.stepChart4 ?? false;
  const stepChart5 = props.stepChart5 ?? false;

  const edgePosition = props.edgePosition ?? LineDefaults.edgePosition;

  const textFontSize1 =
    props.textFontSize1 ?? props.textFontSize ?? LineDefaults.textFontSize;
  const textFontSize2 =
    props.textFontSize2 ?? props.textFontSize ?? LineDefaults.textFontSize;
  const textFontSize3 =
    props.textFontSize3 ?? props.textFontSize ?? LineDefaults.textFontSize;
  const textFontSize4 =
    props.textFontSize4 ?? props.textFontSize ?? LineDefaults.textFontSize;
  const textFontSize5 =
    props.textFontSize5 ?? props.textFontSize ?? LineDefaults.textFontSize;
  const textColor1 =
    props.textColor1 ?? props.textColor ?? LineDefaults.textColor;
  const textColor2 =
    props.textColor2 ?? props.textColor ?? LineDefaults.textColor;
  const textColor3 =
    props.textColor3 ?? props.textColor ?? LineDefaults.textColor;
  const textColor4 =
    props.textColor4 ?? props.textColor ?? LineDefaults.textColor;
  const textColor5 =
    props.textColor5 ?? props.textColor ?? LineDefaults.textColor;

  const totalWidth = initialSpacing + spacing * (data0 ?? data).length;

  const {maxItem, minItem} = computeMaxAndMinItems(
    data0 ?? data,
    props.roundToDigits,
    props.showFractionalValues,
  );

  const maxValue = props.maxValue || maxItem;
  const mostNegativeValue = props.mostNegativeValue || minItem;

  const overflowTop = props.overflowTop ?? 0;

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    overflowTop,
  );
  const getX = index => initialSpacing + spacing * index - 1;
  const getY = value =>
    extendedContainerHeight - (value * containerHeight) / maxValue;

  const {maxItem: secondaryMaxItem} = computeMaxAndMinItems(
    secondaryData,
    props.secondaryYAxis?.roundToDigits,
    props.secondaryYAxis?.showFractionalValues,
  );
  const secondaryMaxValue =
    props.secondaryYAxis?.maxValue ?? (secondaryMaxItem || maxValue);
  const getSecondaryY = value =>
    extendedContainerHeight - (value * containerHeight) / secondaryMaxValue;
  const heightUptoXaxis = extendedContainerHeight - xAxisThickness;

  if (animateOnDataChange) {
    animations.forEach((item, index) => {
      item.addListener(val => {
        const temp = data[index]?.value ?? 0;
        data[index].value = val.value;
        let pp = '',
          ppp = '';
        if (!(dataSet?.[0].curved ?? props.curved)) {
          for (let i = 0; i < (data0 ?? data).length; i++) {
            pp += 'L' + getX(i) + ' ' + getY((data0 ?? data)[i].value) + ' ';
          }
          if (dataSet?.[0]?.areaChart ?? areaChart) {
            ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp += pp;
            ppp +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
          }
          newPoints = pp;
          newFillPoints = ppp;
          setPointsOnChange();
        }
        counter++;
        data[index].value = temp;
      });
    });
  }

  const setPointsOnChange = () => {
    if (counter === data.length) {
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
            toValue: data[index]?.value ?? 0,
            useNativeDriver: Platform.OS === 'ios', // if useNativeDriver is set to true, animateOnDataChange feature fails for Android, so setting it true only for iOS
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

  const decreaseWidthsFromSet = useCallback(() => {
    dataSet?.map((set, index) => {
      widthValuesFromSet?.[index]?.setValue(0);
      if (widthValuesFromSet?.[index]) {
        Animated.timing(widthValuesFromSet?.[index], {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
    });
  }, [animationDuration, widthValuesFromSet]);

  useEffect(() => {
    decreaseWidth();
    labelsAppear();
    widthValuesFromSet?.forEach((item, index) => {
      setTimeout(
        () => {
          decreaseWidthsFromSet?.[index]?.();
        },
        animateTogether ? 0 : animationDuration * index,
      );
    });
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

  const showValuesAsDataPointsText =
    props.showValuesAsDataPointsText ?? LineDefaults.showValuesAsDataPointsText;

  const thickness1 =
    props.thickness1 ?? props.thickness ?? LineDefaults.thickness;
  const thickness2 =
    props.thickness2 ?? props.thickness ?? LineDefaults.thickness;
  const thickness3 =
    props.thickness3 ?? props.thickness ?? LineDefaults.thickness;
  const thickness4 =
    props.thickness4 ?? props.thickness ?? LineDefaults.thickness;
  const thickness5 =
    props.thickness5 ?? props.thickness ?? LineDefaults.thickness;

  const zIndex1 = props.zIndex1 ?? 0;
  const zIndex2 = props.zIndex2 ?? 0;
  const zIndex3 = props.zIndex3 ?? 0;
  const zIndex4 = props.zIndex4 ?? 0;
  const zIndex5 = props.zIndex5 ?? 0;

  const strokeDashArray1 = props.strokeDashArray1 ?? props.strokeDashArray;
  const strokeDashArray2 = props.strokeDashArray2 ?? props.strokeDashArray;
  const strokeDashArray3 = props.strokeDashArray3 ?? props.strokeDashArray;
  const strokeDashArray4 = props.strokeDashArray4 ?? props.strokeDashArray;
  const strokeDashArray5 = props.strokeDashArray5 ?? props.strokeDashArray;

  const rotateLabel = props.rotateLabel ?? false;
  const isAnimated = props.isAnimated ?? false;
  const hideDataPoints1 =
    props.hideDataPoints ?? props.hideDataPoints1 ?? false;
  const hideDataPoints2 =
    props.hideDataPoints ?? props.hideDataPoints2 ?? false;
  const hideDataPoints3 =
    props.hideDataPoints ?? props.hideDataPoints3 ?? false;
  const hideDataPoints4 =
    props.hideDataPoints ?? props.hideDataPoints4 ?? false;
  const hideDataPoints5 =
    props.hideDataPoints ?? props.hideDataPoints5 ?? false;

  const color1 = props.color1 ?? props.color ?? LineDefaults.color;
  const color2 = props.color2 ?? props.color ?? LineDefaults.color;
  const color3 = props.color3 ?? props.color ?? LineDefaults.color;
  const color4 = props.color4 ?? props.color ?? LineDefaults.color;
  const color5 = props.color5 ?? props.color ?? LineDefaults.color;

  const startFillColor1 =
    props.startFillColor1 ??
    props.startFillColor ??
    LineDefaults.startFillColor;
  const endFillColor1 =
    props.endFillColor1 ?? props.endFillColor ?? LineDefaults.endFillColor;
  const startOpacity = props.startOpacity ?? LineDefaults.startOpacity;
  const endOpacity = props.endOpacity ?? LineDefaults.endOpacity;
  const startOpacity1 = props.startOpacity1 ?? startOpacity;
  const endOpacity1 = props.endOpacity1 ?? endOpacity;

  const startFillColor2 =
    props.startFillColor2 ??
    props.startFillColor ??
    LineDefaults.startFillColor;
  const endFillColor2 =
    props.endFillColor2 ?? props.endFillColor ?? LineDefaults.endFillColor;
  const startOpacity2 = props.startOpacity2 ?? startOpacity;
  const endOpacity2 = props.endOpacity2 ?? endOpacity;

  const startFillColor3 =
    props.startFillColor3 ??
    props.startFillColor ??
    LineDefaults.startFillColor;
  const endFillColor3 =
    props.endFillColor3 ?? props.endFillColor ?? LineDefaults.endFillColor;
  const startOpacity3 = props.startOpacity3 ?? startOpacity;
  const endOpacity3 = props.endOpacity3 ?? endOpacity;

  const startFillColor4 =
    props.startFillColor4 ??
    props.startFillColor ??
    LineDefaults.startFillColor;
  const endFillColor4 =
    props.endFillColor4 ?? props.endFillColor ?? LineDefaults.endFillColor;
  const startOpacity4 = props.startOpacity4 ?? startOpacity;
  const endOpacity4 = props.endOpacity4 ?? endOpacity;

  const startFillColor5 =
    props.startFillColor5 ??
    props.startFillColor ??
    LineDefaults.startFillColor;
  const endFillColor5 =
    props.endFillColor5 ?? props.endFillColor ?? LineDefaults.endFillColor;
  const startOpacity5 = props.startOpacity5 ?? startOpacity;
  const endOpacity5 = props.endOpacity5 ?? endOpacity;

  defaultArrowConfig.strokeWidth = dataSet?.[0]?.thickness ?? thickness1;
  defaultArrowConfig.strokeColor = dataSet?.[0]?.color ?? color1;

  const {
    arrowLength1,
    arrowWidth1,
    arrowStrokeWidth1,
    arrowStrokeColor1,
    arrowFillColor1,
    showArrowBase1,
    arrowLength2,
    arrowWidth2,
    arrowStrokeWidth2,
    arrowStrokeColor2,
    arrowFillColor2,
    showArrowBase2,
    arrowLength3,
    arrowWidth3,
    arrowStrokeWidth3,
    arrowStrokeColor3,
    arrowFillColor3,
    showArrowBase3,
    arrowLength4,
    arrowWidth4,
    arrowStrokeWidth4,
    arrowStrokeColor4,
    arrowFillColor4,
    showArrowBase4,
    arrowLength5,
    arrowWidth5,
    arrowStrokeWidth5,
    arrowStrokeColor5,
    arrowFillColor5,
    showArrowBase5,
    arrowLengthsFromSet,
    arrowWidthsFromSet,
    arrowStrokeWidthsFromSet,
    arrowStrokeColorsFromSet,
    arrowFillColorsFromSet,
    showArrowBasesFromSet,
  } = getAllArrowProperties(props, defaultArrowConfig);

  const secondaryLineConfig = {
    zIndex: props.secondaryLineConfig?.zIndex ?? zIndex1,
    curved: props.secondaryLineConfig?.curved ?? props.curved,
    curvature: props.secondaryLineConfig?.curvature ?? curvature,
    curveType: props.secondaryLineConfig?.curveType ?? curveType,
    areaChart: props.secondaryLineConfig?.areaChart ?? areaChart,
    color: props.secondaryLineConfig?.color ?? color1,
    thickness: props.secondaryLineConfig?.thickness ?? thickness1,
    zIndex1: props.secondaryLineConfig?.zIndex1 ?? zIndex1,
    strokeDashArray:
      props.secondaryLineConfig?.strokeDashArray ?? strokeDashArray1,
    startIndex: props.secondaryLineConfig?.startIndex ?? startIndex1,
    endIndex: props.secondaryLineConfig?.endIndex ?? endIndex1,
    hideDataPoints:
      props.secondaryLineConfig?.hideDataPoints ?? hideDataPoints1,
    dataPointsHeight:
      props.secondaryLineConfig?.dataPointsHeight ?? dataPointsHeight1,
    dataPointsWidth:
      props.secondaryLineConfig?.dataPointsWidth ?? dataPointsWidth1,
    dataPointsRadius:
      props.secondaryLineConfig?.dataPointsRadius ?? dataPointsRadius1,
    dataPointsColor:
      props.secondaryLineConfig?.dataPointsColor ?? dataPointsColor1,
    dataPointsShape:
      props.secondaryLineConfig?.dataPointsShape ?? dataPointsShape1,
    showValuesAsDataPointsText:
      props.secondaryLineConfig?.showValuesAsDataPointsText ??
      showValuesAsDataPointsText,
    startFillColor:
      props.secondaryLineConfig?.startFillColor ?? startFillColor1,
    endFillColor: props.secondaryLineConfig?.endFillColor ?? endFillColor1,
    startOpacity: props.secondaryLineConfig?.startOpacity ?? startOpacity1,
    endOpacity: props.secondaryLineConfig?.endOpacity ?? endOpacity1,
    textFontSize: props.secondaryLineConfig?.textFontSize ?? textFontSize1,
    textColor: props.secondaryLineConfig?.textColor ?? textColor1,
    showArrow: props.secondaryLineConfig?.showArrow ?? props.showArrows,
    arrowConfig: props.secondaryLineConfig?.arrowConfig ?? props.arrowConfig,
  };

  const addLeadingAndTrailingPathForAreaFill = (
    initialPath,
    value,
    dataLength,
  ) => {
    return (
      'M ' +
      initialSpacing +
      ',' +
      heightUptoXaxis +
      ' ' +
      'L ' +
      initialSpacing +
      ',' +
      getY(value) +
      ' ' +
      initialPath +
      ' ' +
      'L ' +
      (initialSpacing + spacing * (dataLength - 1)) +
      ',' +
      heightUptoXaxis +
      ' ' +
      'L ' +
      initialSpacing +
      ',' +
      heightUptoXaxis +
      ' '
    );
  };

  const getNextPoint = (data, index, around) => {
    const isLast = index === data.length - 1;
    return isLast && !around
      ? ' '
      : ' L' +
          (getX(index) + (around ? (isLast ? 0 : spacing / 2) : spacing)) +
          ' ' +
          getY(data[index].value) +
          ' ';
  };
  const getStepPath = (data, i) => {
    const around = edgePosition === EdgePosition.AROUND_DATA_POINT;
    return (
      'L' +
      (getX(i) - (around && i > 0 ? spacing / 2 : 0)) +
      ' ' +
      getY(data[i].value) +
      getNextPoint(data, i, around)
    );
  };

  const getSegmentPath = (data, i, lineSegment, startIndex, endIndex) => {
    let path =
      'L' +
      getX(i) +
      ' ' +
      getY(data[i].value) +
      ' ' +
      getSegmentString(lineSegment, i, SEGMENT_START, SEGMENT_END);

    if (highlightedRange) {
      path += getPathWithHighlight(
        data,
        i,
        highlightedRange,
        startIndex,
        endIndex,
        getX,
        getY,
      );
    }
    return path;
  };

  useEffect(() => {
    if (dataSet) {
      const pointsArray: string[] = [];
      const arrowPointsArray: string[] = [];
      const fillPointsArray: string[] = [];
      dataSet.map((set, index) => {
        const setData = set.data.map(item => {
          item.value = item.value - (props.yAxisOffset ?? 0);
          return item;
        });
        if (set.curved ?? props.curved) {
          const pArray: Array<Array<number>> = [];
          for (let i = 0; i < setData.length; i++) {
            if (
              i >= (set.startIndex ?? 0) &&
              i <= (set.endIndex ?? set.data.length - 1)
            ) {
              pArray.push([getX(i), getY(setData[i].value)]);
            }
          }
          let xx = svgPath(
            pArray,
            set.curveType ?? curveType,
            set.curvature ?? curvature,
          );
          pointsArray.push(
            getCurvePathWithSegments(
              xx,
              set.lineSegments,
              SEGMENT_START,
              SEGMENT_END,
            ),
          );

          // For Arrow-
          if (setData.length > 1 && (set.showArrow ?? props.showArrows)) {
            let arrowTipY = pArray[pArray.length - 1][1];
            let arrowTipX = pArray[pArray.length - 1][0];
            let y1 = pArray[pArray.length - 2][1];
            let x1 = pArray[pArray.length - 2][0];

            let arrowPoints = getArrowPoints(
              arrowTipX,
              arrowTipY,
              x1,
              y1,
              arrowLengthsFromSet[index],
              arrowWidthsFromSet[index],
              showArrowBasesFromSet[index],
            );

            arrowPointsArray.push(arrowPoints);
          }

          // For Area charts-
          if ((set.areaChart || areaChart) && setData.length) {
            xx = addLeadingAndTrailingPathForAreaFill(
              xx,
              setData[0].value,
              setData.length,
            );
            fillPointsArray.push(xx);
          }
        } else {
          let pp = '';
          for (let i = 0; i < setData.length; i++) {
            if (
              i >= (set.startIndex ?? 0) &&
              i <= (set.endIndex ?? set.data.length - 1)
            ) {
              if (set.stepChart || stepChart) {
                pp += getStepPath(setData, i);
              } else {
                pp += getSegmentPath(
                  setData,
                  i,
                  set.lineSegments,
                  set.startIndex ?? 0,
                  set.endIndex ?? set.data.length - 1,
                );
              }
            }
          }
          pointsArray.push(pp.replace('L', 'M'));

          // For Arrow-
          if (setData.length > 1 && (set.showArrow ?? props.showArrows)) {
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
              arrowLengthsFromSet[index],
              arrowWidthsFromSet[index],
              showArrowBasesFromSet[index],
            );

            arrowPointsArray.push(arrowPoints);
          }

          // For Area charts-
          if ((set.areaChart || areaChart) && setData.length) {
            let ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp += pp;
            ppp +=
              'L' +
              (initialSpacing + spacing * (setData.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            fillPointsArray.push(ppp.replace('L', 'M'));
          }
        }
      });

      setPointsFromSet(pointsArray);
      setArrowPointsFromSet(arrowPointsArray);
      setFillPointsFromSet(fillPointsArray);
    } else {
      let pp = '',
        pp2 = '',
        pp3 = '',
        pp4 = '',
        pp5 = '';
      if (!props.curved) {
        for (let i = 0; i < data.length; i++) {
          if (i >= startIndex1 && i <= endIndex1 && !animateOnDataChange) {
            if (stepChart || stepChart1) {
              pp += getStepPath(data, i);
            } else {
              pp += getSegmentPath(
                data,
                i,
                lineSegments,
                startIndex1,
                endIndex1,
              );
            }
          }
          if (data2.length && i >= startIndex2 && i <= endIndex2) {
            if (stepChart || stepChart2) {
              pp2 += getStepPath(data2, i);
              (' ');
            } else {
              pp2 += getSegmentPath(
                data2,
                i,
                lineSegments2,
                startIndex2,
                endIndex2,
              );
            }
          }
          if (data3.length && i >= startIndex3 && i <= endIndex3) {
            if (stepChart || stepChart3) {
              pp3 += getStepPath(data3, i);
            } else {
              pp3 += getSegmentPath(
                data3,
                i,
                lineSegments3,
                startIndex3,
                endIndex3,
              );
            }
          }
          if (data4.length && i >= startIndex4 && i <= endIndex4) {
            if (stepChart || stepChart4) {
              pp4 += getStepPath(data4, i);
            } else {
              pp4 += getSegmentPath(
                data4,
                i,
                lineSegments4,
                startIndex4,
                endIndex4,
              );
            }
          }
          if (data5.length && i >= startIndex5 && i <= endIndex5) {
            if (stepChart || stepChart5) {
              pp5 += getStepPath(data5, i);
            } else {
              pp5 += getSegmentPath(
                data5,
                i,
                lineSegments5,
                startIndex5,
                endIndex5,
              );
            }
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
            arrowLength1,
            arrowWidth1,
            showArrowBase1,
          );

          setArrow1Points(arrowPoints);
        }

        if (data2.length > 1 && (props.showArrow2 || props.showArrows)) {
          let ppArray = pp2.trim().split(' ');
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
            arrowLength2,
            arrowWidth2,
            showArrowBase2,
          );

          setArrow2Points(arrowPoints);
        }

        if (data3.length > 1 && (props.showArrow3 || props.showArrows)) {
          let ppArray = pp3.trim().split(' ');
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
            arrowLength3,
            arrowWidth3,
            showArrowBase3,
          );

          setArrow3Points(arrowPoints);
        }

        if (data4.length > 1 && (props.showArrow4 || props.showArrows)) {
          let ppArray = pp4.trim().split(' ');
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
            arrowLength4,
            arrowWidth4,
            showArrowBase4,
          );

          setArrow4Points(arrowPoints);
        }

        if (data5.length > 1 && (props.showArrow5 || props.showArrows)) {
          let ppArray = pp5.trim().split(' ');
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
            arrowLength5,
            arrowWidth5,
            showArrowBase5,
          );

          setArrow5Points(arrowPoints);
        }

        /***************************          For Area Charts          *************************/
        if (atLeastOneAreaChart) {
          let ppp = '',
            ppp2 = '',
            ppp3 = '',
            ppp4 = '',
            ppp5 = '';

          if (
            (areaChart || areaChart1) &&
            data.length &&
            !animateOnDataChange
          ) {
            ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp += pp;
            ppp +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            setFillPoints(ppp.replace('L', 'M'));
          }

          if ((areaChart || areaChart2) && data2.length) {
            ppp2 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp2 += pp2;
            ppp2 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp2 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            setFillPoints2(ppp2.replace('L', 'M'));
          }

          if ((areaChart || areaChart3) && data3.length) {
            ppp3 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp3 += pp3;
            ppp3 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp3 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            setFillPoints3(ppp3.replace('L', 'M'));
          }
          if ((areaChart || areaChart4) && data4.length) {
            ppp4 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp4 += pp4;
            ppp4 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp4 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            setFillPoints4(ppp4.replace('L', 'M'));
          }

          if ((areaChart || areaChart5) && data5.length) {
            ppp5 = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            ppp5 += pp5;
            ppp5 +=
              'L' +
              (initialSpacing + spacing * (data.length - 1)) +
              ' ' +
              heightUptoXaxis;
            ppp5 += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
            setFillPoints5(ppp5.replace('L', 'M'));
          }
        }

        /*************************************************************************************/
      } else {
        const p1Array: Array<Array<number>> = [],
          p2Array: Array<Array<number>> = [],
          p3Array: Array<Array<number>> = [],
          p4Array: Array<Array<number>> = [],
          p5Array: Array<Array<number>> = [];
        for (let i = 0; i < data.length; i++) {
          if (i >= startIndex1 && i <= endIndex1) {
            p1Array.push([getX(i), getY(data[i].value)]);
          }
          if (data2.length && i >= startIndex2 && i <= endIndex2) {
            p2Array.push([getX(i), getY(data2[i].value)]);
          }
          if (data3.length && i >= startIndex3 && i <= endIndex3) {
            p3Array.push([getX(i), getY(data3[i].value)]);
          }
          if (data4.length && i >= startIndex4 && i <= endIndex4) {
            p4Array.push([getX(i), getY(data4[i].value)]);
          }
          if (data5.length && i >= startIndex5 && i <= endIndex5) {
            p5Array.push([getX(i), getY(data5[i].value)]);
          }
        }

        let xx = svgPath(p1Array, curveType, curvature);
        let xx2 = svgPath(p2Array, curveType, curvature);
        let xx3 = svgPath(p3Array, curveType, curvature);
        let xx4 = svgPath(p4Array, curveType, curvature);
        let xx5 = svgPath(p5Array, curveType, curvature);

        setPoints(
          getCurvePathWithSegments(
            xx,
            lineSegments,
            SEGMENT_START,
            SEGMENT_END,
          ),
        );
        setPoints2(
          getCurvePathWithSegments(
            xx2,
            lineSegments2,
            SEGMENT_START,
            SEGMENT_END,
          ),
        );
        setPoints3(
          getCurvePathWithSegments(
            xx3,
            lineSegments3,
            SEGMENT_START,
            SEGMENT_END,
          ),
        );
        setPoints4(
          getCurvePathWithSegments(
            xx4,
            lineSegments4,
            SEGMENT_START,
            SEGMENT_END,
          ),
        );
        setPoints5(
          getCurvePathWithSegments(
            xx5,
            lineSegments5,
            SEGMENT_START,
            SEGMENT_END,
          ),
        );

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

        if (atLeastOneAreaChart) {
          if ((areaChart || areaChart1) && data.length) {
            xx = addLeadingAndTrailingPathForAreaFill(
              xx,
              data[0].value,
              data.length,
            );
            setFillPoints(xx);
          }

          if ((areaChart || areaChart2) && data2.length) {
            xx2 = addLeadingAndTrailingPathForAreaFill(
              xx2,
              data2[0].value,
              data2.length,
            );
            setFillPoints2(xx2);
          }

          if ((areaChart || areaChart3) && data3.length) {
            xx3 = addLeadingAndTrailingPathForAreaFill(
              xx3,
              data3[0].value,
              data3.length,
            );
            setFillPoints3(xx3);
          }

          if ((areaChart || areaChart4) && data4.length) {
            xx4 = addLeadingAndTrailingPathForAreaFill(
              xx4,
              data4[0].value,
              data4.length,
            );
            setFillPoints4(xx4);
          }

          if ((areaChart || areaChart5) && data5.length) {
            xx5 = addLeadingAndTrailingPathForAreaFill(
              xx5,
              data5[0].value,
              data5.length,
            );
            setFillPoints5(xx5);
          }
        }

        /*************************************************************************************/
      }
    }
  }, [
    animateOnDataChange,
    areaChart,
    areaChart1,
    areaChart2,
    containerHeight,
    data,
    data2,
    data3,
    data4,
    data5,
    // data0,
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

  useEffect(() => {
    let pp = '';
    if (!secondaryLineConfig.curved) {
      for (let i = 0; i < secondaryData.length; i++) {
        if (
          i >= secondaryLineConfig.startIndex &&
          i <= secondaryLineConfig.endIndex &&
          !animateOnDataChange
        ) {
          pp +=
            'L' + getX(i) + ' ' + getSecondaryY(secondaryData[i].value) + ' ';
        }
      }

      setSecondaryPoints(pp.replace('L', 'M'));

      if (secondaryData.length > 1 && secondaryLineConfig.showArrow) {
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
          secondaryLineConfig.arrowConfig?.length,
          secondaryLineConfig.arrowConfig?.width,
          secondaryLineConfig.arrowConfig?.showArrowBase,
        );

        setSecondaryArrowPoints(arrowPoints);
      }

      /***************************          For Area Chart          *************************/
      if (secondaryLineConfig.areaChart) {
        let ppp = '';

        if (secondaryData.length && !animateOnDataChange) {
          ppp = 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
          ppp += pp;
          ppp +=
            'L' +
            (initialSpacing + spacing * (secondaryData.length - 1)) +
            ' ' +
            heightUptoXaxis;
          ppp += 'L' + initialSpacing + ' ' + heightUptoXaxis + ' ';
          setSecondaryFillPoints(ppp.replace('L', 'M'));
        }
      }
    } else {
      /***************************          For Curved Charts         *************************/
      const p1Array: Array<Array<number>> = [];
      for (let i = 0; i < secondaryData.length; i++) {
        if (
          i >= secondaryLineConfig.startIndex &&
          i <= secondaryLineConfig.endIndex
        ) {
          p1Array.push([getX(i), getSecondaryY(secondaryData[i].value)]);
        }
      }

      let xx = svgPath(
        p1Array,
        secondaryLineConfig.curveType,
        secondaryLineConfig.curvature,
      );

      setSecondaryPoints(xx);

      if (secondaryData.length > 1 && (props.showArrow1 || props.showArrows)) {
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

        setSecondaryArrowPoints(arrowPoints);
      }

      /***************************          For Curved Area Charts          *************************/

      if (secondaryLineConfig.areaChart) {
        if (secondaryData.length) {
          xx = addLeadingAndTrailingPathForAreaFill(
            xx,
            secondaryData[0].value,
            secondaryData.length,
          );
          setSecondaryFillPoints(xx);
        }
      }
    }
  }, [secondaryData, secondaryLineConfig]);

  const gradientDirection = props.gradientDirection ?? 'vertical';
  const horizSections = [{value: '0'}];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -mostNegativeValue / (stepValue || 1);

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices;
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight;
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth;
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor;

  // const yAxisThickness = props.yAxisThickness ?? 1;
  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines;
  const xAxisLabelsVerticalShift =
    props.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const showFractionalValues =
    props.showFractionalValues ?? AxesAndRulesDefaults.showFractionalValues;

  const horizontal = false;
  const yAxisAtTop = false;

  defaultPointerConfig.pointerStripHeight = containerHeight;

  const pointerConfig = props.pointerConfig;
  const getPointerProps = props.getPointerProps || null;
  const pointerHeight = pointerConfig?.height ?? defaultPointerConfig.height;
  const pointerWidth = pointerConfig?.width ?? defaultPointerConfig.width;
  const pointerRadius = pointerConfig?.radius ?? defaultPointerConfig.radius;
  const pointerColor =
    pointerConfig?.pointerColor ?? defaultPointerConfig.pointerColor;
  const pointerComponent =
    pointerConfig?.pointerComponent ?? defaultPointerConfig.pointerComponent;

  const showPointerStrip =
    pointerConfig?.showPointerStrip === false
      ? false
      : defaultPointerConfig.showPointerStrip;
  const pointerStripHeight =
    pointerConfig?.pointerStripHeight ??
    defaultPointerConfig.pointerStripHeight;
  const pointerStripWidth =
    pointerConfig?.pointerStripWidth ?? defaultPointerConfig.pointerStripWidth;
  const pointerStripColor =
    pointerConfig?.pointerStripColor ?? defaultPointerConfig.pointerStripColor;
  const pointerStripUptoDataPoint =
    pointerConfig?.pointerStripUptoDataPoint ??
    defaultPointerConfig.pointerStripUptoDataPoint;
  const pointerLabelComponent =
    pointerConfig?.pointerLabelComponent ??
    defaultPointerConfig.pointerLabelComponent;
  const stripOverPointer =
    pointerConfig?.stripOverPointer ?? defaultPointerConfig.stripOverPointer;
  const shiftPointerLabelX =
    pointerConfig?.shiftPointerLabelX ??
    defaultPointerConfig.shiftPointerLabelX;
  const shiftPointerLabelY =
    pointerConfig?.shiftPointerLabelY ??
    defaultPointerConfig.shiftPointerLabelY;
  const pointerLabelWidth =
    pointerConfig?.pointerLabelWidth ?? defaultPointerConfig.pointerLabelWidth;
  const pointerLabelHeight =
    pointerConfig?.pointerLabelHeight ??
    defaultPointerConfig.pointerLabelHeight;
  const autoAdjustPointerLabelPosition =
    pointerConfig?.autoAdjustPointerLabelPosition ??
    defaultPointerConfig.autoAdjustPointerLabelPosition;
  const pointerVanishDelay =
    pointerConfig?.pointerVanishDelay ??
    defaultPointerConfig.pointerVanishDelay;
  const activatePointersOnLongPress =
    pointerConfig?.activatePointersOnLongPress ??
    defaultPointerConfig.activatePointersOnLongPress;
  const activatePointersDelay =
    pointerConfig?.activatePointersDelay ??
    defaultPointerConfig.activatePointersDelay;
  const initialPointerIndex =
    pointerConfig?.initialPointerIndex ??
    defaultPointerConfig.initialPointerIndex;
  const initialPointerAppearDelay =
    pointerConfig?.initialPointerAppearDelay ??
    (isAnimated
      ? animationDuration
      : defaultPointerConfig.initialPointerAppearDelay);
  const persistPointer =
    pointerConfig?.persistPointer ?? defaultPointerConfig.persistPointer;
  const hidePointer1 =
    pointerConfig?.hidePointer1 ?? defaultPointerConfig.hidePointer1;
  const hidePointer2 =
    pointerConfig?.hidePointer2 ?? defaultPointerConfig.hidePointer2;
  const hidePointer3 =
    pointerConfig?.hidePointer3 ?? defaultPointerConfig.hidePointer3;
  const hidePointer4 =
    pointerConfig?.hidePointer4 ?? defaultPointerConfig.hidePointer4;
  const hidePointer5 =
    pointerConfig?.hidePointer5 ?? defaultPointerConfig.hidePointer5;
  const hideSecondaryPointer =
    pointerConfig?.hideSecondaryPointer ??
    defaultPointerConfig.hideSecondaryPointer;
  const resetPointerOnDataChange =
    pointerConfig?.resetPointerOnDataChange ??
    defaultPointerConfig.resetPointerOnDataChange;
  const pointerEvents = pointerConfig?.pointerEvents;
  const disableScroll =
    props.disableScroll ||
    (pointerConfig
      ? activatePointersOnLongPress
        ? responderActive
          ? true
          : false
        : true
      : false);
  const showScrollIndicator =
    props.showScrollIndicator ?? LineDefaults.showScrollIndicator;

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled;
  const showDataPointOnFocus =
    props.showDataPointOnFocus ?? LineDefaults.showDataPointOnFocus;
  const showStripOnFocus =
    props.showStripOnFocus ?? LineDefaults.showStripOnFocus;
  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus;
  const stripHeight = props.stripHeight;
  const stripWidth = props.stripWidth ?? LineDefaults.stripWidth;
  const stripColor = props.stripColor ?? color1;
  const stripOpacity = props.stripOpacity ?? (startOpacity1 + endOpacity1) / 2;
  const unFocusOnPressOut =
    props.unFocusOnPressOut ?? LineDefaults.unFocusOnPressOut;
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus ?? LineDefaults.delayBeforeUnFocus;

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;

  const lineGradient = props.lineGradient ?? LineDefaults.lineGradient;
  const lineGradientDirection = props.lineGradientDirection ?? 'vertical';
  const lineGradientStartColor =
    props.lineGradientStartColor ?? LineDefaults.lineGradientStartColor;
  const lineGradientEndColor =
    props.lineGradientEndColor ?? LineDefaults.lineGradientEndColor;

  const getPointerY = value =>
    value
      ? containerHeight -
        (value * containerHeight) / maxValue -
        (pointerRadius || pointerHeight / 2) +
        10
      : 0;

  const initialisePointers = () => {
    if (initialPointerIndex !== -1) {
      const item = (data0 ?? data)[initialPointerIndex];
      const x =
        initialSpacing +
        spacing * initialPointerIndex -
        (pointerRadius || pointerWidth / 2) -
        1;
      const y = getPointerY(item.value);
      const y2 = getPointerY(data2?.[initialPointerIndex]?.value);
      const y3 = getPointerY(data3?.[initialPointerIndex]?.value);
      const y4 = getPointerY(data4?.[initialPointerIndex]?.value);
      const y5 = getPointerY(data5?.[initialPointerIndex]?.value);

      if (initialPointerAppearDelay) {
        setTimeout(() => {
          setPointerConfig(initialPointerIndex, item, x, y, y2, y3, y4, y5);
        }, initialPointerAppearDelay);
      } else {
        setPointerConfig(initialPointerIndex, item, x, y, y2, y3, y4, y5);
      }
    }
  };

  useEffect(() => {
    initialisePointers();
  }, []);

  useEffect(() => {
    if (resetPointerOnDataChange) {
      initialisePointers();
    }
  }, [data]);

  const setPointerConfig = (
    initialPointerIndex,
    item,
    x,
    y,
    y2,
    y3,
    y4,
    y5,
  ) => {
    setPointerIndex(initialPointerIndex);
    setPointerItem(item);
    setPointerX(x);
    setPointerY(y);
    setPointerY2(y2);
    setPointerY3(y3);
    setPointerY4(y4);
    setPointerY5(y5);
  };

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function | undefined,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 54 - xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing / 2 + spacing * index - spacing / 2 + 4
                : initialSpacing / 2 + spacing * index - spacing / 2 - 10,
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={[{textAlign: 'center'}, labelTextStyle]}
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
    labelComponent: Function | undefined,
  ) => {
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel
              ? 40
              : props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            position: 'absolute',
            bottom: rotateLabel ? 10 : 54 - xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing / 2 + spacing * index - spacing / 2 + 4
                : initialSpacing / 2 + spacing * index - spacing / 2 - 10,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={[{textAlign: 'center'}, labelTextStyle]}
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

  const onStripPress = (item, index) => {
    setSelectedIndex(index);
    if (props.onFocus) {
      props.onFocus(item, index);
    }
  };

  const renderDataPoints = (
    hideDataPoints,
    dataForRender,
    originalDataFromProps,
    dataPtsShape,
    dataPtsWidth,
    dataPtsHeight,
    dataPtsColor,
    dataPtsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
    isSecondary,
    showValuesAsDataPointsText,
  ) => {
    const getYOrSecondaryY = isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: lineDataItem, index: number) => {
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

      if (showValuesAsDataPointsText) {
        text = originalDataFromProps[index].value;
      }

      const currentStripHeight = item.stripHeight ?? stripHeight;
      const currentStripWidth = item.stripWidth ?? stripWidth;
      const currentStripOpacity = item.stripOpacity ?? stripOpacity;
      const currentStripColor = item.stripColor || stripColor;
      const position = I18nManager.isRTL ? 'right' : 'left';

      return (
        <Fragment key={index}>
          {focusEnabled ? (
            <>
              {unFocusOnPressOut ? ( // remove strip on onFocus
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
                  height={containerHeight}
                  fill={'none'}
                />
              )}
            </>
          ) : null}
          {item.showStrip ||
          (focusEnabled && index === selectedIndex && showStripOnFocus) ? (
            <Rect
              x={initialSpacing + spacing * index - currentStripWidth / 2 - 1}
              y={
                currentStripHeight
                  ? containerHeight - currentStripHeight + 8
                  : containerHeight -
                    dataPointsHeight / 2 +
                    14 -
                    (item.value * containerHeight) / maxValue
              }
              width={currentStripWidth}
              height={
                currentStripHeight ||
                (item.value * containerHeight) / maxValue - 2 + overflowTop
              }
              opacity={currentStripOpacity}
              fill={stripColor}
            />
          ) : null}
          {hideDataPoints ? null : (
            <>
              {customDataPoint ? (
                <View
                  style={[
                    styles.customDataPointContainer,
                    {
                      height: dataPointsHeight,
                      width: dataPointsWidth,
                      top: getYOrSecondaryY(item.value),
                      [position]:
                        initialSpacing - dataPointsWidth + spacing * index,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    },
                  ]}>
                  {customDataPoint(item, index)}
                </View>
              ) : null}
              {dataPointsShape === 'rectangular' ? (
                <Fragment key={index}>
                  {customDataPoint ? null : (
                    <Rect
                      x={getX(index) - dataPointsWidth / 2}
                      y={getYOrSecondaryY(item.value) - dataPointsHeight / 2}
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
                      cx={getX(index)}
                      cy={getYOrSecondaryY(item.value)}
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
                        zIndex: index === selectedIndex ? 1000 : 0,
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
                      getX(index) -
                      dataPointsWidth +
                      (item.textShiftX || props.textShiftX || 0)
                    }
                    y={
                      getYOrSecondaryY(item.value) -
                      dataPointsHeight / 2 +
                      (item.textShiftY || props.textShiftY || 0)
                    }>
                    {!showTextOnFocus && !showValuesAsDataPointsText
                      ? item.dataPointText
                      : text}
                  </CanvasText>
                ) : null
              ) : null}
            </>
          )}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: lineDataItem, index: number) => {
      if (item.showVerticalLine) {
        const x = getX(index);
        return (
          <Line
            key={index}
            x1={x}
            y1={extendedContainerHeight}
            x2={x}
            y2={
              item.verticalLineUptoDataPoint ?? props.verticalLinesUptoDataPoint
                ? getY(item.value)
                : -xAxisThickness
            }
            stroke={
              item.verticalLineColor || props.verticalLinesColor || 'lightgray'
            }
            strokeWidth={
              item.verticalLineThickness || props.verticalLinesThickness || 2
            }
            strokeDasharray={
              item.verticalLineStrokeDashArray ??
              props.verticalLinesStrokeDashArray ??
              ''
            }
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
    // 6 is for secondaryData
    if (lineNumber === 6 && hideSecondaryPointer) return;

    let pointerItemLocal, pointerYLocal, pointerColorLocal;
    switch (lineNumber) {
      case 1:
        pointerItemLocal = pointerItem;
        pointerYLocal = pointerY;
        pointerColorLocal = pointerConfig?.pointer1Color || pointerColor;
        break;
      case 2:
        pointerItemLocal = pointerItem2;
        pointerYLocal = pointerY2;
        pointerColorLocal = pointerConfig?.pointer2Color || pointerColor;
        break;
      case 3:
        pointerItemLocal = pointerItem3;
        pointerYLocal = pointerY3;
        pointerColorLocal = pointerConfig?.pointer3Color || pointerColor;
        break;
      case 4:
        pointerItemLocal = pointerItem4;
        pointerYLocal = pointerY4;
        pointerColorLocal = pointerConfig?.pointer4Color || pointerColor;
        break;
      case 5:
        pointerItemLocal = pointerItem5;
        pointerYLocal = pointerY5;
        pointerColorLocal = pointerConfig?.pointer5Color || pointerColor;
        break;
      case 6:
        pointerItemLocal = secondaryPointerItem;
        pointerYLocal = secondaryPointerY;
        pointerColorLocal =
          pointerConfig?.secondaryPointerColor || pointerColor;
        break;
    }

    return Pointer({
      pointerX,
      pointerYLocal,
      pointerComponent,
      pointerHeight,
      pointerRadius,
      pointerWidth,
      pointerItemLocal,
      pointerColorLocal,
    });
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
    if (secondaryPointerY !== 0) {
      pointerItemLocal.push(secondaryPointerItem);
    }
    pointerYLocal = Math.min(...arr);

    return StripAndLabel({
      autoAdjustPointerLabelPosition,
      pointerX,
      pointerLabelWidth,
      activatePointersOnLongPress,
      yAxisLabelWidth,
      pointerRadius,
      pointerWidth,
      shiftPointerLabelX,
      pointerLabelHeight,
      pointerYLocal,
      pointerStripUptoDataPoint,
      pointerStripHeight,
      shiftPointerLabelY,
      pointerItemLocal,
      showPointerStrip,
      pointerStripWidth,
      containerHeight,
      xAxisThickness,
      pointerStripColor,
      pointerConfig,
      pointerLabelComponent,
      secondaryPointerItem,
      scrollX,
      pointerEvents,
    });
  };

  const getLineGradientComponent = () => {
    return props.lineGradientComponent ? (
      props.lineGradientComponent()
    ) : (
      <LinearGradient
        id="lineGradient"
        x1="0"
        y1="0"
        x2={lineGradientDirection === 'horizontal' ? '1' : '0'}
        y2={lineGradientDirection === 'vertical' ? '1' : '0'}>
        <Stop offset="0" stopColor={lineGradientStartColor} />
        <Stop offset="1" stopColor={lineGradientEndColor} />
      </LinearGradient>
    );
  };

  const getAreaGradientComponent = (
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
  ) => {
    return props.areaGradientComponent ? (
      props.areaGradientComponent()
    ) : (
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
    );
  };

  const lineSvgComponent = (
    points: any,
    currentLineThickness: number | undefined,
    color: ColorValue,
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
    if (!points) return null;
    const isCurved = points.includes('C');
    let ar: [any] = [{}];
    if (points.includes(RANGE_ENTER)) {
      ar = getRegionPathObjects(
        points,
        color,
        currentLineThickness,
        thickness,
        strokeDashArray,
        isCurved,
        RANGE_ENTER,
        STOP,
        RANGE_EXIT,
      );
    } else if (points.includes(SEGMENT_START)) {
      ar = getSegmentedPathObjects(
        points,
        color,
        currentLineThickness,
        thickness,
        strokeDashArray,
        isCurved,
        SEGMENT_START,
        SEGMENT_END,
      );
    }
    const lineSvgPropsOuter: LineSvgProps = {
      d: points,
      fill: 'none',
      stroke: lineGradient
        ? props.lineGradientId
          ? `url(#${props.lineGradientId})`
          : `url(#lineGradient)`
        : color,
      strokeWidth: currentLineThickness || thickness,
    };
    if (
      strokeDashArray &&
      strokeDashArray.length === 2 &&
      typeof strokeDashArray[0] === 'number' &&
      typeof strokeDashArray[1] === 'number'
    ) {
      lineSvgPropsOuter.strokeDasharray = strokeDashArray;
    }
    return (
      <Svg>
        {lineGradient && getLineGradientComponent()}
        {points.includes(SEGMENT_START) || points.includes(RANGE_ENTER) ? (
          ar.map((item, index) => {
            const lineSvgProps: LineSvgProps = {
              d: item.d,
              fill: 'none',
              stroke: lineGradient
                ? props.lineGradientId
                  ? `url(#${props.lineGradientId})`
                  : `url(#lineGradient)`
                : item.color,
              strokeWidth: item.strokeWidth,
            };
            if (
              item.strokeDashArray &&
              item.strokeDashArray.length === 2 &&
              typeof item.strokeDashArray[0] === 'number' &&
              typeof item.strokeDashArray[1] === 'number'
            ) {
              lineSvgProps.strokeDasharray = item.strokeDashArray;
            }
            return <Path key={index} {...lineSvgProps} />;
          })
        ) : (
          <Path {...lineSvgPropsOuter} />
        )}

        {/***********************      For Area Chart        ************/}

        {atLeastOneAreaChart &&
          getAreaGradientComponent(
            startFillColor,
            endFillColor,
            startOpacity,
            endOpacity,
          )}
        {atLeastOneAreaChart && (
          <Path
            d={fillPoints}
            fill={
              props.areaGradientId
                ? `url(#${props.areaGradientId})`
                : `url(#Gradient)`
            }
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

        {dataSet?.map(set => renderSpecificVerticalLines(set?.data)) ?? null}
        {dataSet?.map(set => {
          const setData = set.data.map(item => {
            item.value = item.value - (props.yAxisOffset ?? 0);
            return item;
          });
          return renderDataPoints(
            set.hideDataPoints ?? hideDataPoints1,
            setData,
            set.data,
            set.dataPointsShape ?? dataPointsShape1,
            set.dataPointsWidth ?? dataPointsWidth1,
            set.dataPointsHeight ?? dataPointsHeight1,
            set.dataPointsColor ?? dataPointsColor1,
            set.dataPointsRadius ?? dataPointsRadius1,
            set.textColor ?? textColor1,
            set.textFontSize ?? textFontSize1,
            set.startIndex ?? 0,
            set.endIndex ?? set.data.length - 1,
            false,
            showValuesAsDataPointsText,
          );
        }) ?? null}

        {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
        {renderDataPoints(
          hideDataPoints1,
          data,
          props.data,
          dataPointsShape1,
          dataPointsWidth1,
          dataPointsHeight1,
          dataPointsColor1,
          dataPointsRadius1,
          textColor1,
          textFontSize1,
          startIndex1,
          endIndex1,
          false,
          showValuesAsDataPointsText,
        )}
        {renderDataPoints(
          hideDataPoints2,
          data2,
          props.data2,
          dataPointsShape2,
          dataPointsWidth2,
          dataPointsHeight2,
          dataPointsColor2,
          dataPointsRadius2,
          textColor2,
          textFontSize2,
          startIndex2,
          endIndex2,
          false,
          showValuesAsDataPointsText,
        )}
        {renderDataPoints(
          hideDataPoints3,
          data3,
          props.data3,
          dataPointsShape3,
          dataPointsWidth3,
          dataPointsHeight3,
          dataPointsColor3,
          dataPointsRadius3,
          textColor3,
          textFontSize3,
          startIndex3,
          endIndex3,
          false,
          showValuesAsDataPointsText,
        )}
        {renderDataPoints(
          hideDataPoints4,
          data4,
          props.data4,
          dataPointsShape4,
          dataPointsWidth4,
          dataPointsHeight4,
          dataPointsColor4,
          dataPointsRadius4,
          textColor4,
          textFontSize4,
          startIndex4,
          endIndex4,
          false,
          showValuesAsDataPointsText,
        )}
        {renderDataPoints(
          hideDataPoints5,
          data5,
          props.data5,
          dataPointsShape5,
          dataPointsWidth5,
          dataPointsHeight5,
          dataPointsColor5,
          dataPointsRadius5,
          textColor5,
          textFontSize5,
          startIndex5,
          endIndex5,
          false,
          showValuesAsDataPointsText,
        )}
        {secondaryData?.length
          ? renderDataPoints(
              secondaryLineConfig.hideDataPoints,
              secondaryData,
              props.secondaryData,
              secondaryLineConfig.dataPointsShape,
              secondaryLineConfig.dataPointsWidth,
              secondaryLineConfig.dataPointsHeight,
              secondaryLineConfig.dataPointsColor,
              secondaryLineConfig.dataPointsRadius,
              secondaryLineConfig.textColor,
              secondaryLineConfig.textFontSize,
              secondaryLineConfig.startIndex,
              secondaryLineConfig.endIndex,
              true,
              secondaryLineConfig.showValuesAsDataPointsText,
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
    color: ColorValue,
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
    key?: number,
  ) => {
    return (
      <View
        key={key ?? 0}
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
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          setPointerX(z);
          setPointerIndex(factor);
          let item, y;
          item = (data0 ?? data)[factor];
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
          if (secondaryData?.length) {
            item = secondaryData[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
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
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = (data0 ?? data)[factor];
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
          if (secondaryData?.length) {
            item = secondaryData[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
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
          if (!persistPointer)
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
          height:
            containerHeightIncludingBelowXAxis +
            (props.overflowBottom ?? dataPointsRadius1),
          bottom:
            60 +
            xAxisLabelsVerticalShift +
            labelsExtraHeight -
            (props.overflowBottom ?? dataPointsRadius1),
          zIndex: zIndex,
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          width: totalWidth,
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
    color: ColorValue,
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
    key?: number,
  ) => {
    return (
      <Animated.View
        key={key ?? 0}
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
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          setPointerX(z);
          setPointerIndex(factor);
          let item, y;
          item = (data0 ?? data)[factor];
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
          if (secondaryData?.length) {
            item = secondaryData[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
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
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = (data0 ?? data)[factor];
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
          if (secondaryData?.length) {
            item = secondaryData[factor];
            if (item) {
              y =
                containerHeight -
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
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
          if (!persistPointer)
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
          height:
            containerHeightIncludingBelowXAxis +
            (props.overflowBottom ?? dataPointsRadius1),
          bottom:
            60 +
            xAxisLabelsVerticalShift +
            labelsExtraHeight -
            (props.overflowBottom ?? dataPointsRadius1),
          zIndex: zIndex,
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          width: animatedWidth,
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

  const remainingScrollViewProps = {
    onScroll: (ev: any) => {
      if (
        pointerConfig &&
        pointerConfig.activatePointersOnLongPress &&
        pointerConfig.autoAdjustPointerLabelPosition
      ) {
        setScrollX(ev.nativeEvent.contentOffset.x);
      }
    },
  };

  const renderChartContent = () => {
    return (
      <>
        {dataSet
          ? pointsFromSet.length
            ? dataSet.map((set, index) => {
                if (isAnimated) {
                  return renderAnimatedLine(
                    set.zIndex ?? zIndex1,
                    pointsFromSet[index],
                    animatedWidth,
                    set.thickness ?? thickness1,
                    set.color ?? color1,
                    fillPointsFromSet[index],
                    set.startFillColor ?? startFillColor1,
                    set.endFillColor ?? endFillColor1,
                    set.startOpacity ?? startOpacity1,
                    set.endOpacity ?? endOpacity1,
                    set.strokeDashArray ?? strokeDashArray1,
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet[index],
                    arrowStrokeColorsFromSet[index],
                    arrowFillColorsFromSet[index],
                    index,
                  );
                } else {
                  return renderLine(
                    set.zIndex ?? zIndex1,
                    pointsFromSet[index],
                    set.thickness ?? thickness1,
                    set.color ?? color1,
                    fillPointsFromSet[index],
                    set.startFillColor ?? startFillColor1,
                    set.endFillColor ?? endFillColor1,
                    set.startOpacity ?? startOpacity1,
                    set.endOpacity ?? endOpacity1,
                    set.strokeDashArray ?? strokeDashArray1,
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet[index],
                    arrowStrokeColorsFromSet[index],
                    arrowFillColorsFromSet[index],
                    index,
                  );
                }
              })
            : null
          : isAnimated
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
                0,
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
                0,
              )}
        {secondaryPoints
          ? isAnimated
            ? renderAnimatedLine(
                secondaryLineConfig.zIndex,
                secondaryPoints,
                animatedWidth,
                secondaryLineConfig.thickness,
                secondaryLineConfig.color,
                secondaryFillPoints,
                secondaryLineConfig.startFillColor,
                secondaryLineConfig.endFillColor,
                secondaryLineConfig.startOpacity,
                secondaryLineConfig.endOpacity,
                secondaryLineConfig.strokeDashArray,
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                6,
              )
            : renderLine(
                secondaryLineConfig.zIndex,
                secondaryPoints,
                secondaryLineConfig.thickness,
                secondaryLineConfig.color,
                secondaryFillPoints,
                secondaryLineConfig.startFillColor,
                secondaryLineConfig.endFillColor,
                secondaryLineConfig.startOpacity,
                secondaryLineConfig.endOpacity,
                secondaryLineConfig.strokeDashArray,
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                6,
              )
          : null}
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
                1,
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
                1,
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
                2,
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
                2,
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
                3,
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
                3,
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
                4,
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
                4,
              )
          : null}
        {pointerX > 0 ? (
          <View
            pointerEvents={pointerEvents ?? 'none'}
            style={{
              position: 'absolute',
              height:
                extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
              bottom:
                58 + labelsExtraHeight + xAxisLabelsVerticalShift - overflowTop,
              // width: totalWidth,
              zIndex: 20,
            }}>
            {!stripOverPointer && renderStripAndLabel()}
            {dataSet ? (
              renderPointer(1)
            ) : (
              <>
                {renderPointer(1)}
                {points2 ? renderPointer(2) : null}
                {points3 ? renderPointer(3) : null}
                {points4 ? renderPointer(4) : null}
                {points5 ? renderPointer(5) : null}
                {secondaryPoints ? renderPointer(6) : null}
                {stripOverPointer && renderStripAndLabel()}
              </>
            )}
          </View>
        ) : null}
        {(data0 ?? data).map((item: lineDataItem, index: number) => {
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

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.LINE,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl: false,
    shiftX: 0,
    shiftY: 0,
    scrollRef,
    yAxisAtTop,
    initialSpacing,
    data: data0 ?? data,
    stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    secondaryData: secondaryData,
    barWidth: 0, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex: props.scrollToIndex,
    scrollAnimation,
    scrollEventThrottle,
    indicatorColor: props.indicatorColor,
    setSelectedIndex,
    spacing,
    showLine: false,
    lineConfig: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineConfig2: null, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    maxValue,
    lineData: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    lineData2: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    animatedWidth,
    lineBehindBars: false,
    points,
    points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    arrowPoints: [], // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    renderChartContent,
    remainingScrollViewProps,

    //horizSectionProps-
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    rotateYAxisTexts: 0,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,
    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,
  };

  return <BarAndLineChartsWrapper {...barAndLineChartsWrapperProps} />;
};
