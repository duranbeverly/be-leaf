import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
            <Footer />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
            <Footer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
