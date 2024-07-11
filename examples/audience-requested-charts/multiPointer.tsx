import React, { useState } from "react"
import { View } from "react-native"
import { LineChart } from "../../src/LineChart"

export const MultiPointer = () => {
  const data= [
    {value:10, label:'2'},
    {value:15, label:'3'},
    {value:18, label:'4'},
    {value:15, label:'5'},
    {value:12, label:'6'},
    {value:8, label:'7'},
    {value:10, label:'2'},
    {value:15, label:'3'},
    {value:18, label:'4'},
    {value:15, label:'5'},
    {value:12, label:'6'},
    {value:8, label:'7'},
  ]

  const data2= [
    {value:20, label:'2'},
    {value:5, label:'3'},
    {value:12, label:'4'},
    {value:10, label:'5'},
    {value:12, label:'6'},
    {value:18, label:'7'},
    {value:13, label:'2'},
    {value:9, label:'3'},
    {value:11, label:'4'},
    {value:10, label:'5'},
    {value:11, label:'6'},
    {value:18, label:'7'},
  ]

  const data3= [
    {value:24, label:'2'},
    {value:15, label:'3'},
    {value:22, label:'4'},
    {value:14, label:'5'},
    {value:22, label:'6'},
    {value:18, label:'7'},
    {value:23, label:'2'},
    {value:19, label:'3'},
    {value:11, label:'4'},
    {value:20, label:'5'},
    {value:14, label:'6'},
    {value:8, label:'7'},
  ]

  const [ptr,setPtr] = useState(null)

  return (
    <View>
      <View style={{marginVertical:20}}>
        <LineChart
          data={data}
          spacing={25}
          pointerConfig={{
            persistPointer:true,
            initialPointerIndex:ptr?.pointerIndex??-1
          }}
          getPointerProps={(props)=>{
            setPtr(props)
          }}
        />
      </View>
      <View style={{marginVertical:20}}>
        <LineChart
          data={data2}
          spacing={25}
          pointerConfig={{
            persistPointer:true,
            initialPointerIndex:ptr?.pointerIndex??-1
          }}
          getPointerProps={(props)=>{
            setPtr(props)
          }}
        />
      </View>
      <View style={{marginVertical:20}}>
        <LineChart
          data={data3}
          spacing={25}
          pointerConfig={{
            persistPointer:true,
            initialPointerIndex:ptr?.pointerIndex??-1
          }}
          getPointerProps={(props)=>{
            setPtr(props)
          }}
        />
      </View>
    </View>
  )
}