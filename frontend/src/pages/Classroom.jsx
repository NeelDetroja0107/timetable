import { useEffect, useState } from "react";
import "./Classroom.css";
import {
  getClassrooms,
  createClassroom,
  deleteClassroom,
} from "../services/classroomService";

const Classroom = () => {
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const data = await getClassrooms();
    setClassrooms(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!block.trim() || !room.trim()) return;

    const newUid = `${block.toUpperCase()}${room}`;

    // Client-side check: prevent duplicate uid
    const isDuplicate = classrooms.some((c) => c.uid === newUid);
    if (isDuplicate) {
      setErrorMessage("This classroom already exists!");
      return;
    }

    try {
      await createClassroom({
        block: block.toUpperCase(),
        room,
        uid: newUid,
      });

      setBlock("");
      setRoom("");
      setErrorMessage(""); // Clear error on success
      setIsModalOpen(false);
      fetchClassrooms();
    } catch (error) {
      // If backend also rejects (e.g., unique constraint), show error
      setErrorMessage("This classroom already exists or failed to add.");
    }
  };

  const handleDelete = async (id) => {
    await deleteClassroom(id);
    fetchClassrooms();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setErrorMessage(""); // Clear previous error when opening
    setBlock("");
    setRoom("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
    setBlock("");
    setRoom("");
  };

  return (
    <div className="classroom-page">
      {/* Header */}
      <div className="page-header">
        <h2>🏫 Classroom Management</h2>
        <button className="add-btn-small" onClick={openModal}>
          +
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="classroom-table">
          <thead>
            <tr>
              <th>BLOCK</th>
              <th>ROOM</th>
              <th>NAME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.length === 0 ? (
              <tr>
                <td colSpan="4">No classrooms found</td>
              </tr>
            ) : (
              classrooms.map((c) => (
                <tr key={c.id}>
                  <td>{c.block}</td>
                  <td>{c.room}</td>
                  <td>{c.uid}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c.id)}
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

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Classroom</h3>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <input
                  type="text"
                  placeholder="A, B,..."
                  value={block}
                  onChange={(e) => setBlock(e.target.value.toUpperCase())}
                  required
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="101, 201,..."
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classroom;