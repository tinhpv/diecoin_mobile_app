import { api } from '../../api'
import fetchTransaction from './fetchTransaction'
import fetchTopTrade from './fetchTopTrade'
import fetchLatestTransaction from './fetchLatestTransaction'
import fetchLatestTransactionByFair from './fetchLatestTransactionByFair'
import fetchTransactionByPair from './fetchTransactionByPair'

export const transactionApi = api.injectEndpoints({
  endpoints: build => ({
    fetchTransaction: fetchTransaction(build),
    fetchTransactionByPair: fetchTransactionByPair(build),
    fetchTopTrade: fetchTopTrade(build),
    fetchLatestTransaction: fetchLatestTransaction(build),
    fetchLatestTransactionByFair: fetchLatestTransactionByFair(build),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchTransactionQuery,
  useLazyFetchTransactionByPairQuery,
  useFetchTopTradeQuery,
  useLazyFetchLatestTransactionQuery,
  useLazyFetchLatestTransactionByFairQuery,
} = transactionApi
