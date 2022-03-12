import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Text,
  FlatList,
} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'

import ExchangeView from './Components/ExchangeView'
import { useTheme } from '@/Hooks'
import { exchangeList, supportedExchange } from './exchangeList'
import { navigate } from '@/Navigators/utils'

const SwapContainer = () => {
  const { Images, Layout, Gutters, Fonts, Colors } = useTheme()
  const [showAlert, setShowAlert] = useState(false)

  const renderExchange = ({ item }) => (
    <ExchangeView
      exchange={item}
      onPress={() => {
        if (supportedExchange.includes(item.key)) {
          navigate('OpenSwap', {
            screen: 'OpenSwapScreen',
            params: {
              url: item.url,
            },
          })
        } else {
          setShowAlert(true)
        }
      }}
    />
  )

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        <Text style={[Fonts.titleRegular]}>Swap</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={exchangeList}
          keyExtractor={item => item.id}
          renderItem={renderExchange}
        />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Sorry!"
        message="It is under development"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Got it!"
        confirmButtonColor={Colors.secondary}
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
      <SafeAreaView style={styles.are} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 45 },
  area: { opacity: 0 },
})

export default SwapContainer
