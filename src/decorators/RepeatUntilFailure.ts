namespace b3.decorators {
    //重复n次，或者直到遇到不是成功的状态为止
    export class RepeatUntilFailure extends Decorator {
        maxLoop: number;
        constructor(d: IRepeaterProp) {
            d.name = "RepeatUntilFailure";
            d.title = "Repeat Until Failure";
            d.properties = { maxLoop: -1 };
            super(d);
            this.maxLoop = this.maxLoop || -1;
        }

        open(tick) {
            tick.blackboard.set('i', 0, tick.tree.id, this.id);
        }


        tick(tick: Tick) {
            if (!this.child) {
                return EnumStatus.ERROR;
            }

            var i = tick.blackboard.get('i', tick.tree.id, this.id);
            var status = EnumStatus.ERROR;

            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child.execute(tick);

                if (status == EnumStatus.SUCCESS) {
                    i++;
                } else {
                    break;
                }
            }

            i = tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        }
    }
}