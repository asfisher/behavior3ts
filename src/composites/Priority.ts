///<reference path="../core/Composite.ts"/>
namespace b3 {
    export class Priority extends Composite {
        constructor(d: ICompositeProp) {
            d.name = "Priority";
            super(d);
        }

        tick(tick: Tick) {
            for (var i = 0; i < this.children.length; i++) {
                var status = this.children[i].execute(tick);

                if (status !== EnumStatus.FAILURE) {
                    return status;
                }
            }

            return EnumStatus.FAILURE;
        }
    }
}