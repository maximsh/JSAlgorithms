/*jshint esversion: 6 */

import compare from '../core/compare.js';
import Heap from '../structures/minheap.js';

function sort(data, compareFunction = compare) {
	const heap = new Heap();
	heap.comparator = compareFunction;

	for (let item of data) {
		heap.put(item);
	}

	data = Array.from(heap);

	return data;
}

export default sort;