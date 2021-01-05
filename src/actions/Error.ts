///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Error extends Action {
        constructor(d?:INodeProp) {
            super(d||{ name: "Error" });
        }

        tick(tick: Tick) {
            return EnumStatus.ERROR;
        }
    }
}