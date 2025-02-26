import { useReducer } from "react";

// Reducer function
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };

    case "TOGGLE_AGREEMENT":
      return { ...state, agreedToTerms: !state.agreedToTerms };

    case "RESET_FORM":
      return initialFormState;

    default:
      throw new Error("Unknown action type");
  }
}

// Initial state for the form
const initialFormState = {
  name: "",
  email: "",
  password: "",
  agreedToTerms: false,
};

function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "name",
            value: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "email",
            value: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "password",
            value: e.target.value,
          })
        }
      />

      <label>
        <input
          type="checkbox"
          checked={state.agreedToTerms}
          onChange={() => dispatch({ type: "TOGGLE_AGREEMENT" })}
        />
        I agree to the terms
      </label>

      <button type="submit" disabled={!state.agreedToTerms}>
        Register
      </button>

      <button type="button" onClick={() => dispatch({ type: "RESET_FORM" })}>
        Reset
      </button>
    </form>
  );
}

export default RegistrationForm;
