import React from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const Home = () => {
  const {
    user,
    user: { accessToken },
  } = useContext(UserContext);
  console.log(user);
  return <div className="mt-20">Home</div>;
};

export default Home;
