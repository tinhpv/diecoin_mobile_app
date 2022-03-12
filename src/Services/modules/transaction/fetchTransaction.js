export default build =>
  build.query({
    query: ({
      exchange,
      tokenId,
      limit = 10,
      lastTime = null,
      lastTransactionId = null,
    }) => {
      var url = `/transaction/fetchByToken/${exchange}/${tokenId}?limit=${limit}`
      if (lastTime) {
        url = lastTime && url.concat(`&lastTime=${lastTime}`)
      }

      if (lastTransactionId) {
        url = url.concat(`&lastTrx=${lastTransactionId}`)
      }

      console.log(url)

      return url
    },
  })
