/*jshint esversion: 6 */

function compare(a, b) {
	if (a === b || (Number.isNaN(a) && Number.isNaN(b))) {
		return 0;
	}

	return a > b || Number.isNaN(a) ? 1 : -1;
}

export default compare;