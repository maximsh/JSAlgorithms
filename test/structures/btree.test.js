/*jshint esversion: 6 */

import BTree from '../../src/structures/btree.js';

test('new emty tree', () => {
	const tree = new BTree();
	expect(tree.isEmpty()).toEqual(true);
	expect(tree.left()).toBeNull();
	expect(tree.right()).toBeNull();
});

test('new initialized tree', () => {
	const data = Math.random();
	const tree = new BTree(data);
	expect(tree.isEmpty()).toEqual(false);
	expect(tree.value()).toEqual(data);
	expect(tree.left()).toBeNull();
	expect(tree.right()).toBeNull();
	expect(tree.find(data)).toEqual(tree);

	// delete item
	tree.delete(data);
	expect(tree.isEmpty()).toEqual(true);
	expect(tree.value()).toBeUndefined();
	expect(tree.left()).toBeNull();
	expect(tree.right()).toBeNull();
});

test('put first itme', () => {
	const data = Math.random();
	const tree = new BTree();
	tree.put(data);
	expect(tree.isEmpty()).toEqual(false);
	expect(tree.value()).toEqual(data);
	expect(tree.left()).toBeNull();
	expect(tree.right()).toBeNull();
	expect(tree.find(data)).toEqual(tree);
});

test('put 2 itmes. seconde item is great then first', () => {
	const data1 = Math.random();
	const data2 = data1 + Math.random();
	const tree = new BTree();
	tree.put(data1);
	tree.put(data2);
	expect(tree.isEmpty()).toEqual(false);
	expect(tree.value()).toEqual(data1);
	expect(tree.left()).toBeNull();
	expect(tree.right().value()).toEqual(data2);
	expect(tree.find(data1)).toEqual(tree);
	expect(tree.find(data2)).toEqual(tree.right());
});

test('put 2 itmes. seconde item is less then first', () => {
	const data1 = Math.random();
	const data2 = data1 - Math.random();
	const tree = new BTree();
	tree.put(data1);
	tree.put(data2);
	expect(tree.isEmpty()).toEqual(false);
	expect(tree.value()).toEqual(data1);
	expect(tree.left().value()).toEqual(data2);
	expect(tree.right()).toBeNull();
	expect(tree.find(data1)).toEqual(tree);
	expect(tree.find(data2)).toEqual(tree.left());
});

test('canonical tree', () => {
	const tree = new BTree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	expect(tree.value()).toEqual(8);
	expect(tree.left().value()).toEqual(3);
	expect(tree.right().value()).toEqual(10);
	expect(tree.left().left().value()).toEqual(1);
	expect(tree.left().left().left()).toBeNull();
	expect(tree.left().left().right()).toBeNull();
	expect(tree.left().right().value()).toEqual(6);
	expect(tree.left().right().left().value()).toEqual(4);
	expect(tree.left().right().left().left()).toBeNull();
	expect(tree.left().right().left().right()).toBeNull();
	expect(tree.left().right().right().value()).toEqual(7);
	expect(tree.left().right().right().left()).toBeNull();
	expect(tree.left().right().right().right()).toBeNull();
	expect(tree.right().right().value()).toEqual(14);
	expect(tree.right().right().right()).toBeNull();
	expect(tree.right().right().left().value()).toEqual(13);
	expect(tree.right().right().left().left()).toBeNull();
	expect(tree.right().right().left().right()).toBeNull();
});

test('delete root item', () => {
	const data = Math.random();
	const tree = new BTree(data);
	tree.prop = 1;
	expect(tree.prop).toEqual(1);

	tree.delete(data);
	expect(tree.isEmpty()).toEqual(true);
	expect(tree.value()).toBeUndefined();
	expect(tree.prop).toBeUndefined();
	expect(tree.left()).toBeNull();
	expect(tree.right()).toBeNull();
});

test('delete leaf', () => {
	const tree = new BTree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	tree.delete(1);
	expect(tree.left().left()).toBeNull();
});

test('delete node with one child', () => {
	const tree = new BTree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	tree.delete(14);
	expect(tree.right().right().value()).toEqual(13);
});

test('delete node with two children', () => {
	const tree = new BTree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	tree.delete(3);
	expect(tree.left().value()).toEqual(4);
	expect(tree.left().left().value()).toEqual(1);
	expect(tree.left().right().value()).toEqual(6);
	expect(tree.left().right().left()).toBeNull();
});

test('check iteartor', () => {
	const tree = new BTree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	expect(Array.from(tree)).toEqual([1,3,4,6,7,8,10,13,14]);
});