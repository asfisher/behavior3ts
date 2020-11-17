namespace b3 {
    export abstract class Condition extends BaseNode {
        constructor(d: INodeProp) {
            d.category = EnumCategory.CONDITION;
            super(d);
        }
    }
}