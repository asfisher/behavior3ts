namespace b3 {
    export abstract class BaseNode {
        id: string;
        category: string;
        name: string;
        title: string;
        properties: any;
        description: string;
        parameters: any;
        constructor(d: INodeProp) {
            this.id = d.id || createUUID();
            this.category = d.category || '';
            this.name = d.name || '';
            this.title = d.title || this.name;
            this.description = d.description || '';
            this.properties = d.properties || {};
            this.parameters = {};
            this._parseProp(this.properties);
        }

        protected _parseProp(prop: any) {

        }

        /**
         * 这是将tick信号传播到此节点的主要方法
         * @param {Tick} tick A tick instance.
         * @return {Constant} The tick state.
         * @protected
         **/
        execute(tick: Tick) {
            // ENTER
            this._enter(tick);

            // OPEN
            if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
                this._open(tick);
            }

            // TICK
            var status = this._tick(tick);

            // CLOSE
            if (status !== EnumStatus.RUNNING) {
                this._close(tick);
            }

            // EXIT
            this._exit(tick);

            return status;
        }

        /**
         * Wrapper for enter method.
         * @method _enter
         * @param {Tick} tick A tick instance.
         * @protected
         **/
        protected _enter(tick: Tick) {
            tick.enterNode(this);
            this.enter(tick);
        }

        /**
         * Wrapper for open method.
         * @method _open
         * @param {Tick} tick A tick instance.
         * @protected
         **/
        protected _open(tick: Tick) {
            tick.openNode(this);
            tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
            this.open(tick);
        }

        /**
         * Wrapper for tick method.
         * @method _tick
         * @param {Tick} tick A tick instance.
         * @return {Constant} A state constant.
         * @protected
         **/
        protected _tick(tick: Tick) {
            tick.tickNode(this);
            return this.tick(tick);
        }

        /**
         * Wrapper for close method.
         * @method _close
         * @param {Tick} tick A tick instance.
         * @protected
         **/
        protected _close(tick: Tick) {
            if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) return;
            tick.closeNode(this);
            tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
            this.close(tick);
        }

        /**
         * Wrapper for exit method.
         * @method _exit
         * @param {Tick} tick A tick instance.
         * @protected
         **/
        protected _exit(tick: Tick) {
            tick.exitNode(this);
            this.exit(tick);
        }

        /**
         * 进入节点是执行的方法，每次运行都会执行
         *
         * @method enter
         * @param {Tick} tick A tick instance.
         **/
        enter(tick: Tick) { }

        /**
         * 打开节点时运行的方法，只有节点打开时执行
         * @method open
         * @param {Tick} tick A tick instance.
         **/
        open(tick: Tick) { }

        /**
         * 每次执行节点的方法
         *
         * @method tick
         * @param {Tick} tick A tick instance.
         **/
        abstract tick(tick: Tick): EnumStatus;

        /**
         * 关闭节点的方法，当节点运行结果不是running时，会执行关闭
         *
         * @method close
         * @param {Tick} tick A tick instance.
         **/
        close(tick: Tick) { }

        /**
         * 退出节点时执行的方法
         *
         * @method exit
         * @param {Tick} tick A tick instance.
         **/
        exit(tick: Tick) { }
    }
}