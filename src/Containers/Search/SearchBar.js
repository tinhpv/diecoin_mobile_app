import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Image, Platform } from 'react-native'
import { useTheme } from '@/Hooks'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchBar = ({ placeholder, searchTerm, setSearchTerm, onSubmit }) => {
  const { Images, Colors } = useTheme()
  const [closeButtonVisible, setCloseButtonVisible] = useState(false)

  return (
    <View
      style={[styles.search, { backgroundColor: Colors.lighterBackground }]}
    >
      <Image source={Images.search} style={styles.image} />
      <TextInput
        autoFocus={true}
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="search"
        style={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={value => {
          setSearchTerm(value)
          setCloseButtonVisible(value.length > 0)
          console.log(value)
        }}
        placeholderTextColor="gray"
      />
      {closeButtonVisible && (
        <TouchableOpacity onPress={() => setSearchTerm('')}>
          <Image source={Images.closeFilled} style={styles.close} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: { width: 14, height: 14, tintColor: 'white' },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 10,
    marginVertical: Platform.OS === 'ios' ? null : -4,
    color: 'white',
  },
  close: {
    width: 12,
    height: 12,
    tintColor: '#919191',
  },
})

export default SearchBar
