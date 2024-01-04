import {defaultLineConfigType} from '../BarChart/types';
import {CurveType, EdgePosition, RuleTypes} from './types';
import {Dimensions} from 'react-native';
import {FontStyle} from 'react-native-svg';

// Global

export enum chartTypes {
  BAR,
  LINE,
  LINE_BI_COLOR,
}

export const screenWidth = Dimensions.get('window').width;

const defaultCurvature = 0.2;
const defaultCurveType = CurveType.CUBIC;
const defaultAnimationDuration = 800;
const defaultScrollEventThrottle = 0;

// Bar and Line chart Specific

export enum yAxisSides {
  LEFT,
  RIGHT,
}

export enum loc {
  IN,
  UP,
  DOWN,
}

export const SEGMENT_START = 'segmentStart';
export const SEGMENT_END = 'segmentEnd';
export const RANGE_ENTER = 'RangeEnter';
export const RANGE_EXIT = 'RangeExit';
export const STOP = 'stop';

export const ruleTypes: RuleTypes = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
};

export const AxesAndRulesDefaults = {
  yAxisSide: yAxisSides.LEFT,
  yAxisColor: 'black',
  yAxisExtraHeight: 0,
  yAxisThickness: 1,
  trimYAxisAtTop: false,
  overflowTop: 0,
  xAxisColor: 'black',
  xAxisThickness: 1,
  xAxisType: ruleTypes.SOLID,
  xAxisTextNumberOfLines: 1,
  xAxisLabelsVerticalShift: 0,
  dashWidth: 4,
  dashGap: 8,
  backgroundColor: 'transparent',

  hideRules: false,
  rulesType: ruleTypes.DASHED,
  rulesThickness: 1,
  rulesColor: 'lightgray',
  rulesConfigArray: [],

  rotateLabel: false,

  showYAxisIndices: false,
  yAxisIndicesHeight: 2,
  yAxisIndicesWidth: 4,
  yAxisIndicesColor: 'black',

  showXAxisIndices: false,
  xAxisIndicesHeight: 2,
  xAxisIndicesWidth: 4,
  xAxisIndicesColor: 'black',

  hideOrigin: false,
  hideYAxisText: false,
  yAxisTextNumberOfLines: 1,

  showVerticalLines: false,
  verticalLinesThickness: 1,
  verticalLinesColor: 'lightgray',
  verticalLinesStrokeDashArray: '',
  verticalLinesShift: 0,
  verticalLinesZIndex: -1,
  verticalLinesSpacing: 0,
  verticalLinesUptoDataPoint: false,

  noOfSections: 10,
  containerHeight: 200,
  width: 200,

  labelWidth: 0,
  labelsExtraHeight: 0,

  yAxisLabelWidth: 35,
  yAxisEmptyLabelWidth: 10,

  showFractionalValues: false,
  roundToDigits: 1,
  referenceLinesOverChartContent: true,
};

export const defaultArrowConfig = {
  length: 10,
  width: 10,
  strokeWidth: 1,
  strokeColor: 'black',
  fillColor: 'none',
  showArrowBase: true,
};

// Bar chart specific

export const BarDefaults = {
  barWidth: 30,
  spacing: 20,
  capThickness: 6,
  capColor: 'gray',
  capRadius: 0,
  barBorderColor: 'gray',

  horizontal: false,
  rtl: false,
  labelsWidthForHorizontal: 30,
  yAxisAtTop: false,
  rotateYAxisTexts: undefined,
  intactTopLabel: false,

  showLine: false,
  lineBehindBars: false,

  disableScroll: false,
  scrollToEnd: false,
  scrollAnimation: true,
  showScrollIndicator: false,
  scrollEventThrottle: defaultScrollEventThrottle,

  side: '',
  isAnimated: false,
  animationDuration: 800,
  opacity: 1,
  isThreeD: false,
};

export const defaultLineConfig: defaultLineConfigType = {
  initialSpacing: BarDefaults.spacing, // gets updated to spacing before being used
  curved: false,
  curvature: defaultCurvature,
  curveType: defaultCurveType,
  isAnimated: false,
  animationDuration: defaultAnimationDuration,
  thickness: 1,
  color: 'black',
  hideDataPoints: false,
  dataPointsShape: 'circular',
  dataPointsWidth: 4,
  dataPointsHeight: 4,
  dataPointsColor: 'black',
  dataPointsRadius: 3,
  textColor: 'gray',
  textFontSize: 10,
  textShiftX: 0,
  textShiftY: 0,
  shiftX: 0,
  shiftY: 0,
  delay: 0,
  startIndex: 0,
  endIndex: 0, // gets updated to lineData.length - 1
  showArrow: false,
  arrowConfig: defaultArrowConfig,
  isSecondary: false,
};

