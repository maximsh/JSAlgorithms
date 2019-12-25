/*jshint esversion: 6 */

class BTreeIterator {
	constructor(root) {
		function* helper(node) {
			if (node.left()) {
				yield* helper(node.left());
			}
			if (!node.isEmpty()) {
				yield node.value();
			}
			if (node.right()) {
				yield* helper(node.right());
			}
		}

		this.iterator = helper(root);
	}

	next() {
        return this.iterator.next();
	}
}

export default BTreeIterator;