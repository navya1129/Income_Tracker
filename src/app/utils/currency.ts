/**
 * Format number in Indian numbering system (₹1,25,000)
 */
export function formatIndianCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Split into integer and decimal parts
  const [integerPart, decimalPart] = absAmount.toFixed(2).split('.');
  
  // Apply Indian number formatting
  let formatted = '';
  let count = 0;
  
  for (let i = integerPart.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formatted = ',' + formatted;
    }
    formatted = integerPart[i] + formatted;
    count++;
  }
  
  return `${isNegative ? '-' : ''}₹${formatted}.${decimalPart}`;
}

/**
 * Format number in Indian numbering system without decimals
 */
export function formatIndianCurrencyWhole(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  const integerPart = Math.round(absAmount).toString();
  
  let formatted = '';
  let count = 0;
  
  for (let i = integerPart.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formatted = ',' + formatted;
    }
    formatted = integerPart[i] + formatted;
    count++;
  }
  
  return `${isNegative ? '-' : ''}₹${formatted}`;
}
