# Bubble Chart props

## \[WIP\] Development of Bubble chart is in progress.

Document might be inaccurate. Expect fast revisions/changes.

**Note:** The props of Bubble chart are similar to those of Line chart. The `r` in the data array is analagous to `bubbleRadius` in the Line chart.

### Basic props

| Prop                | Type             | Description                                                                                                              | Default value       |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| data                | bubbleDataItem[] | Array of items representing bubbles on the chart. Each item is described in the `bubbleDataItem` table.                  | \_                  |
| width               | number           | Width of the Bubble chart.                                                                                               | width of the parent |
| height              | number           | Height of the Bubble chart (excluding X‑axis labels).                                                                    | 200                 |
| opacity             | number           | Opacity of the bubbles                                                                                                   | 0.8                 |
| yNoOfSections       | number           | Number of sections in the Y axis (above X axis).                                                                         | 10                  |
| ySectionColors      | ColorValue[]     | Background colors of the horizontal sections of the chart.                                                               | backgroundColor     |
| maxY                | number           | Maximum Y value shown on the Y axis.                                                                                     | 200                 |
| mostNegativeY       | number           | Most negative Y value shown on the Y axis (when your data has negative values).                                          | \_                  |
| yStepHeight         | number           | Height (in px) of one section of the Y axis.                                                                             | 20                  |
| yStepValue          | number           | Value represented by a single section of the Y axis.                                                                     | 20                  |
| yNegativeStepValue  | number           | Value of one section of the Y axis for negative values.                                                                  | yStepValue          |
| showFractionalYAxis | boolean          | When true, allows fractional values on the Y axis.                                                                       | false               |
| yRoundToDigits      | number           | Number of decimal digits to which Y axis values are rounded.                                                             | 1                   |
| xNoOfSections       | number           | Number of sections in the X axis.                                                                                        | \_                  |
| maxX                | number           | Maximum X value shown on the X axis.                                                                                     | \_                  |
| mostNegativeX       | number           | Most negative X value shown on the X axis (when your data has negative values).                                          | \_                  |
| xStepHeight         | number           | Height (in px) of one section of the X axis.                                                                             | \_                  |
| xStepValue          | number           | Value represented by a single section of the X axis.                                                                     | \_                  |
| showFractionalXAxis | boolean          | When true, allows fractional values on the X axis.                                                                       | false               |
| xRoundToDigits      | number           | Number of decimal digits to which X axis values are rounded.                                                             | 1                   |
| spacing             | number           | Horizontal distance between 2 consecutive bubbles.                                                                       | 50                  |
| initialSpacing      | number           | Distance of the first bubble from the Y axis.                                                                            | 20                  |
| endSpacing          | number           | Padding/distance added at the end of the chart after the last bubble.                                                    | 20                  |
| backgroundColor     | ColorValue       | Background color of the chart.                                                                                           | \_                  |
| customBackground    | CustomBackground | Object used to set a custom background component.                                                                        | \_                  |
| parentWidth         | number           | Explicit width of the parent container (helps with layout/calculations).                                                 | \_                  |
| onlyPositive        | boolean          | When true, converts negative values to 0 while plotting.                                                                 | false               |
| labelsExtraHeight   | number           | Extra height reserved for X‑axis labels.                                                                                 | 0                   |
| adjustToWidth       | boolean          | Auto‑computes `spacing` to fit the chart in the available width.                                                         | false               |
| scatterChart        | boolean          | Scatter chart is similar to bubble chart, it just positions the bubble labels above the data point, instead of inside it | false               |

---

## Item description (`bubbleDataItem`)

Each element of the `data` array is a `bubbleDataItem`:

