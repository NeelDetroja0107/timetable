import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">📚 Academic Panel</h1>

      <nav className="menu">
        <NavLink to="/teacher"><h3>Teacher</h3></NavLink>
        <NavLink to="/branch"><h3>Branch</h3></NavLink>
        <NavLink to="/division"><h3>Division</h3></NavLink>
        <NavLink to="/subject"><h3>Subject</h3></NavLink>
        <NavLink to="/classroom"><h3>Classroom</h3></NavLink>
        <NavLink to="/timetable"><h3>Timetable</h3></NavLink>
        <NavLink to="/report"><h3>Report</h3></NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
