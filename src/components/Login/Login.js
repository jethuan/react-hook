import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContent from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

let initial = {
  value: "",
  isValid: null,
};

const emailReduce = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return initial;
};

const passwordReduce = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return initial;
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailSate, dispatchEmail] = useReducer(emailReduce, initial);
  const [passwordSate, dispatchPassword] = useReducer(passwordReduce, initial);

  const authCtx = useContext(AuthContent);

  const emailInputRef = useRef();

  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT IS RUNNING");
    return () => {
      console.log("EFFECT CLEAN");
    };
  }, []);

  const { isValid: emailIsValid } = emailSate;
  const { isValid: passwordIsValid } = passwordSate;

  useEffect(() => {
    console.log("checking form validate");

    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 2000);

    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    //setFormIsValid(event.target.value.includes("@") && passwordSate.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    //setFormIsValid(event.target.value.trim().length > 6 && emailSate.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailSate.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailSate.value, passwordSate.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          label="E-mail"
          id="email"
          type="email"
          value={emailSate.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          type="password"
          lable="Password"
          id="password"
          value={passwordSate.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
