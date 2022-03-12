import React, { useRef } from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native'

import { useTheme } from '@/Hooks'
import PairView from './Components/PairView'
import CopiableInfoView from './Components/CopiableInfoView'
import ChartBox from './Components/DetailInfoView'
import ActionStack from './Components/ActionStack'
import TransactionView from './Components/Transaction'

const DetailContainer = ({ route }) => {
  const { Images, Layout, Gutters } = useTheme()
  const { pairDetail, exchange } = route.params
  const { token0, token1 } = pairDetail
  const scrollViewRef = useRef()

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <ScrollView style={Layout.fill} ref={scrollViewRef}>
        <View style={[Layout.fill, Gutters.smallHMargin]}>
          {/* e.g: TRX / BSB */}
          <PairView leftToken={token0} rightToken={token1} />

          {/* Token address - Pair address */}
          <View style={[Layout.row, Gutters.tinyVMargin]}>
            <CopiableInfoView label="Token" content={token0.id} />
            <CopiableInfoView label="Pair" content={pairDetail.id} />
          </View>

          {/* Call to action stack */}
          <ActionStack
            exchange={exchange}
            tokenId={token0.id}
            pairId={pairDetail.id}
          />

          {/* Detail info and Chart */}
          <View style={Gutters.tinyVMargin}>
            <ChartBox detail={pairDetail} exchange={exchange} />
          </View>

          {/* Detail info and Chart */}
          <View style={Gutters.tinyBMargin}>
            <TransactionView
              scrollViewRef={scrollViewRef}
              detail={pairDetail}
              exchange={exchange}
            />
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.area} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 90 : 55 },
  area: { opacity: 0 },
})

export default DetailContainer
