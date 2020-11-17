///<reference path="../core/Composite.ts"/>
namespace b3 {
    export class Sequence extends Composite {
        constructor(d: ICompositeProp) {
            d.name = "Sequence";
            super(d);
        }

        tick(tick: Tick) {
            for (var i = 0; i < this.children.length; i++) {
                var status = this.children[i].execute(tick);

                if (status !== EnumStatus.SUCCESS) {
                    return status;
                }
            }

            return EnumStatus.SUCCESS;
        }
    }
}