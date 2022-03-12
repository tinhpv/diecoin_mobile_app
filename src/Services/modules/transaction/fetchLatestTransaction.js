export default build =>
  build.query({
    query: ({ exchange, tokenId, lastTrxId, lastTrxTimestamp }) => {
      return `/transaction/fetchByToken/latest/${exchange}/${tokenId}?trxId=${lastTrxId}&trxTime=${lastTrxTimestamp}`
    },
  })
