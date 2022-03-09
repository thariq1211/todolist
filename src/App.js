import "./App.css";
import { connect } from "react-redux";

import actions from "./reducers/actions";

const connectApp = connect(
	(state) => {
		return {
			state,
		};
	},
	(dispatch) => {
		return {
			initTodo: (value) =>
				dispatch({ type: actions.INIT_TODO, payload: value }),
		};
	}
);

function App(props) {
  console.log(props);
	return <div className="App"></div>;
}

export default connectApp(App);
