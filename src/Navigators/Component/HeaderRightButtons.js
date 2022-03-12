import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

const HeaderRightButton = ({ items }) => {
  const { Gutters, Layout, Common } = useTheme()

  return (
    <View style={[Layout.rowVCenter]}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={item.action}>
          <Image
            style={[Gutters.regularRMargin, Common.button.header]}
            source={item.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default HeaderRightButton
