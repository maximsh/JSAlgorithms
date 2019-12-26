/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	let start = 0;

	while (start < data.length) {
		let min = start;
		for (let i = start; i < data.length; i++) {
			if (compareFunction(data[min], data[i]) > 0) {
				min = i;
			}
		}
		[data[start], data[min]] = [data[min], data[start]];
		start++;
	}

	return data;
}

export default sort;