import React from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from '@/Hooks'
import Carousel, { PaginationLight } from 'react-native-x2-carousel'
import FeatureButton from './Components/FeatureButton'

import Tabs from './Components/Tabs'
import { banners, features, tabs, exchanges } from './DataSource'
import TopCoinView from './Components/TopCoinView'
import ExchangeView from './Components/ExchangeView'

const { width } = Dimensions.get('window')

const HomeContainer = () => {
  const { Images, Layout, Gutters } = useTheme()

  console.log('I rendered')

  const renderItem = data => (
    <View key={data.id} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.image} />
      </View>
    </View>
  )

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <ScrollView style={[Layout.fill]}>
        <View style={[Gutters.smallVMargin, Gutters.smallHMargin]}>
          {/* Tab buttons */}
          <Tabs data={tabs} />

          {/* Carousel */}
          <View style={Gutters.smallVMargin}>
            <Carousel
              pagination={PaginationLight}
              renderItem={renderItem}
              data={banners}
              loop
              autoplay
            />
          </View>

          {/* Horizontal features */}
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            {features.map(item => {
              return (
                <FeatureButton
                  key={item.id}
                  image={item.image}
                  label={item.label}
                />
              )
            })}
          </View>

          {/* Top coin */}
          <View style={[Layout.row]}>
            <TopCoinView />
          </View>

          {/* Exchange */}
          <View>
            {/* BINANCE */}
            <View style={Layout.center}>
              <ExchangeView exchange={exchanges[0]} />
            </View>
            <View
              style={[
                Layout.row,
                Layout.center,
                Layout.justifyContentAround,
                Gutters.largeVMargin,
              ]}
            >
              {/* ETHEREUM */}
              <ExchangeView exchange={exchanges[1]} />
              {/* POLYGON */}
              <ExchangeView exchange={exchanges[2]} />
            </View>
            <View
              style={[Layout.row, Layout.center, Layout.justifyContentAround]}
            >
              {/* KUCOIN */}
              <ExchangeView exchange={exchanges[3]} />
              {/* SOLANA */}
              <ExchangeView exchange={exchanges[4]} />
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.are} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 80 : 45 },
  area: { opacity: 0 },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.93,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.93,
    height: width * 0.4,
  },
})

export default HomeContainer
