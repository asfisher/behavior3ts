///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Runner extends Action {
        constructor(d?:INodeProp) {
            super(d||{ name: 'Runner' });
        }

        tick(tick: Tick) {
            return EnumStatus.RUNNING;
        }
    }
}