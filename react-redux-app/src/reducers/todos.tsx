enum ActionTypes {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
}

interface AddTodoAction {
  type: ActionTypes.ADD_TODO;
  text: string;
}

interface DeleteTodoAction {
  type: ActionTypes.DELETE_TODO;
  text: string;
}

type Action = AddTodoAction | DeleteTodoAction;

const initialState: string[] = [];

const todos = (state: string[] = initialState, action: Action): string[] => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, action.text];
    default:
      return state;
  }
};

export default todos;
