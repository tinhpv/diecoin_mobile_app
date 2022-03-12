import React from 'react'
import { View, Image, StyleSheet, Platform, Text } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'

const PairView = ({ leftToken, rightToken, size }) => {
  const { Images, Layout, Gutters, Fonts } = useTheme()

  return (
    <View style={[Layout.rowHCenter]}>
      <Image
        defaultSource={Images.coin}
        source={{ uri: leftToken.imageUrl }}
        style={styles.image}
      />
      <View style={[Layout.rowBaseline, Gutters.tinyLMargin]}>
        <Text
          style={[size === 'big' ? Fonts.textBigBold : Fonts.textSmallBold]}
        >
          {leftToken.symbol}
        </Text>
        <Text
          style={[
            size === 'big' ? Fonts.subtitleSmallGray : Fonts.subtitleTinyGray,
          ]}
        >
          /{rightToken.symbol}
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 120 },
  area: { opacity: 0 },
  image: { width: 24, height: 24 },
})

PairView.propTypes = {
  leftToken: PropTypes.object.isRequired,
  rightToken: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'big']),
}

PairView.defaultProps = {
  size: 'big',
}

export default PairView
