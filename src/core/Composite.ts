namespace b3 {
    export abstract class Composite extends BaseNode {
        children: BaseNode[];
        constructor(d: ICompositeProp) {
            d.category = EnumCategory.COMPOSITE;
            super(d);
            this.children = d.children ? d.children.slice(0) : [];
        }
    }
}