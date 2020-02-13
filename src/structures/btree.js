/*jshint esversion: 6 */

import defaultComparator from '../core/compare.js';
import defaultIterator from './btree.iterator.js';

class Node {
    constructor(key, value = null) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.branchHeight = 1;
    }
}

class Tree {
    constructor() {
        this.root= null;
        this.comparator = defaultComparator;
        this.iterator = defaultIterator;
    }

    min(node = this.root) {
        return node && node.left ? this.min(node.left) : node;
    }

    max(node = this.root) {
        return node && node.right ? this.max(node.right) : node;
    }

    chooseBranch(nodeComparison) {
        return nodeComparison >= 0 ? 'left' : 'right';
    }

    find(key, node = this.root) {
        if (node) {
            const nodeComparison = this.comparator(node.key, key);
            if (nodeComparison) {
                return this.find(key, node[this.chooseBranch(nodeComparison)]);
            }
        }
        return node;
    }

    put(key, value = null) {
        const newNode = new Node(key, value);
        const insert = function(node) {
            if (!node) {
                return newNode;
            }
            const branch = this.chooseBranch(this.comparator(node.key, key));
            node[branch] = insert(node[branch]);
            node[branch].parent = node;
            return node;
        }.bind(this);

        this.root = insert(this.root);

        return newNode;
    }

    replace(node1, node2 = null) {
        if (this.left === node1) {
            this[leftNode] = node2;
        }

        if (this.right === node1) {
            this[rightNode] = node2;
        }
    }

    delete(key) {
        const removemin = function(node) {
            if (node.left) {
                node.left = removemin(node.left);
                return node;
            }
            return node.right;
        }.bind(this);
        const remove = function(node) {
            if (!node) {
                return node;
            }

            const nodeComparison = this.comparator(node.key, key);
            if (nodeComparison) {
                const branch = this.chooseBranch(this.comparator(node.key, key));
                node[branch] = remove(node[branch]);
            } else {
                if (node.right) {
                    if (node.right.left) {
                        let min = this.min(node.right);
                        min.right = removemin(node.right);
                        min.left = node.left;
                        return min;
                    } else {
                        return node.right;
                    }
                } else {
                    return node.left;
                }
            }

            return node;
        }.bind(this);


        this.root = remove(this.root);
    }

    [Symbol.iterator]() {
        return new this.iterator(this);
    }
}

export default Tree;