///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Wait extends Action {
        endTime: number;
        constructor(d: INodeProp) {
            super(d);
        }

        protected _parseProp(d: any) {
            this.endTime = d.milliseconds || 0;
        }


        open(tick:Tick) {
            var startTime = (new Date()).getTime();
            tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
        }

       
        tick(tick:Tick) {
            var currTime = (new Date()).getTime();
            var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

            if (currTime - startTime > this.endTime) {
                return EnumStatus.SUCCESS;
            }

            return EnumStatus.RUNNING;
        }
    }
}