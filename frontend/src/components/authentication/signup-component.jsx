import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useReducer } from "react";

const SignUpReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "Name":
      return {
        ...state,
        name: payload,
      };
    case "Email":
      return {
        ...state,
        email: payload,
      };
    case "Password":
      return {
        ...state,
        password: payload,
      };
    case "ConfirmPassword":
      return {
        ...state,
        confirmPassword: payload,
      };
    case "Show":
      return {
        ...state,
        show: !state.show,
      };
    case "Pic":
      return {
        ...state,
        pic: payload,
      };
  }
};
const InitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pic: "",
  show: false,
};
const SignUp = () => {
  const [state, dispatch] = useReducer(SignUpReducer, InitialState);
  const nameChange = (e) => {
    dispatch({ type: "Name", payload: e.target.value });
  };
  const emailChange = (e) => {
    dispatch({ type: "Email", payload: e.target.value });
  };
  const passwordChange = (e) => {
    dispatch({ type: "Password", payload: e.target.value });
  };
  const confirmPasswordChange = (e) => {
    dispatch({ type: "ConfirmPassword", payload: e.target.value });
  };
  const showChange = () => {
    dispatch({ type: "Show" });
  };
  const picChange = (e) => {
    dispatch({ type: "Pic", payload: e.target.value[0] });
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={state.name}
          onChange={nameChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={emailChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={state.show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={passwordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showChange}>
              {state.show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={state.show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={confirmPasswordChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showChange}>
              {state.show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={picChange} />
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
