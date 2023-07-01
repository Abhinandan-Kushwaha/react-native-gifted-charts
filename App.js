import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import SimpleBlueBars from './examples/BarChart/SimpleBlueBars';
import BarThreeD from './examples/BarChart/BarThreeD';
import SimpleBarAnimated from './examples/BarChart/SimpleBarAnimated';
import RoundStackBar from './examples/BarChart/RoundStackBar';
import CappedBars from './examples/BarChart/CappedBars';
import BarWithGradient from './examples/BarChart/BarWithGradient';

import LineChartTwo from './examples/LineChart/LineChartTwo';
import AnimatedArea from './examples/LineChart/AnimatedArea';
import AreaTwo from './examples/LineChart/AreaTwo';
import ChartWithPointer from './examples/LineChart/ChartWithPointer';
import CaloriesBurnt from './examples/LineChart/CaloriesBurnt';

import SimplePie from './examples/PieChart/SimplePie';
import ProgressPie from './examples/PieChart/ProgressPie';
import SplitPie from './examples/PieChart/SplitPie';
import ThreeDPie from './examples/PieChart/ThreeDPie';
import PieChartFocusOnPress from './examples/PieChart/PieChartFocusOnPress';

const App = () => {
  const [selectedFooterButton, setSelectedFooterButton] = useState(0);

  const Header = () => {
    const getTitle = () => {
      switch (selectedFooterButton) {
        case 0:
          return 'Bar and Stacked Bar Charts';
        case 1:
          return 'Line and Area Charts';
        case 2:
          return 'Pie and Donut Charts';
      }
    };
    return (
      <View style={styles.header}>
        <Text style={{fontSize: 20}}>{getTitle()}</Text>
      </View>
    );
  };

  const Separator = () => <View style={{height: 40}} />;

  const BarAndStackCharts = () => {
    return (
      <View>
        <SimpleBlueBars />
        <Separator />

        <SimpleBarAnimated />
        <Separator />

        <BarThreeD />
        <Separator />

        <RoundStackBar />
        <Separator />

        <CappedBars />
        <Separator />

        <BarWithGradient />
        <Separator />
        <Separator />
      </View>
    );
  };

  const LineAndAreaCharts = () => {
    return (
      <View>
        <LineChartTwo />
        <Separator />

        <AnimatedArea />
        <Separator />

        <AreaTwo />
        <Separator />

        <ChartWithPointer />
        <Separator />

        <CaloriesBurnt />
        <Separator />
        <Separator />
      </View>
    );
  };

  const PieAndDonutCharts = () => {
    return (
      <View>
        <SimplePie />
        <Separator />

        <ProgressPie />
        <Separator />

        <SplitPie />
        <Separator />

        <ThreeDPie />
        <Separator />

        <PieChartFocusOnPress />
        <Separator />
        <Separator />
      </View>
    );
  };

  const SelectedIndexCharts = () => {
    switch (selectedFooterButton) {
      case 0:
        return <BarAndStackCharts />;
      case 1:
        return <LineAndAreaCharts />;
      case 2:
        return <PieAndDonutCharts />;
    }
  };

  const Body = () => {
    return (
      <ScrollView style={styles.body}>
        <SelectedIndexCharts />
      </ScrollView>
    );
  };

  const Footer = () => {
    const footerButtonStyle = index => [
      styles.footerButton,
      selectedFooterButton === index ? styles.footerButtonSelected : null,
    ];
    return (
      <View style={styles.footer}>
        <View
          style={[
            styles.footerButtonContainer,
            selectedFooterButton === 0 ? {marginTop: -12} : null,
          ]}>
          {selectedFooterButton === 0 ? (
            <View style={styles.connector} />
          ) : null}
          <TouchableOpacity
            style={footerButtonStyle(0)}
            onPress={() => setSelectedFooterButton(0)}>
            <Text>Bar</Text>
            <Text>Stack</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.footerButtonContainer,
            selectedFooterButton === 1 ? {marginTop: -12} : null,
          ]}>
          {selectedFooterButton === 1 ? (
            <View style={styles.connector} />
          ) : null}
          <TouchableOpacity
            style={footerButtonStyle(1)}
            onPress={() => setSelectedFooterButton(1)}>
            <Text>Line</Text>
            <Text>Area</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.footerButtonContainer,
            selectedFooterButton === 2 ? {marginTop: -12} : null,
          ]}>
          {selectedFooterButton === 2 ? (
            <View style={styles.connector} />
          ) : null}
          <TouchableOpacity
            style={footerButtonStyle(2)}
            onPress={() => setSelectedFooterButton(2)}>
            <Text>Pie</Text>
            <Text>Donut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Body />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: '#f5f5ff'},
  header: {marginBottom: 20},
  body: {
    paddingLeft: 10,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#334',
  },
  footerButtonContainer: {
    alignItems: 'center',
  },
  connector: {
    height: 8,
    width: 60,
    borderRadius: 0,
    backgroundColor: '#f5f5ff',
  },
  footerButton: {
    width: 60,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#bbc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonSelected: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#f5f5ff',
    shadowColor: '#00ffe9',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
});
export default App;
