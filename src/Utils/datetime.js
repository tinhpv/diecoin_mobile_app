export const convertToDateString = timeStamp => {
  const date = new Date(timeStamp)
  return `${date.toLocaleDateString('en-US')} `
}

export const convertToTimeString = timeStamp => {
  const date = new Date(timeStamp)
  return `${date.toLocaleTimeString('en-US')} `
}
