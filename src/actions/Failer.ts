///<reference path="../core/Action.ts"/>
namespace b3 {
    export class Failer extends Action {
        constructor() {
            super({ name: 'Failer' });
        }

        tick(tick: Tick) {
            return EnumStatus.FAILURE;
        }
    }
}