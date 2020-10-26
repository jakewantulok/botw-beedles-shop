export const formatCurrency = (num = 0, type = 'en-US') => {
	const tender = type => {
		switch (type) {
			case 'de-DE':
				return 'EUR';
			case 'ja-JP':
				return 'JPY';
			default:
				return 'USD';
		}
	};

	const currencyConfig = {
		style: 'currency',
		currency: `${tender(type)}`,
	};

	return new Intl.NumberFormat(type, currencyConfig).format(num);
};
