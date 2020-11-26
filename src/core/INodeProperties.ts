interface INodeProp {
    id?:string;
    /**类别 */
    category?: string,
    name?: string,
    title?: string;
    description?: string;
    properties?: any;
}

interface ICompositeProp extends INodeProp {
    children: b3.BaseNode[];
}

interface IDecoratorProp extends INodeProp{
    child:b3.BaseNode;
}