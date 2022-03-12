export default build =>
  build.query({
    query: ({ exchange, tokenId }) => {
      console.log(exchange, tokenId)
      return `/pair/fetchPairIdListByTokenId/${exchange}/${tokenId}`
    },
  })
