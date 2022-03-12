export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  darkTransparent: 'rgba(0, 0, 0, 0.36)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#ffff',
  gray: '#949494',
  darkGray: '#222222',
  primary: '#E14032',
  secondary: '#f3ba2b',
  lightBlue: '#294866',
  lighterBackground: '#162B3F',
  background: '#1D202E',
  success: '#28a745',
  error: '#dc3545',
  blue: '#3eb8ff',
}

export const NavigationColors = {
  primary: Colors.secondary,
  barButtonBackground: Colors.lighterBackground,
  unselectedColor: Colors.white,
}

export const FontSize = {
  little: 8,
  tiny: 11,
  small: 14,
  regular: 16,
  big: 19,
  large: 25,
}

/**
 * Metrics Sizes
 */
const little = 5
const tiny = 8
const small = tiny * 2
const regular = tiny * 3
const large = regular * 2
const extremelyLarge = large * 2
export const MetricsSizes = {
  little,
  tiny,
  small,
  regular,
  large,
  extremelyLarge,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
