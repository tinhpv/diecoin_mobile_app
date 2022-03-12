export default build =>
  build.query({
    query: ({ exchange, pairId }) => {
      return `/pair/fetchPairDetail/${exchange}/${pairId}`
    },
  })
