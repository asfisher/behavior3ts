namespace b3 {
    export abstract class Decorator extends BaseNode {
        child: BaseNode;
        constructor(d: IDecoratorProp) {
            d.category = EnumCategory.DECORATOR;
            super(d);
            this.child = d.child;
        }
    }
}