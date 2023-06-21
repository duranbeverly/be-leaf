import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashPage from "./components/SplashPage";
import PlantList from "./components/PlantList";
import PlantDetail from "./components/PlantDetail";
import CreatePlant from "./components/CreatePlant";
import UserPlants from "./components/UserPlants";
import EditPlant from "./components/EditPlant";
import ReviewView from "./components/ReviewView";
import GiantsPlants from "./components/GiantPlants";
import PetFriendlyPlants from "./components/PetFriendlyPlants";
import FavoritesView from "./components/FavoritesView";
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
          <Route exact path="/user-plants">
            <UserPlants />
          </Route>
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/edit/:plantId">
            <EditPlant />
          </Route>
          <Route exact path="/reviews">
            <ReviewView />
          </Route>
          <Route exact path="/giant-plants">
            <GiantsPlants />
          </Route>
          <Route exact path="/pet-safe-plants">
            <PetFriendlyPlants />
          </Route>
          <Route exact path="/favorites">
            <FavoritesView />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
