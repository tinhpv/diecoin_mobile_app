export default build =>
  build.query({
    query: ({ exchange, tokenId }) => `/token/info/${exchange}/${tokenId}`,
  })
