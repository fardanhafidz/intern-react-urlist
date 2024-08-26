import "./App.css";

import { useState, useEffect } from "react";
import { db } from "./firebase-config";

import {
  doc,
  query,
  orderBy,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  // const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   await axios.post("http://localhost:8000/api/user").then((response) => {
  //     setUser(response.data);
  //   });
  // };

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");

      navigate("/login");
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    // fetchData();

    getTasks();
    resetFields();
  }, []);

  const [newTitle, setNewTitle] = useState();
  const [newDesc, setNewDesc] = useState();

  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "tasks");

  const validate = (item) => {
    if (!item) {
      document.getElementById("error").show();
      return false;
    } else {
      return true;
    }
  };

  const createTask = () => {
    const toValidate = [newTitle, newDesc];
    const validated = toValidate.every(validate);

    if (validated) {
      console.log("TEST !@#$");
      addDoc(tasksCollectionRef, {
        title: newTitle,
        desc: newDesc,
        status: 1,

        // status: 1 for active, 0 for inactive
      });

      resetFields();
      document.getElementById("addTaskModal").close();
    }

    getTasks();
  };

  const resetFields = () => {
    setNewTitle("");
    setNewDesc("");

    document.getElementById("error").style.display = "none";
  };

  const changeStatus = async (id, status) => {
    const newStatus = { status: status == 1 ? 0 : 1 };
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, newStatus);

    getTasks();
  };

  const getTasks = async () => {
    const data = await getDocs(
      query(tasksCollectionRef, orderBy("status", "desc"))
    );
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="App">
      <section className="flex flex-col min-h-screen justify-between bg-gray-100">
        <Navbar setSearch={setSearch} logoutHandler={logoutHandler} />
        <Main
          setNewTitle={setNewTitle}
          setNewDesc={setNewDesc}
          resetFields={resetFields}
          createTask={createTask}
          changeStatus={changeStatus}
          search={search}
          tasks={tasks}
        />
        <Footer />
      </section>
    </div>
  );
}

function Main(props) {
  return (
    <div className="mx-20 mb-20 p-5 rounded-md bg-white">
      <section className="Table">
        <div className="overflow-x-auto ">
          <label className="text-3xl font-semibold">Your Tasks</label>
          <table className="table my-2">
            <tbody>
              {props.tasks
                ?.filter((item) => {
                  return props.search?.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(props.search);
                })
                .map((task, index) => {
                  return (
                    <tr
                      className={`text-xl font-semibold ${
                        task.status === 1
                          ? "hover text-gray-700"
                          : "line-through text-gray-500"
                      }`}
                      onClick={() => {
                        props.changeStatus(task.id, task.status);
                      }}
                    >
                      <td>{task.status == 1 ? index + 1 + "." : ""}</td>
                      <td>{task.title}</td>
                      <td>{task.desc}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="Modal">
        <div className="fixed bottom-5 right-10">
          <button
            className="shadow-md btn btn-circle"
            onClick={() => document.getElementById("addTaskModal").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-table-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
              <path d="M3 10h18" />
              <path d="M10 3v18" />
              <path d="M16 19h6" />
              <path d="M19 16v6" />
            </svg>
          </button>
        </div>
        <dialog id="addTaskModal" className="modal">
          <dialog id="error" className="text text-warning font-semibold">
            <div className="modal-box">Please fill all required fields!</div>
          </dialog>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Task</h3>
            <p className="italic mb-7">
              Input new data correctly by filling the form bellow!
            </p>
            <label className="input input-bordered flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-tag"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Title"
                onChange={(e) => props.setNewTitle(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-start pt-3 gap-2 mb-3 min-h-32 overflow-y-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-highlight"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                <path d="M12.5 5.5l4 4" />
                <path d="M4.5 13.5l4 4" />
                <path d="M21 15v4h-8l4 -4z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Write description..."
                onChange={(e) => props.setNewDesc(e.target.value)}
              />
            </label>
            <div className="flex flex-col-reverse">
              <button onClick={props.createTask} className="btn mt-5 self-end">
                Save
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                  <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M14 4l0 4l-6 0l0 -4" />
                </svg>
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={props.resetFields}>close</button>
          </form>
        </dialog>
      </section>
    </div>
  );
}

export default App;
