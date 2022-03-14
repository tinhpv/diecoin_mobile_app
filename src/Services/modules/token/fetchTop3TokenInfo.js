export default build =>
  build.query({
    query: () => '/token/fetchTop3TokenInfo',
  })
