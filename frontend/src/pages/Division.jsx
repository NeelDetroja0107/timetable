import { useEffect, useState } from "react";
import "./Division.css";
import {
  getDivisions,
  createDivision,
  deleteDivision,
} from "../services/divisionService";

const Division = () => {
  const [divisionName, setDivisionName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    const data = await getDivisions();
    setDivisions(data);
  };

  const formatDivision = (value) => {
    if (!value) return "";
    const lettersOnly = value.replace(/[^a-zA-Z]/g, "");
    return lettersOnly.slice(0, 2).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!divisionName || !branchId) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (divisionName.length > 2 || divisionName.length < 1) {
      setErrorMessage("Division must be 1 or 2 letters only.");
      return;
    }

    const isDuplicate = divisions.some(
      (d) =>
        d.division === divisionName.toUpperCase() &&
        d.branch_id === parseInt(branchId)
    );

    if (isDuplicate) {
      setErrorMessage("This division already exists for the selected branch.");
      return;
    }

    try {
      await createDivision({
        division: divisionName.toUpperCase(),
        branch_id: parseInt(branchId),
      });

      setDivisionName("");
      setBranchId("");
      setErrorMessage("");
      setIsModalOpen(false);

      fetchDivisions();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to add division."
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteDivision(id);
    fetchDivisions();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setErrorMessage("");
    setDivisionName("");
    setBranchId("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div className="division-page">
      <div className="page-header">
        <h2>🗂️ Division Management</h2>
        <button className="add-btn-small" onClick={openModal}>
          +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="division-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Division</th>
              <th>Branch ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {divisions.length === 0 ? (
              <tr>
                <td colSpan="4">No divisions found</td>
              </tr>
            ) : (
              divisions.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.division}</td>
                  <td>{d.branch_id}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(d.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Division</h3>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <div className="input-wrapper">
                  <label className="input-label">Division Name</label>
                  <input
                    type="text"
                    value={divisionName}
                    onChange={(e) =>
                      setDivisionName(formatDivision(e.target.value))
                    }
                    placeholder="A / AB"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Branch ID</label>
                  <input
                    type="number"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    placeholder="1"
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
                  Add Division
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Division;
