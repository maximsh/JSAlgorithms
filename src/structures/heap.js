/*jshint esversion: 6 */

import defaultComparator from '../core/compare.js';
import defaultIterator from './heap.iterator.js';

const nodeComparator = Symbol('compare');
const nodeIterator = Symbol('nodeIterator');

class Heap {
	constructor(items = []) {
		if (new.target === Heap) {
			throw new TypeError('Cannot construct abstract Heap instances directly');
		}

		this.items = items;
		this.comparisonValue = undefined;
        this.comparator = defaultComparator;
		this.iterator = defaultIterator;
    }

	get comparator() {
        return this[nodeComparator];
    }

    set comparator(compareFunction) {
        this[nodeComparator] = compareFunction;
    }

	get iterator() {
        return this[nodeIterator];
	}

    set iterator(className) {
        this[nodeIterator] = className;
	}

	get size() {
        return this.items.length;
	}

	get isEmpty() {
        return this.size === 0;
	}

	get peak() {
        return this.isEmpty ? undefined : this.items[0];
    }

	put(value) {
		const items = this.items;
		let currentIndex = items.length;
		let parentIndex = ((currentIndex + 1) >> 1) - 1;
		items.push(value);

		// pop up value
		while (parentIndex >= 0 && this[nodeComparator](items[currentIndex], items[parentIndex]) === this.comparisonValue) {
			[items[currentIndex], items[parentIndex]] = [items[parentIndex], items[currentIndex]];
			currentIndex = parentIndex;
			parentIndex = ((currentIndex + 1) >> 1) - 1;
		}
	}

	heapify(index = 0) {
		const items = this.items;
		const rightChild = (index + 1) << 1;
		const leftChild = rightChild - 1;
		let child;
		if (this.size > rightChild) {
			child = this.comparator(items[leftChild], items[rightChild]) === this.comparisonValue ? leftChild : rightChild;
		} else {
			child = this.size > leftChild ? leftChild : index;
		}

		if (child > index && this.comparator(items[child], items[index]) === this.comparisonValue) {
			[items[index], items[child]] = [items[child], items[index]];
			this.heapify(child);
		}
	}

	find(value, fromIndex = 0) {
		return this.items.indexOf(value, fromIndex);
	}

	shift() {
		const items = this.items;
		let value;

		if (this.size) {
			const first = 0;
			const last = this.size - 1;
			[items[first], items[last]] = [items[last], items[first]];
			value = items.pop();
			this.heapify();
		}

		return value;
	}

	clone() {
		return new this.constructor([...this.items]);
	}

	[Symbol.iterator]() {
        return new this.iterator(this);
    }
}

export default Heap;