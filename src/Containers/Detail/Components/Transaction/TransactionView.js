import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { useMainToken } from '../../Hooks/useMainToken'
import { useSearchTerm } from '@/Containers/Search/Hooks/useSearchTerm'
import SegmentedControlTab from 'react-native-segmented-control-tab'

import TokensView from './TokensView'
import CheckTransactionView from './CheckTransactionView'

const TransactionView = ({ detail, exchange }) => {
  const { Fonts, Common, Gutters } = useTheme()
  const [selectedTab, setSelectedTab] = useState(0)
  const searchTerm = useSearchTerm()
  const { mainToken } = useMainToken(detail, searchTerm)

  return (
    <View style={[Common.contentContainerRounded]}>
      <View style={Gutters.tinyVMargin}>
        <SegmentedControlTab
          values={['Tokens', 'Check Seller', 'Check Buyer']}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={[Fonts.subtitleTinyGray]}
          activeTabTextStyle={[Fonts.subtitleSmall]}
          selectedIndex={selectedTab}
          onTabPress={index => {
            setSelectedTab(index)
          }}
        />
      </View>
      {selectedTab === 0 && <TokensView detail={detail} exchange={exchange} />}
      {selectedTab === 1 && (
        <CheckTransactionView
          exchange={exchange}
          tokenId={mainToken.id}
          type="seller"
        />
      )}
      {selectedTab === 2 && (
        <CheckTransactionView
          exchange={exchange}
          tokenId={mainToken.id}
          type="buyer"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tabStyle: { backgroundColor: 'transparent', borderColor: 'white' },
  activeTabStyle: { backgroundColor: '#294866' },
})

export default TransactionView
