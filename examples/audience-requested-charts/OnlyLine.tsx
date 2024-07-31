import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {LineChart} from '../../src/LineChart';

const colors = {
  background: '#121212',
  darkestAccent: '#1C1C1C',
  colorAccent: '#17E5D8',
};

const screenWidth = Dimensions.get('window').width;

const OnlyLine = () => {
  const data = [
    {value: 4},
    {value: 6},
    {value: 7},
    {value: 5},
    // {value: 4},
  ];
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.upper}>
        <View
          style={[
            styles.ChartContainer,
            {backgroundColor: colors.darkestAccent},
          ]}>
          <LineChart
            data={data}
            width={screenWidth * 0.9}
            height={220}
            adjustToWidth={true}
            backgroundColor={'transparent'}
            isAnimated={false}
            initialSpacing={0}
            endSpacing={0}
            color={colors.colorAccent}
            hideDataPoints={true}
            //   pointerConfig={Pointer}
            focusEnabled={true}
            hideYAxisText={true}
            yAxisLabelWidth={0}
            hideRules={true}
            hideOrigin={true}
            //   yAxisIndicesColor={false}
            hideAxesAndRules={true}
          />
        </View>
      </View>
      {/* <View style={styles.lower}>
        <Link href={'/log'} asChild>
        <Button 
        dark={true} 
        icon="plus" 
        mode="contained" 
        rippleColor={colors.darkerAccent} 
        style={{ backgroundColor: colors.lightAccent }}
        contentStyle={{ height: 60, width: 240 }}
        labelStyle={{  fontSize: 18 }}
        >
          Log Excercise
        </Button>
        </Link>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upper: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lower: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ChartContainer: {
    display: 'flex',
    flex: 0.75,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnlyLine;
