import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// import your pages
import Teacher from "./pages/Teacher";
import Branch from "./pages/Branch";
import Division from "./pages/Division";
import Subject from "./pages/Subject";
import Classroom from "./pages/Classroom";
import Timetable from "./pages/Timetable";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/division" element={<Division />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
