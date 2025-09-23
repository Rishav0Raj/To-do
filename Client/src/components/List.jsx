import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from "../styles/List.module.css";

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getListsData();
  }, []);

  function getListsData() {
    axios
      .get("http://localhost:3200/tasks", { withCredentials: true })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log("some error occured", error);
      });
  }

  async function handleDelete(id){
    try{
      await axios.delete(`http://localhost:3200/delete/${id}`);

    }catch(error){
      console.log('some error occured',error)
    }
    getListsData()

  }

  return (
    <div className={styles.Main}>
      {data &&
        data.map((item, index) => (
          <div className={styles.box} key={item._id || index}>
            <div className={styles.heading}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
            <div className={styles.action}>
              <a className={`${styles.link} ${styles.edit}`} href={`/edit/${item._id}`}>
                Edit
              </a>
              <button
                className={`${styles.link} ${styles.delete}`}
                onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default List;
