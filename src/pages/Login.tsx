import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "grey" : "#2aaa45")};
  color: #fff;
  font-size: 16px;
  margin-top: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  align-self: center;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "grey" : "#1f8e38")};
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsLoginDisabled(e.target.value === "" || password === "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsLoginDisabled(e.target.value === "" || username === "");
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <CardContainer>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onClick={handleLogin} disabled={isLoginDisabled}>
        Login
      </Button>
    </CardContainer>
  );
};

export default LoginForm;
