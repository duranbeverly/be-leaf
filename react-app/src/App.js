import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage";
import PlantList from "./components/PlantList";
import PlantDetail from "./components/PlantDetail";
import CreatePlant from "./components/CreatePlant";
import User from "./components/User";
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
          <Route exact path="/plants/new">
            <CreatePlant />
          </Route>
          <Route exact path="/plants/:plantId">
            <PlantDetail />
          </Route>
          <Route exact path="/plants">
            <PlantList />
          </Route>
          <Route exact path="/user">
            <User />
            <Footer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
