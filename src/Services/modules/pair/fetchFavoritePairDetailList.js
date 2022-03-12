export default build =>
  build.mutation({
    query: ({ body }) => {
      return {
        url: '/pair/favorite/fetchPairDetailList',
        method: 'POST',
        body,
      }
    },
  })
