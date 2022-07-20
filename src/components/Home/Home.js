import React, { useContext } from "react";
import AuthContent from "../../store/auth-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = () => {
  const abc = useContext(AuthContent);
  return (
    <AuthContent.Consumer>
      {(abc) => {
        return (
          <Card className={classes.home}>
            <h1>Welcome back!</h1>
            <Button onClick={abc.onLogout}>Logout</Button>
          </Card>
        );
      }}
    </AuthContent.Consumer>
  );
};

export default Home;
