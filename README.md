# react-native-gifted-charts

The most complete library for Bar, Line, Area, Pie, and Donut charts in React Native. Allows 2D, 3D, gradient, animations and live data updates.

### Yet another chart library? Why?

**_To bring Life to your data_** 

1. Plenty of features with minimal code
2. Apply animations to your charts on load and on value change, just by adding a prop
3. Smooth animations implemented using LayoutAnimation
4. Clickable and scrollable
5. Three-D and gradient effects
6. Fully customizable
7. Detailed documentation with examples

---

![alt text](/demos/altBars.svg)
![alt text](/demos/barPairs.svg)
![alt text](/demos/movingBars.gif)
![alt text](/demos/lineArea.png)
![alt text](/demos/line.gif)
![alt text](/demos/pielabbelled.svg)

---

## Installation

```sh
npm install react-native-gifted-charts react-native-linear-gradient react-native-svg
```

For Pie chart and Donut chart, these additional packages should be installed-

```sh
npm i react-native-canvas react-native-webview
```

You can omit the above packages if you don't intend to use Pie chart or Donuut chart.

For iOS-

```sh
cd ios && pod install
```

## Usage

The simplest usage of various types of charts can be done as below-

```js
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

// ...
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

<BarChart data = {data} />
<LineChart data = {data} />
<PieChart data = {data} />

// For Horizontal Bar chart, just add the prop horizontal to the <BarChart/> component

<BarChart data = {data} horizontal />

// For Area chart, just add the prop areaChart to the <LineChart/> component

<LineChart data = {data} areaChart />

// For Donut chart, just add the prop donut to the <PieChart/> component

<PieChart data = {data} donut />
```

## Props tables

**[1. BarChart, Horizontal BarChart and Stacked Bar Chart props](docs/BarChart/BarChartProps.md)** \
**[2. LineChart and AreaChart props](docs/LineChart/LineChartProps.md)** \
**[3. PieChart and DonutChart props](docs/PieChart/PieChartProps.md)**

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
