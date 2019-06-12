interface ShapeCurrencyParams {
  amount: number
  toFixed?: number
  prefix?: string
}

export type ShapeCurrency = (params: ShapeCurrencyParams) => string

const shapeCurrency: ShapeCurrency = ({ amount = 0, toFixed = 0, prefix = '' }) => {
  var sign = Math.sign(amount) === -1 ? '-' : ''

  const amountString = new Array(2).concat([Math.abs(amount)]).join('0')

  const length = amountString.length

  const parsedFloat = parseFloat(
    `${sign}${amountString.substring(0, length - 2)}.${amountString.substr(length - 2, length)}`
  )

  return `${prefix}${parsedFloat.toFixed(toFixed)}`
}

export default shapeCurrency
