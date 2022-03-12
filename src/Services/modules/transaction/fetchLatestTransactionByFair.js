export default build =>
  build.query({
    query: ({ exchange, pairId, lastTrxId, lastTrxTimestamp }) => {
      return `/transaction/fetch/latest/${exchange}/${pairId}?trxId=${lastTrxId}&trxTime=${lastTrxTimestamp}`
    },
  })
