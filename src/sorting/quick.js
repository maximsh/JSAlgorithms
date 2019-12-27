/*jshint esversion: 6 */

import compare from '../core/compare.js';
import gnome from './gnome.js';

function sort(data, compareFunction = compare) {
	if (data.length < 4) {
		gnome(data, compareFunction);
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