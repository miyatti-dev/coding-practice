import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoDataContext } from "../hooks/useTodoDataContext";

export const AddTodo = () => {
	const navigate = useNavigate();

	// input を参照する ref
	const inputRef = useRef<HTMLInputElement>(null);
	const { addTodo } = useTodoDataContext();

	const handleSubmit = () => {
		console.log("#### handleSubmit add");
		if (inputRef.current) {
			const value = inputRef.current.value;
			console.log("入力値:", value);

			// 入力値をクリア
			inputRef.current.value = "";
			addTodo(value);

			navigate("/.");
		}
	};

	return (
		<Stack spacing={2} sx={{ width: 300, padding: 5 }}>
			<TextField
				label="追加するTodo"
				inputRef={inputRef} // ← ここで ref をセット
				defaultValue=""
			/>
			<Button variant="contained" onClick={handleSubmit}>
				追加
			</Button>
		</Stack>
	);
};
