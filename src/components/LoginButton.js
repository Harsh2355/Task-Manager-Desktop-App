import React from 'react';
import { useHistory } from "react-router-dom";

export default function LoginButton({type ,state, login, signup}) {
  let history = useHistory();

  async function handleSubmit (e) {
    e.preventDefault();
    const Details = {
      email: state.email,
      password: state.password,
      age: state.age,
      name: state.name,
    }
    let success = false;
    if (type === 'login') {
        success = await login(Details);
    }
    else {
        success = await signup(Details);
    }
    
    if (success == true) {
        history.push("/");
    }
 }

  return (
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
  );
}