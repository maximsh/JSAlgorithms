/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	const length = data.length;
	let isChanged;

	do {
		isChanged = false;
		let index = 1;
		while (index < length) {
			let step = 1;
			if (compareFunction(data[index-1], data[index]) > 0) {
				[data[index-1], data[index]] = [data[index], data[index-1]];
				isChanged = true;
				step = index > 1 ? -1 : 1;
			}
			index += step;
		}
	} while (isChanged);

	return data;
}

export default sort;