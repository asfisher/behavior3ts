namespace b3.decorators {
    export class Inverter extends Decorator {
        constructor(d: IDecoratorProp) {
            d.name = "Inverter";
            super(d);
        }

        tick(tick: Tick) {
            if (!this.child) {
                return EnumStatus.ERROR;
            }

            var status = this.child.execute(tick);

            if (status == EnumStatus.SUCCESS) {
                status = EnumStatus.FAILURE;
            } else if (status == EnumStatus.FAILURE) {
                status = EnumStatus.SUCCESS;
            }

            return status;
        }
    }
}