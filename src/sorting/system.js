/*jshint esversion: 6 */

import compare from '../core/compare.js';

function sort(arr, compareFunction = compare) {
	return arr.sort(compareFunction);
}

export default sort;