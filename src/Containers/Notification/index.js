import React from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Text,
} from 'react-native'
import { useTheme } from '@/Hooks'
import AlertView from '@/Components/AlertView'

const NotificationContainer = () => {
  const { Images, Layout, Gutters, Fonts } = useTheme()

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        <Text style={[Fonts.titleRegular]}>Alert</Text>
        <View style={[Layout.fill, Gutters.largeTMargin]}>
          <AlertView
            image={Images.comingSoon}
            title="Sorry!"
            message="Feature in development"
          />
        </View>
      </View>
      <SafeAreaView style={styles.are} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 45 },
  area: { opacity: 0 },
})

export default NotificationContainer
