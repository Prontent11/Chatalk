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
import React, { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { name, email, password, confirmPassword, pic, show } = state;
  const history = useNavigate();
  const picPost = (pic) => {
    setLoading(true);
    if (pic == undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    if (pic.type == "image/jpeg" || pic.type == "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "prontent");
      fetch("https://api.cloudinary.com/v1_1/prontent/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "Pic", payload: data.url.toString() });
          console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      return;
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);

      return;
    }
  };
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

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/register",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
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
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => picPost(e.target.files[0])}
        />
      </FormControl>
      <Button
        isLoading={loading}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
