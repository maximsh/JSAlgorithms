/*jshint esversion: 6 */

class Iterator {
	constructor(tree) {
		function* helper(node) {
			if (node) {
				if (node.left) {
					yield* helper(node.left);
				}
				yield node;
				if (node.right) {
					yield* helper(node.right);
				}
			}
		}

		this.iterator = helper(tree.root);
	}

	next() {
        return this.iterator.next();
	}
}

export default Iterator;