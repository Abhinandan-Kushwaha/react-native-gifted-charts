import React from 'react';
import {Text, View} from 'react-native';
import Rule from '../lineSvg';
import {styles} from '../../LineChart/styles';

export const renderHorizSections = props => {
  const {
    width,
    horizSections,
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

    containerHeight,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,
    hideAxesAndRules,

    horizontal,
    yAxisAtTop,
  } = props;



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
    referenceLinesConfig.referenceLine1Position ?? (referenceLinesConfig.referenceLine1Position || containerHeight / 2);
   referenceLine1Config = referenceLinesConfig.referenceLine1Config
    ? {
        thickness: referenceLinesConfig.referenceLine1Config.thickness || defaultReferenceConfig.thickness,
        width:
          (referenceLinesConfig.referenceLine1Config.width ?? defaultReferenceConfig.width),
        color: referenceLinesConfig.referenceLine1Config.color || defaultReferenceConfig.color,
        type: referenceLinesConfig.referenceLine1Config.type || defaultReferenceConfig.type,
        dashWidth: referenceLinesConfig.referenceLine1Config.dashWidth || defaultReferenceConfig.dashWidth,
        dashGap: referenceLinesConfig.referenceLine1Config.dashGap || defaultReferenceConfig.dashGap,
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
    referenceLinesConfig.referenceLine2Position ?? (referenceLinesConfig.referenceLine2Position || (3 * containerHeight) / 2);
   referenceLine2Config = referenceLinesConfig.referenceLine2Config
    ? {
        thickness: referenceLinesConfig.referenceLine2Config.thickness || defaultReferenceConfig.thickness,
        width:
          (referenceLinesConfig.referenceLine2Config.width ?? defaultReferenceConfig.width),
        color: referenceLinesConfig.referenceLine2Config.color || defaultReferenceConfig.color,
        type: referenceLinesConfig.referenceLine2Config.type || defaultReferenceConfig.type,
        dashWidth: referenceLinesConfig.referenceLine2Config.dashWidth || defaultReferenceConfig.dashWidth,
        dashGap: referenceLinesConfig.referenceLine2Config.dashGap || defaultReferenceConfig.dashGap,
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
    referenceLinesConfig.referenceLine3Position ?? (referenceLinesConfig.referenceLine3Position || containerHeight / 3);
   referenceLine3Config = referenceLinesConfig.referenceLine3Config
    ? {
        thickness: referenceLinesConfig.referenceLine3Config.thickness || defaultReferenceConfig.thickness,
        width:
          (referenceLinesConfig.referenceLine3Config.width ?? defaultReferenceConfig.width),
        color: referenceLinesConfig.referenceLine3Config.color || defaultReferenceConfig.color,
        type: referenceLinesConfig.referenceLine3Config.type || defaultReferenceConfig.type,
        dashWidth: referenceLinesConfig.referenceLine3Config.dashWidth || defaultReferenceConfig.dashWidth,
        dashGap: referenceLinesConfig.referenceLine3Config.dashGap || defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine3Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine3Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;



  const getLabel = (val, index) => {
    let label = '';
    if (
      showFractionalValues ||
      (yAxisLabelTexts && yAxisLabelTexts[index] !== undefined)
    ) {
      if (val) {
        label = yAxisOffset ? (Number(val) + yAxisOffset).toString() : val;
      } else {
        label = yAxisOffset ? yAxisOffset.toString() : '0';
      }
    } else {
      if (val) {
        label = val.toString().split('.')[0];
        if (yAxisOffset) {
          label = (Number(label) + yAxisOffset).toString();
        }
      } else {
        label = yAxisOffset ? yAxisOffset.toString() : '0';
      }
    }

    return yAxisLabelPrefix + label + yAxisLabelSuffix;
  };
  return (
    <>
      {hideAxesAndRules !== true &&
        horizSections.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (props.width ? props.width : totalWidth) + endSpacing,
                },
                ((horizontal && !yAxisAtTop)) && {
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
                    width: yAxisSide === 'right' ? 0 : yAxisLabelWidth,
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
                    borderColor: yAxisColor,
                    backgroundColor: backgroundColor,
                  },
                  yAxisSide === 'right' ? {borderRightWidth: yAxisThickness} : {borderLeftWidth: yAxisThickness}
                ]}>
                {index === noOfSections ? (
                  <Rule
                    config={{
                      thickness: xAxisThickness,
                      color: xAxisColor,
                      width:
                        xAxisLength ||
                        (props.width || totalWidth - spacing) + endSpacing,
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
                        rulesLength ||
                        (props.width || totalWidth - spacing) + endSpacing,
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
                      left: yAxisIndicesWidth / -2 + (yAxisSide === 'right' ? (width + yAxisLabelWidth/2 + yAxisIndicesWidth/4) : 0),
                      backgroundColor: yAxisIndicesColor,
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
        hideAxesAndRules !== true &&
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
                  yAxisSide === 'right' && {left: width + yAxisLabelWidth/2},
                  ((horizontal && !yAxisAtTop)) && {
                    transform: [
                      {
                        translateX:
                          (props.width ? props.width : totalWidth) -
                          30 +
                          endSpacing,
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
                    ((horizontal && !yAxisAtTop)) && {
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
                  width: yAxisSide === 'right' ? 0 : yAxisLabelWidth,
                },
                index === 0 && {marginTop: -stepHeight / 2},
              ]}
            />
            <View style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
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
        hideAxesAndRules !== true &&
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
                  yAxisSide === 'right' && {left: width + yAxisLabelWidth},
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
        hideAxesAndRules !== true &&
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
                ]}>
                {index === noOfSections && showReferenceLine1 ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom:
                        (referenceLine1Position * containerHeight) / maxValue,
                      left: yAxisSide==='right'? 0 : yAxisLabelWidth + yAxisThickness,
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
                        (referenceLine2Position * containerHeight) / maxValue,
                      left: yAxisSide==='right'? 0 : yAxisLabelWidth + yAxisThickness,
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
                        (referenceLine3Position * containerHeight) / maxValue,
                      left: yAxisSide==='right'? 0 : yAxisLabelWidth + yAxisThickness,
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
    </>
  );
};
