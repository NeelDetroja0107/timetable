import { useEffect, useState } from "react";
import "./Subject.css";
import {
  getSubjects,
  createSubject,
  deleteSubject,
} from "../services/subjectService";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teachingHours, setTeachingHours] = useState("");
  const [branchId, setBranchId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !courseCode || !teachingHours || !branchId) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await createSubject({
        subject: name,
        course_code: courseCode,
        teaching_hours: parseInt(teachingHours),
        branch_id: parseInt(branchId),
      });

      setName("");
      setCourseCode("");
      setTeachingHours("");
      setBranchId("");
      setErrorMessage("");
      setIsModalOpen(false);
      fetchSubjects();
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Failed to add subject.");
    }
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    fetchSubjects();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setErrorMessage("");
    setName("");
    setCourseCode("");
    setTeachingHours("");
    setBranchId("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div className="subject-page">
      <div className="page-header">
        <h2>📚 Subject Management</h2>
        <button className="add-btn-small" onClick={openModal}>
          +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="subject-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course Code</th>
              <th>Teaching Hours</th>
              <th>Branch ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td colSpan="6">No subjects found</td>
              </tr>
            ) : (
              subjects.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.subject}</td>
                  <td>{s.course_code}</td>
                  <td>{s.teaching_hours}</td>
                  <td>{s.branch_id}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Subject</h3>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <div className="input-wrapper">
                  <label className="input-label">Subject Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Course Code</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Teaching Hours</label>
                  <input
                    type="number"
                    value={teachingHours}
                    onChange={(e) => setTeachingHours(e.target.value)}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Branch ID</label>
                  <input
                    type="number"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
