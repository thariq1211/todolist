import "./App.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
	Container,
	Typography,
	FormGroup,
	Grid,
	List,
	ListItem,
} from "@material-ui/core";

import actions from "./reducers/actions";
import TodoField from "./components/moleculs/ListTodo";

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
	const { state } = props;
	const { todolist } = state;
	const sortTaskUnDone = () => {
		const todolistundone = todolist.filter((item) => item.status === 0);
		const convertdate = todolistundone.map((item) => ({
			...item,
			createdAt: new Date(item.createdAt),
		}));
		const sort = convertdate.sort((a, b) => a.createdAt - b.createdAt);
		return sort;
	};

	const sortTaskDone = () => {
		const todolistdone = todolist.filter((item) => item.status === 1);
		const convertdate = todolistdone.map((item) => ({
			...item,
			createdAt: new Date(item.createdAt),
		}));
		const sort = convertdate.sort((a, b) => b.createdAt - a.createdAt);
		return sort;
	};

	useEffect(() => {
		const intializefetchAPI = async () => {
			try {
				const url =
					"https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
				const request = await fetch(url, {
					method: "GET",
				});
				const response = await request.json();
				props.initTodo(response);
			} catch (error) {
				console.error(error);
			}
		};
		intializefetchAPI();
	}, []);
	return (
		<Container maxWidth="md">
			<center>
				<Typography variant="h4">Todo-list App</Typography>
			</center>
			<FormGroup>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Typography variant="body1">Task undone</Typography>
						<List dense>
							{sortTaskUnDone().length > 0
								? sortTaskUnDone().map((item) => (
										<ListItem key={item.id}>
											<TodoField
												status={item.status}
												title={item.title}
												description={item.description}
											></TodoField>
										</ListItem>
								  ))
								: "Todolist is Empty!"}
						</List>
					</Grid>
					<Grid item xs={12} md={12}>
						<Typography variant="body1">Task done</Typography>
						<List dense>
							{sortTaskDone()?.length > 0
								? sortTaskDone().map((item) => (
										<ListItem key={item.id}>
											<TodoField
												status={item.status}
												title={item.title}
												description={item.description}
											></TodoField>
										</ListItem>
								  ))
								: "Todolist done is Empty!"}
						</List>
					</Grid>
				</Grid>
			</FormGroup>
		</Container>
	);
}

export default connectApp(App);
