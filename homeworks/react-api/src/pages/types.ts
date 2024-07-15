export interface Task {
    description: string,
    done: boolean,
    id: string
}
  
export enum ActionType {
    LOAD,
    SUBMIT,
    DELETE,
    CHANGE,
    SET_DONE,
    REMOVE_COMPLETED
}

export type Action = {
    type: ActionType,
    id ?: string,
    taskDescription ?: string,
    done ?: boolean
}