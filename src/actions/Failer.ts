///<reference path="../core/Action.ts"/>
namespace b3.actions {
    export class Failer extends Action {
        constructor() {
            super({ name: 'Failer' });
        }

        tick(tick: Tick) {
            return EnumStatus.FAILURE;
        }
    }
}