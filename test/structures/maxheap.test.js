/*jshint esversion: 6 */

import Heap from '../../src/structures/maxheap.js';

test('emty heap', () => {
	const heap = new Heap();
	expect(heap.isEmpty).toEqual(true);
	expect(heap.size).toEqual(0);
	expect(heap.peak).toBeUndefined();
	expect(Array.from(heap)).toEqual([]);

	// trye extract first element
	expect(heap.shift()).toBeUndefined();
	expect(heap.isEmpty).toEqual(true);
	expect(heap.size).toEqual(0);
	expect(heap.peak).toBeUndefined();
	expect(Array.from(heap)).toEqual([]);
});

test('put the first item', () => {
	const data = Math.random();
	const heap = new Heap();
	heap.put(data);
	expect(heap.isEmpty).toEqual(false);
	expect(heap.size).toEqual(1);
	expect(heap.peak).toEqual(data);

	// trye extract first element
	expect(heap.shift()).toEqual(data);
	expect(heap.isEmpty).toEqual(true);
	expect(heap.size).toEqual(0);
	expect(heap.peak).toBeUndefined();
});

test('put 2 items. second item is bigger then first', () => {
	const data1 = Math.random();
	const data2 = data1 + Math.random();
	const heap = new Heap();
	heap.put(data1);
	heap.put(data2);
	expect(heap.isEmpty).toEqual(false);
	expect(heap.peak).toEqual(data2);
	expect(heap.size).toEqual(2);

	// extract first item
	expect(heap.shift()).toEqual(data2);
	expect(heap.isEmpty).toEqual(false);
	expect(heap.peak).toEqual(data1);
	expect(heap.size).toEqual(1);

	// extract second item
	expect(heap.shift()).toEqual(data1);
	expect(heap.isEmpty).toEqual(true);
	expect(heap.peak).toBeUndefined();
	expect(heap.size).toEqual(0);
});

test('put 2 items. second item is less then first', () => {
	const data1 = Math.random();
	const data2 = data1 - Math.random();
	const heap = new Heap();
	heap.put(data1);
	heap.put(data2);
	expect(heap.isEmpty).toEqual(false);
	expect(heap.peak).toEqual(data1);
	expect(heap.size).toEqual(2);

	// extract first item
	expect(heap.shift()).toEqual(data1);
	expect(heap.isEmpty).toEqual(false);
	expect(heap.peak).toEqual(data2);
	expect(heap.size).toEqual(1);

	// extract second item
	expect(heap.shift()).toEqual(data2);
	expect(heap.isEmpty).toEqual(true);
	expect(heap.peak).toBeUndefined();
	expect(heap.size).toEqual(0);
});

test('canonical heap', () => {
	const heap = new Heap();
	heap.put(8);
	heap.put(3);
	heap.put(6);
	heap.put(1);
	heap.put(7);
	heap.put(10);
	heap.put(14);
	heap.put(4);
	heap.put(13);

	expect(heap.peak).toEqual(14);
	expect(heap.items).toEqual([14,13,10,7,3,6,8,1,4]);
});

test('check iteartor', () => {
	const heap = new Heap();
	heap.put(8);
	heap.put(3);
	heap.put(6);
	heap.put(1);
	heap.put(7);
	heap.put(10);
	heap.put(14);
	heap.put(4);
	heap.put(13);
	expect(Array.from(heap)).toEqual([14,13,10,8,7,6,4,3,1]);
});