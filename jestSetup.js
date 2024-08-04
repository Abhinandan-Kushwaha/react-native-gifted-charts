// jestSetup.js
jest.mock('react-native', () => {
    const actualReactNative = jest.requireActual('react-native');
  
    return {
      ...actualReactNative,
      Animated: {
        ...actualReactNative.Animated,
        timing: (value, config) => ({
          start: (callback) => {
            value.setValue(config.toValue);
            if (callback) {
              callback({ finished: true });
            }
          },
        }),
      },
    };
  });
  