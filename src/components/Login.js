import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      window.M.toast({ html: `welcome: ${result.user.email}` });
      history.push("/");
    } catch (err) {
      window.M.toast({ html: err.message });
    }
  };
  return (
    <div className="center container" style={{ maxWidth: "500px" }}>
      <h3>Please Login!</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn blue">
          Login
        </button>
      </form>
    </div>
  );
}
