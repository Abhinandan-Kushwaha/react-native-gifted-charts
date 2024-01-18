import {ColorValue} from 'react-native';
import {yAxisSides} from '../utils/constants';
import {
  CurveType,
  DataSet,
  EdgePosition,
  HighlightedRange,
  LineSegment,
  Pointer,
  RuleType,
  RulesConfig,
  arrowConfigType,
  referenceConfigType,
  secondaryLineConfigType,
  secondaryYAxisType,
} from '../utils/types';

export type LineChartPropsType = {
  height?: number;
  overflowTop?: number;
  overflowBottom?: number;
  noOfSections?: number;
  maxValue?: number;
  mostNegativeValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  initialSpacing?: number;
  endSpacing?: number;
  data?: Array<lineDataItem>;
  data2?: Array<lineDataItem>;
  data3?: Array<lineDataItem>;
  data4?: Array<lineDataItem>;
  data5?: Array<lineDataItem>;
  dataSet?: Array<DataSet>;
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
  rotateLabel?: boolean;
  isAnimated?: boolean;
  animateOnDataChange?: boolean;
  animationDuration?: number;
  onDataChangeAnimationDuration?: number;
  animationEasing?: any;
  animateTogether?: boolean;
  xAxisLength?: number;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  xAxisType?: RuleType;
  hideRules?: boolean;
  rulesLength?: number;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  focusEnabled?: boolean;
  onFocus?: Function;
  showDataPointOnFocus?: boolean;
  showStripOnFocus?: boolean;
  showTextOnFocus?: boolean;
  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;
  onPress?: Function;
  unFocusOnPressOut?: boolean;
  delayBeforeUnFocus?: number;
  showValuesAsDataPointsText?: boolean;

  rulesType?: RuleType;
  dashWidth?: number;
  dashGap?: number;
  rulesConfigArray?: Array<RulesConfig>;
  showReferenceLine1?: boolean;
  referenceLine1Config?: referenceConfigType;
  referenceLine1Position?: number;
  showReferenceLine2?: boolean;
  referenceLine2Config?: referenceConfigType;
  referenceLine2Position?: number;
  showReferenceLine3?: boolean;
  referenceLine3Config?: referenceConfigType;
  referenceLine3Position?: number;

  showVerticalLines?: boolean;
  verticalLinesUptoDataPoint?: boolean;
  verticalLinesThickness?: number;
  verticalLinesHeight?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesStrokeDashArray?: Array<number>;
  verticalLinesShift?: number;
  verticalLinesZIndex?: number;
  noOfVerticalLines?: number;
  verticalLinesSpacing?: number;
  hideAxesAndRules?: boolean;
  areaChart?: boolean;
  areaChart1?: boolean;
  areaChart2?: boolean;
  areaChart3?: boolean;
  areaChart4?: boolean;
  areaChart5?: boolean;
  stepChart?: boolean;
  stepChart1?: boolean;
  stepChart2?: boolean;
  stepChart3?: boolean;
  stepChart4?: boolean;
  stepChart5?: boolean;
  edgePosition?: EdgePosition;

  disableScroll?: boolean;
  pointerConfig?: Pointer;
  showScrollIndicator?: boolean;
  indicatorColor?: 'black' | 'default' | 'white';

  //Indices

  showYAxisIndices?: boolean;
  showXAxisIndices?: boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;
  yAxisSide?: yAxisSides;
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
  yAxisExtraHeight?: number;
  trimYAxisAtTop?: boolean;
  yAxisLabelContainerStyle?: any;
  horizontalRulesStyle?: any;
  yAxisTextStyle?: any;
  yAxisTextNumberOfLines?: number;
  xAxisTextNumberOfLines?: number;
  showFractionalValues?: boolean;
  roundToDigits?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: boolean;

  backgroundColor?: ColorValue;
  curved?: boolean;
  curvature?: number;
  curveType?: CurveType;
  horizSections?: Array<sectionType>;

  //Data points

  hideDataPoints?: boolean;
  dataPointsHeight?: number;
  dataPointsWidth?: number;
  dataPointsRadius?: number;
  dataPointsColor?: string;
  dataPointsShape?: string;
  hideDataPoints1?: boolean;
  dataPointsHeight1?: number;
  dataPointsWidth1?: number;
  dataPointsRadius1?: number;
  dataPointsColor1?: string;
  dataPointsShape1?: string;
  hideDataPoints2?: boolean;
  dataPointsHeight2?: number;
  dataPointsWidth2?: number;
  dataPointsRadius2?: number;
  dataPointsColor2?: string;
  dataPointsShape2?: string;
  hideDataPoints3?: boolean;
  dataPointsHeight3?: number;
  dataPointsWidth3?: number;
  dataPointsRadius3?: number;
  dataPointsColor3?: string;
  dataPointsShape3?: string;
  hideDataPoints4?: boolean;
  dataPointsHeight4?: number;
  dataPointsWidth4?: number;
  dataPointsRadius4?: number;
  dataPointsColor4?: string;
  dataPointsShape4?: string;
  hideDataPoints5?: boolean;
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

  areaGradientComponent?: () => any;
  areaGradientId?: string;

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
  hideOrigin?: boolean;
  textShiftX?: number;
  textShiftY?: number;
  yAxisLabelTexts?: Array<string>;
  xAxisLabelTexts?: Array<string>;
  xAxisLabelTextStyle?: any;
  xAxisLabelsHeight?: number;
  xAxisLabelsVerticalShift?: number;
  width?: number;
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  scrollRef?: any;
  scrollToEnd?: boolean;
  scrollToIndex?: number;
  scrollAnimation?: boolean;
  scrollEventThrottle?: number;
  noOfSectionsBelowXAxis?: number;
  labelsExtraHeight?: number;
  adjustToWidth?: boolean;
  getPointerProps?: Function;
  showArrows?: boolean;
  arrowConfig?: arrowConfigType;
  showArrow1?: boolean;
  arrowConfig1?: arrowConfigType;
  showArrow2?: boolean;
  arrowConfig2?: arrowConfigType;
  showArrow3?: boolean;
  arrowConfig3?: arrowConfigType;
  showArrow4?: boolean;
  arrowConfig4?: arrowConfigType;
  showArrow5?: boolean;
  arrowConfig5?: arrowConfigType;

  secondaryData?: Array<lineDataItem>;
  secondaryYAxis?: secondaryYAxisType;
  secondaryLineConfig?: secondaryLineConfigType;
  formatYLabel?: (label: string) => string;
  lineGradient?: boolean;
  lineGradientComponent?: () => any;
  lineGradientId?: string;
  lineGradientDirection?: string;
  lineGradientStartColor?: string;
  lineGradientEndColor?: string;
  lineSegments?: Array<LineSegment>;
  lineSegments2?: Array<LineSegment>;
  lineSegments3?: Array<LineSegment>;
  lineSegments4?: Array<LineSegment>;
  lineSegments5?: Array<LineSegment>;
  highlightedRange?: HighlightedRange;
};

