# Candle Stick Chart Props

Candle Stick chart supposrts all the props of Bar charts, except a few like `stackData`. <br />
Candle stick chart internally renders a Bar chart with a few modifications (& extensions). <br />

<img src="/demos/CandleLabelled.png" alt="Candle Stick Chart labelled">

The data format for Candle stick chart is `candleStickDataItem[]` where candleStickDataItem must have below mentioned mandatory properties-

```ts
interface candleStickDataItem {
  open: number;
  close: number;
  high: number;
  low: number;
}
```

The additional props supported by Candle Stick chart are-

```ts
interface CandleStickChartPropsType {
  showValuesAsBottomLabel?: boolean;
  bullishColor?: ColorValue;
  bearishColor?: ColorValue;
  bullishBarWidth?: number;
  bearishBarWidth?: number;
  bullishBorderColor?: ColorValue;
  bearishBorderColor?: ColorValue;
  bullishBorderWidth?: number;
  bearishBorderWidth?: number;
  bullishBorderRadius?: number;
  bearishBorderRadius?: number;
  bullishVerticalLineColor?: ColorValue;
  bearishVerticalLineColor?: ColorValue;
}
```

The default values-

```ts
const CandleStickDefaults = {
  bullishColor: 'lightgreen',
  bearishColor: 'pink',
  bullishBorderColor: 'green',
  bearishBorderColor: 'red',
  borderWidth: 1,
  barWidth: 10,
  spacing: 10,
};
```

Default `verticalLineColor` is 'green' for bullish & 'red' for bearish
