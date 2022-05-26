# Line Chart props

### Basic props

| Prop                          | Type           | Description                                                                                        | Default value       |
| ----------------------------- | -------------- | -------------------------------------------------------------------------------------------------- | ------------------- |
| data                          | Array of items | An item object represents a point in the line chart. It is described in the next table.            | \_                  |
| data2                         | Array of items | Second set of dataPoint for the second line                                                        | \_                  |
| data3                         | Array of items | Third set of dataPoint for the third line                                                          | \_                  |
| width                         | number         | Width of the Bar chart                                                                             | width of the parent |
| height                        | number         | Height of the Bar chart (excluding the bottom label)                                               | 200                 |
| maxValue                      | number         | Maximum value shown in the Y axis                                                                  | 200                 |
| minValue | number | Minimum negative value shown in the Y axis (to be used only if the data set has negative values too) | \_ |
| noOfSections                  | number         | Number of sections in the Y axis                                                                   | 10                  |
| noOfSectionsBelowXAxis | number | Number of sections in the Y axis below X axis (in case the data set has negative values too) | 0 |
| stepValue                     | number         | Value of 1 step/section in the Y axis                                                              | 20                  |
| stepHeight                    | number         | Height of 1 step/section in the Y axis                                                             | 20                  |
| spacing                       | number         | Distance between 2 consecutive bars in the Bar chart                                               | 20                  |
| adjustToWidth                 | Boolean        | When set to true, it auto computes the spacing value to fit the Line chart in the available width  | false               |
| backgroundColor               | ColorValue     | Background color of the Bar chart                                                                  | \_                  |
| disableScroll                 | Boolean        | To disable horizontal scroll                                                                       | false               |
| showScrollIndicator           | Boolean        | To show horizontal scroll indicator                                                                | false               |
| isAnimated                    | Boolean        | To show animated Line or Area Chart. Animation occurs when the chart load for the first time       | false               |
| animateOnDataChange           | Boolean        | To show animation on change in data. A smooth transition takes place between the iold and new line | false               |
| onDataChangeAnimationDuration | number         | Duration (milliseconds) in which the transition animation takes place on a change in data          | 400                 |
| scrollToEnd | Boolean | When set to true, the chart automatically scrolls to the rightmost data point | false |
| scrollAnimation | Boolean | When set to true, scroll animation is visible when the chart automatically scrolls to the rightmost data point | true |
| initialSpacing         | number     | distance of the first data point from the Y axis                                      | 40 |

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

