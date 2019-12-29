/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	let bufferSize = 1;

	while (bufferSize < data.length) {
		let index = bufferSize;
		while (index >= 1 && compareFunction(data[index-1], data[index]) > 0) {
			[data[index-1], data[index]] = [data[index], data[index-1]];
			index--;
		}
		bufferSize++;
	}

	return data;
}

export default sort;