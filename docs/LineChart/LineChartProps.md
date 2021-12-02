# Line Chart props

### Basic props

| Prop                | Type           | Description                                                                             | Default value       |
| ------------------- | -------------- | --------------------------------------------------------------------------------------- | ------------------- |
| data                | Array of items | An item object represents a point in the line chart. It is described in the next table. | \_                  |
| data2               | Array of items | Second set of dataPoint for the second line                                             | \_                  |
| data3               | Array of items | Third set of dataPoint for the third line                                               | \_                  |
| width               | number         | Width of the Bar chart                                                                  | width of the parent |
| height              | number         | Height of the Bar chart (excluding the bottom label)                                    | 200                 |
| maxValue            | number         | Maximum value shown in the Y axis                                                       | 200                 |
| noOfSections        | number         | Number of sections in the Y axis                                                        | 10                  |
| stepValue           | number         | Value of 1 step/section in the Y axis                                                   | 20                  |
| stepHeight          | number         | Height of 1 step/section in the Y axis                                                  | 20                  |
| spacing             | number         | Distance between 2 consecutive bars in the Bar chart                                    | 20                  |
| backgroundColor     | ColorValue     | Background color of the Bar chart                                                       | \_                  |
| disableScroll       | Boolean        | To disable horizontal scroll                                                            | false               |
| showScrollIndicator | Boolean        | To show horizontal scroll indicator                                                     | false               |
| isAnimated          | Boolean        | To show animates Line or Area Chart. Animation occurs onLoad and on value change        | false               |

---

**Alert!**\
These props are correlated:

1. maxValue
2. noOfSections
3. stepValue

They must follow the relation:

```js
maxValue = noOfSections * stepValue;
```

So, all the three must be used together. Using any 1 or 2 of them may produce absurd results

---

### Item description

