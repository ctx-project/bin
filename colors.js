function getCodes(pair) {
	return [`\u001b[${pair[0]}m`, `\u001b[${pair[1]}m`];
}

module.exports = {
	codes: {
		reset: getCodes([0, 0]),
		bright: getCodes([1, 22]),
		dim: getCodes([2, 22]),
		italic: getCodes([3, 23]),
		underline: getCodes([4, 24]),
		inverse: getCodes([7, 27]),
		hidden: getCodes([8, 28]),
		strikethrough: getCodes([9, 29]),
	},
	format(text, style) {
		return `${this.codes[style][0]}${text}${this.codes[style][1]}`;
	}
}