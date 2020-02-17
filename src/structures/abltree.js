/*jshint esversion: 6 */

import {Node as BNode, Tree as BTree} from './btree.js';

class Node extends BNode {
    constructor(key, value = null) {
        super(key, value);
        this.branchHeight = 1;
    }
}

class Tree extends BTree {
    fixheight(node) {
        const leftHeight = node.left ? node.left.branchHeight : 0;
        const rightHeight = node.right ? node.right.branchHeight : 0;
        node.branchHeight = (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
    }

    bfactor(node) {
        const leftHeight = node.left ? node.left.branchHeight : 0;
        const rightHeight = node.right ? node.right.branchHeight : 0;
        return rightHeight - leftHeight;
    }

    rotateright(node) {
        const left = node.left;
        [node.left, left.right] = [left.right, node];
        this.fixheight(node);
        this.fixheight(left);
        return left;
    }

    rotateleft(node) {
        const right = node.right;
        [node.right, right.left] = [right.left, node];
        this.fixheight(node);
        this.fixheight(right);
        return right;
    }

    balance(node) {
        this.fixheight(node);
        const bfactor = this.bfactor(node);
        if (bfactor === 2) {
            if (this.bfactor(node.right) < 0) {
                node.right = this.rotateright(node.right);
            }
            return this.rotateleft(node);
        }
        if (bfactor === -2) {
            if (this.bfactor(node.left) > 0) {
                node.left = this.rotateleft(node.left);
            }
            return this.rotateright(node);
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
            return this.balance(node);
        }.bind(this);

        this.root = insert(this.root);

        return newNode;
    }

    delete(key) {
        const removemin = function(node) {
            if (node.left) {
                node.left = removemin(node.left);
                return this.balance(node);
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
                    let min = this.min(node.right);
                    min.right = removemin(node.right);
                    min.left = node.left;
                    return this.balance(min);
                } else {
                    return node.left;
                }
            }

            return this.balance(node);
        }.bind(this);

        this.root = remove(this.root);
    }
}

export default Tree;