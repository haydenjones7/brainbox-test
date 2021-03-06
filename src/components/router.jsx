import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";
import Search from "../pages/search";
import ChatApp from "../pages/chatapp";
import GameTest from "../pages/gametest";
import NewGame from "../pages/newgame";

/**
* The router is imported in app.jsx
*
* Our site just has two routes in it–Home and About
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/

export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/search" component={Search} />
      <Route path="/chatapp" component={ChatApp} />
      <Route path="/newgame" component={NewGame} />
    </Switch>
);
