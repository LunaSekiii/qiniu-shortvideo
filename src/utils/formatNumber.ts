export function formatNumber(num: number, decimalPlaces: number = 1): string {
	// 判断数字的大小，进行格式化
	const units = ["k", "m", "b"];
	let formattedNum = "";
	let unitIndex = 0;

	while (num >= 1000) {
		if (unitIndex >= units.length) return "999b+";
		num /= 1000;
		formattedNum = units[unitIndex];
		unitIndex++;
	}

	return num.toFixed(decimalPlaces) + formattedNum;
}
