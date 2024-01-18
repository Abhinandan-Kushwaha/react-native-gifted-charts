import React from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import {BarChart} from 'react-native-gifted-charts';
  
  function Mgan(): JSX.Element {
    const screenWidth = Dimensions.get('window').width;
    const data = [
      {value: 1},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 70},
      {value: 6},
      {value: 7},
      {value: 8},
      {value: 9},
      {value: 10},
      {value: 11},
      {value: 12},
    ];
    const separatorHeight = 5;
    return (
      <SafeAreaView style={styles.background}>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.text}>Some data here</Text>
          </View>
  
          <View style={styles.cardContainer}>
            <View
              style={[styles.titleContainer, {marginBottom: separatorHeight}]}>
              <Text style={styles.title}>Overview</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Alert.alert('Pressed!');
                }}>
                <Text style={[styles.text]}>Press</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
            <BarChart
              data={data}
            //   disableScroll
              xAxisLabelTexts={[
                'J',
                'F',
                'M',
                'A',
                'M',
                'J',
                'J',
                'A',
                'S',
                'N',
                'D',
              ]}
              
              renderTooltip={()=>(
                <View style={{top:-50}}>
                  <Text>Hi</Text>
                </View>
              )}
              overflowTop={60}
              // yAxisExtraHeight={40}
              barWidth={15}
              cappedBars
              capColor={'white'}
              capThickness={1.2}
              width={screenWidth - 120}
              initialSpacing={10}
              spacing={10}
              noOfSections={2}
              frontColor={'#945A18'}
              // disablePress={true}
              xAxisColor={'rgb(230,230,230)'}
              yAxisColor={'rgb(230,230,230)'}
              rulesColor={'rgb(230,230,230)'}
              hideOrigin
              xAxisLabelTextStyle={{
                color: 'rgb(230,230,230)',
              }}
              yAxisTextStyle={{
                color: 'rgb(230,230,230)',
              }}
              formatYLabel={(label: string) => {
                return `$${label}k `;
              }}
            />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.text}>Some data here</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    cardContainer: {
      marginTop: 20,
      padding: 16,
      backgroundColor: 'rgb(49,49,49)',
      borderRadius: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      color: 'rgb(230,230,230)',
      flex: 1,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#945A18',
      marginEnd: 4,
      borderRadius: 16,
      padding: 5,
    },
    mainContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    background: {
      backgroundColor: 'rgb(31,31,31)',
      height: '100%',
    },
    text: {
      color: 'rgb(230,230,230)',
      fontSize: 16,
    },
    highlight: {
      fontWeight: '700',
    },
  });
  
  export default Mgan;