export default build =>
  build.query({
    query: ({ exchange, tokenId, type }) =>
      `/transaction/fetchByToken/topTrade/${exchange}/${tokenId}?type=${type}`,
  })