| Key                         | Value type                | Description                                                                                                                                                                                                                      |
| --------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| y                           | number                    | Y value of the bubble representing its vertical position                                                                                                                                                                         |
| label                       | string                    | Label text appearing inside the bubbles bubble.                                                                                                                                                                                  |
| labelTextStyle              | StyleProp<TextStyle>      | Style object for the primary label text.                                                                                                                                                                                         |
| labelComponent              | Function                  | Custom label component rendered inside the bubbles axis.                                                                                                                                                                         |
| formatBubbleLabel           | (label: string) => string | Callback that receives and returns a formatted bubble label.                                                                                                                                                                     |
| secondaryLabel              | string                    | Label text appearing above the secondary X‑axis (top) for this bubble.                                                                                                                                                           |
| secondaryLabelComponent     | Function                  | Custom component for the secondary label.                                                                                                                                                                                        |
| secondaryLabelTextStyle     | StyleProp<TextStyle>      | Style of the secondary label text.                                                                                                                                                                                               |
| spacing                     | number                    | Distance between this bubble and the next bubble.                                                                                                                                                                                |
| hideBubble                  | boolean                   | Hides this bubble while keeping other ones visible.                                                                                                                                                                              |
| bubbleHeight                | number                    | Height of this bubble when rectangular.                                                                                                                                                                                          |
| bubbleWidth                 | number                    | Width of this bubble when rect                                                                                                                                                                                                   |
| r                           | number                    | Radius of this bubble when circular (alternative to `bubbleRadius`).                                                                                                                                                             |
| bubbleColor                 | string                    | Color of this bubble only.                                                                                                                                                                                                       |
| bubbleShape                 | string                    | Shape of this bubble only (`'circle'`, `'rect'`, etc.).                                                                                                                                                                          |
| customBubble                | Function                  | Custom renderer for this bubble only.                                                                                                                                                                                            |
| showStrip                   | boolean                   | Shows a vertical strip for this bubble (even when not focused).                                                                                                                                                                  |
| stripHeight                 | number                    | Height of the vertical strip associated with this bubble.                                                                                                                                                                        |
| stripWidth                  | number                    | Width of the vertical strip associated with this bubble.                                                                                                                                                                         |
| stripColor                  | ColorValue                | Color of the vertical strip associated with this bubble.                                                                                                                                                                         |
| stripOpacity                | number                    | Opacity of the vertical strip associated with this bubble.                                                                                                                                                                       |
| stripStrokeDashArray        | number[]                  | `[dashWidth, dashGap]` for dashed strip associated with this bubble.                                                                                                                                                             |
| focusedBubbleShape          | string                    | Shape of this bubble when focused.                                                                                                                                                                                               |
| focusedBubbleWidth          | number                    | Width of this bubble when focused (rectangular).                                                                                                                                                                                 |
| focusedBubbleHeight         | number                    | Height of this bubble when focused (rectangular).                                                                                                                                                                                |
| focusedBubbleColor          | ColorValue                | Color of this bubble when focused.                                                                                                                                                                                               |
| focusedBubbleRadius         | number                    | Radius of this bubble when focused (circular).                                                                                                                                                                                   |
| focusedCustomBubble         | Function                  | Custom renderer for this bubble only when focused.                                                                                                                                                                               |
| labelComponent              | Function                  | Custom component rendered above this bubble.                                                                                                                                                                                     |
| focusedLabelComponent       | Function                  | Custom component rendered above this bubble only when focused.                                                                                                                                                                   |
| labelWidth                  | number                    | Width of the label shown beside this bubble.                                                                                                                                                                                     |
| labelShiftX                 | number                    | Horizontal shift of this bubble's label.                                                                                                                                                                                         |
| labelShiftY                 | number                    | Vertical shift of this bubble's label.                                                                                                                                                                                           |
| showVerticalLine            | boolean                   | Shows a vertical line at this bubble's X position.                                                                                                                                                                               |
| verticalLineHeight          | number                    | Height of the vertical line associated with this bubble.                                                                                                                                                                         |
| verticalLineUptoBubble      | boolean                   | When true, vertical line's height is limited to this bubble's Y value.                                                                                                                                                           |
| verticalLineColor           | ColorValue                | Color of the vertical line associated with this bubble.                                                                                                                                                                          |
| verticalLineThickness       | number                    | Thickness of the vertical line associated with this bubble.                                                                                                                                                                      |
| verticalLineStrokeDashArray | number[]                  | `[dashWidth, dashGap]` of the vertical line to create dashed/dotted effect.                                                                                                                                                      |
| verticalLineShift           | number                    | Horizontal shift applied to this bubble's vertical line.                                                                                                                                                                         |
| verticalLineZIndex          | number                    | Z‑index of the vertical line associated with this bubble.                                                                                                                                                                        |
| verticalLineSpacing         | number                    | Distance between this bubble's vertical line and others (when there are multiple).                                                                                                                                               |
| verticalLineStrokeLinecap   | Linecap                   | Linecap of this bubble's vertical line.                                                                                                                                                                                          |
| pointerShiftX               | number                    | Shifts the pointer (if any) for this bubble horizontally.                                                                                                                                                                        |
| pointerShiftY               | number                    | Shifts the pointer (if any) for this bubble vertically.                                                                                                                                                                          |
| onPress                     | Function                  | Callback function called when this bubble is pressed.                                                                                                                                                                            |
| onContextMenu               | Function                  | Web‑only context menu handler.                                                                                                                                                                                                   |
| onMouseEnter                | Function                  | Web‑only mouse‑enter handler.                                                                                                                                                                                                    |
| onMouseLeave                | Function                  | Web‑only mouse‑leave handler.                                                                                                                                                                                                    |
| showXAxisIndex              | boolean                   | Shows an X‑axis index marker for this bubble only.                                                                                                                                                                               |
| hidePointer                 | boolean                   | Hides the pointer for this bubble when using pointer configuration.                                                                                                                                                              |
| x                           | number                    | Custom X value for this bubble. When provided, the X position is calculated as `x * xScale`. When not provided, the position is auto-calculated based on the bubble's index and total width, accounting for the bubble's radius. |
| borderWidth                 | number                    | Border width around this individual bubble.                                                                                                                                                                                      |
| borderColor                 | ColorValue                | Border color around this individual bubble.                                                                                                                                                                                      |
| borderOpacity               | number                    | Opacity of the border around this individual bubble.                                                                                                                                                                             |
| opacity                     | number                    | Opacity of this individual bubble.                                                                                                                                                                                               |

