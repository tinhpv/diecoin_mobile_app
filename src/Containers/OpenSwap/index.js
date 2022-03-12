import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '@/Hooks'

const OpenSwapContainer = ({ route }) => {
  const { Layout } = useTheme()
  const { url } = route.params

  return (
    <View style={[Layout.fill, styles.container]}>
      <WebView source={{ uri: url }} style={Layout.fullSize} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 55 },
  area: { opacity: 0 },
})

export default OpenSwapContainer
