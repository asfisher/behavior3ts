namespace b3 {
    export class MaxTime extends Decorator {
        maxTime: number;
        constructor(d: IMaxTimeProp) {
            d.name = "MaxTime";
            d.title = "Max <maxTime>ms";
            d.properties = { maxTime: 0 };
            super(d);
            if (!d.maxTime) {
                throw 'maxTime parameter in MaxTime decorator is an obligatory parameter';
            }
            this.maxTime = this.maxTime;
        }

        open(tick: Tick) {
            var startTime = (new Date()).getTime();
            tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
        }

        tick(tick: Tick) {
            if (!this.child) {
                return EnumStatus.ERROR;
            }

            var currTime = (new Date()).getTime();
            var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

            var status = this.child.execute(tick);
            if (currTime - startTime > this.maxTime) {
                return EnumStatus.FAILURE;
            }

            return status;
        }
    }
}

interface IMaxTimeProp extends IDecoratorProp {
    maxTime: number;
}