export default build =>
  build.query({
    query: () => '/token/searchTrendingToken',
  })
