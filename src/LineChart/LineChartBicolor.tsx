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
import {
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
} from '../utils';
import {
  AxesAndRulesDefaults,
  LineDefaults,
  chartTypes,
  yAxisSides,
} from '../utils/constants';
import {BarAndLineChartsWrapperTypes, RuleType} from '../utils/types';
import { LineChartBicolorPropsType, bicolorLineDataItem } from './types';

let initialData: Array<bicolorLineDataItem> | null = null;

type Points = {
  points: string;
  color: string;
};

export const LineChartBicolor = (props: LineChartBicolorPropsType) => {
  const scrollRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [pointsArray, setPointsArray] = useState<Array<Points>>([]);
  const [fillPointsArray, setFillPointsArray] = useState<Array<Points>>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerHeight = props.height || AxesAndRulesDefaults.containerHeight;
  const noOfSections = props.noOfSections || AxesAndRulesDefaults.noOfSections;
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

  const scrollToEnd = props.scrollToEnd ?? LineDefaults.scrollToEnd;
  const scrollAnimation = props.scrollAnimation ?? LineDefaults.scrollAnimation;
  const scrollEventThrottle =
    props.scrollEventThrottle ?? LineDefaults.scrollEventThrottle;

  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const labelsExtraHeight = props.labelsExtraHeight || 0;

  const animationDuration =
    props.animationDuration || LineDefaults.animationDuration;

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

  const initialSpacing = props.initialSpacing ?? LineDefaults.initialSpacing;
  const endSpacing =
    props.endSpacing ?? (adjustToWidth ? 0 : LineDefaults.endSpacing);
  const thickness = props.thickness || LineDefaults.thickness;

  const spacing =
    props.spacing ??
    (adjustToWidth
      ? ((props.width || AxesAndRulesDefaults.width) - initialSpacing) /
        data.length
      : LineDefaults.spacing);

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness;
  const dataPointsHeight1 =
    props.dataPointsHeight ?? LineDefaults.dataPointsHeight;
  const dataPointsWidth1 =
    props.dataPointsWidth ?? LineDefaults.dataPointsWidth;
  const dataPointsRadius1 =
    props.dataPointsRadius ?? LineDefaults.dataPointsRadius;
  const dataPointsColor1 =
    props.dataPointsColor ?? LineDefaults.dataPointsColor;
  const dataPointsShape1 =
    props.dataPointsShape ?? LineDefaults.dataPointsShape;

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
  const textFontSize1 = props.textFontSize || LineDefaults.textFontSize;
  const textColor1 = props.textColor || LineDefaults.textColor;

  let totalWidth = initialSpacing;
  let maxItem = 0,
    minItem = 0;
  data.forEach((item: bicolorLineDataItem) => {
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
  const mostNegativeValue = props.mostNegativeValue || minItem;

  useEffect(() => {
    decreaseWidth();
    labelsAppear();
  }, [animationDuration, decreaseWidth, labelsAppear]);

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    props.overflowTop,
  );

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
    if (
      (prevValuev > 0 && nextValue > 0) ||
      (prevValuev < 0 && nextValue < 0)
    ) {
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
      if (
        (prevValuev > 0 && nextValue < 0) ||
        (prevValuev < 0 && nextValue > 0)
      ) {
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

    pointsArray.forEach((item: any, index) => {
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
        if (
          (prevValuev > 0 && nextValue < 0) ||
          (prevValuev < 0 && nextValue > 0)
        ) {
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
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -mostNegativeValue / stepValue;
  const thickness1 = props.thickness || LineDefaults.thickness;
  const zIndex = props.zIndex || 0;

  const strokeDashArray1 = props.strokeDashArray;

  const rotateLabel = props.rotateLabel ?? AxesAndRulesDefaults.rotateLabel;
  const isAnimated = props.isAnimated ?? LineDefaults.isAnimated;
  const hideDataPoints1 = props.hideDataPoints ?? LineDefaults.hideDataPoints;

  const color = props.color || 'green';
  const colorNegative = props.colorNegative || 'red';

  const startFillColor = props.startFillColor || 'lightgreen';
  const endFillColor = props.endFillColor || 'white';
  const startOpacity = props.startOpacity ?? LineDefaults.startOpacity;
  const endOpacity = props.endOpacity ?? LineDefaults.endOpacity;
  const startFillColorNegative = props.startFillColorNegative || 'pink';
  const endFillColorNegative = props.endFillColorNegative || 'white';
  const startOpacityNegative =
    props.startOpacityNegative ?? LineDefaults.startOpacity;
  const endOpacityNegative =
    props.endOpacityNegative ?? LineDefaults.endOpacity;

  const gradientDirection = props.gradientDirection || 'vertical';

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices;
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight;
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth;
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor;

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const showFractionalValues =
    props.showFractionalValues ?? AxesAndRulesDefaults.showFractionalValues;
  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth);

  const horizontal = false;
  const yAxisAtTop = false;

  const disableScroll = props.disableScroll ?? LineDefaults.disableScroll;
  const showScrollIndicator =
    props.showScrollIndicator || LineDefaults.showScrollIndicator;

  const focusEnabled = props.focusEnabled ?? LineDefaults.focusEnabled;
  const showDataPointOnFocus =
    props.showDataPointOnFocus ?? LineDefaults.showDataPointOnFocus;
  const showStripOnFocus =
    props.showStripOnFocus ?? LineDefaults.showStripOnFocus;
  const showTextOnFocus = props.showTextOnFocus ?? LineDefaults.showTextOnFocus;
  const stripHeight = props.stripHeight;
  const stripWidth = props.stripWidth ?? LineDefaults.stripWidth;
  const stripColor = props.stripColor ?? color;
  const stripOpacity = props.stripOpacity ?? (startOpacity + endOpacity) / 2;
  const unFocusOnPressOut =
    props.unFocusOnPressOut ?? LineDefaults.unFocusOnPressOut;
  const delayBeforeUnFocus =
    props.delayBeforeUnFocus ?? LineDefaults.delayBeforeUnFocus;

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

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent?: Function,
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
    labelComponent?: Function,
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
    return dataForRender.map((item: bicolorLineDataItem, index: number) => {
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

      const currentStripHeight = item.stripHeight ?? stripHeight;
      const currentStripWidth = item.stripWidth ?? stripWidth;
      const currentStripOpacity = item.stripOpacity ?? stripOpacity;
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
                  left: getX(index) - dataPointsWidth,
                },
              ]}>
              {customDataPoint()}
            </View>
          ) : null}
          {dataPointsShape === 'rectangular' ? (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Rect
                  x={getX(index) - dataPointsWidth}
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
                  cx={getX(index)}
                  cy={getY(index)}
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
    return dataForRender.map((item: bicolorLineDataItem, index: number) => {
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
          height: extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
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
          height: extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
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
        {data.map((item: bicolorLineDataItem, index: number) => {
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
    chartType: chartTypes.LINE_BI_COLOR,
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
    data,
    stackData: undefined, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    secondaryData: [],
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
    points: pointsArray,
    points2: '', // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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

    axesAndRulesProps: getAxesAndRulesProps(props, stepValue, undefined),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    rotateYAxisTexts: 0,
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
