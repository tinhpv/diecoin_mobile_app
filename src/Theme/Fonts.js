import { StyleSheet } from 'react-native'

export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textTiny: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.tiny,
      color: Colors.text,
    },
    textSmall: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textSmallSecondary: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.secondary,
    },
    textSmallSecondaryBold: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.secondary,
      fontWeight: 'bold',
    },
    textSmallBold: {
      fontFamily: 'utm-avo',
      fontWeight: '500',
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textSmallSuccess: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.success,
    },
    textTinySuccess: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.tiny,
      color: Colors.success,
    },
    textSmallBoldSuccess: {
      fontFamily: 'utm-avo',
      fontWeight: 'bold',
      fontSize: FontSize.tiny,
      color: Colors.success,
    },
    textLittleSuccess: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.little,

      color: Colors.success,
    },
    textSmallError: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.error,
    },
    textTinyError: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.tiny,
      color: Colors.error,
    },
    textExtremelySmallSuccess: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.extremelySmall,
      fontWeight: 'bold',
      color: Colors.success,
    },
    textExtremelySmallError: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.extremelySmall,
      fontWeight: 'bold',
      color: Colors.error,
    },
    textRegular: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textRegularBold: {
      fontFamily: 'utm-avo',
      fontWeight: 'bold',
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textBigBold: {
      fontFamily: 'utm-avo',
      fontWeight: 'bold',
      fontSize: FontSize.big,
      color: Colors.text,
    },
    textLarge: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.large,
      color: Colors.text,
    },
    textLargeBold: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.large,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleSmall: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.regular * 2,
      color: Colors.text,
    },
    titleLarge: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    subtitleSmallGray: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.gray,
    },
    subtitleTinyGray: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.tiny,
      color: Colors.gray,
    },
    subtitleSmallBlue: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.tiny,
      color: Colors.blue,
    },
    subtitleRegularGray: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.small,
      color: Colors.gray,
    },
    subtitleBigGray: {
      fontFamily: 'utm-avo',
      fontSize: FontSize.big,
      color: Colors.gray,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
