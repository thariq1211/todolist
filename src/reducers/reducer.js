import initialStore from "./store";
import actions from "./actions";

const pushStorage = (value) => {
	localStorage.setItem("todos", JSON.stringify(value));
	return value;
};

const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case actions.INIT_TODO:
			return pushStorage({ ...state, todolist: action.payload });
		case actions.ADD_TODO:
		case actions.MARK_DONE:
		case actions.EDIT_TODO:
		case actions.DELETE_TODO:
		default:
			return pushStorage(state);
	}
};

export default reducer;
