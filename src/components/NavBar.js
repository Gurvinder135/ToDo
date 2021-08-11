import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
export default function NavBar({ user }) {
  const history = useHistory();
  return (
    <nav>
      <div className="nav-wrapper blue">
        <Link to="/" className="brand-logo">
          ToDo
        </Link>
        <ul id="nav-mobile" className="right">
          {user ? (
            <li>
              <button
                onClick={() => {
                  auth.signOut();
                  history.push("./login");
                }}
                className="btn red"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