**Alert**\
When you are using the `labelComponent`, make sure to provide appropriate `bubblesHeight` and `bubblesWidth` values (either on the item itself or directly as props on `<BubbleChart>`). Otherwise the labels might appear shifted from their intended positions.

### bubbleDataItem

```ts
export interface bubbleDataItem {
  y: number;
  x?: number;
  r?: number;
  label?: string;
  labelComponent?: Function;
  labelTextStyle?: StyleProp<TextStyle>;
  secondaryLabel?: string;
  secondaryLabelComponent?: Function;
  secondaryLabelTextStyle?: StyleProp<TextStyle>;
  bubbleText?: string;
  textShiftX?: number;
  textShiftY?: number;
  spacing?: number;
  hideBubble?: boolean;
  bubbleHeight?: number;
  bubbleWidth?: number;
  bubbleColor?: string;
  bubbleShape?: string;
  customBubble?: Function;
  stripHeight?: number;
  stripWidth?: number;
  stripColor?: ColorValue | string | any;
  stripOpacity?: number;
  stripStrokeDashArray?: number[];
  focusedBubbleShape?: string;
  focusedBubbleWidth?: number;
  focusedBubbleHeight?: number;
  focusedBubbleColor?: ColorValue | string | any;
  focusedBubbleRadius?: number;
  focusedCustomBubble?: Function;
  labelComponent?: Function;
  focusedLabelComponent?: Function;
  labelWidth?: number;
  labelShiftX?: number;
  labelShiftY?: number;
  showStrip?: boolean;
  showVerticalLine?: boolean;
  verticalLineHeight?: number;
  verticalLineUptoBubble?: boolean;
  verticalLineColor?: ColorValue;
  verticalLineThickness?: number;
  verticalLineStrokeDashArray?: number[];
  verticalLineShift?: number;
  verticalLineZIndex?: number;
  verticalLineSpacing?: number;
  verticalLineStrokeLinecap?: Linecap;
  pointerShiftX?: number;
  pointerShiftY?: number;
  onPress?: Function;
  onContextMenu?: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  showXAxisIndex?: boolean;
  hidePointer?: boolean;
  borderWidth?: number;
  borderColor?: ColorValue;
  borderOpacity?: number;
  opacity?: number;
}
```

---

### X and Y Coordinate Positioning

The BubbleChart uses a coordinate system where:

