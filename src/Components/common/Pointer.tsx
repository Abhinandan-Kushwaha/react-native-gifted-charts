import React from 'react';
import {View} from 'react-native';

export const Pointer = props => {
  const {
    pointerX,
    pointerYLocal,
    pointerComponent,
    pointerHeight,
    pointerRadius,
    pointerWidth,
    pointerItemLocal,
    pointerColorLocal,
  } = props;
  return (
    <View
      style={{
        position: 'absolute',
        left: pointerX + (pointerX.pointerShiftX || 0),
        top: pointerYLocal - 2,
      }}>
      {pointerComponent ? (
        pointerComponent()
      ) : (
        <View
          style={{
            height: pointerHeight || pointerRadius * 2,
            width: pointerWidth || pointerRadius * 2,
            marginTop: pointerItemLocal?.pointerShiftY || 0,
            backgroundColor: pointerColorLocal,
            borderRadius: pointerRadius || 0,
          }}
        />
      )}
    </View>
  );
};
