///<reference path="../core/Composite.ts"/>
namespace b3 {
    export class MemSequence extends Composite {
        constructor(d: ICompositeProp) {
            d.name = "MemSequence";
            super(d);
        }

        open(tick: Tick) {
            tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
        }

        tick(tick: Tick) {
            var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (var i = child; i < this.children.length; i++) {
                var status = this.children[i].execute(tick);

                if (status !== EnumStatus.SUCCESS) {
                    if (status === EnumStatus.RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status;
                }
            }

            return EnumStatus.SUCCESS;
        }
    }
}