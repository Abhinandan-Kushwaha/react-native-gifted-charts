# react-native-gifted-charts [![Rate on Openbase](https://badges.openbase.com/js/rating/react-native-gifted-charts.svg)](https://openbase.com/js/react-native-gifted-charts?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

The most complete library for Bar, Line, Area, Pie, Donut, Stacked Bar and Population Pyramid charts in React Native. Allows 2D, 3D, gradient, animations and live data updates.

### Yet another chart library? Why?

**_To bring Life to your data_**

1. Plenty of features with minimal code
2. Apply animations to your charts on load and on value change, just by adding a prop
3. Smooth animations implemented using LayoutAnimation
4. Clickable and scrollable
5. Three-D and gradient effects
6. Fully customizable (see the [props](docs/docs.md))
7. Detailed [documentation](https://gifted-charts.web.app/) with examples
8. Support for **_combined_** Bar and Line charts

## 📣 Announcement

The web counterpart of this library is public now. Try out our new reactJS library- [react-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-gifted-charts) <br />
The exact same piece of code that you write to render charts in react-native, can be used to render charts in reactJS using this library!


## [Release notes 🎉](release-notes/release-notes.md)


<img src='/demos/bars.png' alt=''/>
<img src='/demos/lineArea.png' alt=''/>
<img src='/demos/blues.png' alt=''/>
<table>
  <tr>
    <td><img src='/demos/scrollLine.gif' alt='' width=320 height=280/></td>
    <td><img src='/demos/animatedDataLine.gif' alt='' width=320 height=260/></td>
  </tr>
  
  <tr>
    <td><img src='/demos/movingBars.gif' alt='' width=270 height=300/></td>
    <td><img src='/demos/pielabbelled.svg' alt='' height=280 width=270/></td>
  </tr>
  <tr>
  <td><img src='/demos/pyrLarge.png' alt='' height=280 width=260/></td>
  <td><img src='/demos/popnPyramidLabelled.png' alt='' height=280 width=300/></td>
  </tr>
</table>

---

## Installation

### React Native CLI

```sh
npm install react-native-gifted-charts react-native-linear-gradient react-native-svg
```

### Expo

```sh
npx expo install react-native-gifted-charts expo-linear-gradient react-native-svg
```

Please note that `react-native-svg` and `react-native-linear-gradient`/`expo-linear-gradient` are needed for the library to work, so make sure they are installed in your project.

# Docs

[Documentation and gallery](https://gifted-charts.web.app/)

## Usage

The simplest usage of various types of charts can be done as below-

```js
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

// ...
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

<BarChart data = {data} />
<LineChart data = {data} />
<PieChart data = {data} />
<PopulationPyramid data = {[{left:10,right:12}, {left:9,right:8}]} />

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
**[3. PieChart and DonutChart props](docs/PieChart/PieChartProps.md)** \
**[4. Population Pyramid props](docs/PopulationPyramid/PopulationPyramid.md)**

## Contributing

This project exists thanks to all the people who contribute.

<a href="https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Abhinandan-Kushwaha/react-native-gifted-charts" />
</a>
<br/><br/>

_Dear developers_! Your small contribution can make someone's day 😊

One of the ways you can contribute is to address an [open issue](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues).

Sometimes people report issues which don't exist, or request for features which are already present. Such issues can be addressed without pushing any code to the repo. Just show them in the comments how to do it.

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

[To do list](./src/todos.md)

## License

MIT
