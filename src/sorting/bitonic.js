/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare, direction = 1) {
	function merge(begin, size, direction) {
		const end = begin + size;
		let step = size >> 1;
		for (let index = begin + step; index < end; index++) {
			if (compareFunction(data[index-step], data[index]) === direction) {
				[data[index-step], data[index]] = [data[index], data[index-step]];
			}
		}
		if (size > 3) {
			merge(begin + 0, step, direction);
			merge(begin + step, size - step, direction);
		}
	}

	function split(begin, size, direction) {
		if (size < 2) {
			return;
		}

		if (size < 4) {
			const second = begin + 1;
			const third = begin + 2;
			if (compareFunction(data[begin], data[second]) === direction) {
				[data[begin], data[second]] = [data[second], data[begin]];
			}
			if (size === 3) {
				if (compareFunction(data[second], data[third]) === direction) {
					[data[second], data[third]] = [data[third], data[second]];
				}
				if (compareFunction(data[begin], data[second]) === direction) {
					[data[begin], data[second]] = [data[second], data[begin]];
				}
			}
		} else {
			const half = size >> 1;
			split(begin, half, direction);
			split(begin + half, size - half, -direction);
			merge(begin, size, direction);
		}
	}

	split(0, data.length, direction);

	return data;
}

export default sort;