- **Y coordinate**: Always required. The `y` value represents the vertical position in data space and is converted to screen coordinates using the `getY()` function based on `maxY`, `containerHeight`, and other Y-axis configuration.

- **X coordinate**: Optional. The X positioning works as follows:
  - **If `x` is provided**: The bubble's X position is calculated as `x * xScale`, where `xScale` is the scaling factor that converts data space X values to screen coordinates.
  - **If `x` is not provided**: The X position is auto-calculated based on the bubble's index, evenly distributing bubbles across the chart width while accounting for the bubble's radius to prevent overflow.

The `getX()` function implementation:

```ts
const getX = (index: number): number => {
  const val =
    props.data?.[index].x !== undefined
      ? (props.data?.[index].x ?? 0) * xScale
      : Math.min(
          totalWidth - (props.data?.[index].r ?? BubbleDefaults.bubblesRadius),
          ((index + 1) * totalWidth) / (props.data?.length ?? 1),
        );
  return val;
};
```

This allows you to either:

1. **Use explicit X values**: Provide `x` values in your data for precise positioning (useful for scatter plots or when you need specific X coordinates).
2. **Use automatic spacing**: Omit `x` values to let the chart automatically space bubbles evenly across the available width.

---

---

### Animation and rendering

| Prop                            | Type    | Description                                                                                                            | Default value |
| ------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| isAnimated                      | boolean | Enables initial load animation of the bubbles.                                                                         | false         |
| animateOnDataChange             | boolean | Animates smoothly when the `data` array changes.                                                                       | false         |
| animationDuration               | number  | Duration (in ms) for initial load animation.                                                                           | 800           |
| onDataChangeAnimationDuration   | number  | Duration (in ms) for data‑change animation.                                                                            | 400           |
| animationEasing                 | any     | Easing function/identifier used for bubble animations.                                                                 | \_            |
| animateTogether                 | boolean | Whether all animated elements animate together or sequentially.                                                        | false         |
| renderBubblesAfterAnimationEnds | boolean | Renders bubble related elements only after animation has ended (useful when combining focus / labels with animations). | false         |

---

### Scroll and pagination

| Prop                | Type     | Description                                                                                                     | Default value |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------- | ------------- |
| disableScroll       | boolean  | Disables horizontal scrolling of the chart.                                                                     | false         |
| showScrollIndicator | boolean  | Shows the horizontal scroll indicator.                                                                          | false         |
| indicatorColor      | string   | (iOS only) Color of the scroll indicator: `'black'`, `'white'` or `'default'`.                                  | 'default'     |
| nestedScrollEnabled | boolean  | Enables nested scrolling when the chart is inside another horizontal `ScrollView`.                              | false         |
| scrollRef           | any      | Ref object that can be used to programmatically control the chart's internal `ScrollView`.                      | \_            |
| scrollToEnd         | boolean  | When true, automatically scrolls to the rightmost bubble on mount/update.                                       | false         |
| scrollToIndex       | number   | Scrolls to a particular index on chart load.                                                                    | \_            |
| scrollAnimation     | boolean  | Enables smooth scroll animation when `scrollToEnd` or `scrollToIndex` is used.                                  | true          |
| scrollEventThrottle | number   | (iOS) See `ScrollView.scrollEventThrottle`.                                                                     | 0             |
| onScroll            | Function | Callback fired when the chart is scrolled horizontally.                                                         | \_            |
| onMomentumScrollEnd | Function | Callback fired when the scroll momentum ends.                                                                   | \_            |
| onScrollEndDrag     | Function | Called when the scroll drag ends: `(event, direction) => void` where `direction` is `-1` (left) or `1` (right). | \_            |
| bounces             | boolean  | Controls iOS bouncing effect.                                                                                   | platform def. |
| overScrollMode      | string   | Android over‑scroll mode: `'auto'`, `'always'` or `'never'`.                                                    | 'auto'        |
| onEndReached        | Function | Callback called when the chart is scrolled up to end.                                                           | \_            |
| onStartReached      | Function | Callback called when the chart is scrolled back to the start.                                                   | \_            |
| endReachedOffset    | number   | Distance before end of scroll at which `onEndReached` is triggered.                                             | 80            |

---

### Axes and rules related props

