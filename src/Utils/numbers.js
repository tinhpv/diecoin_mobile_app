export const abbreviate = num => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num
}

export const removeExponents = num => {
  let data = String(num).split(/[eE]/)

  if (data.length === 1) {
    return data[0]
  }

  let z = '',
    sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1

  if (mag < 0) {
    z = sign + '0.'
    while (mag++) {
      z += '0'
    }
    return z + str.replace(/^-/, '')
  }

  mag -= str.length
  while (mag--) {
    z += '0'
  }

  return str + z
}

export const amountOfNumberToBeRounded = num => {
  if (num >= 10) {
    return 2
  } else if (num >= 1) {
    return 5
  } else if (num >= 0.00001) {
    return 7
  } else if (num >= 0.000000001) {
    return 10
  }
  return 14
}

export const displayPrice = price => {
  let fullPrice = removeExponents(price)
  return Number(fullPrice).toFixed(amountOfNumberToBeRounded(Number(fullPrice)))
}

export const displayPercent = percent => {
  return percent.toFixed(2)
}
