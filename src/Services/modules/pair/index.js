import { api } from '../../api'
import fetchPairIdList from './fetchPairIdList'
import fetchPairDetailList from './fetchPairDetailList'
import fetchFavoritePairDetailList from './fetchFavoritePairDetailList'
import fetchPairDetail from './fetchPairDetail'

export const pairApi = api.injectEndpoints({
  endpoints: build => ({
    fetchPairList: fetchPairIdList(build),
    fetchPairDetailList: fetchPairDetailList(build),
    fetchFavoritePairDetailList: fetchFavoritePairDetailList(build),
    fetchPairDetail: fetchPairDetail(build),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchPairListQuery,
  useFetchPairDetailListMutation,
  useFetchFavoritePairDetailListMutation,
  useLazyFetchPairDetailQuery,
} = pairApi
