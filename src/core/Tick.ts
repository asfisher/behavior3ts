namespace b3 {
  export class Tick<Target = any> {
    tree: any;
    debug: any;
    target: Target;
    blackboard: Blackboard;
    private _openNodes: string[];
    private _nodeCount: number;
    constructor() {
      this.tree = null;
      this.debug = null;
      this.target = null;
      this.blackboard = null;
      this._openNodes = [];
      this._nodeCount = 0;
    }

    get openNodes() { return this._openNodes; }
    get nodeCount() { return this._nodeCount; }
    /**
     * node执行enter时候会调用
     * @param node 发起调用的Node.
     **/
    enterNode(node: BaseNode) {
      this._nodeCount++;
      this._openNodes.push(node.id);

      // TODO: call debug here
    }

    /**
     * node执行openNode时执行这个方法
     * @param node
     **/
    openNode(node: BaseNode) {
      // TODO: call debug here
    }

    /**
     * node执行tick时候会调用
     * @param node
     **/
    tickNode(node: BaseNode) {
      // TODO: call debug here
    }

    /**
     * node执行close时候会调用
     * @param node
     **/
    closeNode(node: BaseNode) {
      // TODO: call debug here
      this._openNodes.pop();
    }

    /**
     * node执行exit时候会调用
     * @param node
     **/
    exitNode(node: BaseNode) {
      // TODO: call debug here
    }
  }
}