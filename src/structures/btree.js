/*jshint esversion: 6 */

import compare from '../core/compare.js';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BTree {
    constructor() {
        this.root = null;
    }

    find(value, nearby = false) {
        let node = this.root;
        let nodeComparison;
        while (node && (nodeComparison = compare(value, node.value))) {
            let parent = node;
            node = nodeComparison < 0 ? node.left : node.right;
            if (!node && nearby) {
                return parent;
            }
        }
        return node;
    }

    put(value) {
        const leaf = new Node(value);
        if (this.root) {
            const node = this.find(value, true);
            if (compare(node.value, leaf.value) >= 0) {
                node.left = leaf;
            } else {
                node.right = leaf;
            }
        } else {
            this.root = leaf;
        }
        return leaf;
    }
}

export default BTree;