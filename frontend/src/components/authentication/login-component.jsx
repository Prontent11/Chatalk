import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useReducer } from "react";

const LoginRedcer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "EMAIL":
      return { ...state, email: payload };
    case "PASSWORD":
      return { ...state, password: payload };
    case "SHOW":
      return { ...state, show: !state.show };
    default:
      return new Error("Invalid action");
  }
};

const LoginState = {
  email: "",
  password: "",
  show: false,
};
const Login = () => {
  const [state, dispatch] = useReducer(LoginRedcer, LoginState);

  const emailChange = (e) => {
    dispatch({ type: "EMAIL", payload: e.target.value });
  };
  const passwordChange = (e) => {
    dispatch({ type: "PASSWORD", payload: e.target.value });
  };
  const showChange = () => {
    dispatch({ type: "SHOW" });
  };

  const guestHandler = () => {
    dispatch({ type: "EMAIL", payload: "guest@example.com" });
    dispatch({ type: "PASSWORD", payload: "123456" });
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={emailChange}
          value={state.email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={state.show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={passwordChange}
            value={state.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showChange}>
              {state.show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={guestHandler}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
