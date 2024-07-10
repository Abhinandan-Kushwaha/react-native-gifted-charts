import React, { useCallback, useEffect, useState } from "react";
import { GestureResponderEvent, Pressable, Text, View, StyleSheet } from "react-native";
import { PieChart } from "../../src/PieChart";

const PieChartComponent: React.FC = ({
    data,
    donut = false,
    radius = 100,
    showText = true,
    textSize = 14,
    focusOnPress = true,
    }:any) => {
    
        const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        console.log('Selected:', selected);
    }, [selected]);
    
    const renderDot = useCallback((color: string) => {
        return <View style={[PieChartStyles.dot, { backgroundColor: color }]} />;
    }, []);
    
    const removeUnderScores = useCallback((text: string) => {
        return text.replace(/_/g, ' ');
    }, []);
    
    const handleComponentPress = useCallback((index: number) => {
        setSelected(index);
    }, []);
    
    const renderLegendComponent = useCallback((data: any[]) => {
        return (
            <View style={PieChartStyles.legendContainer}>
                {data.map((item, index) => {
                    const isSelected = selected === index;
                    return (
                        <Pressable
                            key={index}
                            onPressIn={(event: GestureResponderEvent) => handleComponentPress(index)}
                            style={[
                                PieChartStyles.legendItem,
                                isSelected && PieChartStyles.expandedLegendItem,
                            ]}
                        >
                            {renderDot(item.color)}
                            <Text style={[PieChartStyles.legendText, { color: item.color }]}>
                                {removeUnderScores(item.text)}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        );
    }, [selected, renderDot, removeUnderScores, handleComponentPress]);
    
    return (
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart
                focusOnPress={focusOnPress}
                // toggleFocusOnPress={true}
                onPress={(event: GestureResponderEvent, index: number) => handleComponentPress(index)}
                donut={donut}
                data={data}
                radius={radius}
                focusedPieIndex={selected ?? -1}
                // selectedIndex={selected !== null ? selected : -2}
                // setSelectedIndex={setSelected}
            />
            {renderLegendComponent(data)}
        </View>
    );
}

const PieChartStyles = StyleSheet.create({
    dot: {
        height:4,
        width:4,
        borderRadius:2,
        backgroundColor:'black'
    },
    legendContainer: {

    },
    legendItem: {
        backgroundColor: 'yellow'
    },
    expandedLegendItem:{
        backgroundColor: 'red'
    },
    legendText: {

    }

})

export default PieChartComponent;