| Prop                           | Type                      | Description                                                                                   | Default value                |
| ------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| xAxisLength                    | number                    | Length of the X axis.                                                                         | width of the chart           |
| xAxisThickness                 | number                    | Thickness of the X axis.                                                                      | 1                            |
| xAxisColor                     | ColorValue                | Color of the X axis.                                                                          | black                        |
| xAxisType                      | RuleType                  | Style of the X axis (`'solid'`, `'dashed'`, `'dotted'`).                                      | 'solid'                      |
| yAxisThickness                 | number                    | Thickness of the Y axis.                                                                      | 1                            |
| yAxisColor                     | ColorValue                | Color of the Y axis.                                                                          | black                        |
| yAxisExtraHeight               | number                    | Extra length of Y axis at the top.                                                            | height / 20                  |
| trimYAxisAtTop                 | boolean                   | Removes the extra length of the Y axis from the top.                                          | false                        |
| yAxisLabelContainerStyle       | StyleProp<ViewStyle>      | Style object for the Y axis label container.                                                  | \_                           |
| horizontalRulesStyle           | any                       | Style object for the horizontal rules container.                                              | \_                           |
| yAxisTextStyle                 | StyleProp<TextStyle>      | Style object for the Y axis label text.                                                       | \_                           |
| yAxisTextNumberOfLines         | number                    | Maximum number of lines for each Y axis label.                                                | 1                            |
| xAxisTextNumberOfLines         | number                    | Maximum number of lines for each X axis label.                                                | 1                            |
| showFractionalYAxis            | boolean                   | When true, allows fractional values on the Y axis.                                            | false                        |
| yRoundToDigits                 | number                    | Number of decimal digits to which Y axis values are rounded.                                  | 1                            |
| yAxisLabelWidth                | number                    | Width of the Y axis label container.                                                          | 35                           |
| hideYAxisText                  | boolean                   | Hides all Y axis labels when true.                                                            | false                        |
| floatingYAxisLabels            | boolean                   | Renders Y‑axis labels above chart content instead of beside the axis.                         | false                        |
| allowFontScaling               | boolean                   | Enables `allowFontScaling` for labels.                                                        | true                         |
| hideAxesAndRules               | boolean                   | Hides axes, rules and labels altogether when true.                                            | false                        |
| rulesLength                    | number                    | Length of the horizontal rules.                                                               | width of the chart           |
| rulesColor                     | ColorValue                | Color of the horizontal rules.                                                                | lightgray                    |
| rulesThickness                 | number                    | Thickness of the horizontal rules.                                                            | 1                            |
| hideRules                      | boolean                   | Hides the horizontal rules when true.                                                         | false                        |
| rulesType                      | RuleType                  | Style of the horizontal rules (`'solid'`, `'dashed'`, `'dotted'`).                            | 'solid'                      |
| dashWidth                      | number                    | Width of each dash in dashed rules.                                                           | 4                            |
| dashGap                        | number                    | Gap between dashes.                                                                           | 8                            |
| rulesConfigArray               | RulesConfig[]             | Array of `RulesConfig` objects for customizing specific rules.                                | \_                           |
| showReferenceLine1             | boolean                   | Shows the first reference line when true.                                                     | false                        |
| referenceLine1Config           | referenceConfigType       | Config object for reference line 1 (thickness, color, type, etc.).                            | \_                           |
| referenceLine1Position         | number                    | Y position of reference line 1.                                                               | containerHeight / 2          |
| showReferenceLine2             | boolean                   | Shows the second reference line.                                                              | false                        |
| referenceLine2Config           | referenceConfigType       | Config object for reference line 2.                                                           | \_                           |
| referenceLine2Position         | number                    | Y position of reference line 2.                                                               | 3 \* containerHeight / 2     |
| showReferenceLine3             | boolean                   | Shows the third reference line.                                                               | false                        |
| referenceLine3Config           | referenceConfigType       | Config object for reference line 3.                                                           | \_                           |
| referenceLine3Position         | number                    | Y position of reference line 3.                                                               | containerHeight / 2          |
| referenceLinesOverChartContent | boolean                   | Renders reference lines over the chart content instead of below it.                           | true                         |
| showVerticalLines              | boolean                   | Shows vertical grid lines when true.                                                          | false                        |
| verticalLinesUptoBubble        | boolean                   | When true, vertical lines extend only up to the corresponding bubble.                         | false                        |
| verticalLinesThickness         | number                    | Thickness of the vertical lines.                                                              | 1                            |
| verticalLinesHeight            | number                    | Height of the vertical lines.                                                                 | chart height                 |
| verticalLinesColor             | ColorValue                | Color of the vertical lines.                                                                  | lightgray                    |
| verticalLinesStrokeDashArray   | number[]                  | `[dashWidth, dashGap]` configuration to render dashed/dotted vertical lines.                  | []                           |
| verticalLinesShift             | number                    | Shifts the vertical lines left/right using positive or negative value.                        | 0                            |
| verticalLinesZIndex            | number                    | Z‑index of the vertical lines.                                                                | -1                           |
| noOfVerticalLines              | number                    | Number of vertical lines displayed.                                                           | data.length                  |
| verticalLinesSpacing           | number                    | Distance between consecutive vertical lines.                                                  | spacing                      |
| verticalLinesStrokeLinecap     | Linecap                   | Linecap of the vertical lines.                                                                | 'butt'                       |
| showYAxisIndices               | boolean                   | Shows pointers on the Y axis when true.                                                       | false                        |
| yAxisIndicesHeight             | number                    | Height of Y‑axis pointers.                                                                    | 2                            |
| yAxisIndicesWidth              | number                    | Width of Y‑axis pointers.                                                                     | 4                            |
| yAxisIndicesColor              | ColorValue                | Color of Y‑axis pointers.                                                                     | black                        |
| showXAxisIndices               | boolean                   | Shows pointers on the X axis when true.                                                       | false                        |
| xAxisIndicesHeight             | number                    | Height of X‑axis pointers.                                                                    | 2                            |
| xAxisIndicesWidth              | number                    | Width of X‑axis pointers.                                                                     | 4                            |
| xAxisIndicesColor              | ColorValue                | Color of X‑axis pointers.                                                                     | black                        |
| yAxisSide                      | yAxisSides                | Side of the chart where the Y axis is rendered (`LEFT` or `RIGHT`).                           | yAxisSides.LEFT              |
| yAxisOffset                    | number                    | Starting value on the Y axis.                                                                 | 0                            |
| hideOrigin                     | boolean                   | Hides the Y axis label at origin (0).                                                         | false                        |
| yAxisLabelPrefix               | string                    | String prepended to the Y axis labels (for example `'$', '₹'`).                               | ''                           |
| yAxisLabelSuffix               | string                    | String appended to the Y axis labels.                                                         | ''                           |
| yAxisLabelTexts                | string[]                  | Custom array of label texts for the Y axis.                                                   | null                         |
| xAxisLabelTexts                | string[]                  | Custom array of label texts displayed below the X axis.                                       | null                         |
| xAxisLabelTextStyle            | StyleProp<TextStyle>      | Style object for X axis label texts.                                                          | null                         |
| xAxisLabelsHeight              | number                    | Height of X axis labels container.                                                            | xAxisTextNumberOfLines \* 18 |
| xAxisLabelsVerticalShift       | number                    | Adjusts vertical position of X axis labels (move them up or down).                            | 0                            |
| xAxisLabelsAtBottom            | boolean                   | Places X axis labels at the bottom of the chart (useful with negative values / 4th quadrant). | false                        |
| rotateLabel                    | boolean                   | Rotates X axis labels by 60 degrees when true.                                                | false                        |
| secondaryXAxis                 | XAxisConfig               | Configuration of a secondary X‑axis (typically at the top).                                   | values of primary X‑axis     |
| formatYLabel                   | (label: string) => string | Callback that receives and returns a formatted Y axis label.                                  | \_                           |
| formatXLabel                   | (label: string) => string | Callback that receives and returns a formatted X axis label.                                  | \_                           |

