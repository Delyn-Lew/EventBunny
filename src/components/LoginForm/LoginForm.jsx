import debug from "debug";
import { login } from "../../utilities/users-service";

const log = debug("mern:components:LoginForm");

export default function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    log("data: %o", data);
    const { email, password } = data;
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>

        <label>
          Email:
          <input name="email" />
        </label>
        <br />

        <label>
          Password:
          <input name="password" />
        </label>
        <br />
        <button>Login</button>
      </fieldset>
    </form>
  );
}
