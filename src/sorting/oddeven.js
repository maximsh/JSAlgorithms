/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	const length = data.length;
	let isSorted = 0;
	let start = 1;

	do {
		isSorted = isSorted | start;
		for (let index = start; index < length; index += 2) {
			if (compareFunction(data[index-1], data[index]) > 0) {
				[data[index-1], data[index]] = [data[index], data[index-1]];
				isSorted = isSorted & ~start;
			}
		}
		start = start ^ 3;
	} while (isSorted < 3);

	return data;
}

export default sort;