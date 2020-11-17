namespace b3.decorators {
    export class Limiter extends Decorator {
        maxLoop: number;
        constructor(d: ILimiterProp) {
            d.name = "Limiter";
            d.title = "Limit <maxLoop> Activations";
            d.properties = { maxLoop: 1 };
            super(d);
            if (!d.maxLoop) {
                throw 'maxLoop parameter in Limiter decorator is an obligatory parameter';
            }
            this.maxLoop = d.maxLoop;
        }

        open(tick: Tick) {
            tick.blackboard.set('i', 0, tick.tree.id, this.id);
        }

        tick(tick: Tick) {
            if (!this.child) {
                return EnumStatus.ERROR;
            }

            var i = tick.blackboard.get('i', tick.tree.id, this.id);

            if (i < this.maxLoop) {
                var status = this.child.execute(tick);

                if (status == EnumStatus.SUCCESS || status == EnumStatus.FAILURE)
                    tick.blackboard.set('i', i + 1, tick.tree.id, this.id);

                return status;
            }

            return EnumStatus.FAILURE;
        }
    }
}

interface ILimiterProp extends IDecoratorProp {
    maxLoop: number;
}