/*jshint esversion: 6 */

import compare from '../core/compare.js';
import Tree from '../structures/abltree.js';

function sort(data, compareFunction = compare) {
	const tree = new Tree();
	tree.comparator = compareFunction;

	for (let item of data) {
		tree.put(item);
	}

	data = Array.from(tree).map(node => node.key);

	return data;
}

export default sort;