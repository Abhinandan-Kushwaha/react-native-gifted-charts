# Line Chart props

### Basic props

| Prop                | Type           | Description                                                                             | Default value       |
| ------------------- | -------------- | --------------------------------------------------------------------------------------- | ------------------- |
| data                | Array of items | An item object represents a point in the line chart. It is described in the next table. | \_                  |
| data2               | Array of items | Second set of dataPoint for the second line                                             | \_                  |
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

-----
**Alert!**\
These props are correlated:

1. maxValue
2. noOfSections
3. stepValue

They must follow the relation:

```js
maxValue = noOfSections * stepValue
```

So, all the three must be used together. Using any 1 or 2 of them may produce absurd results

-----
### Item description

| Key            | Value type | Description                                                |
| -------------- | ---------- | ---------------------------------------------------------- |
| value          | number     | Value of the item representing representing its position   |
| label          | string     | Label text appearing under the X axis                      |
| labelTextStyle | object     | Style object for the label text appearing under the X axis |
| dataPointText  | string     | Text appearing near the data points                        |
| textShiftX     | number     | To shift the dataPointText text horizontally               |
| textShiftY     | number     | To shift the dataPointText text vertically                 |
| textColor      | ColorValue | Color of the dataPointText                                 |
| textFontSize   | number     | Font size of the dataPointText                             |

### Axes and rules related props

| Prop                   | Type       | Description                                  | Default value |
| ---------------------- | ---------- | -------------------------------------------- | ------------- |
| xAxisColor             | ColorValue | X axis color                                 | black         |
| xAxisThickness         | number     | X axis thickness                             | 1             |
| yAxisColor             | ColorValue | Y axis color                                 | black         |
| yAxisThickness         | number     | Y axis thickness                             | 1             |
| yAxisLabelWidth        | number     | Width of the Y axis Label container          | 35            |
| yAxisTextStyle         | object     | Style object for the Y axis text style       | \_            |
| showFractionalValues   | Boolean    | Allow fractional values for the Y axis label | false         |
| hideYAxisText          | Boolean    | To hide Y axis label text                    | false         |
| rulesColor             | ColorValue | Color of the horizontal rules                | lightgray     |
| rulesThickness         | number     | Thickness of the horizontal rules            | 1             |
| hideRules              | Boolean    | To hide the horizontal rules                 | false         |
| showVerticalLines      | Boolean    | To show vertical lines                       | false         |
| verticalLinesColor     | ColorValue | Color of the vertical lines                  | lightgray     |
| verticallinesThickness | number     | Thickness of the vertical lines              | 1             |
| verticalLinesZIndex    | number     | Z index of the vertical lines                | -1            |
| showXAxisIndices       | Boolean    | To show the pointers on the X axis           | false         |
| xAxisIndicesHeight     | number     | Height of the pointers on the X axis         | 2             |
| xAxisIndicesWidth      | number     | Width of the pointers on the X axis          | 4             |
| xAxisIndicesColor      | ColorValue | Color of the pointers on the X axis          | black         |
| showYAxisIndices       | Boolean    | To show the pointers on the Y axis           | false         |
| yAxisIndicesHeight     | number     | Height of the pointers on the Y axis         | 2             |
| yAxisIndicesWidth      | number     | Width of the pointers on the Y axis          | 4             |
| yAxisIndicesColor      | ColorValue | Color of the pointers on the X axis          | black         |
| yAxisIndicesColor      | Boolean    | To hide axes, rules, labels altogether       | false         |
| rotateLabel            | Boolean    | To rotate the X axis labels (by 60deg)       | false         |

### Line related props

| Prop       | Type       | Description                                                  | Default value          |
| ---------- | ---------- | ------------------------------------------------------------ | ---------------------- |
| color      | ColorValue | Color of the lines joining the data points                   | black                  |
| color1     | ColorValue | Color of the lines joining the first set of data points      | color (from props)     |
| color2     | ColorValue | Color of the lines joining the second set of data points     | color (from props)     |
| thickness  | number     | Thickness of the lines joining the data points               | 2                      |
| thickness1 | number     | Thickness of the lines joining the first set of data points  | thickness (from props) |
| thickness2 | number     | Thickness of the lines joining the second set of data points | thickness (from props) |
| curved     | Boolean    | To show curved line joining the data points                  | false                  |

### Data points related props

| Prop              | Type       | Description                                                                           | Default value |
| ----------------- | ---------- | ------------------------------------------------------------------------------------- | ------------- |
| hideDataPoints    | Boolean    | To hide data points                                                                   | false         |
| dataPointsHeight  | number     | Height of data points (when data points' shape is rectangular)                        | 2             |
| dataPointsWidth   | number     | Width of data points (when data points' shape is rectangular)                         | 2             |
| dataPointsRadius  | number     | Radius of data points (when data points' shape is circular)                           | 3             |
| dataPointsColor   | ColorValue | Color of the data points                                                              | black         |
| dataPointsShape   | string     | Shape of the data points (_'rectangular'_ or _'circular'_)                            | 'circular'    |
| hideDataPoints1   | Boolean    | To hide data points for the first set of data                                         | false         |
| dataPointsHeight1 | number     | Height of data points for the first dataset (when data points' shape is rectangular)  | 2             |
| dataPointsWidth1  | number     | Width of data points for the first dataset (when data points' shape is rectangular)   | 2             |
| dataPointsRadius1 | number     | Radius of data points for the first dataset (when data points' shape is circular)     | 3             |
| dataPointsColor1  | ColorValue | Color of data points for the first dataset                                            | black         |
| dataPointsShape1  | string     | Shape of data points for the first dataset                                            | 'circular'    |
| hideDataPoints2   | Boolean    | To hide data points for the second set of data                                        | false         |
| dataPointsHeight2 | number     | Height of data points for the second dataset (when data points' shape is rectangular) | 2             |
| dataPointsWidth2  | number     | Width of data points for the second dataset (when data points' shape is rectangular)  | 2             |
| dataPointsRadius2 | number     | Radius of data points for the second dataset (when data points' shape is circular)    | 3             |
| dataPointsColor2  | ColorValue | Color of data points for the second dataset                                           | blue          |
| dataPointsShape2  | string     | Shape of data points for the second dataset (_'rectangular'_ or _'circular'_)         | 'circular'    |

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
| gradientDirection | string     | Direction of the gradient (_'horizontal'_ or _'vertical'_)     | 'vertical'    |
````
