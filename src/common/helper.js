function shorthand(amount, shorthand = true) {
  // Shorthands
  const shorthands = [null, "K", "M", "B", "T", "Q"];

  // If not shorthand and under a million, return normal number
  if (!shorthand && amount < 1_000_000) {
    return `${Intl.NumberFormat("number").format(amount)}`;
  }

  // Otherwise get shorthand
  const index = Math.floor((amount.toString().length - 1) / 3);
  let num = amount / Math.pow(1000, index);

  // Floor to 3rd place
  num = Math.floor(num * 1000) / 1000;

  // If shorthand, remove the decimal
  // if (shorthand) num = Math.floor(num);

  return `${num}${index > 0 ? shorthands[index] : ""}`;
}

function upgradeCost(baseAmount, level) {
  return Math.floor(baseAmount + baseAmount * (level * 0.1));
}

export default {
  shorthand,
  upgradeCost,
};