// Line chart specific

export const LineDefaults = {
  color: 'black',
  curvature: defaultCurvature,
  curveType: defaultCurveType,
  thickness: 2,
  isAnimated: false,
  hideDataPoints: false,
  spacing: 50,
  initialSpacing: 20,
  endSpacing: 20,
  animationDuration: defaultAnimationDuration,
  animateTogether: false,
  disableScroll: false,
  scrollToEnd: false,
  scrollAnimation: true,
  showScrollIndicator: false,
  scrollEventThrottle: defaultScrollEventThrottle,
  showValuesAsDataPointsText: false,

  dataPointsHeight: 4,
  dataPointsWidth: 4,
  dataPointsRadius: 3,
  dataPointsColor: 'black',
  dataPointsColor2: 'blue',
  dataPointsColor3: 'red',
  dataPointsShape: 'circular',

  textFontSize: 10,
  textColor: 'gray',

  startFillColor: 'gray',
  endFillColor: 'white',
  lineGradient: false,
  lineGradientStartColor: 'lightgreen',
  lineGradientEndColor: 'orange',
  startOpacity: 1,
  endOpacity: 1,

  focusEnabled: false,
  showDataPointOnFocus: false,
  showStripOnFocus: false,
  showTextOnFocus: false,
  stripWidth: 2,
  unFocusOnPressOut: true,
  delayBeforeUnFocus: 300,
  edgePosition: EdgePosition.AT_DATA_POINT,
};

export const defaultPointerConfig = {
  height: 0,
  width: 0,
  radius: 5,
  pointerColor: 'red',
  pointerComponent: null,
  showPointerStrip: true,
  pointerStripHeight: AxesAndRulesDefaults.containerHeight, // gets updated to actual containerHeight
  pointerStripWidth: 1,
  pointerStripColor: 'black',
  pointerStripUptoDataPoint: false,
  pointerLabelComponent: null,
  stripOverPointer: false,
  shiftPointerLabelX: 0,
  shiftPointerLabelY: 0,
  pointerLabelWidth: 20,
  pointerLabelHeight: 20,
  autoAdjustPointerLabelPosition: false,
  pointerVanishDelay: 150,
  activatePointersOnLongPress: false,
  activatePointersDelay: 150,
  initialPointerIndex: -1,
  initialPointerAppearDelay: 0,
  persistPointer: false,
  hidePointer1: false,
  hidePointer2: false,
  hidePointer3: false,
  hidePointer4: false,
  hidePointer5: false,
  hideSecondaryPointer: false,
  barTouchable: false,
  stripBehindBars: true,
  resetPointerOnDataChange: true,
  // pointerEvents: PointerEvent
};

// Pie chart specific

export const pieColors = [
  'cyan',
  'green',
  'orange',
  'purple',
  '#bbff00',
  'red',
  'blue',
  'pink',
];

export const populationDefaults = {
  height: 200,
  width: screenWidth,
  verticalMarginBetweenBars : 1,
  barsMapToYAxisSections: true,

  xAxisNoOfSections: 4,
  showXAxisIndices: true,
  xAxisIndicesWidth: 2,
  xAxisIndicesHeight: 4,
  xAxisIndicesColor: 'black',
  showXAxisLabelTexts: true,
  xAxisRoundToDigits: 0,

  showVerticalLines: true,
  verticalLinesColor: 'lightgray',
  verticalLinesThickness: 1,
  verticalLinesType: ruleTypes.DASHED,
  verticalLinesStrokeDashArray: [4,8],

  defaultFontSize: 12,
  defaultFontColor: 'black',
  defaultFontStyle: <FontStyle>'normal',
  defaultFontWeight: 1,
  defaultFontFamily: '',

  yAxisLabelTextMarginRight: 4,
  showValuesAsBarLabels: false,
  showMidAxis: false,
  midAxisLabelWidth: 35,
  midAxisType: ruleTypes.SOLID,

  leftBarLabelWidth: 30,
  rightBarLabelWidth: 30,

  leftBarColor: 'skyblue',
  rightBarColor: 'orange',
  leftBarBorderColor: 'blue',
  rightBarBorderColor: 'red',
  leftBarBorderWidth: 0,
  rightBarBorderWidth: 0,
  leftBarBorderRadius: 0,
  rightBarBorderRadius: 0,
  allCornersRounded: false,
  showSurplus: false,
  showSurplusLeft: false,
  showSurplusRight: false,
  leftSurplusColor: '#334790',
  leftSurplusBorderColor: 'blue',
  rightSurplusColor: '#AC343C',
  rightSurplusBorderColor: 'red',
  leftSurplusBorderWidth: 0,
  rightSurplusBorderWidth: 0,
  prefix: '',
  suffix: '',
}
