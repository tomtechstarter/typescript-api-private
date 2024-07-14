export interface IGetAllTodosBody {
  todoId: number;
  newIsDone: boolean;
}

export interface IUpdateTodoBody {
  todoId: number;
  newTask: string;
  newIsDone: boolean;
  newDueDate: Date;
}

export interface ICreateNewTodoBody {
  newTask: string;
  newIsDone: boolean;
  newDueDate: Date;
  newUserId: number;
}

export interface IDeleteTodoBody {
  todoId: number;
}
