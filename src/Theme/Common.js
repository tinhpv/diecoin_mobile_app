/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundLighter: {
        backgroundColor: Colors.lighterBackground,
      },
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      roundedContainer: {
        borderRadius: 16,
        backgroundColor: Colors.darkTransparent,
        paddingHorizontal: 8,
        paddingVertical: 5,
      },
      contentContainerRounded: {
        backgroundColor: Colors.lighterBackground,
        borderRadius: 16,
        padding: 16,
        marginVertical: 12,
        marginHorizontal: -5,
      },
      tintColorSuccess: {
        tintColor: Colors.success,
      },
      tintColorError: {
        tintColor: Colors.error,
      },
      tintColorWhite: {
        tintColor: Colors.white,
      },
    }),
  }
}
