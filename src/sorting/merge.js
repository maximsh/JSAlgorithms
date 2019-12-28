/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	const size = data.length;
	if (size < 2) {
		return data;
	}

	if (size < 4) {
		if (compareFunction(data[0], data[1]) > 0) {
			[data[0], data[1]] = [data[1], data[0]];
		}
		if (size == 3) {
			if (compareFunction(data[1], data[2]) > 0) {
				[data[1], data[2]] = [data[2], data[1]];
			}
			if (compareFunction(data[0], data[1]) > 0) {
				[data[0], data[1]] = [data[1], data[0]];
			}
		}
	} else {
		const half = size >> 1;
		const left = data.slice(0, half);
		const right = data.slice(half);
		let mainPos = 0;
		let leftPos = 0;
		let rightPos = 0;
		sort(left, compareFunction);
		sort(right, compareFunction);
		while (leftPos < left.length && rightPos < right.length) {
			data[mainPos++] = compareFunction(left[leftPos], right[rightPos]) < 0 ? left[leftPos++] : right[rightPos++];
		}
		while (leftPos < left.length) {
			data[mainPos++] = left[leftPos++];
		}
		while (rightPos < right.length) {
			data[mainPos++] = right[rightPos++];
		}
	}

	return data;
}

export default sort;