import { useEffect, useState } from "react";
import "./Branch.css";
import {
  getBranches,
  createBranch,
  deleteBranch,
} from "../services/branchService";

const Branch = () => {
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [branches, setBranches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const data = await getBranches();
    setBranches(data);
  };

  const formatBranch = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const formatBatch = (value) => value.replace(/\D/g, "");

  // Generate BID
  const generateBID = (branch, batch) => {
    if (!branch || !batch) return "";
    const branchPart = branch.slice(0, 3).toUpperCase(); // first 3 letters
    const batchPart = batch.slice(-2); // last 2 digits
    return `${branchPart}${batchPart}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!branch || !batch) {
      setErrorMessage("Branch and batch are required.");
      return;
    }

    try {
      await createBranch({
        branch: branch.trim(),
        batch: batch.trim(),
        bid: generateBID(branch.trim(), batch.trim()),
      });

      setBranch("");
      setBatch("");
      setErrorMessage("");
      setIsModalOpen(false);
      fetchBranches();
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Failed to add branch.");
    }
  };

  const handleDelete = async (id) => {
    await deleteBranch(id);
    fetchBranches();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setErrorMessage("");
    setBranch("");
    setBatch("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div className="branch-page">
      <div className="page-header">
        <h2>🏫 Branch Management</h2>
        <button className="add-btn-small" onClick={openModal}>
          +
        </button>
      </div>

      <div className="table-wrapper">
        <table className="branch-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>BID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan="5">No branches found</td>
              </tr>
            ) : (
              branches.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.branch}</td>
                  <td>{b.batch}</td>
                  <td>{b.bid}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(b.id)}
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
            <h3>Add New Branch</h3>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <div className="input-wrapper">
                  <label className="input-label">Branch Name</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(formatBranch(e.target.value))}
                    placeholder="Cse / Computer"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Batch</label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(formatBatch(e.target.value))}
                    placeholder="2021"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label">Generated BID</label>
                  <input
                    type="text"
                    value={generateBID(branch, batch)}
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
                  Add Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branch;
