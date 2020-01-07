/*jshint esversion: 6 */

import compare from '../core/compare.js';
import heapSort from './heap.js';

function sort(data, compareFunction = compare) {
	const maxLevel = Math.floor(Math.log(data.length));

	function quickSort(data, level) {
		const size = data.length;
		if (size < 2) {
			return data;
		}

		if (level == maxLevel) {
			return heapSort(data, compareFunction);
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
			const results = [[], [], []];
			const avg = data[size >> 1];
			const nextLevel = level  + 1;
			for (const item of data) {
				results[compareFunction(item, avg) + 1].push(item);
			}
			quickSort(results[0], nextLevel); // sort less items
			quickSort(results[2], nextLevel); // sort great items
			data.length = 0; // empty array
			data.push(...results.flat());
		}

		return data;
	}

	return quickSort(data);
}

export default sort;