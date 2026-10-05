import {useEffect, useRef} from 'react';
import {Dimensions, Platform} from 'react-native';

const versionObj = Platform.constants?.reactNativeVersion ?? {};
const {
  major: msb,
  minor: mid,
  patch: lsb
} = versionObj;

export const rnVersion =
  (!isNaN(msb) ? msb : 0) * 1000000 +
  (!isNaN(mid) ? mid : 0) * 10000 +
  (!isNaN(lsb) ? lsb : 0);

export const screenWidth = Dimensions.get('window').width;

export function usePrevious(value: string) {
  const ref = useRef('');
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

export const isWebApp = Platform.OS === 'web';
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
