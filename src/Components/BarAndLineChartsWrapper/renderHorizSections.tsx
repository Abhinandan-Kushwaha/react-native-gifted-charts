import React from 'react';
import {Text, View} from 'react-native';
import Rule from '../lineSvg';
import {styles} from '../../LineChart/styles';
import {
  AxesAndRulesDefaults,
  chartTypes,
  yAxisSides,
} from '../../utils/constants';
import {
  HorizSectionsType,
  horizSectionPropTypes,
  secondaryYAxisType,
} from '../../utils/types';
import {computeMaxAndMinItems, getLabelTextUtil} from '../../utils';

export const renderHorizSections = (props: horizSectionPropTypes) => {
  const {
    chartType,
    width,
    horizSections: h,
    horizSectionsBelow,
    totalWidth,
    endSpacing,
    yAxisSide,
    horizontalRulesStyle,
    noOfSections,
    stepHeight,
    yAxisLabelWidth,
    yAxisLabelContainerStyle,
    yAxisThickness,
    yAxisColor,
    xAxisThickness,
    xAxisColor,
    xAxisLength,
    xAxisType,
    dashWidth,
    dashGap,
    backgroundColor,
    hideRules,
    rulesLength,
    rulesType,
    rulesThickness,
    rulesColor,
    spacing,
    showYAxisIndices,
    yAxisIndicesHeight,
    yAxisIndicesWidth,
    yAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    showFractionalValues,
    yAxisTextNumberOfLines,
    yAxisLabelPrefix,
    yAxisLabelSuffix,
    yAxisTextStyle,
    rotateYAxisTexts,
    rtl,

    containerHeight,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,

    horizontal,
    yAxisAtTop,

    stepValue,
    roundToDigits,

    secondaryData,
    secondaryYAxis,
  } = props;

  /***********************************************************************************************************************************
   *                                                                                                                                  *
   *****************************               secondary Y Axis related props computations               ******************************
   *                                                                                                                                  *
   ***********************************************************************************************************************************/

  const secondaryYAxisConfig: secondaryYAxisType = {
    noOfSections: secondaryYAxis?.noOfSections ?? noOfSections,
    maxValue: secondaryYAxis?.maxValue,
    minValue: secondaryYAxis?.minValue,
    stepValue: secondaryYAxis?.stepValue,
    stepHeight: secondaryYAxis?.stepHeight,

    showFractionalValues:
      secondaryYAxis?.showFractionalValues ?? showFractionalValues,
    roundToDigits: secondaryYAxis?.roundToDigits ?? roundToDigits,

    showYAxisIndices: secondaryYAxis?.showYAxisIndices ?? showYAxisIndices,
    yAxisIndicesHeight:
      secondaryYAxis?.yAxisIndicesHeight ?? yAxisIndicesHeight,
    yAxisIndicesWidth: secondaryYAxis?.yAxisIndicesWidth ?? yAxisIndicesWidth,
    yAxisIndicesColor: secondaryYAxis?.yAxisIndicesColor ?? yAxisIndicesColor,

    yAxisSide: secondaryYAxis?.yAxisSide ?? yAxisSide,
    yAxisOffset: secondaryYAxis?.yAxisOffset,
    yAxisThickness: secondaryYAxis?.yAxisThickness ?? yAxisThickness,
    yAxisColor: secondaryYAxis?.yAxisColor ?? yAxisColor,
    yAxisLabelContainerStyle:
      secondaryYAxis?.yAxisLabelContainerStyle ?? yAxisLabelContainerStyle,
    yAxisLabelTexts: secondaryYAxis?.yAxisLabelTexts ?? yAxisLabelTexts,
    yAxisTextStyle: secondaryYAxis?.yAxisTextStyle ?? yAxisTextStyle,
    yAxisTextNumberOfLines:
      secondaryYAxis?.yAxisTextNumberOfLines ?? yAxisTextNumberOfLines,
    yAxisLabelWidth: secondaryYAxis?.yAxisLabelWidth ?? yAxisLabelWidth,
    hideYAxisText: secondaryYAxis?.hideYAxisText ?? hideYAxisText,
    yAxisLabelPrefix: secondaryYAxis?.yAxisLabelPrefix ?? yAxisLabelPrefix,
    yAxisLabelSuffix: secondaryYAxis?.yAxisLabelSuffix ?? yAxisLabelSuffix,
    hideOrigin: secondaryYAxis?.hideOrigin ?? hideOrigin,
  };

  const {maxItem, minItem} = computeMaxAndMinItems(
    secondaryData,
    secondaryYAxisConfig.roundToDigits,
    secondaryYAxisConfig.showFractionalValues,
  );
  secondaryYAxisConfig.maxValue =
    secondaryYAxisConfig.maxValue ?? (maxItem || maxValue);
  secondaryYAxisConfig.minValue = secondaryYAxisConfig.maxValue ?? minItem;
  secondaryYAxisConfig.stepValue =
    secondaryYAxisConfig.stepValue ??
    secondaryYAxisConfig.maxValue /
      (secondaryYAxisConfig.noOfSections ?? noOfSections);
  secondaryYAxisConfig.stepHeight =
    secondaryYAxisConfig.stepHeight ||
    containerHeight / (secondaryYAxisConfig.noOfSections ?? noOfSections);

  const horizSections: HorizSectionsType = [];
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i;
    if (showFractionalValues || roundToDigits) {
      value = parseFloat(
        value.toFixed(roundToDigits ?? AxesAndRulesDefaults.roundToDigits),
      );
    }
    horizSections.push({
      value: yAxisLabelTexts?.length
        ? yAxisLabelTexts[noOfSections - i] ?? value.toString()
        : value.toString(),
    });
  }

  const secondaryHorizSections: HorizSectionsType = [];
  if (secondaryYAxis) {
    for (
      let i = 0;
      i <= (secondaryYAxisConfig.noOfSections ?? noOfSections);
      i++
    ) {
      let value = secondaryYAxisConfig.stepValue * i;
      if (
        secondaryYAxisConfig.showFractionalValues ||
        secondaryYAxisConfig.roundToDigits
      ) {
        value = parseFloat(
          value.toFixed(
            secondaryYAxisConfig.roundToDigits ??
              AxesAndRulesDefaults.roundToDigits,
          ),
        );
      }
      secondaryHorizSections.push({
        value: secondaryYAxisConfig.yAxisLabelTexts?.length
          ? secondaryYAxisConfig.yAxisLabelTexts[i] ?? value.toString()
          : value.toString(),
      });
    }
  }

  /***********************************************************************************************************************************
   ***********************************************************************************************************************************/

  let {
    showReferenceLine1,
    referenceLine1Position,
    referenceLine1Config,

    showReferenceLine2,
    referenceLine2Position,
    referenceLine2Config,

    showReferenceLine3,
    referenceLine3Position,
    referenceLine3Config,
  } = referenceLinesConfig;

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: (width || totalWidth - spacing) + endSpacing,
    color: 'black',
    type: rulesType,
    dashWidth: dashWidth,
    dashGap: dashGap,
    labelText: '',
    labelTextStyle: null,
  };

  showReferenceLine1 = referenceLinesConfig.showReferenceLine1 || false;
  referenceLine1Position =
    referenceLinesConfig.referenceLine1Position ??
    (referenceLinesConfig.referenceLine1Position || containerHeight / 2);
  referenceLine1Config = referenceLinesConfig.referenceLine1Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine1Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine1Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine1Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine1Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine1Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine1Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine1Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine1Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  showReferenceLine2 = referenceLinesConfig.showReferenceLine2 || false;
  referenceLine2Position =
    referenceLinesConfig.referenceLine2Position ??
    (referenceLinesConfig.referenceLine2Position || (3 * containerHeight) / 2);
  referenceLine2Config = referenceLinesConfig.referenceLine2Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine2Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine2Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine2Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine2Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine2Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine2Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine2Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine2Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  showReferenceLine3 = referenceLinesConfig.showReferenceLine3 || false;
  referenceLine3Position =
    referenceLinesConfig.referenceLine3Position ??
    (referenceLinesConfig.referenceLine3Position || containerHeight / 3);
  referenceLine3Config = referenceLinesConfig.referenceLine3Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine3Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine3Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine3Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine3Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine3Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine3Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine3Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine3Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  const getLabelTexts = (val, index) => {
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
    );
  };

  const getLabelTextsForSecondaryYAxis = (val, index) => {
    const {
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
    } = secondaryYAxisConfig;
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
    );
  };

  const renderAxesAndRules = (index: number) => (
    <View
      style={[
        index === noOfSections ? styles.lastLeftPart : styles.leftPart,
        {
          borderColor: yAxisColor,
          backgroundColor: backgroundColor,
        },
        yAxisSide === yAxisSides.RIGHT
          ? {borderRightWidth: yAxisThickness}
          : {borderLeftWidth: yAxisThickness},
      ]}>
      {index === noOfSections ? (
        <Rule
          config={{
            thickness: xAxisThickness,
            color: xAxisColor,
            width:
              xAxisLength || (props.width || totalWidth - spacing) + endSpacing,
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
            width:
              rulesLength || (props.width || totalWidth - spacing) + endSpacing,
            dashWidth: dashWidth,
            dashGap: dashGap,
            type: rulesType,
          }}
        />
      )}
      {showYAxisIndices && index !== noOfSections ? (
        <View
          style={{
            height: yAxisIndicesHeight,
            width: yAxisIndicesWidth,
            left:
              yAxisIndicesWidth / -2 +
              (yAxisSide === yAxisSides.RIGHT
                ? (width ?? totalWidth) +
                  yAxisLabelWidth / 2 +
                  yAxisIndicesWidth / 4
                : 0),
            backgroundColor: yAxisIndicesColor,
          }}
        />
      ) : null}
    </View>
  );

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: (width ?? totalWidth) + endSpacing}}>
        {horizSections.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (width ?? totalWidth) + endSpacing,
                },
                horizontal &&
                  !yAxisAtTop && {
                    transform: [{rotateY: '180deg'}],
                  },
                horizontalRulesStyle,
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
                  },
                  yAxisLabelContainerStyle,
                ]}
              />
              {renderAxesAndRules(index)}
            </View>
          );
        })}

        {
          /***********************************************************************************************/
          /**************************      Render the y axis labels separately      **********************/
          /***********************************************************************************************/

          !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              let label = getLabelTexts(sectionItems.value, index);
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
                    yAxisSide === yAxisSides.RIGHT && {
                      left: (width ?? totalWidth) + yAxisLabelWidth / 2,
                    },
                    horizontal &&
                      !yAxisAtTop && {
                        transform: [
                          {
                            translateX: (width ?? totalWidth) - 30 + endSpacing,
                          },
                        ],
                      },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      horizontal && {
                        transform: [
                          {
                            rotate: `${
                              rotateYAxisTexts ?? (rtl ? 90 : -90)
                            }deg`,
                          },
                        ],
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
                  width: (width ?? totalWidth) + 15,
                },
                index === 0 && {marginTop: stepHeight / 2},
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
                    width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
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
                      width:
                        rulesLength ||
                        (props.width || totalWidth - spacing) + endSpacing,
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

          !hideYAxisText &&
            horizSectionsBelow.map((sectionItems, index) => {
              let label = getLabelTexts(
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
                      bottom: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === yAxisSides.RIGHT && {
                      left: (width ?? totalWidth) + yAxisLabelWidth,
                    },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
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

          !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              // let label = getLabelTexts(sectionItems.value, index);
              // if (hideOrigin && index === horizSections.length - 1) {
              //   label = '';
              // }
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
                  ]}>
                  {index === noOfSections && showReferenceLine1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          ((referenceLine1Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine1Config} />
                      {referenceLine1Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
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
                          ((referenceLine2Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine2Config} />
                      {referenceLine2Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
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
                          ((referenceLine3Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine3Config} />
                      {referenceLine3Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
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
      </View>
      {
        /***********************************************************************************************/
        /*************************      Render the secondary Y Axis                *********************/
        /***********************************************************************************************/
        secondaryYAxis && (
          <View
            style={{
              width: secondaryYAxisConfig.yAxisLabelWidth,
              left: width
                ? yAxisLabelWidth
                : yAxisLabelWidth - (chartType === chartTypes.BAR ? 4 : 16),
              borderColor: secondaryYAxisConfig.yAxisColor,
              borderLeftWidth: secondaryYAxisConfig.yAxisThickness,
            }}>
            {!secondaryYAxisConfig.hideYAxisText &&
              secondaryHorizSections.map((sectionItems, index) => {
                let label = getLabelTextsForSecondaryYAxis(
                  sectionItems.value,
                  index,
                );
                if (
                  secondaryYAxisConfig.hideOrigin &&
                  index === secondaryHorizSections.length - 1
                ) {
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
                        bottom:
                          (secondaryYAxisConfig.stepHeight ?? 0) *
                          (index - 0.5),
                        width: secondaryYAxisConfig.yAxisLabelWidth,
                        height: secondaryYAxisConfig.stepHeight ?? 0,
                      },
                      yAxisLabelContainerStyle,
                    ]}>
                    {secondaryYAxisConfig.showYAxisIndices && index !== 0 ? (
                      <View
                        style={{
                          height: secondaryYAxisConfig.yAxisIndicesHeight,
                          width: secondaryYAxisConfig.yAxisIndicesWidth,
                          position: 'absolute',
                          left:
                            (secondaryYAxisConfig.yAxisIndicesWidth ?? 0) / -2,
                          backgroundColor:
                            secondaryYAxisConfig.yAxisIndicesColor,
                        }}
                      />
                    ) : null}
                    <Text
                      numberOfLines={
                        secondaryYAxisConfig.yAxisTextNumberOfLines
                      }
                      ellipsizeMode={'clip'}
                      style={[secondaryYAxisConfig.yAxisTextStyle]}>
                      {label}
                    </Text>
                  </View>
                );
              })}
          </View>
        )
      }
    </View>
  );
};