**Note** If you are setting `yAxisSide` to `yAxisSide.RIGHT`, make sure to specify the width of the chart using the `width` prop.

---

### Focus / interaction / tooltip related props

| Prop                   | Type                           | Description                                                              | Default value |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------ | ------------- |
| focusEnabled           | boolean                        | Enables focus/selection behaviour on bubbles.                            | false         |
| focusTogether          | boolean                        | When true, multiple related points are focused together.                 | false         |
| focusProximity         | number                         | Distance (in px) within which a touch will focus the nearest bubble.     | 20            |
| onFocus                | Function                       | Callback called when a bubble gets focused. Receives `item` and `index`. | \_            |
| showBubbleOnFocus      | boolean                        | Shows a bubble even if hidden, when it is focused.                       | false         |
| showStripOnFocus       | boolean                        | Shows a vertical strip for the focused bubble.                           | false         |
| stripOverBubbles       | boolean                        | Renders the focus strip over the bubbles instead of behind them.         | false         |
| showTextOnFocus        | boolean                        | Shows text for the focused bubble.                                       | false         |
| showBubbleLabelOnFocus | boolean                        | Shows the label component/text for the focused bubble only.              | false         |
| stripHeight            | number                         | Height of the focus strip.                                               | chart height  |
| stripWidth             | number                         | Width of the focus strip.                                                | 2             |
| stripColor             | ColorValue \| string \| any    | Color of the focus strip.                                                | lightgray     |
| stripOpacity           | number                         | Opacity of the focus strip.                                              | 0.7           |
| stripStrokeDashArray   | number[]                       | `[dashWidth, dashGap]` configuration for dashed focus strip.             | []            |
| onPress                | Function                       | Callback called when the user presses on a bubble or chart area.         | \_            |
| unFocusOnPressOut      | boolean                        | When true, focused bubble is unfocused on press‑out.                     | true          |
| delayBeforeUnFocus     | number                         | Delay (ms) before un‑focusing after press‑out.                           | 150           |
| focusedBubbleIndex     | number                         | Index of the bubble that should be focused initially.                    | \_            |
| onChartAreaPress       | (event: GestureResponderEvent) | Called when the user presses on the chart area.                          | \_            |
| onBackgroundPress      | (event: GestureResponderEvent) | Called when the user presses on the area outside chart content.          | \_            |
| renderTooltip          | Function                       | Custom tooltip renderer for primary data.                                | \_            |
| renderTooltipSecondary | Function                       | Custom tooltip renderer when using secondary data / axis.                | \_            |
| labelComponent         | Function                       | Custom label component rendered above a bubble.                          | \_            |
| focusedLabelComponent  | Function                       | Custom label component rendered above a bubble only when focused.        | \_            |

