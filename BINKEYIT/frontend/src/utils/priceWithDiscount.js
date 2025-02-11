export const priceWithDiscount = (price, discount = 1) => {
   const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
   return (Number(price) - Number(discountAmount));
}