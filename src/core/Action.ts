///<reference path="./BaseNode.ts"/>
namespace b3 {
    export abstract class Action extends BaseNode {
        constructor(d: INodeProp) {
            d.category=EnumCategory.ACTION;
            super(d);
        }
    }
}