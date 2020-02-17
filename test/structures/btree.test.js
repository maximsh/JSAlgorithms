/*jshint esversion: 6 */

import Tree from '../../src/structures/btree.js';

test('new emty tree', () => {
	const tree = new Tree();
	expect(tree.root).toBeNull();
	expect(tree.min()).toBeNull();
	expect(tree.max()).toBeNull();
	expect(tree.find(Math.random())).toBeNull();
});

test('put the first item', () => {
	const key = Math.random();
	const value = Math.random();
	const tree = new Tree();
	tree.put(key, value);
	expect(tree.root).not.toBeNull();
	expect(tree.root.left).toBeNull();
	expect(tree.root.right).toBeNull();
	expect(tree.root.key).toEqual(key);
	expect(tree.root.value).toEqual(value);
	expect(tree.max()).toEqual(tree.min());
	expect(tree.max().key).toEqual(key);
	expect(tree.max().value).toEqual(value);
	expect(tree.min().key).toEqual(key);
	expect(tree.min().value).toEqual(value);
	expect(tree.find(key).key).toEqual(key);
	expect(tree.find(key).value).toEqual(value);
});

test('put 2 items. the second item is great then the first', () => {
	const key1 = Math.random();
	const value1 = Math.random();
	const key2 = key1 + Math.random();
	const value2 = Math.random();
	const tree = new Tree();
	tree.put(key1, value1);
	tree.put(key2, value2);

	expect(tree.root).not.toBeNull();
	expect(tree.root.left).toBeNull();
	expect(tree.root.right).not.toBeNull();
	expect(tree.root.key).toEqual(key1);
	expect(tree.root.value).toEqual(value1);

	expect(tree.root.right.key).toEqual(key2);
	expect(tree.root.right.value).toEqual(value2);

	expect(tree.min()).not.toBeNull();
	expect(tree.max()).not.toBeNull();
	expect(tree.min().key).toEqual(key1);
	expect(tree.min().value).toEqual(value1);
	expect(tree.max().key).toEqual(key2);
	expect(tree.max().value).toEqual(value2);

	expect(tree.find(key1)).not.toBeNull();
	expect(tree.find(key1).value).toEqual(value1);
	expect(tree.find(key2)).not.toBeNull();
	expect(tree.find(key2).value).toEqual(value2);
	expect(tree.find(-key1)).toBeNull();
});

test('put 2 items. second item is less then first', () => {
	const key1 = Math.random();
	const value1 = Math.random();
	const key2 = key1 - Math.random();
	const value2 = Math.random();
	const tree = new Tree();
	tree.put(key1, value1);
	tree.put(key2, value2);

	expect(tree.root).not.toBeNull();
	expect(tree.root.left).not.toBeNull();
	expect(tree.root.right).toBeNull();
	expect(tree.root.key).toEqual(key1);
	expect(tree.root.value).toEqual(value1);

	expect(tree.root.left.key).toEqual(key2);
	expect(tree.root.left.value).toEqual(value2);

	expect(tree.min()).not.toBeNull();
	expect(tree.max()).not.toBeNull();
	expect(tree.min().key).toEqual(key2);
	expect(tree.min().value).toEqual(value2);
	expect(tree.max().key).toEqual(key1);
	expect(tree.max().value).toEqual(value1);

	expect(tree.find(key1)).not.toBeNull();
	expect(tree.find(key1).value).toEqual(value1);
	expect(tree.find(key2)).not.toBeNull();
	expect(tree.find(key2).value).toEqual(value2);
	expect(tree.find(-key1)).toBeNull();
});

test('canonical tree', () => {
	const tree = new Tree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);

	expect(tree.root.key).toEqual(8);
	expect(tree.root.left.key).toEqual(3);

	expect(tree.root.left.left.key).toEqual(1);
	expect(tree.root.left.left.left).toBeNull();
	expect(tree.root.left.left.right).toBeNull();

	expect(tree.root.left.right.key).toEqual(6);

	expect(tree.root.left.right.left.key).toEqual(4);
	expect(tree.root.left.right.left.left).toBeNull();
	expect(tree.root.left.right.left.right).toBeNull();

	expect(tree.root.left.right.right.key).toEqual(7);
	expect(tree.root.left.right.right.left).toBeNull();
	expect(tree.root.left.right.right.right).toBeNull();

	expect(tree.root.right.key).toEqual(10);

	expect(tree.root.right.right.key).toEqual(14);
	expect(tree.root.right.right.right).toBeNull();

	expect(tree.root.right.right.left.key).toEqual(13);
	expect(tree.root.right.right.left.left).toBeNull();
	expect(tree.root.right.right.left.right).toBeNull();
});

test('delete root item', () => {
	const key = Math.random();
	const tree = new Tree();

	tree.put(key);
	expect(tree.root.key).toEqual(key);
	expect(tree.find(key).key).toEqual(key);

	tree.delete(key);
	expect(tree.root).toBeNull();
	expect(tree.find(key)).toBeNull();
});

test('delete leaf', () => {
	const tree = new Tree();
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
	expect(tree.root.left.left).toBeNull();
	expect(tree.find(1)).toBeNull();
});

test('delete node with one child', () => {
	const tree = new Tree();
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
	expect(tree.root.right.right.key).toEqual(13);
	expect(tree.find(14)).toBeNull();
});

test('delete node with two children', () => {
	const tree = new Tree();
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
	expect(tree.root.left.key).toEqual(4);
	expect(tree.root.left.left.key).toEqual(1);
	expect(tree.root.left.right.key).toEqual(6);
	expect(tree.root.left.right.left).toBeNull();
	expect(tree.find(3)).toBeNull();
});

test('check iteartor for empty tree', () => {
	const tree = new Tree();
	expect(Array.from(tree)).toEqual([]);
});

test('check iteartor', () => {
	const tree = new Tree();
	tree.put(8);
	tree.put(3);
	tree.put(6);
	tree.put(1);
	tree.put(7);
	tree.put(10);
	tree.put(14);
	tree.put(4);
	tree.put(13);
	expect(Array.from(tree).map(node => node.key)).toEqual([1,3,4,6,7,8,10,13,14]);
});