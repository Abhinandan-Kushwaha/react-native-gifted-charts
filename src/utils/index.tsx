import {arrowConfigType, CurveType} from './types';

export const getCumulativeWidth = (
  data: any,
  index: number,
  spacing: number,
) => {
  let cumWidth = 0;
  for (let i = 0; i < index; i++) {
    let {barWidth} = data[i];
    barWidth = barWidth || 30;
    cumWidth += barWidth + (spacing ?? 20);
  }
  return cumWidth;
};

export const getLighterColor = (color: String) => {
  let r,
    g,
    b,
    lighter = '#';
  if (color.startsWith('#')) {
    if (color.length < 7) {
      r = parseInt(color[1], 16);
      g = parseInt(color[2], 16);
      b = parseInt(color[3], 16);
      // console.log('r', r);
      // console.log('g', g);
      // console.log('b', b);
      if (r < 14) {
        r += 2;
        lighter += r.toString(16);
      }
      if (g < 14) {
        g += 2;
        lighter += g.toString(16);
      }
      if (b < 14) {
        b += 2;
        lighter += b.toString(16);
      }
      // console.log('lighter', lighter);
    } else {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
      // console.log('r', r);
      // console.log('g', g);
      // console.log('b', b);

      if (r < 224) {
        r += 32;
        lighter += r.toString(16);
      }
      if (g < 224) {
        g += 32;
        lighter += g.toString(16);
      }
      if (b < 224) {
        b += 32;
        lighter += b.toString(16);
      }
      // console.log('lighter', lighter);
    }
  }
  return lighter;
};

export const svgQuadraticCurvePath = points => {
  let path = 'M' + points[0][0] + ',' + points[0][1];

  for (let i = 0; i < points.length - 1; i++) {
    const xMid = (points[i][0] + points[i + 1][0]) / 2;
    const yMid = (points[i][1] + points[i + 1][1]) / 2;
    const cpX1 = (xMid + points[i][0]) / 2;
    const cpX2 = (xMid + points[i + 1][0]) / 2;
    path +=
      'Q ' +
      cpX1 +
      ', ' +
      points[i][1] +
      ', ' +
      xMid +
      ', ' +
      yMid +
      (' Q ' +
        cpX2 +
        ', ' +
        points[i + 1][1] +
        ', ' +
        points[i + 1][0] +
        ', ' +
        points[i + 1][1]);
  }

  return path;
};

export const svgPath = (
  points: Array<Array<number>>,
  curveType: CurveType,
  curvature: number,
) => {
  if (!points?.length) return '';
  if (curveType === CurveType.QUADRATIC) {
    return svgQuadraticCurvePath(points);
  }
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? // if first point
          `M ${point[0]},${point[1]}`
        : // else
          `${acc} ${bezierCommand(point, i, a, curvature)}`,
    '',
  );
  return d;
};

const line = (pointA: Array<number>, pointB: Array<number>) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const controlPoint = (
  curvature: number,
  current: Array<number>,
  previous: Array<number>,
  next: Array<number>,
  reverse?: any,
) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // The smoothing ratio
  const smoothing = curvature;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

