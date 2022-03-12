import React, { useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  LogBox,
} from 'react-native'
import Separator from '@/Components/Separator'
import { useTheme } from '@/Hooks'
import { useFetchTopTradeQuery } from '@/Services/modules/transaction'

const CheckTransactionView = ({ exchange, tokenId, type }) => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { isLoading, data, isSuccess } = useFetchTopTradeQuery({
    exchange,
    tokenId,
    type,
  })

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  const header = () => {
    return (
      <View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentCenter,
            Gutters.smallVPadding,
          ]}
        >
          <View style={[Layout.row, Layout.fill, Layout.justifyContentCenter]}>
            {/* ADDRESS */}
            <Text
              style={[Fonts.subtitleTinyGray, styles.label, Fonts.textRight]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              Address
            </Text>

            {/* AMOUNT */}
            <Text style={[Fonts.subtitleTinyGray, Gutters.tinyLMargin]}>
              Amount
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[Fonts.subtitleTinyGray, Gutters.smallRMargin]}>
              Track
            </Text>
          </TouchableOpacity>
        </View>

        <Separator />
      </View>
    )
  }

  const row = ({ item }) => {
    return (
      <View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentCenter,
            Gutters.smallVPadding,
          ]}
        >
          <View style={[Layout.row, Layout.fill, Layout.justifyContentCenter]}>
            {/* ADDRESS */}
            <Text
              style={[Fonts.subtitleSmallBlue, styles.label]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {item.address}
            </Text>

            {/* AMOUNT */}
            <Text
              style={[
                type === 'seller' ? Fonts.textTinyError : Fonts.textTinySuccess,
                Gutters.tinyLMargin,
              ]}
            >
              ${item.amount.toFixed(3)}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[Fonts.subtitleSmallBlue, Gutters.smallRMargin]}>
              Track
            </Text>
          </TouchableOpacity>
        </View>

        <Separator />
      </View>
    )
  }

  return (
    <View>
      {isLoading && (
        <ActivityIndicator style={Gutters.smallTMargin} size={'small'} />
      )}
      <View style={[styles.table, Gutters.tinyTMargin]}>
        {isSuccess && (
          <>
            {header()}
            <FlatList
              keyExtractor={item => item.address}
              data={data.topTrade}
              renderItem={row}
            />
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  table: { width: '100%', height: 500 },
  label: { width: 120 },
})

export default CheckTransactionView
