import React, {Fragment} from 'react';
import {View} from 'react-native';
import {
  PopulationPyramidPropsType,
  RulesProps,
  ruleTypes,
  usePopulationPyramid,
} from 'gifted-charts-core';
import {
  ClipPath,
  Line,
  Rect,
  Svg,
  Text as SvgText,
  Use,
} from 'react-native-svg';
import {screenWidth} from '../utils';

export const PopulationPyramid = (props: PopulationPyramidPropsType) => {
  const {
    width,
    verticalMarginBetweenBars,
    barsMapToYAxisSections,
    data,
    hideRules,
    yAxisColor,
    xAxisColor,
    xAxisThickness,
    xAxisType,
    xAxisNoOfSections,
    showXAxisIndices,
    showXAxisLabelTexts,
    xAxisLabelShiftX,
    xAxisLabelPrefix,
    xAxisLabelSuffix,
    formatXAxisLabels,
    showVerticalLines,
    showYAxisIndices,
    yAxisIndicesWidth,
    yAxisIndicesHeight,
    yAxisIndicesColor,
    yAxisLabelFontSize,
    yAxisLabelFontStyle,
    yAxisLabelFontWeight,
    yAxisLabelFontFamily,
    yAxisLabelColor,
    yAxisLabelTextMarginRight,
    yAxisLabelTexts,
    showValuesAsBarLabels,
    rulesThickness,
    rulesColor,
    rulesType,
    dashWidth,
    dashGap,
    leftBarLabelWidth,
    leftBarLabelFontSize,
    leftBarLabelColor,
    leftBarLabelFontStyle,
    leftBarLabelFontWeight,
    leftBarLabelFontFamily,
    leftBarLabelPrefix,
    leftBarLabelSuffix,
    rightBarLabelFontSize,
    rightBarLabelColor,
    rightBarLabelFontStyle,
    rightBarLabelFontWeight,
    rightBarLabelFontFamily,
    rightBarLabelPrefix,
    rightBarLabelSuffix,
    formatBarLabels,
    showMidAxis,
    midAxisLabelFontSize,
    midAxisLabelColor,
    midAxisLabelFontStyle,
    midAxisLabelFontWeight,
    midAxisLabelFontFamily,
    leftBarColor,
    rightBarColor,
    leftBarBorderColor,
    rightBarBorderColor,
    leftBarBorderWidth,
    rightBarBorderWidth,
    leftBarBorderRadius,
    rightBarBorderRadius,
    allCornersRounded,
    showSurplus,
    showSurplusLeft,
    showSurplusRight,
    leftSurplusColor,
    leftSurplusBorderColor,
    rightSurplusColor,
    rightSurplusBorderColor,
    leftSurplusBorderWidth,
    rightSurplusBorderWidth,
    yAxisLabelWidth,
    noOfSections,
    stepHeight,
    containerHeightWithXaxisLabels,
    mid,
    barWidthFactor,
    leftXAfterMid,
    rightXAfterMid,
    yAxisLineProps,
    midAxisLineCommonProps,
    xAxisIndicesCommonProps,
    verticalLinesCommonProps,
    xAxisLabelsCommonProps,
    getXLabel,
  } = usePopulationPyramid({...props, screenWidth});

  return (
    <View style={{height: containerHeightWithXaxisLabels, width}}>
      <Svg fill={'none'}>
        {/**************        Y-Axis         ************/}
        <Line {...yAxisLineProps} />

        {/************        Rules, X-axis and Y-Axis labels         ***********/}
        {Array.from(Array(noOfSections)).map((item, index) => {
          const isLast = index === noOfSections - 1;
          const y = stepHeight * (index + 1);
          const rulesProps: RulesProps = {
            x1: yAxisLabelWidth,
            y1: y,
            x2: width,
            y2: y,
            stroke: isLast ? xAxisColor : rulesColor,
            strokeWidth: isLast ? xAxisThickness : rulesThickness,
          };
          if (
            (isLast && xAxisType !== ruleTypes.SOLID) ||
            (!isLast && rulesType !== ruleTypes.SOLID)
          ) {
            rulesProps.strokeDasharray = [dashWidth, dashGap];
          } else {
            delete rulesProps.strokeDasharray;
          }
          return (
            <Fragment key={'rule' + index}>
              {!hideRules || isLast ? <Line {...rulesProps} /> : null}
              {showYAxisIndices ? (
                <Line
                  x1={yAxisLabelWidth - yAxisIndicesWidth / 2}
                  y1={y}
                  x2={yAxisLabelWidth + yAxisIndicesWidth / 2}
                  y2={y}
                  stroke={yAxisIndicesColor}
                  strokeWidth={yAxisIndicesHeight}
                />
              ) : null}
              {/**************     Y-Axis Labels      ************/}
              {!barsMapToYAxisSections ? (
                <SvgText
                  x={yAxisLabelWidth - yAxisLabelTextMarginRight}
                  y={stepHeight * (index + 0.5) + yAxisLabelFontSize / 2 - 2}
                  stroke={yAxisLabelColor}
                  fontSize={yAxisLabelFontSize}
                  fontStyle={yAxisLabelFontStyle}
                  fontWeight={yAxisLabelFontWeight}
                  fontFamily={yAxisLabelFontFamily}
                  textAnchor="end">
                  {yAxisLabelTexts[index] ?? ''}
                </SvgText>
              ) : null}
            </Fragment>
          );
        })}

        {/**************     X-Axis Labels Left     ************/}
        {Array.from(Array(xAxisNoOfSections)).map((item, index) => {
          const x = leftXAfterMid - (leftXAfterMid * index) / xAxisNoOfSections;
          const unformattedXLabel = getXLabel(index);
          const xLabel = formatXAxisLabels
            ? formatXAxisLabels(unformattedXLabel)
            : unformattedXLabel;
          return (
            <Fragment key={'x-axis' + index}>
              {showVerticalLines ? (
                <Line {...verticalLinesCommonProps} x1={x} x2={x} />
              ) : null}
              {showXAxisIndices ? (
                <Line {...xAxisIndicesCommonProps} x1={x} x2={x} />
              ) : null}
              {showXAxisLabelTexts ? (
                <SvgText
                  {...xAxisLabelsCommonProps}
                  x={x + xAxisLabelShiftX}
                  textAnchor="middle">
                  {xAxisLabelPrefix + xLabel + xAxisLabelSuffix}
                </SvgText>
              ) : null}
            </Fragment>
          );
        })}

        {/**************     X-Axis Labels Right     ************/}
        {Array.from(Array(xAxisNoOfSections)).map((item, index) => {
          if (!index && !showMidAxis) return null;
          const x = leftXAfterMid + (leftXAfterMid * index) / xAxisNoOfSections;
          const unformattedXLabel = getXLabel(index);
          const xLabel = formatXAxisLabels
            ? formatXAxisLabels(unformattedXLabel)
            : unformattedXLabel;
          return (
            <Fragment key={'x-axis' + index}>
              {showVerticalLines ? (
                <Line {...verticalLinesCommonProps} x1={x} x2={x} />
              ) : null}
              {showXAxisIndices ? (
                <Line {...xAxisIndicesCommonProps} x1={x} x2={x} />
              ) : null}
              {showXAxisLabelTexts ? (
                <SvgText
                  {...xAxisLabelsCommonProps}
                  x={x + xAxisLabelShiftX}
                  textAnchor="middle">
                  {xAxisLabelPrefix + xLabel + xAxisLabelSuffix}
                </SvgText>
              ) : null}
            </Fragment>
          );
        })}

        {/**************        Bars          ************/}
        {data.map((item, index) => {
          const leftWidth = item.left * barWidthFactor;
          const rightWidth = item.right * barWidthFactor;
          const y = stepHeight * index + verticalMarginBetweenBars;

          const leftSurplusWidth = leftWidth - rightWidth;
          const rightSurplusWidth = rightWidth - leftWidth;
          const leftRadius =
            item.leftBarBorderRadius ??
            item.barBorderRadius ??
            leftBarBorderRadius;
          const rightRadius =
            item.rightBarBorderRadius ??
            item.barBorderRadius ??
            rightBarBorderRadius;

          const leftBorderWidth =
            item.leftBarBorderWidth ??
            item.barBorderWidth ??
            leftBarBorderWidth;
          const rightBorderWidth =
            item.rightBarBorderWidth ??
            item.barBorderWidth ??
            rightBarBorderWidth;

          const unFormattedLeftBarLabel =
            item.leftBarLabel ??
            (showValuesAsBarLabels ? item.left.toString() : '');
          const leftBarLabel = formatBarLabels
            ? formatBarLabels(unFormattedLeftBarLabel)
            : unFormattedLeftBarLabel;

          const unFormattedRightBarLabel =
            item.rightBarLabel ??
            (showValuesAsBarLabels ? item.right.toString() : '');
          const rightBarLabel = formatBarLabels
            ? formatBarLabels(unFormattedRightBarLabel)
            : unFormattedRightBarLabel;

          const leftLabelFontSize =
            item.leftBarLabelFontSize ?? leftBarLabelFontSize;

          const leftLabelX =
            leftXAfterMid -
            leftWidth -
            leftBarBorderWidth / 2 -
            yAxisLabelWidth / 2 -
            leftBarLabelWidth / 2 +
            28 -
            (leftBarLabel.length * leftLabelFontSize) / 2 +
            (item.leftBarLabelShift ?? props.leftBarLabelShift ?? 0);

          const rightLabelX =
            rightXAfterMid +
            rightBarBorderWidth / 2 +
            rightWidth +
            3 +
            (item.rightBarLabelShift ?? props.rightBarLabelShift ?? 0);

          const leftBarCommonProps = {
            x: leftXAfterMid - leftWidth - leftBarBorderWidth / 2,
            y: y,
            width: leftWidth,
            height: stepHeight - verticalMarginBetweenBars * 2,
            rx: leftRadius,
            ry: leftRadius,
          };
          const rightBarCommonProps = {
            x: rightXAfterMid + rightBarBorderWidth / 2,
            y: y,
            width: rightWidth,
            height: stepHeight - verticalMarginBetweenBars * 2,
            rx: rightRadius,
            ry: rightRadius,
          };
          return (
            <Fragment key={'bars' + index}>
              {/**************     Y-Axis Labels      ************/}
              {barsMapToYAxisSections ? (
                <SvgText
                  x={yAxisLabelWidth - yAxisLabelTextMarginRight}
                  y={stepHeight * (index + 0.5) + yAxisLabelFontSize / 2 - 2}
                  stroke={yAxisLabelColor}
                  fontSize={yAxisLabelFontSize}
                  fontStyle={yAxisLabelFontStyle}
                  fontWeight={yAxisLabelFontWeight}
                  fontFamily={yAxisLabelFontFamily}
                  textAnchor="end">
                  {item.yAxisLabel ?? yAxisLabelTexts[index] ?? ''}
                </SvgText>
              ) : null}

              {/**************     Left Bars      ************/}
              <Rect
                {...leftBarCommonProps}
                fill={item.leftBarColor ?? leftBarColor}
                stroke={item.leftBarBorderColor ?? leftBarBorderColor}
                strokeWidth={leftBorderWidth}
              />
              <ClipPath id={'cp-left' + index}>
                <Rect {...leftBarCommonProps} />
              </ClipPath>
              {/*********   Hide inner border-radius ********/}
              {!allCornersRounded && leftWidth >= leftRadius ? (
                <>
                  <Rect
                    x={leftXAfterMid - leftRadius}
                    y={y}
                    width={leftRadius}
                    height={stepHeight - verticalMarginBetweenBars * 2}
                    fill={item.leftBarColor ?? leftBarColor}
                  />
                  {/*********   work-around for border ********/}
                  {leftBorderWidth ? (
                    <>
                      <Line
                        x1={leftXAfterMid - leftRadius}
                        y1={y}
                        x2={leftXAfterMid}
                        y2={y}
                        stroke={item.leftBarBorderColor ?? leftBarBorderColor}
                        strokeWidth={leftBorderWidth}
                      />
                      <Line
                        x1={leftXAfterMid - leftRadius}
                        y1={y + stepHeight - verticalMarginBetweenBars * 2}
                        x2={leftXAfterMid}
                        y2={y + stepHeight - verticalMarginBetweenBars * 2}
                        stroke={item.leftBarBorderColor ?? leftBarBorderColor}
                        strokeWidth={leftBorderWidth}
                      />
                    </>
                  ) : null}
                </>
              ) : null}

              {/**************     Left Bar Labels      ************/}
              {leftBarLabel !== '' ? (
                <SvgText
                  x={leftLabelX}
                  y={stepHeight * (index + 0.5) + yAxisLabelFontSize / 2 - 2}
                  stroke={item.leftBarLabelColor ?? leftBarLabelColor}
                  fontSize={leftLabelFontSize}
                  fontStyle={
                    item.leftBarLabelFontStyle ?? leftBarLabelFontStyle
                  }
                  fontWeight={
                    item.leftBarLabelFontWeight ?? leftBarLabelFontWeight
                  }
                  fontFamily={
                    item.leftBarLabelFontFamily ?? leftBarLabelFontFamily
                  }
                  textAnchor="start">
                  {leftBarLabelPrefix + leftBarLabel + leftBarLabelSuffix}
                </SvgText>
              ) : null}

              {/**************     Right Bars      ************/}
              <Rect
                {...rightBarCommonProps}
                fill={item.rightBarColor ?? rightBarColor}
                stroke={item.rightBarBorderColor ?? rightBarBorderColor}
                strokeWidth={rightBorderWidth}
              />
              <ClipPath id={'cp-right' + index}>
                <Rect {...rightBarCommonProps} />
              </ClipPath>
              {/*********   Hide inner border-radius ********/}
              {!allCornersRounded && rightWidth >= rightRadius ? (
                <>
                  <Rect
                    x={rightXAfterMid}
                    y={y}
                    width={rightRadius}
                    height={stepHeight - verticalMarginBetweenBars * 2}
                    fill={item.rightBarColor ?? rightBarColor}
                  />
                  {/*********   work-around for border ********/}
                  {rightBorderWidth ? (
                    <>
                      <Line
                        x1={rightXAfterMid}
                        y1={y}
                        x2={rightXAfterMid + rightRadius}
                        y2={y}
                        stroke={item.rightBarBorderColor ?? rightBarBorderColor}
                        strokeWidth={rightBorderWidth}
                      />
                      <Line
                        x1={rightXAfterMid}
                        y1={y + stepHeight - verticalMarginBetweenBars * 2}
                        x2={rightXAfterMid + rightRadius}
                        y2={y + stepHeight - verticalMarginBetweenBars * 2}
                        stroke={item.rightBarBorderColor ?? rightBarBorderColor}
                        strokeWidth={rightBorderWidth}
                      />
                    </>
                  ) : null}
                </>
              ) : null}

              {/**************     Right Bar Labels      ************/}
              {rightBarLabel !== '' ? (
                <SvgText
                  x={rightLabelX}
                  y={stepHeight * (index + 0.5) + yAxisLabelFontSize / 2 - 2}
                  stroke={item.rightBarLabelColor ?? rightBarLabelColor}
                  fontSize={item.rightBarLabelFontSize ?? rightBarLabelFontSize}
                  fontStyle={
                    item.rightBarLabelFontStyle ?? rightBarLabelFontStyle
                  }
                  fontWeight={
                    item.rightBarLabelFontWeight ?? rightBarLabelFontWeight
                  }
                  fontFamily={
                    item.rightBarLabelFontFamily ?? rightBarLabelFontFamily
                  }
                  textAnchor="start">
                  {rightBarLabelPrefix + rightBarLabel + rightBarLabelSuffix}
                </SvgText>
              ) : null}

              {/**************     Left Surplus      ************/}
              {(showSurplus ||
                showSurplusLeft ||
                item.showSurplus ||
                item.showSurplusLeft) &&
              leftSurplusWidth > 0 ? (
                <>
                  <Rect
                    id={'l-spls' + index}
                    x={leftXAfterMid - leftWidth - leftBarBorderWidth / 2}
                    y={y}
                    width={leftSurplusWidth}
                    height={stepHeight - verticalMarginBetweenBars * 2}
                    stroke={
                      item.leftSurplusBorderColor ?? leftSurplusBorderColor
                    }
                    strokeWidth={
                      item.leftSurplusBorderWidth ?? leftSurplusBorderWidth
                    }
                  />
                  <Use
                    fill={item.leftSurplusColor ?? leftSurplusColor}
                    clipPath={'#cp-left' + index}
                    href={'#l-spls' + index}
                  />
                  {/*********      remove inner curve     ********/}
                  {leftSurplusWidth >= leftRadius ? (
                    <>
                      <Rect
                        id={'hide-in-left' + index}
                        x={
                          leftXAfterMid -
                          leftWidth -
                          leftBarBorderWidth +
                          leftSurplusWidth -
                          leftRadius
                        }
                        y={y}
                        width={leftRadius}
                        height={stepHeight - verticalMarginBetweenBars * 2}
                      />
                      <Use
                        fill={item.leftSurplusColor ?? leftSurplusColor}
                        clipPath={`url(#cp-left${index})`}
                        href={'#hide-in-left' + index}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
              {/**************     Right Surplus      ************/}
              {(showSurplus ||
                showSurplusRight ||
                item.showSurplus ||
                item.showSurplusRight) &&
              rightSurplusWidth > 0 ? (
                <>
                  <Rect
                    id={'r-spls' + index}
                    x={
                      rightXAfterMid +
                      rightBarBorderWidth / 2 +
                      rightWidth -
                      rightSurplusWidth
                    }
                    y={y}
                    width={rightSurplusWidth}
                    height={stepHeight - verticalMarginBetweenBars * 2}
                    stroke={
                      item.rightSurplusBorderColor ?? rightSurplusBorderColor
                    }
                    strokeWidth={
                      item.rightSurplusBorderWidth ?? rightSurplusBorderWidth
                    }
                  />
                  <Use
                    fill={item.rightSurplusColor ?? rightSurplusColor}
                    clipPath={'#cp-right' + index}
                    href={'#r-spls' + index}
                  />
                  {/*********       remove inner curve     ********/}
                  {rightSurplusWidth >= rightRadius ? (
                    <>
                      <Rect
                        id={'hide-in-right' + index}
                        x={
                          rightXAfterMid +
                          rightBarBorderWidth / 2 +
                          rightWidth -
                          rightSurplusWidth
                        }
                        y={y}
                        width={rightRadius}
                        height={stepHeight - verticalMarginBetweenBars * 2}
                      />
                      <Use
                        fill={item.rightSurplusColor ?? rightSurplusColor}
                        clipPath={`url(#cp-right${index})`}
                        href={'#hide-in-right' + index}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
            </Fragment>
          );
        })}

        {/**************     Mid Axis      ************/}
        {showMidAxis ? (
          <>
            <Line
              {...midAxisLineCommonProps}
              stroke={
                props.midAxisLeftColor ?? props.midAxisColor ?? yAxisColor
              }
              x1={leftXAfterMid}
              x2={leftXAfterMid}
            />

            <Line
              {...midAxisLineCommonProps}
              stroke={
                props.midAxisRightColor ?? props.midAxisColor ?? yAxisColor
              }
              x1={rightXAfterMid}
              x2={rightXAfterMid}
            />

            {data.map((item, index) => {
              const y = stepHeight * (index + 0.5);
              return (
                <SvgText
                  key={'ml' + index}
                  x={mid}
                  y={y + midAxisLabelFontSize / 2}
                  stroke={item.midAxisLabelColor ?? midAxisLabelColor}
                  fontSize={item.midAxisLabelFontSize ?? midAxisLabelFontSize}
                  fontStyle={
                    item.midAxisLabelFontStyle ?? midAxisLabelFontStyle
                  }
                  fontWeight={
                    item.midAxisLabelFontWeight ?? midAxisLabelFontWeight
                  }
                  fontFamily={
                    item.midAxisLabelFontFamily ?? midAxisLabelFontFamily
                  }
                  textAnchor="middle">
                  {item.midAxisLabel ?? ''}
                </SvgText>
              );
            })}
          </>
        ) : null}
      </Svg>
    </View>
  );
};
