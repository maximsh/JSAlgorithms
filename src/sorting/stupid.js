/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	const length = data.length;
	let index = 1;

	while (index < length) {
		if (compareFunction(data[index-1], data[index]) > 0) {
			[data[index-1], data[index]] = [data[index], data[index-1]];
			index = 0;
		} else {
			index++;
		}
	}

	return data;
}

export default sort;