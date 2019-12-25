/*jshint esversion: 6 */

import compare from '../core/compare.js';
import BTree from '../structures/btree.js';

function sort(data, compareFunction = compare) {
	const tree = new BTree();
	tree.setComparator(compareFunction);

	for (let item of data) {
		tree.put(item);
	}

	data = Array.from(tree);

	return data;
}

export default sort;