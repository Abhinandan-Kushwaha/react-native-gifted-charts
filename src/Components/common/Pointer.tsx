import {View} from 'react-native';

export const Pointer = (props: any) => {
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
  if (isNaN(pointerYLocal) || typeof pointerYLocal !== 'number') return null;

  return (
    <View
      style={{
        position: 'absolute',
        left: pointerX + 1 + (pointerX.pointerShiftX || 0),
        top: pointerYLocal - 4,
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
