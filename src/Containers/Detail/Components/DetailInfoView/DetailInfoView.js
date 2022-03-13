import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import { LabelContentView } from '@/Components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { abbreviate } from '@/Utils/numbers'
import { useFetchTokenInfoQuery } from '@/Services/modules/token'

const DetailInfoView = ({ exchange, detail }) => {
  const { Layout, Gutters, Images } = useTheme()
  const [isTurningUp, setIsTurningUp] = useState(false)
  const { token0, token1 } = detail
  const { isLoading, data, isSuccess } = useFetchTokenInfoQuery({
    exchange,
    tokenId: token0.id,
  })

  const infoWithImage = (image, label, content) => {
    return (
      <View style={Layout.rowHCenter}>
        <Image source={image} style={[styles.image, Gutters.tinyRMargin]} />
        <LabelContentView label={label} content={content} />
      </View>
    )
  }

  const exchangeImage = () => {
    switch (exchange) {
      case 'pancake':
        return Images.pancake
      case 'raydium':
        return Images.raydium
      case 'sushi_matic':
        return Images.sushiswap
      case 'uniswap':
        return Images.uniswap
    }
  }

  const alwaysShownView = () => {
    return (
      <View style={[Layout.rowHCenter, Gutters.tinyVMargin]}>
        <View
          style={[
            Layout.rowHCenter,
            Layout.scrollSpaceBetween,
            Gutters.regularRMargin,
          ]}
        >
          {infoWithImage(
            exchangeImage(),
            'Liquidity',
            abbreviate(detail.tvl.toFixed(7)),
          )}
          <LabelContentView
            label="Market"
            content={`${
              isSuccess ? abbreviate(data.tokenInfoOnChain.marketCap) : 'N/A'
            }`}
            leftAlign={false}
          />
        </View>
        <TouchableOpacity onPress={() => setIsTurningUp(!isTurningUp)}>
          <Image
            source={isTurningUp ? Images.up : Images.down}
            style={styles.imageToggle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  // LEFT - COLUMN
  const firstColumn = () => {
    return (
      <View>
        {/* 1 */}
        <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
          <Image
            defaultSource={Images.coin}
            source={{ uri: token1.imageUrl }}
            style={[styles.image, Gutters.tinyRMargin]}
          />
          <LabelContentView
            label={`1 ${token1.symbol}`}
            content={`${token0.price.toFixed(6)}`}
          />
        </View>
        {/* 2 */}
        <View style={[Layout.rowHCenter, Gutters.tinyBMargin]}>
          <Image
            defaultSource={Images.coin}
            source={{ uri: token0.imageUrl }}
            style={[styles.image, Gutters.tinyRMargin]}
          />
          <LabelContentView
            label={`1 ${token0.symbol}`}
            content={`${token1.price.toFixed(6)}`}
          />
        </View>
        {/* 3 */}
        <View style={Gutters.tinyBMargin}>
          <LabelContentView
            label="Volume 24h"
            content={`${abbreviate(detail.vol24h)}`}
          />
        </View>
      </View>
    )
  }

  // RIGHT - COLUMN
  const secondColumn = () => (
    <View>
      {/* 1 */}
      <View style={Gutters.tinyBMargin}>
        <LabelContentView
          label={`${token1.symbol} amount`}
          content={`${abbreviate(token1.reserve.toFixed(2))}`}
          leftAlign={false}
        />
      </View>
      {/* 2 */}
      <View style={Gutters.tinyBMargin}>
        <LabelContentView
          label={`${token0.symbol} amount`}
          content={`${abbreviate(token0.reserve.toFixed(2))}`}
          leftAlign={false}
        />
      </View>
      {/* 3 */}
      <View style={Gutters.tinyBMargin}>
        <LabelContentView
          label="Total supply"
          content={`${
            isLoading ? 'N/A' : abbreviate(data.tokenInfoOnChain.totalSupply)
          }`}
          leftAlign={false}
        />
      </View>
    </View>
  )

  return (
    <View>
      {alwaysShownView()}
      <View
        style={[
          Layout.rowHCenter,
          Layout.scrollSpaceBetween,
          styles.customRowMargin,
        ]}
      >
        {isTurningUp && firstColumn()}
        {isTurningUp && secondColumn()}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  customRowMargin: {
    marginRight: 36,
  },
  image: {
    width: 22,
    height: 22,
    borderRadius: 25 / 2,
  },
  imageToggle: {
    width: 12,
    height: 12,
    tintColor: 'white',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#909090',
  },
})

export default DetailInfoView
