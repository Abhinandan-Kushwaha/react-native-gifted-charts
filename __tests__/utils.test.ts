describe('platform utilities', () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock('react-native');
  });

  it.each([
    ['web without constants', {OS: 'web'}, 0],
    ['web without a native version', {OS: 'web', constants: {}}, 0],
    [
      'iOS before 0.72',
      {
        OS: 'ios',
        constants: {reactNativeVersion: {major: 0, minor: 71, patch: 0}},
      },
      710000,
    ],
    [
      'iOS since 0.72',
      {
        OS: 'ios',
        constants: {reactNativeVersion: {major: 0, minor: 72, patch: 4}},
      },
      720004,
    ],
    [
      'Android',
      {
        OS: 'android',
        constants: {reactNativeVersion: {major: 0, minor: 87, patch: 1}},
      },
      870001,
    ],
    [
      'a nonzero major version',
      {
        OS: 'android',
        constants: {reactNativeVersion: {major: 1, minor: 2, patch: 3}},
      },
      1020003,
    ],
  ])('loads with %s', (_name, platform, expectedVersion) => {
    jest.doMock(
      'react-native',
      () => ({
        Platform: platform,
        Dimensions: {get: () => ({width: 390, height: 844})},
      }),
      {virtual: true},
    );
    const utils = require('../src/utils');
    expect(utils.rnVersion).toBe(expectedVersion);
    expect(utils.screenWidth).toBe(390);
    expect(utils.isWebApp).toBe(platform.OS === 'web');
    expect(utils.isIos).toBe(platform.OS === 'ios');
    expect(utils.isAndroid).toBe(platform.OS === 'android');
  });
});