export type lineDataItem = {
  value: number;
  label?: String;
  labelComponent?: Function;
  labelTextStyle?: any;
  dataPointText?: string;
  textShiftX?: number;
  textShiftY?: number;
  textColor?: string;
  textFontSize?: number;

  hideDataPoint?: boolean;
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
  showStrip?: boolean;

  showVerticalLine?: boolean;
  verticalLineUptoDataPoint?: boolean;
  verticalLineColor?: string;
  verticalLineThickness?: number;
  verticalLineStrokeDashArray?: Array<number>;
  pointerShiftX?: number;
  pointerShiftY?: number;
  onPress?: Function;
  showXAxisIndex?: boolean;
};

type sectionType = {
  value: string;
};

export type bicolorLineDataItem = {
  value: number;
  label?: String;
  labelComponent?: Function;
  labelTextStyle?: any;
  dataPointText?: string;
  textShiftX?: number;
  textShiftY?: number;
  textColor?: string;
  textFontSize?: number;

  hideDataPoint?: boolean;
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
  showStrip?: boolean;

  showVerticalLine?: boolean;
  verticalLineUptoDataPoint?: boolean;
  verticalLineColor?: string;
  verticalLineThickness?: number;
  pointerShiftX?: number;
  pointerShiftY?: number;
  onPress?: Function;
};

export type LineChartBicolorPropsType = {
  height?: number;
  overflowTop?: number;
  noOfSections?: number;
  maxValue?: number;
  mostNegativeValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  initialSpacing?: number;
  endSpacing?: number;
  data?: Array<bicolorLineDataItem>;
  zIndex?: number;
  thickness?: number;
  strokeDashArray?: Array<number>;
  rotateLabel?: boolean;
  isAnimated?: boolean;
  animationDuration?: number;
  onDataChangeAnimationDuration?: number;
  animationEasing?: any;
  xAxisLength?: number;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  xAxisType?: RuleType;
  hideRules?: boolean;
  rulesLength?: number;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  focusEnabled?: boolean;
  onFocus?: Function;
  showDataPointOnFocus?: boolean;
  showStripOnFocus?: boolean;
  showTextOnFocus?: boolean;
  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | String | any;
  stripOpacity?: number;
  onPress?: Function;
  unFocusOnPressOut?: boolean;
  delayBeforeUnFocus?: number;

  rulesType?: RuleType;
  dashWidth?: number;
  dashGap?: number;
  showReferenceLine1?: boolean;
  referenceLine1Config?: referenceConfigType;
  referenceLine1Position?: number;
  showReferenceLine2?: boolean;
  referenceLine2Config?: referenceConfigType;
  referenceLine2Position?: number;
  showReferenceLine3?: boolean;
  referenceLine3Config?: referenceConfigType;
  referenceLine3Position?: number;

  showVerticalLines?: boolean;
  verticalLinesUptoDataPoint?: boolean;
  verticalLinesThickness?: number;
  verticalLinesHeight?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesStrokeDashArray?: Array<number>;
  verticalLinesShift?: number;
  verticalLinesZIndex?: number;
  noOfVerticalLines?: number;
  verticalLinesSpacing?: number;
  hideAxesAndRules?: boolean;
  areaChart?: boolean;

  disableScroll?: boolean;
  showScrollIndicator?: boolean;
  indicatorColor?: 'black' | 'default' | 'white';

  //Indices

  showYAxisIndices?: boolean;
  showXAxisIndices?: boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;
  yAxisSide?: yAxisSides;
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
  showFractionalValues?: boolean;
  roundToDigits?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: boolean;

  backgroundColor?: ColorValue;
  curved?: boolean;
  horizSections?: Array<sectionType>;

  //Data points

  hideDataPoints?: boolean;
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
  hideOrigin?: boolean;
  textShiftX?: number;
  textShiftY?: number;
  yAxisLabelTexts?: Array<string>;
  xAxisLabelTexts?: Array<string>;
  xAxisLabelTextStyle?: any;
  width?: number;
  yAxisLabelPrefix?: String;
  yAxisLabelSuffix?: String;
  scrollToEnd?: boolean;
  scrollToIndex?: number;
  scrollAnimation?: boolean;
  scrollEventThrottle?: number;
  noOfSectionsBelowXAxis?: number;
  labelsExtraHeight?: number;
  adjustToWidth?: boolean;
  getPointerProps?: Function;
  formatYLabel?: (label: string) => string;
};
