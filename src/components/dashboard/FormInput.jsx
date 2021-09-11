import React from "react";
import { TextField } from "@material-ui/core";

const FormInput = ({ label, placeholder, value, error, onChange, onEnter }) => {
	return (
		<TextField
			type="text"
			label={label}
			value={value}
			error={Boolean(error)}
			helperText={error}
			onChange={onChange}
			placeholder={placeholder}
			variant="outlined"
			className="purchase-form-input"
			inputProps={{
				style: {
					fontFamily: "medium",
				},
			}}
			InputLabelProps={{
				style: {
					fontFamily: "medium",
				},
			}}
			FormHelperTextProps={{
				style: {
					fontFamily: "medium",
					fontSize: "13px",
					marginLeft: 0,
					marginRight: 0,
				},
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					onEnter();
				}
			}}
		/>
	);
};

export default FormInput;
