import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

const Tab = ({ selected, label, onPress }) => {
  const { Fonts } = useTheme()

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={selected ? Fonts.textSmallSecondaryBold : Fonts.textSmall}>
          {label}
        </Text>
      </TouchableOpacity>
      {selected && <Indicator />}
    </View>
  )
}

const Tabs = ({ data }) => {
  const { Layout } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <View style={[Layout.row, Layout.justifyContentBetween]}>
      {data.map(item => {
        return (
          <View key={item.id}>
            <Tab
              selected={item.id === selectedIndex}
              label={item.label}
              onPress={() => setSelectedIndex(item.id)}
            />
          </View>
        )
      })}
    </View>
  )
}

const Indicator = () => {
  return <View style={styles.indicator} />
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#f3ba2b',
    height: 2,
    width: '100%',
  },
})

export default Tabs