export const bezierCommand = (
  point: Array<number>,
  i: number,
  a: Array<Array<number>>,
  curvature: number,
) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(curvature, a[i - 1], a[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(curvature, point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

export const getArrowPoints = (
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

export const getAxesAndRulesProps = (props, stepValue, maxValue) => {
  const axesAndRulesProps = {
    yAxisSide: props.yAxisSide,
    yAxisLabelContainerStyle: props.yAxisLabelContainerStyle,
    yAxisColor: props.yAxisColor,
    yAxisThickness: props.yAxisThickness,
    xAxisColor: props.xAxisColor,
    xAxisLength: props.xAxisLength,
    xAxisType: props.xAxisType,
    dashWidth: props.dashWidth,
    dashGap: props.dashGap,
    backgroundColor: props.backgroundColor,
    hideRules: props.hideRules,
    rulesLength: props.rulesLength,
    rulesType: props.rulesType,
    rulesThickness: props.rulesThickness,
    rulesColor: props.rulesColor,
    showYAxisIndices: props.showYAxisIndices,
    yAxisIndicesHeight: props.yAxisIndicesHeight,
    yAxisIndicesWidth: props.yAxisIndicesWidth,
    yAxisIndicesColor: props.yAxisIndicesColor,
    hideOrigin: props.hideOrigin,
    hideYAxisText: props.hideYAxisText,
    yAxisTextNumberOfLines: props.yAxisTextNumberOfLines,
    yAxisLabelPrefix: props.yAxisLabelPrefix,
    yAxisLabelSuffix: props.yAxisLabelSuffix,
    yAxisTextStyle: props.yAxisTextStyle,

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

    showVerticalLines: props.showVerticalLines,
    verticalLinesThickness: props.verticalLinesThickness,
    verticalLinesHeight: props.verticalLinesHeight,
    verticalLinesColor: props.verticalLinesColor,
    verticalLinesShift: props.verticalLinesShift,
    verticalLinesZIndex: props.verticalLinesZIndex,
    verticalLinesSpacing: props.verticalLinesSpacing,
    noOfVerticalLines: props.noOfVerticalLines,

    //specific to Line charts-
    verticalLinesUptoDataPoint: props.verticalLinesUptoDataPoint,

    roundToDigits: props.roundToDigits,
    stepValue,

    secondaryYAxis: props.secondaryYAxis,
  };
  if (props.secondaryYAxis && maxValue !== undefined) {
    axesAndRulesProps.secondaryYAxis = {...props.secondaryYAxis, maxValue};
  }

  return axesAndRulesProps;
};

export const getExtendedContainerHeightWithPadding = (
  containerHeight,
  overflowTop,
) => containerHeight + (overflowTop ?? 0) + 10;

export const getSecondaryDataWithOffsetIncluded = (
  secondaryData,
  secondaryYAxis,
) => {
  if (secondaryData && secondaryYAxis?.yAxisOffset) {
    return secondaryData?.map(item => {
      item.value = item.value - (secondaryYAxis?.yAxisOffset ?? 0);
      return item;
    });
  }
  return secondaryData;
};

export const getArrowProperty = (
  property: string,
  count: number,
  props: any,
  defaultArrowConfig: arrowConfigType,
) => {
  return (
    props[`arrowConfig${count}`]?.[`${property}`] ??
    props[`arrowConfig`]?.[`${property}`] ??
    defaultArrowConfig[`${property}`]
  );
};

export const getAllArrowProperties = (
  props: any,
  defaultArrowConfig: arrowConfigType,
) => {
  const arrowLength1 = getArrowProperty('length', 1, props, defaultArrowConfig);
  const arrowWidth1 = getArrowProperty('width', 1, props, defaultArrowConfig);
  const arrowStrokeWidth1 = getArrowProperty(
    'strokeWidth',
    1,
    props,
    defaultArrowConfig,
  );
  const arrowStrokeColor1 = getArrowProperty(
    'strokeColor',
    1,
    props,
    defaultArrowConfig,
  );
  const arrowFillColor1 = getArrowProperty(
    'fillColor',
    1,
    props,
    defaultArrowConfig,
  );
  const showArrowBase1 = getArrowProperty(
    'showArrowBase',
    1,
    props,
    defaultArrowConfig,
  );

  const arrowLength2 = getArrowProperty('length', 2, props, defaultArrowConfig);
  const arrowWidth2 = getArrowProperty('width', 2, props, defaultArrowConfig);
  const arrowStrokeWidth2 = getArrowProperty(
    'strokeWidth',
    2,
    props,
    defaultArrowConfig,
  );
  const arrowStrokeColor2 = getArrowProperty(
    'strokeColor',
    2,
    props,
    defaultArrowConfig,
  );
  const arrowFillColor2 = getArrowProperty(
    'fillColor',
    2,
    props,
    defaultArrowConfig,
  );
  const showArrowBase2 = getArrowProperty(
    'showArrowBase',
    2,
    props,
    defaultArrowConfig,
  );

  const arrowLength3 = getArrowProperty('length', 3, props, defaultArrowConfig);
  const arrowWidth3 = getArrowProperty('width', 3, props, defaultArrowConfig);
  const arrowStrokeWidth3 = getArrowProperty(
    'strokeWidth',
    3,
    props,
    defaultArrowConfig,
  );
  const arrowStrokeColor3 = getArrowProperty(
    'strokeColor',
    3,
    props,
    defaultArrowConfig,
  );
  const arrowFillColor3 = getArrowProperty(
    'fillColor',
    3,
    props,
    defaultArrowConfig,
  );
  const showArrowBase3 = getArrowProperty(
    'showArrowBase',
    3,
    props,
    defaultArrowConfig,
  );

  const arrowLength4 = getArrowProperty('length', 4, props, defaultArrowConfig);
  const arrowWidth4 = getArrowProperty('width', 4, props, defaultArrowConfig);
  const arrowStrokeWidth4 = getArrowProperty(
    'strokeWidth',
    4,
    props,
    defaultArrowConfig,
  );
  const arrowStrokeColor4 = getArrowProperty(
    'strokeColor',
    4,
    props,
    defaultArrowConfig,
  );
  const arrowFillColor4 = getArrowProperty(
    'fillColor',
    4,
    props,
    defaultArrowConfig,
  );
  const showArrowBase4 = getArrowProperty(
    'showArrowBase',
    4,
    props,
    defaultArrowConfig,
  );

  const arrowLength5 = getArrowProperty('length', 5, props, defaultArrowConfig);
  const arrowWidth5 = getArrowProperty('width', 5, props, defaultArrowConfig);
  const arrowStrokeWidth5 = getArrowProperty(
    'strokeWidth',
    5,
    props,
    defaultArrowConfig,
  );
  const arrowStrokeColor5 = getArrowProperty(
    'strokeColor',
    5,
    props,
    defaultArrowConfig,
  );
  const arrowFillColor5 = getArrowProperty(
    'fillColor',
    5,
    props,
    defaultArrowConfig,
  );
  const showArrowBase5 = getArrowProperty(
    'showArrowBase',
    5,
    props,
    defaultArrowConfig,
  );

  return {
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
  };
};

type MaxAndMin = {
  maxItem: number;
  minItem: number;
};

export const maxAndMinUtil = (
  maxItem,
  minItem,
  roundToDigits,
  showFractionalValues,
): MaxAndMin => {
  if (showFractionalValues || roundToDigits) {
    maxItem *= 10 * (roundToDigits || 1);
    maxItem = maxItem + (10 - (maxItem % 10));
    maxItem /= 10 * (roundToDigits || 1);
    maxItem = parseFloat(maxItem.toFixed(roundToDigits || 1));

    if (minItem !== 0) {
      minItem *= 10 * (roundToDigits || 1);
      minItem = minItem - (10 + (minItem % 10));
      minItem /= 10 * (roundToDigits || 1);
      minItem = parseFloat(minItem.toFixed(roundToDigits || 1));
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
    if (minItem !== 0) {
      minItem = minItem - (10 + (minItem % 10));
    }
  }

  return {maxItem, minItem};
};

export const computeMaxAndMinItems = (
  data,
  roundToDigits,
  showFractionalValues,
): MaxAndMin => {
  if (!data?.length) {
    return {maxItem: 0, minItem: 0};
  }
  let maxItem = 0,
    minItem = 0;

  data.forEach((item: any) => {
    if (item.value > maxItem) {
      maxItem = item.value;
    }
    if (item.value < minItem) {
      minItem = item.value;
    }
  });

  return maxAndMinUtil(maxItem, minItem, roundToDigits, showFractionalValues);
};

export const getLabelTextUtil = (
  val,
  index,
  showFractionalValues,
  yAxisLabelTexts,
  yAxisOffset,
  yAxisLabelPrefix,
  yAxisLabelSuffix,
  roundToDigits,
) => {
  let label = '';
  if (
    showFractionalValues ||
    (yAxisLabelTexts && yAxisLabelTexts[index] !== undefined)
  ) {
    if (yAxisLabelTexts?.[index]) return val;
    if (val) {
      label = isNaN(Number(val))
        ? val
        : (Number(val) + (yAxisOffset ?? 0)).toFixed(roundToDigits);
    } else {
      label = yAxisOffset?.toString() ?? '0';
    }
  } else {
    if (val) {
      label = val.toString().split('.')[0];
      label = (Number(label) + (yAxisOffset ?? 0)).toString();
    } else {
      label = yAxisOffset?.toString() ?? '0';
    }
  }

  return yAxisLabelPrefix + label + yAxisLabelSuffix;
};

export const getXForLineInBar = (
  index,
  firstBarWidth,
  currentBarWidth,
  yAxisLabelWidth,
  lineConfig,
  spacing,
) =>
  yAxisLabelWidth +
  firstBarWidth / 2 +
  lineConfig.initialSpacing +
  (currentBarWidth + spacing) * index +
  lineConfig.shiftX -
  lineConfig.dataPointsWidth / 2 -
  32;

export const getYForLineInBar = (value, shiftY, containerHeight, maxValue) =>
  containerHeight - shiftY - (value * containerHeight) / maxValue;

export const clone = (obj) => {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

  let temp;
  if (obj instanceof Date)
      temp = new Date(obj);
  else
      temp = obj.constructor();

  for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = clone(obj[key]);
          delete obj['isActiveClone'];
      }
  }
  return temp;
}