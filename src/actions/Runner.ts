///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Runner extends Action {
        constructor() {
            super({ name: 'Runner' });
        }

        tick(tick: Tick) {
            return EnumStatus.RUNNING;
        }
    }
}