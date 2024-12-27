
# Line charts architecture

The code for the `<LineChart>` component is written in the `LineChart/index.ts` file. This file prepares the chart content and returns it wrapped in a component named **`<BarAndLineChartsWrapper>`** <br />
BarAndLineChartsWrapper is a common component for all types of Bar and Line charts. It takes the chart-content (line or curve) and adds to it the common elements like the X and Y axes, the background and rules etc.
It accepts a prop named `renderChartContent` which renders the actual chart. <br />

The architecture of Line chart can be understood with the below image-


!['LineChart'](LineChart.drawio.svg)

The `renderChartContent` is defined as a part of the `<LineChart>` component in the `LineChart/index.ts` file, while `renderHorizSections` is defined separately as a part of the _BarAndLineChartsWrapper_

The rendering takes place from top to bottom. So `renderHorizSections` is called first and `renderLabel` is called at last. The element called at last will be renderd on the top of previously called elements.  

Go through the below files to understand how the major features have been implemented-

1. **[Multi Line](MultiLine.md)**
2. **[Focusing](Focusing.md)**