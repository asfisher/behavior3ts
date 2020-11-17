namespace b3 {
    //重复n次，或者直到遇到不是失败或者成功的状态为止
    export class Repeater extends Decorator {
        maxLoop: number;
        constructor(d: IRepeaterProp) {
            d.name = "Repeater";
            d.title = 'Repeat <maxLoop>x';
            d.properties = { maxLoop: -1 };
            super(d);
            this.maxLoop = d.maxLoop || -1;
        }

        open(tick) {
            tick.blackboard.set('i', 0, tick.tree.id, this.id);
          }
        
         
          tick(tick:Tick) {
            if (!this.child) {
              return EnumStatus.ERROR;
            }
        
            var i = tick.blackboard.get('i', tick.tree.id, this.id);
            var status = EnumStatus.SUCCESS;
        
            while (this.maxLoop < 0 || i < this.maxLoop) {
              status = this.child.execute(tick);
        
              if (status == EnumStatus.SUCCESS || status == EnumStatus.FAILURE) {
                  i++;
              } else {
                break;
              }
            }
        
            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
          }
    }
}

interface IRepeaterProp extends IDecoratorProp {
    maxLoop: number
}