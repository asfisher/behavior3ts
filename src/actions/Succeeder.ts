///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Succeeder extends Action {
        constructor() {
            super({ name: 'Succeeder' });
        }

        tick(tick: Tick) {
            return EnumStatus.SUCCESS;
        }
    }
}