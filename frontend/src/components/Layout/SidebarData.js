import React from "react";
import MovieIcon from "@material-ui/icons/Movie";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <MovieIcon />,
    cName: "nav-text",
  },
  {
    title: "Watchlist",
    path: "/watchlist",
    icon: <AddIcon />,
    cName: "nav-text",
  },
];