| Key                   | Value type | Description                                                               |
| --------------------- | ---------- | ------------------------------------------------------------------------- |
| value                 | number     | Value of the item representing representing its position                  |
| label                 | string     | Label text appearing under the X axis                                     |
| labelTextStyle        | object     | Style object for the label text appearing under the X axis                |
| yAxisLabelText        | string     | Y axis label text                                                         |
| dataPointText         | string     | Text appearing near the data points                                       |
| textShiftX            | number     | To shift the dataPointText text horizontally                              |
| textShiftY            | number     | To shift the dataPointText text vertically                                |
| textColor             | ColorValue | Color of the dataPointText                                                |
| textFontSize          | number     | Font size of the dataPointText                                            |
| showDataPoint         | Boolean    | To show data point for the particular item                                |
| dataPointHeight       | number     | Height of the data point (when data point's shape is rectangular)         |
| dataPointWidth        | number     | Width of the data point (when data point's shape is rectangular)          |
| dataPointRadius       | number     | Radius of the data point (when data points' shape is circular)            |
| dataPointColor        | ColorValue | Color of the data point                                                   |
| dataPointShape        | string     | Shape of the data point (rectangular or circular) defaults to circular    |
| showVerticalLine      | Boolean    | When set to true, a vertical line will be displayed along that data point |
| verticalLineColor     | ColorValue | Color of the vertical Line displayed along the data point                 |
| verticalLineThickness | number     | Thickness of the vertical Line displayed along the data point             |

**Alert!**\
If you are adding showDataPoint to an item, you must set hideDataPoints prop to true

---

### Axes and rules related props

| Prop                   | Type                | Description                                                                        | Default value          |
| ---------------------- | ------------------- | ---------------------------------------------------------------------------------- | ---------------------- |
| xAxisColor             | ColorValue          | X axis color                                                                       | black                  |
| xAxisThickness         | number              | X axis thickness                                                                   | 1                      |
| yAxisColor             | ColorValue          | Y axis color                                                                       | black                  |
| yAxisThickness         | number              | Y axis thickness                                                                   | 1                      |
| yAxisLabelWidth        | number              | Width of the Y axis Label container                                                | 35                     |
| yAxisTextStyle         | object              | Style object for the Y axis text style                                             | \_                     |
| showFractionalValues   | Boolean             | Allow fractional values for the Y axis label                                       | false                  |
| roundToDigits          | number              | Rounds the y axis values to given number of digits after decimal point             | 1                      |
| hideYAxisText          | Boolean             | To hide Y axis label text                                                          | false                  |
| rulesColor             | ColorValue          | Color of the horizontal rules                                                      | lightgray              |
| rulesThickness         | number              | Thickness of the horizontal rules                                                  | 1                      |
| hideRules              | Boolean             | To hide the horizontal rules                                                       | false                  |
| rulesType              | String              | solid or dotted/dashed                                                             | solid                  |
| dashWidth              | number              | width of each dash                                                                 | 4                      |
| dashGap                | number              | gap between 2 dashes                                                               | 8                      |
| showReferenceLine1     | Boolean             | show reference line                                                                | false                  |
| referenceLine1Config   | referenceConfigType | properties of reference line like thickness, color etc (described below the table) | \_                     |
| referenceLine1Position | number              | position of reference line                                                         | containerHeight / 2    |
| showReferenceLine2     | Boolean             | show second reference line                                                         | false                  |
| referenceLine2Config   | referenceConfigType | properties of reference line like thickness, color etc (described below the table) | \_                     |
| referenceLine2Position | number              | position of second reference line                                                  | 3\*containerHeight / 2 |
| showReferenceLine3     | Boolean             | show third reference line                                                          | false                  |
| referenceLine3Config   | referenceConfigType | properties of reference line like thickness, color etc (described below the table) | \_                     |
| referenceLine3Position | number              | position of third reference line                                                   | containerHeight / 3    |
| showVerticalLines      | Boolean             | To show vertical lines                                                             | false                  |
| verticalLinesColor     | ColorValue          | Color of the vertical lines                                                        | lightgray              |
| verticallinesThickness | number              | Thickness of the vertical lines                                                    | 1                      |
| verticalLinesZIndex    | number              | Z index of the vertical lines                                                      | -1                     |
| showXAxisIndices       | Boolean             | To show the pointers on the X axis                                                 | false                  |
| xAxisIndicesHeight     | number              | Height of the pointers on the X axis                                               | 2                      |
| xAxisIndicesWidth      | number              | Width of the pointers on the X axis                                                | 4                      |
| xAxisIndicesColor      | ColorValue          | Color of the pointers on the X axis                                                | black                  |
| showYAxisIndices       | Boolean             | To show the pointers on the Y axis                                                 | false                  |
| yAxisIndicesHeight     | number              | Height of the pointers on the Y axis                                               | 2                      |
| yAxisIndicesWidth      | number              | Width of the pointers on the Y axis                                                | 4                      |
| yAxisIndicesColor      | ColorValue          | Color of the pointers on the X axis                                                | black                  |
| yAxisIndicesColor      | Boolean             | To hide axes, rules, labels altogether                                             | false                  |
| yAxisLabelTexts        | Array<string>       | Array of label texts to be displayed along y axis                                  | null                   |
| rotateLabel            | Boolean             | To rotate the X axis labels (by 60deg)                                             | false                  |
| hideOrigin             | Boolean             | To hide the y Axis label at origin (i.e. 0)                                        | false                  |

ReferenceConfigType has following properties-

```js
type referenceConfigType = {
  thickness: number,
  width: number,
  color: ColorValue | String | any,
  type: String,
  dashWidth: number,
  dashGap: number,
};
```

---

### Line related props

| Prop       | Type       | Description                                                  | Default value          |
| ---------- | ---------- | ------------------------------------------------------------ | ---------------------- |
| color      | ColorValue | Color of the lines joining the data points                   | black                  |
| color1     | ColorValue | Color of the lines joining the first set of data points      | color (from props)     |
| color2     | ColorValue | Color of the lines joining the second set of data points     | color (from props)     |
| color3     | ColorValue | Color of the lines joining the third set of data points      | color (from props)     |
| thickness  | number     | Thickness of the lines joining the data points               | 2                      |
| thickness1 | number     | Thickness of the lines joining the first set of data points  | thickness (from props) |
| thickness2 | number     | Thickness of the lines joining the second set of data points | thickness (from props) |
| thickness3 | number     | Thickness of the lines joining the third set of data points  | thickness (from props) |
| curved     | Boolean    | To show curved line joining the data points                  | false                  |

---

### Data points related props

| Prop                   | Type       | Description                                                                           | Default value                             |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------- | ----------------------------------------- |
| hideDataPoints         | Boolean    | To hide data points                                                                   | false                                     |
| dataPointsHeight       | number     | Height of data points (when data points' shape is rectangular)                        | 2                                         |
| dataPointsWidth        | number     | Width of data points (when data points' shape is rectangular)                         | 2                                         |
| dataPointsRadius       | number     | Radius of data points (when data points' shape is circular)                           | 3                                         |
| dataPointsColor        | ColorValue | Color of the data points                                                              | black                                     |
| dataPointsShape        | string     | Shape of the data points (_'rectangular'_ or _'circular'_)                            | 'circular'                                |
| hideDataPoints1        | Boolean    | To hide data points for the first set of data                                         | false                                     |
| dataPointsHeight1      | number     | Height of data points for the first dataset (when data points' shape is rectangular)  | 2                                         |
| dataPointsWidth1       | number     | Width of data points for the first dataset (when data points' shape is rectangular)   | 2                                         |
| dataPointsRadius1      | number     | Radius of data points for the first dataset (when data points' shape is circular)     | 3                                         |
| dataPointsColor1       | ColorValue | Color of data points for the first dataset                                            | black                                     |
| dataPointsShape1       | string     | Shape of data points for the first dataset                                            | 'circular'                                |
| hideDataPoints2        | Boolean    | To hide data points for the second set of data                                        | false                                     |
| dataPointsHeight2      | number     | Height of data points for the second dataset (when data points' shape is rectangular) | 2                                         |
| dataPointsWidth2       | number     | Width of data points for the second dataset (when data points' shape is rectangular)  | 2                                         |
| dataPointsRadius2      | number     | Radius of data points for the second dataset (when data points' shape is circular)    | 3                                         |
| dataPointsColor2       | ColorValue | Color of data points for the second dataset                                           | blue                                      |
| dataPointsShape2       | string     | Shape of data points for the second dataset (_'rectangular'_ or _'circular'_)         | 'circular'                                |
| hideDataPoints3        | Boolean    | To hide data points for the third set of data                                         | false                                     |
| dataPointsHeight3      | number     | Height of data points for the third dataset (when data points' shape is rectangular)  | 2                                         |
| dataPointsWidth3       | number     | Width of data points for the third dataset (when data points' shape is rectangular)   | 2                                         |
| dataPointsRadius3      | number     | Radius of data points for the third dataset (when data points' shape is circular)     | 3                                         |
| dataPointsColor3       | ColorValue | Color of data points for the third dataset                                            | red                                       |
| dataPointsShape3       | string     | Shape of data points for the third dataset (_'rectangular'_ or _'circular'_)          | 'circular'                                |
| focusedDataPointShape  | String     | Shape of the data points when focused due to press event                              | item.dataPointsShape OR dataPointsShape   |
| focusedDataPointWidth  | number     | Width of the data points when focused due to press event                              | item.dataPointsWidth OR dataPointsWidth   |
| focusedDataPointHeight | number     | Height of the data points when focused due to press event                             | item.dataPointsHeight OR dataPointsHeight |
| focusedDataPointColor  | ColorValue | Color of the data points when focused due to press event                              | item.dataPointsColor OR dataPointsColor   |
| focusedDataPointRadius | number     | Radius of the data points when focused due to press event                             | item.dataPointsRadius OR dataPointsRadius |
| focusedCustomDataPoint | Function   | Custom data point when focused due to press event                                     | item.customDataPoint OR customDataPoint   |
| textColor              | ColorValue | Color of the dataPointText                                                            | 'black'                                   |
| textFontSize           | number     | Font size of the dataPointText                                                        | \_                                        |
| textShiftX             | number     | To shift the dataPointText text horizontally                                          | 0                                         |
| textShiftY             | number     | To shift the dataPointText text vertically                                            | 0                                         |
| customDataPoint        | Function   | A callback function to render a custom component as the data points                   | \_                                        |

---

### onPress and strip related props

Line or Area charts can be made interactive by allowing users to press on the chart and highlight that particular data point. For example-

  <img src='../../demos/focusPoint.gif' alt='' height=450 width=300/>

To achieve this the `pressEnabled` props must be set to true. In addition, use below props like `focusedDataPointShape`, `focusedDataPointColor`, `focusedDataPointRadius` to focus the pressed data point. The prop `onPress` can be used to pass a function that will be called when the press event is triggered.

| Prop                   | Type       | Description                                                                                                | Default value                             |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| pressEnabled           | Boolean    | If set true, allows users to press on the chart (press event can be then handled using the `onPress` prop) | false                                     |
| showDataPointOnPress   | Boolean    | If set true, it shows the data point corresponding to the pressed area of the chart                        | false                                     |
| showStripOnPress       | Boolean    | If set true, it shows a vertical strip corresponding to the pressed area of the chart                      | false                                     |
| showTextOnPress        | Boolean    | If set true, it shows the data point text corresponding to the pressed area of the chart                   | false                                     |
| stripHeight            | number     | Height of the vertical strip that becomes visible on pressing the corresponding area of the chart          | height of the data point                  |
| stripWidth             | number     | Width of the vertical strip that becomes visible on pressing the corresponding area of the chart           | 2                                         |
| stripColor             | ColorValue | Color of the vertical strip that becomes visible on pressing the corresponding area of the chart           | color of the line                         |
| stripOpacity           | number     | Opacity of the vertical strip that becomes visible on pressing the corresponding area of the chart         | (startOpacity+endOpacity)/2               |
| onPress                | Function   | The callback function that handles the press event. `item` and `index` are received as props               | \_                                        |
| unFocusOnPressOut      | Boolean    | If set true, it unselects/unfocuses the focused/selected data point                                        | true                                      |
| delayBeforeUnFocus     | number     | Delay (in milliseconds) between the release of the press and ghe unfocusing of the data point              | 300                                       |
| focusedDataPointShape  | String     | Shape of the data points when focused due to press event                                                   | item.dataPointsShape OR dataPointsShape   |
| focusedDataPointWidth  | number     | Width of the data points when focused due to press event                                                   | item.dataPointsWidth OR dataPointsWidth   |
| focusedDataPointHeight | number     | Height of the data points when focused due to press event                                                  | item.dataPointsHeight OR dataPointsHeight |
| focusedDataPointColor  | ColorValue | Color of the data points when focused due to press event                                                   | item.dataPointsColor OR dataPointsColor   |
| focusedDataPointRadius | number     | Radius of the data points when focused due to press event                                                  | item.dataPointsRadius OR dataPointsRadius |
| focusedCustomDataPoint | Function   | Custom data point when focused due to press event                                                          | item.customDataPoint OR customDataPoint   |

#### Example of onPress :

```js
onPress={(item, index) => {
    Alert.alert(item.value)
}}
```

Above code changes the pressed data point's color and radius. Since in this example, we are changing the data on th onPress event, the data must be a state variable.

---

### Props for Area Chart

| Prop              | Type       | Description                                                    | Default value |
| ----------------- | ---------- | -------------------------------------------------------------- | ------------- |
| areaChart         | Boolean    | If set true, renders area chart instead of line chart          | false         |
| startFillColor    | ColorValue | Start gradient color for the area chart                        | gray          |
| endFillColor      | ColorValue | End gradient color for the area chart                          | white         |
| startOpacity      | number     | Start gradient opacity for the area chart                      | 1             |
| endOpacity        | number     | End gradient opacity for the area chart                        | 1             |
| startFillColor1   | ColorValue | Start gradient color for the first dataset of the area chart   | gray          |
| endFillColor1     | ColorValue | End gradient color for the first dataset of the area chart     | white         |
| startOpacity1     | number     | Start gradient opacity for the first dataset of the area chart | 1             |
| endOpacity1       | number     | End gradient opacity for the first dataset of the area chart   | 1             |
| startFillColor2   | ColorValue | Start gradient color for the second dataset of the area chart  | gray          |
| endFillColor2     | ColorValue | End gradient color for the second dataset of the area chart    | white         |
| startOpacity2     | number     | Start gradient color for the second dataset of the area chart  | 1             |
| endOpacity2       | number     | End gradient opacity for the second dataset of the area chart  | 1             |
| startFillColor3   | ColorValue | Start gradient color for the third dataset of the area chart   | gray          |
| endFillColor3     | ColorValue | End gradient color for the third dataset of the area chart     | white         |
| startOpacity3     | number     | Start gradient color for the third dataset of the area chart   | 1             |
| endOpacity3       | number     | End gradient opacity for the third dataset of the area chart   | 1             |
| gradientDirection | string     | Direction of the gradient (_'horizontal'_ or _'vertical'_)     | 'vertical'    |

---
