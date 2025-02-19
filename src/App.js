import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/sidebar";
//import ListWorkspace from "./components/workspaces/create&List/workspaces";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
