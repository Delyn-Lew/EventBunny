import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("eventbunny:components:SignUpForm");

export default class SignUpForm extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		confirm: "",
		error: "",
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = async (event) => {
		// this.setState({ error: "" }); //clean up
		event.preventDefault();
		const formData = { ...this.state };
		delete formData.error;
		delete formData.confirm;

		try {
			const user = await signUp(formData);
			log("user: %o", user);
			this.props.setUser(user);
		} catch (error) {
			this.setState({ error: "Sign Up Failed" });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>SignUp</legend>

					<label>
						Name:
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label>
						Email:
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label>
						Password:
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label>
						Confirm:
						<input
							type="password"
							name="confirm"
							value={this.state.confirm}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<button
						type="submit"
						className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 border-teal-800"
					>
						Sign Up
					</button>
					<p>{this.state.error} </p>
				</fieldset>
			</form>
		);
	}
}
