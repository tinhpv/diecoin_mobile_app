import { api } from '../../api'
import searchToken from './searchToken'
import fetchSocialNetworkInfo from './fetchSocialNetworkInfo'
import fetchTokenInfo from './fetchTokenInfo'
import fetchTrendingToken from './fetchTrendingToken'

export const tokenApi = api.injectEndpoints({
  endpoints: build => ({
    searchToken: searchToken(build),
    fetchSocialNetworkInfo: fetchSocialNetworkInfo(build),
    fetchTokenInfo: fetchTokenInfo(build),
    fetchTrendingToken: fetchTrendingToken(build),
  }),
  overrideExisting: false,
})

export const {
  useLazySearchTokenQuery,
  useFetchSocialNetworkInfoQuery,
  useFetchTokenInfoQuery,
  useLazyFetchTrendingTokenQuery,
} = tokenApi
