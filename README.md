# react-native-gifted-charts

The most complete library for Bar, Line, Area, Pie, and Donut charts in React Native. Allows 2D, 3D, gradient, animations and live data updates.

![alt text](/demos/line.gif)
![alt text](/demos/area.gif)
![alt text](/demos/movingBars.gif)

## Installation

```sh
npm install react-native-gifted-charts
```

Since we will be using LinearGradient, Svg and Canvas-

```sh
npm i react-native-linear-gradient react-native-svg react-native-canvas react-native-webview
```

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

**[1. BarChart and Horizontal BarChart props](docs/BarChart/BarChartProps.md)** \
**[2. LineChart and AreaChart props](docs/LineChart/LineChartProps.md)** \
**[3. PieChart and DonutChart props](docs/PieChart/PieChartProps.md)**

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
