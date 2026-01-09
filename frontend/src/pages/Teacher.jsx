import { useEffect, useState } from "react";
import "./Teacher.css";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
} from "../services/teacherService";

const Teacher = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [branchIds, setBranchIds] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  const capitalize = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First name and last name are required.");
      return;
    }

    const branchIdsArray = branchIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .map(Number);

    try {
      await createTeacher({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        branch_ids: branchIdsArray,
      });

      setFirstName("");
      setLastName("");
      setBranchIds("");
      setErrorMessage("");
      setIsModalOpen(false);
      fetchTeachers();
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Failed to add teacher.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      await deleteTeacher(id);
      fetchTeachers();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setErrorMessage("");
    setFirstName("");
    setLastName("");
    setBranchIds("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div className="teacher-page">
      <div className="page-header">
        <h2>👩‍🏫 Teacher Management</h2>
        <button className="add-btn-small" onClick={openModal}>
          +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>UID</th>
              <th>Branches</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="6">No teachers found</td>
              </tr>
            ) : (
              teachers.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.first_name}</td>
                  <td>{t.last_name}</td>
                  <td>{t.uid}</td>
                  <td>
                    {t.branch_ids?.length > 0 ? t.branch_ids.join(", ") : "-"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.id)}
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
            <h3>Add New Teacher</h3>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <div className="input-wrapper">
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(capitalize(e.target.value))}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(capitalize(e.target.value))}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">
                    Branch IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="1, 2, 3"
                    value={branchIds}
                    onChange={(e) => setBranchIds(e.target.value)}
                  />
                </div>

                {/* UID Preview */}
                <div className="input-wrapper">
                  <label className="input-label">Generated UID</label>
                  <input
                    type="text"
                    value={
                      firstName && lastName
                        ? `${firstName}${lastName.charAt(0)}`
                        : ""
                    }
                    disabled
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
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
