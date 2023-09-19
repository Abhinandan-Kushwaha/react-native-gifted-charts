import {ColorValue} from 'react-native';
import {chartTypes, yAxisSides} from './constants';

export type RuleType = 'solid' | 'dashed' | 'dotted' | string;

export type RuleTypes = {
  SOLID: RuleType;
  DASHED: RuleType;
  DOTTED: RuleType;
};

export enum CurveType {
  CUBIC,
  QUADRATIC,
}

export type secondaryYAxisType = {
  noOfSections?: number;
  maxValue?: number;
  mostNegativeValue?: number;
  stepValue?: number;
  stepHeight?: number;
  showFractionalValues?: boolean;
  roundToDigits?: number;
  noOfSectionsBelowXAxis?: number;

  showYAxisIndices?: boolean;
  yAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  yAxisIndicesColor?: ColorValue;

  yAxisSide?: yAxisSides;
  yAxisOffset?: number;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisLabelContainerStyle?: any;
  yAxisLabelTexts?: Array<string> | undefined;
  yAxisTextStyle?: any;
  yAxisTextNumberOfLines?: number;
  yAxisLabelWidth?: number;
  hideYAxisText?: boolean;
  yAxisLabelPrefix?: string;
  yAxisLabelSuffix?: string;
  hideOrigin?: boolean;
};

export type secondaryLineConfigType = {
  zIndex?: number;
  curved?: boolean;
  curvature?: number;
  curveType?: CurveType;
  areaChart?: boolean;
  color?: ColorValue;
  thickness?: number;
  zIndex1?: number;
  strokeDashArray?: Array<number>;
  startIndex?: number;
  endIndex?: number;
  hideDataPoints?: boolean;
  dataPointsHeight?: number;
  dataPointsWidth?: number;
  dataPointsRadius?: number;
  dataPointsColor?: string;
  dataPointsShape?: string;
  showValuesAsDataPointsText?: boolean;
  startFillColor?: string;
  endFillColor?: string;
  startOpacity?: number;
  endOpacity?: number;
  textFontSize?: number;
  textColor?: string;
  showArrow?: boolean;
  arrowConfig?: arrowConfigType;
  isSecondary?: boolean;
};

export type arrowConfigType = {
  length: number;
  width: number;
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
  showArrowBase: boolean;
};

export type horizSectionPropTypes = {
  chartType: chartTypes;
  width: number | undefined;
  horizSections: Array<any>;
  noOfSectionsBelowXAxis: number;
  totalWidth: number;
  endSpacing: number;
  yAxisSide: yAxisSides;
  horizontalRulesStyle: any;
  noOfSections: number;
  stepHeight: number;
  yAxisLabelWidth: number;
  yAxisLabelContainerStyle: any;
  yAxisThickness: number;
  yAxisColor: string;
  xAxisThickness: number;
  xAxisColor: string;
  xAxisLength: number;
  xAxisType: RuleType;
  dashWidth: number;
  dashGap: number;
  backgroundColor: string;
  hideRules: boolean;
  rulesLength: number;
  rulesType: RuleType;
  rulesThickness: number;
  rulesColor: string;
  spacing: number;
  showYAxisIndices: boolean;
  yAxisIndicesHeight: number;
  yAxisIndicesWidth: number;
  yAxisIndicesColor: string;

  hideOrigin: boolean;
  hideYAxisText: boolean;
  showFractionalValues: boolean;
  yAxisTextNumberOfLines: number;
  yAxisLabelPrefix: string;
  yAxisLabelSuffix: string;
  yAxisTextStyle: any;
  rotateYAxisTexts: number | undefined;
  rtl: boolean;

  containerHeight: number;
  maxValue: number;

  referenceLinesConfig: any;

  yAxisLabelTexts: Array<string> | undefined;
  yAxisOffset: number | undefined;

  horizontal: boolean;
  yAxisAtTop: boolean;

  stepValue: number;
  roundToDigits: number | undefined;

  secondaryData: Array<any> | undefined;
  secondaryYAxis: secondaryYAxisType | null;
};

type HorizSectionObject = {
  value: string;
};

export type HorizSectionsType = Array<HorizSectionObject>;

export type BarAndLineChartsWrapperTypes = {
  chartType: chartTypes;
  containerHeight: number;
  noOfSectionsBelowXAxis: number;
  stepHeight: number;
  labelsExtraHeight: number;
  yAxisLabelWidth: number;
  horizontal: boolean;
  rtl: boolean;
  shiftX: number;
  shiftY: number;
  scrollRef: any;
  yAxisAtTop: boolean;
  initialSpacing: number;
  data: Array<any>;
  stackData: Array<any> | undefined;
  secondaryData: Array<any> | undefined;
  barWidth: number | undefined;
  xAxisThickness: number;
  totalWidth: number;
  disableScroll: boolean;
  showScrollIndicator: boolean;
  scrollToEnd: boolean;
  scrollToIndex: number | undefined;
  scrollAnimation: boolean;
  indicatorColor: 'black' | 'default' | 'white' | undefined;
  setSelectedIndex: any;
  spacing: number;
  showLine: boolean;
  lineConfig: any;
  maxValue: number;
  lineData: Array<any>;
  animatedWidth: any;
  lineBehindBars: boolean;
  points: string | Array<any>;
  arrowPoints: any;
  renderChartContent: any;
  remainingScrollViewProps: any;

  width: number | undefined;
  horizSections: HorizSectionsType;
  endSpacing: number;
  horizontalRulesStyle: any;
  noOfSections: number;
  showFractionalValues: boolean;
  axesAndRulesProps: any;

  yAxisLabelTexts: Array<string> | undefined;
  yAxisOffset: number | undefined;
  rotateYAxisTexts: number | undefined;
  hideAxesAndRules: boolean | undefined;

  showXAxisIndices: boolean;
  xAxisIndicesHeight: number;
  xAxisIndicesWidth: number;
  xAxisIndicesColor: ColorValue;

  pointerConfig: any;
  getPointerProps: any;
  pointerIndex: number;
  pointerX: number;
  pointerY: number;

  scrollEventThrottle: number;
};