| Key                            | Value type | Description                                                                                                                          |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| value                          | number     | Value of the item representing representing its position                                                                             |
| onPress                        | function   | Function called on pressing the bar                                                                                                  |
| label                          | string     | Label text appearing under the X axis                                                                                                |
| labelTextStyle                 | object     | Style object for the label text appearing under the X axis                                                                           |
| labelComponent                 | Function   | custom label component appearing under the X axis                                                                                    |
| yAxisLabelText                 | string     | Y axis label text                                                                                                                    |
| dataPointText                  | string     | Text appearing near the data points                                                                                                  |
| textShiftX                     | number     | To shift the dataPointText text horizontally                                                                                         |
| textShiftY                     | number     | To shift the dataPointText text vertically                                                                                           |
| textColor                      | ColorValue | Color of the dataPointText                                                                                                           |
| textFontSize                   | number     | Font size of the dataPointText                                                                                                       |
| dataPointHeight                | number     | Height of the data point (when data point's shape is rectangular)                                                                    |
| dataPointWidth                 | number     | Width of the data point (when data point's shape is rectangular)                                                                     |
| dataPointRadius                | number     | Radius of the data point (when data points' shape is circular)                                                                       |
| dataPointColor                 | ColorValue | Color of the data point                                                                                                              |
| dataPointShape                 | string     | Shape of the data point (rectangular or circular) defaults to circular                                                               |
| hideDataPoint                  | Boolean    | To hide the data point                                                                                                               |
| showVerticalLine               | Boolean    | When set to true, a vertical line will be displayed along that data point                                                            |
| verticalLineUptoDataPoint      | Boolean    | When set to true, it sets the height of the vertical line upto the corresponding data point                                          |
| verticalLineColor              | ColorValue | Color of the vertical Line displayed along the data point                                                                            |
| verticalLineThickness          | number     | Thickness of the vertical Line displayed along the data point                                                                        |
| dataPointLabelWidth            | number     | width of the label shown beside a data point                                                                                         |
| dataPointLabelShiftX           | number     | horizontal shift of a label from its corresponding data point                                                                        |
| dataPointLabelShiftY           | number     | vertical shift of a label from its corresponding data point                                                                          |
| dataPointLabelComponent        | Function   | custom component rendered above a data point                                                                                         |
| focusedDataPointLabelComponent | Function   | custom component rendered above a data point only when focused/selected (when the user presses)                                      |
| showStrip                      | Boolean    | To show a vertical strip along the data point (even if it's not focused/selected)                                                    |
| stripHeight                    | number     | Height of the vertical strip that becomes visible on pressing the corresponding area of the chart, or when showStrip is set to true  |
| stripWidth                     | number     | Width of the vertical strip that becomes visible on pressing the corresponding area of the chart, or when showStrip is set to true   |
| stripColor                     | ColorValue | Color of the vertical strip that becomes visible on pressing the corresponding area of the chart, or when showStrip is set to true   |
| stripOpacity                   | number     | Opacity of the vertical strip that becomes visible on pressing the corresponding area of the chart, or when showStrip is set to true |
| pointerShiftX                  | number     | Shifts the pointer for that item horizontally by given quantity (used only when pointerConfig prop is passed)                        |
| pointerShiftY                  | number     | Shifts the pointer for that item vertically by given quantity (used only when pointerConfig prop is passed)                          |

**Alert**\
When you are using the `dataPointLabelComponent`, make sure to provide the `dataPointsHeight` and `dataPointsWidth` values too (either in the corresponding item object, or directly as a props of the <LineChart> component). Otherwise the data points might appear shifted from their intended positions.

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
| yAxisTextNumberOfLines | number              | Number of lines for y axis label text                                              | 1                      |
| yAxisLabelContainerStyle | object            | Style object for the Y axis label container                                        | \_                     |
| yAxisOffset            | number              | Starting value on Y Axis                                                           | 0                      |
| horizontalRulesStyle     | object            | Style object for the horizontal rules container                                    | \_                     |
| showFractionalValues   | Boolean             | Allow fractional values for the Y axis label                                       | false                  |
| roundToDigits          | number              | Rounds the y axis values to given number of digits after decimal point             | 1                      |
| yAxisLabelPrefix       | String              | The String prepended to the y axis label text (for example- '$')                   | ''                     |
| yAxisLabelSuffix       | String              | The String appended to the y axis label text                                       | ''                     |
| hideYAxisText          | Boolean             | To hide Y axis label text                                                          | false                  |
| yAxisSide | String | Tells which side of the chart, should the y axis be present, defaults to 'left' | 'left' |
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
| referenceLine3Position | number              | position of third reference line                                                   | containerHeight / 2    |
| showReferenceLine4     | Boolean             | show fourth reference line                                                          | false                  |
| referenceLine4Config   | referenceConfigType | properties of reference line like thickness, color etc (described below the table) | \_                     |
| referenceLine4Position | number              | position of fourth reference line                                                   | containerHeight / 2    |
| showReferenceLine5     | Boolean             | show fifth reference line                                                          | false                  |
| referenceLine5Config   | referenceConfigType | properties of reference line like thickness, color etc (described below the table) | \_                     |
| referenceLine5Position | number              | position of fifth reference line                                                   | containerHeight / 2    |
| showVerticalLines      | Boolean             | To show vertical lines                                                             | false                  |
| verticalLinesUptoDataPoint | Boolean         | To set the height of the vertical lines upto the corresponding data point          | false                  |
| verticalLinesColor     | ColorValue          | Color of the vertical lines                                                        | lightgray              |
| verticallinesThickness | number              | Thickness of the vertical lines                                                    | 1                      |
| verticalLinesHeight    | number              | Height of the vertical lines                                                       | chart height           |
| verticalLinesZIndex    | number              | Z index of the vertical lines                                                      | -1                     |
| noOfVerticalLines      | number              | Number of vertical lines displayed                                                 | data.length            |
| verticalLinesSpacing   | number              | Distance between consecutive vertical lines                                        | spacing                |
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
| xAxisLabelTexts        | Array<string>       | Array of label texts to be displayed below x axis                                  | null                   |
| xAxisLabelTextStyle    | object              | Style of label texts to be displayed below x axis                                  | null                   |
| xAxisTextNumberOfLines | number              | Number of lines for x axis label text                                              | 1                      |
| rotateLabel            | Boolean             | To rotate the X axis labels (by 60deg)                                             | false                  |
| hideOrigin             | Boolean             | To hide the y Axis label at origin (i.e. 0)                                        | false                  |

**Note** If you are setting yAxisSide to 'right', make sure to specify the width of the chart, using the `width` prop

ReferenceConfigType has following properties-

```js
type referenceConfigType = {
  thickness: number,
  width: number,
  color: ColorValue | String | any,
  type: String,
  dashWidth: number,
  dashGap: number,
  labelText: String,
  labelTextStyle: object,
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
| color4     | ColorValue | Color of the lines joining the fourth set of data points     | color (from props)     |
| color5     | ColorValue | Color of the lines joining the fifth set of data points      | color (from props)     |
| thickness  | number     | Thickness of the lines joining the data points               | 2                      |
| thickness1 | number     | Thickness of the lines joining the first set of data points  | thickness (from props) |
| thickness2 | number     | Thickness of the lines joining the second set of data points | thickness (from props) |
| thickness3 | number     | Thickness of the lines joining the third set of data points  | thickness (from props) |
| thickness4 | number     | Thickness of the lines joining the fourth set of data points  | thickness (from props) |
| thickness5 | number     | Thickness of the lines joining the fifth set of data points  | thickness (from props) |
| zIndex1    | number     | zIndex of the lines joining the first set of data points     | 0                      |
| zIndex2    | number     | zIndex of the lines joining the second set of data points    | 0                      |
| zIndex3    | number     | zIndex of the lines joining the third set of data points     | 0                      |
| zIndex4    | number     | zIndex of the lines joining the fourth set of data points    | 0                      |
| zIndex5    | number     | zIndex of the lines joining the fifth set of data points     | 0                      |
| strokeDashArray | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of the lines. Used to render dashed/dotted line chart | undefined |
| strokeDashArray1 | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of line1. Used to render dashed/dotted line chart | undefined OR strokeDashArray |
| strokeDashArray2 | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of line2. Used to render dashed/dotted line chart | undefined OR strokeDashArray |
| strokeDashArray3 | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of line3. Used to render dashed/dotted line chart | undefined OR strokeDashArray |
| strokeDashArray4 | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of line4. Used to render dashed/dotted line chart | undefined OR strokeDashArray |
| strokeDashArray5 | Array<number> | Array of 2 numbers denoting the dashWidth and dashGap of line5. Used to render dashed/dotted line chart | undefined OR strokeDashArray |
| startIndex | number     | Start index for data line (used to display data lines having breaks) | 0              |
| startIndex1 | number     | Start index for data line 1 (used to display data lines having breaks) | 0              |
| startIndex2 | number     | Start index for data line 2 (used to display data lines having breaks) | 0              |
| startIndex3 | number     | Start index for data line 3 (used to display data lines having breaks) | 0              |
| startIndex4 | number     | Start index for data line 4 (used to display data lines having breaks) | 0              |
| startIndex5 | number     | Start index for data line 5 (used to display data lines having breaks) | 0              |
| endIndex | number     | End index for data line (used to display data lines having breaks) | data.length -1        |
| endIndex1 | number     | End index for data line 1 (used to display data lines having breaks) | data.length -1     |
| endIndex2 | number     | End index for data line 2 (used to display data lines having breaks) | data2.length -1    |
| endIndex3 | number     | End index for data line 3 (used to display data lines having breaks) | data3.length -1    |
| endIndex4 | number     | End index for data line 4 (used to display data lines having breaks) | data3.length -1    |
| endIndex5 | number     | End index for data line 5 (used to display data lines having breaks) | data3.length -1    |
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
| hideDataPoints4        | Boolean    | To hide data points for the fourth set of data                                         | false                                     |
| dataPointsHeight4      | number     | Height of data points for the fourth dataset (when data points' shape is rectangular)  | 2                                         |
| dataPointsWidth4       | number     | Width of data points for the fourth dataset (when data points' shape is rectangular)   | 2                                         |
| dataPointsRadius4      | number     | Radius of data points for the fourth dataset (when data points' shape is circular)     | 4                                         |
| dataPointsColor4       | ColorValue | Color of data points for the fourth dataset                                            | red                                       |
| dataPointsShape4       | string     | Shape of data points for the fourth dataset (_'rectangular'_ or _'circular'_)          | 'circular'                                |
| hideDataPoints5        | Boolean    | To hide data points for the fifth set of data                                         | false                                     |
| dataPointsHeight5      | number     | Height of data points for the fifth dataset (when data points' shape is rectangular)  | 2                                         |
| dataPointsWidth5       | number     | Width of data points for the fifth dataset (when data points' shape is rectangular)   | 2                                         |
| dataPointsRadius5      | number     | Radius of data points for the fifth dataset (when data points' shape is circular)     | 5                                         |
| dataPointsColor5       | ColorValue | Color of data points for the fifth dataset                                            | red                                       |
| dataPointsShape5       | string     | Shape of data points for the fifth dataset (_'rectangular'_ or _'circular'_)          | 'circular'                                |
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
| dataPointLabelWidth    | number     | width of the label shown beside a data point                                          | 30                                        |
| dataPointLabelShiftX   | number     | horizontal shift of a label from its corresponding data point                         | 0                                         |
| dataPointLabelShiftY   | number     | vertical shift of a label from its corresponding data point                           | 0                                         |

---

## pointerConfig

pointerConfig is an object, when passed as a prop, creates a magical effect. It lets the user scroll over chart to move the pointer along the chart. Here is an example-

<img src='../../demos/scrollLine.gif' alt='' height=400 width=500/>

To enable such kind of csroll effect, just pass the prop pointerConfig.
The pointerConfig object has following fields-

```js
type Pointer = {
  height?: number; // default: 0
  width?: number; // default: 0
  radius?: number; // default: 5
  pointerColor?: ColorValue; // default: 'red
  pointer1Color?: ColorValue; // default: 'red
  pointer2Color?: ColorValue; // default: 'red
  pointer3Color?: ColorValue; // default: 'red
  pointer4Color?: ColorValue; // default: 'red
  pointer5Color?: ColorValue; // default: 'red
  pointerComponent?: Function; // default: null
  showPointerStrip?: boolean; // default: true
  pointerStripWidth?: number; // default: containerHeight
  pointerStripHeight?: number; // default: 1
  pointerStripColor?: ColorValue; // default: 'black'
  pointerStripUptoDataPoint?: boolean; // default: false
  pointerLabelComponent?: Function; // default: null
  stripOverPointer?: boolean; // default: false
  shiftPointerLabelX?: number; // default: 0
  shiftPointerLabelY?: number; // default: 0
  pointerLabelWidth?: number; // default: 20
  pointerLabelHeight?: number; // default: 20
  autoAdjustPointerLabelPosition?: boolean; // default: true
  pointerVanishDelay?: number; // default: 150
  activatePointersOnLongPress?: boolean; // default: false
  activatePointersDelay?: number; // default: 150
  hidePointer1?: boolean; // default: false
  hidePointer2?: boolean; // default: false
  hidePointer3?: boolean; // default: false
  hidePointer4?: boolean; // default: false
  hidePointer5?: boolean; // default: false
  strokeDashArray?: Array<number>;
};
```

The above properties can be understood with this labelled diagram-
  
<img src='../../demos/rainbow.png' alt='' height=400 width=500/>


**Note** If you are using the `pointerConfig` prop, the scroll will be disabled automatically. This is because, it's difficult to achive both scrolling line and scrolling pointer simultaneously. So if you want to retain the scroll behaviour even after passing the `pointerConfig` prop, then set the property `activatePointersOnLongPress` to true inside the pointerConfig object. This will make the pointers visible only after long press. So, before the long press, user can can scroll the line. Once long pressed, scrolling will be disabled until the release of the long press.
  The duration after which a press event will be considered as long press can be controlled using the `activatePointersDelay` property inside the pointerConfig object. The default value of activatePointersDelay is 150.

The <b>strokeDashArray</b> property lets us render a dashed/dotted strip along the pointer.

#### pointerLabelComponent

<b>pointerLabelComponent</b> is a function that returns the component to be rendered as a Label. It takes a single parameter - an array of items. So, if there are multiple data arrays, the parameter <b>items</b> will have the data item corresponding to each data array.

#### getPointerProps

<b>getPointerProps</b> prop can be used to get the current pointer's index, x and y coordinate values. It is a callback function that accepts a single parameter which is an object. This object has following properties-
1. pointerIndex
2. pointerX
3. pointerY


When the chart is pressed, it returns the index of the data point pressed.<br/>
When the chart is scrolled after pressing, it returns the index of the data point currently focused.<br/>
When the chart is released, it returns the index -1.<br/>


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

Above code changes the pressed data point's color and radius. Since in this example, we are changing the data on the onPress event, the data must be a state variable.

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
| startFillColor4   | ColorValue | Start gradient color for the fourth dataset of the area chart   | gray          |
| endFillColor4     | ColorValue | End gradient color for the fourth dataset of the area chart     | white         |
| startOpacity4     | number     | Start gradient color for the fourth dataset of the area chart   | 1             |
| endOpacity4       | number     | End gradient opacity for the fourth dataset of the area chart   | 1             |
| startFillColor5   | ColorValue | Start gradient color for the fifth dataset of the area chart   | gray          |
| endFillColor5     | ColorValue | End gradient color for the fifth dataset of the area chart     | white         |
| startOpacity5     | number     | Start gradient color for the fifth dataset of the area chart   | 1             |
| endOpacity5       | number     | End gradient opacity for the fifth dataset of the area chart   | 1             |
| gradientDirection | string     | Direction of the gradient (_'horizontal'_ or _'vertical'_)     | 'vertical'    |

---
