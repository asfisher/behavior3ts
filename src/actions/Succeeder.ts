///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Succeeder extends Action {
        constructor(d?:INodeProp) {
            super(d||{ name: 'Succeeder' });
        }

        tick(tick: Tick) {
            return EnumStatus.SUCCESS;
        }
    }
}