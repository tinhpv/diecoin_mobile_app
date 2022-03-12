export default build =>
  build.mutation({
    query: ({ body, exchange }) => {
      console.log(body)
      return {
        url: `/pair/fetchPairDetailList/${exchange}`,
        method: 'POST',
        body,
      }
    },
  })
