import React, { useState } from "react";
import "./sideBar.css";
import ListWorkspace from "./workspaces/List/workspaces";

const SideBar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="navPrompt small sidebar-item" onClick={() => onSelect("workspace")}>
        <p className="sidebar-text">Workspace</p>
      </div>
    </div>
  );
};

/*
const UserContent = () => {
  return (
    <div className="content">
      <h2>User Content</h2>
      <p>This is the user content section.</p>
    </div>
  );
};
*/

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="dashboard">
      <SideBar onSelect={setActiveSection} />
      <div className="main-content">
        {activeSection === "workspace" && <ListWorkspace />}
      </div>
    </div>
  );
};

export default Dashboard;