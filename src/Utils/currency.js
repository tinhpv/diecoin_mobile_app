export const toCurrency = num => {
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
