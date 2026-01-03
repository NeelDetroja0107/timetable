import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, createTeacher } from "../redux/actions/teacherActions";

function Teacher() {
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.teacher);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(createTeacher({ first_name: firstName, last_name: lastName }));
    setFirstName(""); setLastName("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Teachers</h2>
      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <button onClick={handleSubmit}>Add Teacher</button>

      <ul>
        {teachers.map(t => (
          <li key={t.id}>{t.first_name} {t.last_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Teacher;
