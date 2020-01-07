/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare) {
	function bitonicMerge(begin, size, direction) {
		if (size > 1) {
			let step = 1;
			while (step < size) {
				step = step << 1;
			}
			step = step >> 1;
			for (let index = begin; index < begin + size - step; index++) {
				if (compareFunction(data[index], data[index+step]) === direction) {
					[data[index], data[index+step]] = [data[index+step], data[index]];
				}
			}
			bitonicMerge(begin, step, direction);
			bitonicMerge(begin + step, size - step, direction);
		}
	}

	function bitonicSort(begin, size, direction) {
		if (size > 1) {
			const half = size >> 1;
			bitonicSort(begin, half, -direction);
			bitonicSort(begin + half, size - half, direction);
			bitonicMerge(begin, size, direction);
		}
	}

	bitonicSort(0, data.length, 1);

	return data;
}

export default sort;