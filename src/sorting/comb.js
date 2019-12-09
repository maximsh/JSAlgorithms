/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	const length = data.length;
	const rate = 1.247;
	let isChanged;
	let step = length;

	do {
		step = Math.floor(step / rate) || 1;
		isChanged = step > 1;
		for (let index = step; index < length; index++) {
			if (compareFunction(data[index-step], data[index]) > 0) {
				[data[index-step], data[index]] = [data[index], data[index-step]];
				isChanged = true;
			}
		}
	} while (isChanged);

	return data;
}

export default sort;