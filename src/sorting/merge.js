/*jshint esversion: 6 */

import compare from '../core/compare.js';
import gnome from './gnome.js';

function sort(data, compareFunction = compare) {
	if (data.length < 4) {
		gnome(data, compareFunction);
	} else {
		const center = data.length >> 1;
		const left = data.slice(0, center);
		const right = data.slice(center);
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