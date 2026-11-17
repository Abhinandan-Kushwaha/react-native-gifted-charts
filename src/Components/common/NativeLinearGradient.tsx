import {View} from 'react-native';
import {LinearGradientProps} from './LinearGradient';

const NativeLinearGradient = (props: LinearGradientProps) => {
  const {style, colors, children} = props;

  const direction = 'bottom'; // TODO: add support for other directions

  return (
    <View
      style={[
        style,
        {
          backgroundImage: `linear-gradient(to ${direction}, ${colors.join(', ')})`,
        },
      ]}>
      {children}
    </View>
  );
};

export default NativeLinearGradient;