---

### Bubble appearance props

| Prop                     | Type                        | Description                                                                        | Default value |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| hideBubbles              | boolean                     | Hides all bubbles when true (they can still be used for touch / focus).            | false         |
| bubblesHeight            | number                      | Height of the bubble when its shape is rectangular.                                | 6             |
| bubblesWidth             | number                      | Width of the bubble when its shape is rectangular.                                 | 6             |
| bubblesRadius            | number                      | Radius of the bubble when its shape is circular.                                   | 3             |
| bubblesColor             | string                      | Default color of bubbles.                                                          | 'black'       |
| bubblesShape             | string                      | Shape of bubbles (`'circle'`, `'rect'`, custom values handled in custom renderer). | 'circle'      |
| customBubble             | Function                    | Custom bubble renderer for all items.                                              | \_            |
| focusedBubbleShape       | string                      | Shape of currently focused bubble.                                                 | bubblesShape  |
| focusedBubbleWidth       | number                      | Width of the focused bubble when rectangular.                                      | bubblesWidth  |
| focusedBubbleHeight      | number                      | Height of the focused bubble when rectangular.                                     | bubblesHeight |
| focusedBubbleColor       | ColorValue \| string \| any | Color of the focused bubble.                                                       | bubblesColor  |
| focusedBubbleRadius      | number                      | Radius of focused bubble when circular.                                            | bubblesRadius |
| focusedCustomBubble      | Function                    | Custom renderer for the focused bubble only.                                       | \_            |
| labelWidth               | number                      | Width of the label displayed near a bubble.                                        | 40            |
| labelShiftX              | number                      | Horizontal shift of the bubble label relative to the bubble.                       | 0             |
| labelShiftY              | number                      | Vertical shift of the bubble label relative to the bubble.                         | 0             |
| showValuesAsBubbleLabels | boolean                     | Shows the `y` value of each bubble as text near the bubble.                        | false         |
| borderWidth              | number                      | Border width around the chart area.                                                | 0             |
| borderColor              | ColorValue                  | Border color around the chart area.                                                | 'transparent' |
| borderOpacity            | number                      | Opacity of the border around the chart area.                                       | opacity       |

