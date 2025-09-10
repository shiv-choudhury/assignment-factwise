export default function localPrice(price, country = "IN") {
  const currencyMap = {
    IN: { locale: "en-IN", currency: "INR", currencySymbol: "₹" },
    LK: { locale: "si-LK", currency: "LKR", currencySymbol: "LKR" },
    US: { locale: "en-US", currency: "USD", currencySymbol: "$" }
  };

  const { locale, currency, currencySymbol } = currencyMap[country];

  if (typeof price === "string") {
    price = Number(price);
  }

  const options = { style: "currency", currency };
  if (Number.isInteger(price)) {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  }

  return (
    price?.toLocaleString(locale, options) || `${currencySymbol} ${price || 0}`
  );
}
