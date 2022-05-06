import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import NotFound from "./components/Layout/Not Found/NotFound";
import Home from "./components/Home/Home";
import MovieDetails from "./components/Movie/MovieDetails";
import Watchlist from "./components/Watchlist/Watchlist";
import Movies from "./components/Movie/Movies";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/movies/:keyword" element={<Movies />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movie/:id" element={<MovieDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/watchlist" element={<Watchlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
