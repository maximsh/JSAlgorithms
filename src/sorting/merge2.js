/*jshint esversion: 6 */

import compare from '../core/compare.js';
import insertion from './insertion.js';

function sort(data, compareFunction = compare) {
	const size = data.length;

	if (size < 2) {
		return data;
	}

	for (let i = 1; i < size; i += 2) {
		if (compareFunction(data[i-1], data[i]) > 0) {
			[data[i-1], data[i]] = [data[i], data[i-1]];
		}
	}

	const maxChunk = size >> 1;
	let chunkSize = 2;
	while (chunkSize <= maxChunk) {
		for (let pos = 0; pos < size; pos += chunkSize << 1) {
			const left = data.slice(pos, chunkSize);
			const right = data.slice(pos + chunkSize, chunkSize);
			const leftSize = left.length;
			const rightSize = right.length;
			let mainPos = pos;
			let leftPos = 0;
			let rightPos = 0;
			while (leftPos < leftSize && rightPos < rightSize) {
				data[mainPos++] = compareFunction(left[leftPos], right[rightPos]) < 0 ? left[leftPos++] : right[rightPos++];
			}
			while (leftPos < leftSize) {
				data[mainPos++] = left[leftPos++];
			}
			while (rightPos < rightSize) {
				data[mainPos++] = right[rightPos++];
			}
		}
	}

	return data;
}

export default sort;