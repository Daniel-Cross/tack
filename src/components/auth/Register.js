import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { StyledInput, StyledButton } from "../../styles/theme";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: auto;
`;

const Register = () => {
  const [userName, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setErrors(errors.concat(err));
        });
    }
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(userName, email, password, confirmPassword)) {
      error = { message: "Please fill in all the fields" };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid(password, confirmPassword)) {
      error = { message: "Password is not valid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = (userName, email, password, confirmPassword) => {
    return (
      !userName ||
      !userName.length ||
      !email ||
      !email.length ||
      !password ||
      !password.length ||
      !confirmPassword ||
      !confirmPassword.length
    );
  };

  const isPasswordValid = (password, confirmPassword) => {
    if (
      password === undefined ||
      password.length < 6 ||
      confirmPassword.length < 6
    ) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const displayErrors = () =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  return (
    <div>
      <header>
        <h2>Register Form</h2>
      </header>
      <FormContainer onSubmit={handleSubmit}>
        <StyledInput
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
          // required
        />
        <StyledInput
          name="email"
          type="email"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}

          // required
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          // required
        />
        <StyledInput
          name="passwordConfirmation"
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          // required
        />
        <StyledButton disabled={loading}>Submit</StyledButton>
      </FormContainer>
      {errors.length > 0 && (
        <>
          <h3>Error</h3>
          {displayErrors(errors)}
        </>
      )}
      <p>
        Already a user? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
