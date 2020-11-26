namespace b3.decorators {
  //重复n次，或者直到遇到不是失败的状态为止
  export class RepeatUntilSuccess extends Decorator {
    maxLoop: number;
    constructor(d: IRepeaterProp) {
      super(d);
    }

    protected _parseProp(d: any) {
      this.maxLoop = d.maxLoop || -1;
    }

    open(tick: Tick) {
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

        if (status == EnumStatus.FAILURE) {
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