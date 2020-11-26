namespace b3 {
    export class BehaviorTreeGroup {
        private _trees: { [title: string]: ITree };
        /**
         * 格式化逻辑树项目数据，把依赖树信息安装好
         * @param project 编辑器导出的项目信息
         */
        parse(project: ITreeProject) {
            this._trees || (this._trees = {});
            let treeHash = {};
            for (let i = 0; i < project.trees.length; i++) {
                treeHash[project.trees[i].id] = project.trees[i];
            }

            for (let id in treeHash) {
                let tree: ITree = treeHash[id];
                this._paserTree(tree, treeHash);
                this._trees[tree.title] = tree;
            }
        }

        /**
         * 根据树的title生成对应的树
         * @param treeTitle 
         * @param names 
         */
        build(treeTitle: string, names?: any): BehaviorTree {
            let tree = this._trees[treeTitle];
            if (!tree) return null;
            let bTree = new BehaviorTree();
            bTree.load(tree, names);
            return bTree;
        }

        private _paserTree(tree: ITree, treeHash: any): INode[] {
            if (tree.pasered) {
                let nodes = [];
                for (let nodeId in tree.nodes) {
                    let node: INode = tree.nodes[nodeId];
                    nodes.push(node);
                }
                return nodes;
            }
            let nodes: INode[] = [];
            for (let nodeId in tree.nodes) {
                let node: INode = tree.nodes[nodeId];
                if (treeHash[node.name]) {
                    let childTree: ITree = treeHash[node.name]
                    let addNodes = this._paserTree(childTree, treeHash);
                    nodes = nodes.concat(addNodes);
                    node.name = "Sequence";
                    node.children = [childTree.root];
                } else {
                    nodes.push(node);
                }
            }

            for (let i = 0; i < nodes.length; i++) {
                tree.nodes[nodes[i].id] = nodes[i];
            }
            tree.pasered = true;


            return nodes;
        }
    }
}

interface IBase {
    id: string;
    title: string;
    description: string;
    properties: any;
}

interface ITree extends IBase {
    root: string,
    nodes: { [id: string]: INode },
    pasered?: boolean                //后期添加的
}


interface INode extends IBase {
    name: string;
    children: string[];
}

interface ITreeProject {
    trees: ITree[];
}