import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  const { email, password } = state;
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(email, password);
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

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
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={submitHandler}
      >
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
