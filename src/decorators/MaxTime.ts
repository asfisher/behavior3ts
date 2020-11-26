namespace b3.decorators {
    export class MaxTime extends Decorator {
        maxTime: number;
        constructor(d: IMaxTimeProp) {
            super(d);
        }
        
        protected _parseProp(d: any) {
            if (!d.maxTime) {
                throw 'maxTime parameter in MaxTime decorator is an obligatory parameter';
            }
            this.maxTime = d.maxTime || 0;
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