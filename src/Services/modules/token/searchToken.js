export default build =>
  build.query({
    query: ({ searchTerm, exchange }) => {
      return `/token/search/${exchange}/${searchTerm}`
    },
  })
