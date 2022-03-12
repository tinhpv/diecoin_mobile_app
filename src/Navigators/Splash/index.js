import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartUp = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={[Fonts.textCenter, Fonts.textBigBold]}>DieCoin.app</Text>
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  )
}
export default StartUp
