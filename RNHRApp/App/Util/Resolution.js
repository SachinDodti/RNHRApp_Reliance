import { PixelRatio, Platform } from 'react-native';

/*
Assumption to use this function:

The value received is given as per the size required for mdpi device.
For Example:
if the given UX and its style guide is for Xhdpi devices but our application
needs to be developed for all the device resolutions, then convert the given value
to the value equilent to the size for mdpi device.
Let consider, 40 is the font value given in the style guide created for Xhdpi device.
First, when develop the screen, convert the value to mdpi by divide it by 2.
Now,The result is in mdpi. Call this method with the mdpi value.
so, in future on whichever device resolution, app will scale this value to the current
device resolution.

Note: Resolution should be used only for fontSize. For padding size, height, width etc.. should
be given in % value to support for orientation.
*/
export const convertToDeviceResolution = (dp) => {
  // Get current device resolution.
  // https://facebook.github.io/react-native/docs/pixelratio#getpixelsizeforlayoutsize
  // let deviceResolution = PixelRatio.get();

  // Multiply the given value with current device resolution.
  const currentValue = PixelRatio.getPixelSizeForLayoutSize(dp);// * deviceResolution;

  return currentValue;
};

export const getDeviceFontSize = (pt) => {
  const factor = Platform.OS === 'ios' ? 0.5 : 0.5;
  const currentValue = convertToDeviceResolution(pt * factor);

  return currentValue;
};
