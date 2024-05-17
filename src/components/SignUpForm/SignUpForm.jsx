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
			this.props.navigateToDash();
		} catch (error) {
			this.setState({ error: "Sign Up Failed" });
		}
	};

	render() {
		return (
			<form
				className="flex min-h-screen items-center justify-center"
				onSubmit={this.handleSubmit}
			>
				<fieldset className="bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5 w-2/6">
					<legend className="font-black block mb-2 text-sm  text-gray-900">
						Sign Up
					</legend>

					<label className="drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
						Name:
						<input
							className="border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label className="drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
						Email:
						<input
							className="border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label className="drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
						Password:
						<input
							className="border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<label className="drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
						Confirm:
						<input
							className="border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2"
							type="password"
							name="confirm"
							value={this.state.confirm}
							onChange={this.handleChange}
						/>
					</label>
					<br />

					<button
						type="submit"
						className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
					>
						Sign Up
					</button>
					<p className="text-red-600">{this.state.error} </p>
				</fieldset>
			</form>
		);
	}
}
