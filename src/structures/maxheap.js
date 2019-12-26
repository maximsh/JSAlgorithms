/*jshint esversion: 6 */

import Heap from "./heap.js";

class MaxHeap extends Heap {
	constructor(items = []) {
		super(items);
		this.comparisonValue = 1;
	}
}

export default MaxHeap;