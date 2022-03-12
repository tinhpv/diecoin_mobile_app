export default build =>
  build.query({
    query: ({ exchange, tokenId }) =>
      `/token/fetchSocialNetwork/${exchange}/${tokenId}`,
  })
