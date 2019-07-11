const REG_NUMBER = /^[0-9]*$/
const REG_DECIMAL = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
export const isNumber = (val) => {
	if (!val) return false
	return REG_NUMBER.test(val)
}

export const isMoney = (val) => {
	if (!val) return false
	return REG_DECIMAL.test(val)
}