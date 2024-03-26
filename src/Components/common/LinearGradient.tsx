import React from 'react';

type LinearGradientProps = {
  style?: any;
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  colors: string[];
  children?: any;
};

let LinearGradient: React.FC<LinearGradientProps>;

try {
  // for bare react-native projects
  LinearGradient = require('react-native-linear-gradient').LinearGradient;
} catch (e) {
  try {
    // for expo-based projects
    LinearGradient = require('expo-linear-gradient').LinearGradient;
  } catch (e) {
    throw new Error(
      'Gradient package was not found. Make sure "react-native-linear-gradient" or "expo-linear-gradient" is installed',
    );
  }
}

export default LinearGradient;