---

### Regression line props

| Prop                 | Type                 | Description                                                                                | Default value |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------ | ------------- |
| showRegressionLine   | boolean              | Shows a regression line calculated from the bubbles using weighted regression.             | false         |
| regressionLineConfig | RegressionLineConfig | Configuration object for the regression line (color, opacity, thickness, strokeDashArray). | \_            |

**RegressionLineConfig** has the following properties:

```ts
type RegressionLineConfig = {
  color?: ColorValue;
  opacity?: number;
  thickness?: number;
  strokeDashArray?: number[];
  isAnimated?: boolean;
  animationDuration?: number;
};
```

| Property          | Type       | Description                                                   | Default value |
| ----------------- | ---------- | ------------------------------------------------------------- | ------------- |
| color             | ColorValue | Color of the regression line.                                 | 'red'         |
| opacity           | number     | Opacity of the regression line.                               | 1             |
| thickness         | number     | Thickness (stroke width) of the regression line.              | 2             |
| strokeDashArray   | number[]   | Array of numbers for dashed line pattern (e.g., `[5, 5]`).    | undefined     |
| isAnimated        | boolean    | When true, animates the regression line drawing.              | false         |
| animationDuration | number     | Duration (in milliseconds) for the regression line animation. | 800           |

---

### Text / labels related props

| Prop           | Type       | Description                                              | Default value |
| -------------- | ---------- | -------------------------------------------------------- | ------------- |
| textFontSize   | number     | Font size of bubble text (for example when showing `y`). | 10            |
| textColor      | string     | Color of the bubble text.                                | 'black'       |
| textFontFamily | string     | Font family of the bubble text.                          | \_            |
| textFontWeight | FontWeight | Font weight of the bubble text.                          | \_            |
| textShiftX     | number     | Horizontal shift applied to bubble text.                 | 0             |
| textShiftY     | number     | Vertical shift applied to bubble text.                   | 0             |

---

### Type helpers

```ts
type RuleType = 'solid' | 'dashed' | 'dotted'; // can be imported from gifted-charts-core
```

```ts
type RulesConfig = {
  rulesLength?: number;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  rulesType?: RuleType;
  dashWidth?: number;
  dashGap?: number;
};
```

```ts
type referenceConfigType = {
  thickness: number;
  width: number;
  color: ColorValue | string | any;
  type: RuleType;
  dashWidth: number;
  dashGap: number;
  labelText: string;
  labelTextStyle: StyleProp<TextStyle>;
  zIndex: number; // default 1
  resetPointerOnDataChange: boolean; // default true
};
```

```ts
type XAxisConfig = {
  thickness?: number;
  color?: ColorValue;
  labelsDistanceFromXaxis?: number;
  labelsHeight?: number;
  labelsTextStyle?: StyleProp<TextStyle>;
  labelTexts?: string[];
};
```

```ts
type CustomBackground = {
  color?: ColorValue;
  component?: Function;
  horizontalShift?: number;
  verticalShift?: number;
  height?: number;
  width?: number;
  widthAdjustment?: number;
};
```

```ts
type RegressionLineConfig = {
  color?: ColorValue;
  opacity?: number;
  thickness?: number;
  strokeDashArray?: number[];
};
```

```ts
type Linecap = 'butt' | 'square' | 'round'; // can be imported from gifted-charts-core
```

---

### Alert – relation between Y axis props

These Y axis props are correlated:

1. `maxY`
2. `yNoOfSections`
3. `yStepValue`

They must follow the relation:

```ts
maxY = yNoOfSections * yStepValue;
```

So, all three should be used together. Using any 1 or 2 of them without the third may produce absurd results.

Similarly, for X axis:

1. `maxX`
2. `xNoOfSections`
3. `xStepValue`

They must follow the relation:

```ts
maxX = xNoOfSections * xStepValue;
```

---
