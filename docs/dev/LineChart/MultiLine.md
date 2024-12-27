## Multi Line charts

Charts with multiple lines can be constructed in 2 ways-

1. Using the `dataSet` prop which is an array of objects, each object defining a line. Each object in the `dataSet` array expects a mndatory property named `data` which is an array of numeric values.
2. Using a separate prop like `data`, `data2`, `data3`, `data4`, `data5` for each line. A max of 5 lines can be drawn in this way. Another line corresponding to the secondary Y-axis (right-side Y-axis) can be drawn using the `secondaryData` prop.

The lines or curves are rendered in the `lineSvgComponent` which renders a `<Svg>`. The flow from `<LineChart>` to `lineSvgComponent` is-

`LineChart -> BarAndLineChartsWrapper -> renderChartContent -> renderLine -> lineSvgComponent`

Here's a better visualisation with conditions and loops-

```js
LineChart() {
    BarAndLineChartsWrapper() {
        renderChartContent() {
            if (dataSet) {
                dataSet.forEach(set => {
                    if (animated) {
                        renderAnimatedLine(set) -> lineSvgComponent()
                    }
                    else {
                        renderLine(set) -> lineSvgComponent()
                    }
                })
            }
            else {
                if (animated) {
                    renderAnimatedLine(data) -> lineSvgComponent()
                    renderAnimatedLine(data2) -> lineSvgComponent()
                    .
                    .
                    renderAnimatedLine(data5) -> lineSvgComponent()
                    renderAnimatedLine(secondaryData) -> lineSvgComponent()
                }
                else {
                    renderLine(data) -> lineSvgComponent()
                    renderLine(data2) -> lineSvgComponent()
                    .
                    .
                    renderLine(data5) -> lineSvgComponent()
                    renderLine(secondaryData) -> lineSvgComponent()
                }
            }

            // Pointer is rendered at last, after all the lines/curves have been rendered.
            // This ensures that the pointer appears on top of all UI elements in the chart
            renderPointer()
        }
    }
}
```

If there are `n` lines, the `lineSvgComponent` ic called `n` times. This means `n <Svg>` components will be rendered on top of one another making a stack.<br />
Due to this the topmost (last) line will block the other lines. Since the `<Svg>` for each line has a transparent background, there will be no problem in visibility. <br />
But the `onPress` events will work only for the last line and fail for the others. This problem is solved by rendering the data points separately as discussed below-

### onPress for data points in Multi Line charts

To solve the aforementioned `onPress` issue for multi-line charts, we are rendering the data points separately. <br />
The data points will be rendered after all the lines have been rendered. Thus all the data points will be on top of the topmost `<Svg>`. <br />
This is implemented in code in the following way- <br /><br />

We have a variable named **`lastLineNumber`** which stores the total number of lines the currently rendered chart has. So, if we are using `dataSet` which has 10 items, then `lastLineNumber` will be 10. If we are using `data` and `data2` then the `lastLineNumber` will be 2. For `secondaryData` we have a special value of `lastLineNumber` that is- `6667`. This large number is chosen to ensure that the secondary data is rendered at last.<br />

In the `lineSvgComponent` we check if the currently rendered line is the last line, then after rendering that line, we render all the data points for the current line as well as all the previously rendered lines using the function named **`renderDataPointsForEachLine`**. This solves the `onPress` issue.<br />

But if the chart is **_animated_**, and if we render the data points only after all the lines have been rendered, then it may not be a great UI experience. Usually we would like to see the data points appear along with the lines/curves.<br />
To handle this we are rendering the data points separately only for non-animated line charts. For animated charts we render the data points separately only if the `renderDataPointsAfterAnimationEnds` prop is set to true.