import React, { useEffect, useState } from "react";
import styles from "../styles/EditTask.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  function handleUpdateTask() {
    axios
      .put(`http://localhost:3200/update/${id}`, { title, description })
      .then((res) => {
        if (res.data.success) {
          console.log("Task updated successfully");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3200/task/${id}`)
      .then((result) => {
        setTitle(result.data.title);
        setDescription(result.data.description);
      })
      .catch((error) => {
        console.log("some error occured", error);
      });
  }, []);


  return (
    <div className={styles.main}>
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        className={styles.input}
        maxLength={40}
        type="text"
        name="title"
        id="title"
        placeholder="Enter Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        className={styles.textarea}
        maxLength={200}
        name="description"
        id="description"
        placeholder="Enter Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></textarea>
      <button onClick={handleUpdateTask} className={styles.button}>
        Edit Task
      </button>
    </div>
  );
}

export default EditTask;
