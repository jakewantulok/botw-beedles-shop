export const discount = (item, price) => 100 - ((item.price / item.bulk / price) * 100).toFixed(0);
