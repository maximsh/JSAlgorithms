/*jshint esversion: 6 */

import compare from '../core/compare.js';
import gnome from './gnome.js';

function sort(data, compareFunction = compare) {
	const size = data.length;
	if (size < 2) {
		return data;
	}

	if (data.length < 4) {
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
		const avg = data[data.length >> 1];
		for (const item of data) {
			results[compareFunction(item, avg) + 1].push(item);
		}
		sort(results[0], compareFunction); // sort less items
		sort(results[2], compareFunction); // sort great items
		data.length = 0; // empty array
		data.push(...results.flat());
	}

	return data;
}

export default sort;