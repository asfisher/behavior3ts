namespace b3 {
    export const VERSION = '0.2.2';

    export enum EnumStatus {
        SUCCESS = 1,
        FAILURE,
        RUNNING,
        ERROR
    }

    export enum EnumCategory {
        COMPOSITE="composite",
        DECORATOR = 'decorator',
        ACTION = 'action',
        CONDITION = 'condition'
    }
}