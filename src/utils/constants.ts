import {defaultLineConfigType} from '../BarChart/types';
import {CurveType} from './types';

// Global

export enum chartTypes {
  BAR,
  LINE,
  LINE_BI_COLOR,
}

const defaultCurvature = 0.2;
const defaultCurveType = CurveType.CUBIC;

// Bar and Line chart Specific

export enum yAxisSides {
  LEFT,
  RIGHT,
}

export const ruleTypes = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
};

export const AxesAndRulesDefaults = {
  yAxisSide: yAxisSides.LEFT,
  yAxisColor: 'black',
  yAxisThickness: 1,
  xAxisColor: 'black',
  xAxisThickness: 1,
  xAxisType: ruleTypes.SOLID,
  xAxisTextNumberOfLines: 1,
  dashWidth: 4,
  dashGap: 8,
  backgroundColor: 'transparent',

  hideRules: false,
  rulesType: ruleTypes.DASHED,
  rulesThickness: 1,
  rulesColor: 'lightgray',

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
  verticalLinesType: 'solid',
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
  animationDuration: 800,
  animateTogether: false,
  disableScroll: false,
  scrollToEnd: false,
  scrollAnimation: true,
  showScrollIndicator: false,
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
  startOpacity: 1,
  endOpacity: 1,

  focusEnabled: false,
  showDataPointOnFocus: false,
  showStripOnFocus: false,
  showTextOnFocus: false,
  stripWidth: 2,
  unFocusOnPressOut: true,
  delayBeforeUnFocus: 300,
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
  hidePointer1: false,
  hidePointer2: false,
  hidePointer3: false,
  hidePointer4: false,
  hidePointer5: false,
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
