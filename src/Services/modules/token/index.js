import { api } from '../../api'
import searchToken from './searchToken'
import fetchSocialNetworkInfo from './fetchSocialNetworkInfo'
import fetchTokenInfo from './fetchTokenInfo'
import fetchTrendingToken from './fetchTrendingToken'
import fetchTop3TokenInfo from './fetchTop3TokenInfo'

export const tokenApi = api.injectEndpoints({
  endpoints: build => ({
    searchToken: searchToken(build),
    fetchSocialNetworkInfo: fetchSocialNetworkInfo(build),
    fetchTokenInfo: fetchTokenInfo(build),
    fetchTrendingToken: fetchTrendingToken(build),
    fetchTop3TokenInfo: fetchTop3TokenInfo(build),
  }),
  overrideExisting: false,
})

export const {
  useLazySearchTokenQuery,
  useFetchSocialNetworkInfoQuery,
  useFetchTokenInfoQuery,
  useLazyFetchTrendingTokenQuery,
  useLazyFetchTop3TokenInfoQuery,
} = tokenApi
