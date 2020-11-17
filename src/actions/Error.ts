///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Error extends Action {
        constructor() {
            super({ name: "Error" });
        }

        tick(tick: Tick) {
            return EnumStatus.ERROR;
        }
    }
}