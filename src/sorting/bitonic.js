/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(data, compareFunction = compare, direction = 1) {
	const size = data.length;

	function merge(data) {
		const size = data.length;
		let step = size >> 1;
		for (let index = step; index < size; index++) {
			if (compareFunction(data[index-step], data[index]) === direction) {
				[data[index-step], data[index]] = [data[index], data[index-step]];
			}
		}
		if (size > 3) {
			const part1 = data.slice(0, step);
			const part2 = data.slice(step);
			merge(part1);
			merge(part2);
			part1.forEach((item, index) => data[index] = item);
			part2.forEach((item, index) => data[index + step] = item);
		}
	}

	if (size < 2) {
		return data;
	}

	if (data.length < 4) {
		if (compareFunction(data[0], data[1]) === direction) {
			[data[0], data[1]] = [data[1], data[0]];
		}
		if (size === 3) {
			if (compareFunction(data[1], data[2]) === direction) {
				[data[1], data[2]] = [data[2], data[1]];
			}
			if (compareFunction(data[0], data[1]) === direction) {
				[data[0], data[1]] = [data[1], data[0]];
			}
		}
	} else {
		const half = size >> 1;
		const part1 = data.slice(0, half);
		const part2 = data.slice(half);
		sort(part1, compareFunction, direction);
		sort(part2, compareFunction, -direction);
		part1.forEach((item, index) => data[index] = item);
		part2.forEach((item, index) => data[index + half] = item);
		merge(data, direction);
	}

	return data;
}

export default sort;