import React, { useState, useEffect } from "react";
import { getUserTasks, deleteTask, updateTask, addTask } from "../../services/Api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const Home = () => {
    const userId = useSelector(({ Auth }) => Auth.login.userCurrent?.data?._id);
    const [tasksUser, setTasksUser] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({ Name: "", Desc: "", Deadline: moment().format('yyyy-MM-ddThh:mm'), Image: "" });
    const [previewImage, setPreviewImage] = useState(null);
    //Hàm render Task
    const renderTask = () => {
        getUserTasks(userId)
            .then(({ data }) => {
                setTasksUser(data.data);
            })
            .catch((error) => console.log(error));
    };
    //Xoá task
    const clickDeleteTask = () => {
        deleteTask(selectedTask._id)
            .then(() => {
                setTasksUser((prevTasks) => prevTasks.filter((task) => task._id !== selectedTask._id));
                renderTask();
            })
            .catch((error) => console.log(error));
    };
    //Hàm sự kiệm bấm vào task
    const handleButtonClick = (task) => {
        setSelectedTask(task);
        const modal = new window.bootstrap.Modal(document.getElementById('eventModalUpdate'));
        modal.show();
    };
    //Hàm thay đổi giá trị trong input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTask({ ...selectedTask, [name]: value });
    };
    //Hàm chọn file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewTask({ ...newTask, Image: file });
    };
    // const handleFileChangeUpdate = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedTask({ ...selectedTask, Image: file });
    // }
    //Hàm thay đổi giá trị trong input của Add task
    const handleNewTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };
    //Hàm sử lý sự kiện thêm mới Task 
    const clickAddTask = () => {
        const formData = new FormData();
        formData.append('UserID', userId);
        formData.append('Name', newTask.Name);
        formData.append('Desc', newTask.Desc);
        formData.append('Deadline', newTask.Deadline);
        formData.append('Image', newTask.Image);
        addTask(formData)
            .then(({ data }) => {
                setTasksUser((tasksUser) => [...tasksUser, data]);
                setNewTask({ Name: "", Desc: "", Deadline: moment().format('YYYY-MM-DDTHH:mm'), Image: null });
                renderTask();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //Hàm xử lý sự kiện update Task
    const clickUpdateTask = () => {
        updateTask(selectedTask._id, selectedTask)
            .then(() => {
                const updatedTasks = tasksUser.map((task) => (task._id === selectedTask._id ? selectedTask : task));
                console.log(updatedTasks);
                setTasksUser(updatedTasks);
                renderTask();
            })
            .catch((error) => console.log(error));
    };
    //Gọi api render giao diện
    useEffect(() => {
        renderTask();
    }, []);

    return (
        <div className="container" id="home-page">
            {/* Calendar View */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center" id="monthly">Monthly Calendar</h2>
                        <div id="calendar" />
                    </div>
                </div>
            </div>
            {/* Button trigger modal */}
            <button type="button" id="button-add" className="btn btn-success" data-toggle="modal" data-target="#eventModal">
                Add Task
            </button>

            {/* Modal for Add Event */}
            <div className="modal fade" id="eventModal" tabIndex={1} role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eventModalLabel">Add/Edit Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="eventTitle">Event Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Name"
                                        id="eventTitle"
                                        value={newTask.Name}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDateTime">Event Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="eventDateTime"
                                        name="Deadline"
                                        value={newTask.Deadline}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskImage">Image</label>
                                    <input
                                        name="Image"
                                        className="form-control"
                                        id="taskImage"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            className="card-img-top img-fluid"
                                            style={{ display: "block", height: "200px", borderRadius: "10px 10px 0 0" }}
                                            alt="Preview"
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskDesc">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="taskDesc"
                                        name="Desc"
                                        value={newTask.Desc}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={clickAddTask} type="button" className="btn btn-primary" data-dismiss="modal" id="saveEvent">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for Update Event */}
            <div className="modal fade" id="eventModalUpdate" tabIndex={1} role="dialog" aria-labelledby="eventModalUpdateLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eventModalUpdateLabel">Task Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedTask && (
                                <div>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="taskName">Task Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="taskName"
                                                name="Name"
                                                value={selectedTask.Name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="taskDesc">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="taskDesc"
                                                name="Desc"
                                                value={selectedTask.Desc}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* <div className="form-group">
                                            <label htmlFor="taskImage">Image</label>
                                            <input name="Image" className="form-control" id="taskImage"
                                                onChange={handleFileChangeUpdate} type="file" />
                                            {previewImage && (
                                                <img
                                                    src={previewImage}
                                                    className="card-img-top img-fluid"
                                                    style={{ display: "block", height: "200px", borderRadius: "10px 10px 0 0" }}
                                                    alt="Preview"
                                                />
                                            )}
                                        </div> */}

                                        <div className="form-group">
                                            <label htmlFor="taskDeadline">Date Time</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="taskDeadline"
                                                name="Deadline"
                                                value={moment(selectedTask.Deadline).format('YYYY-MM-DDTHH:mm')}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={clickDeleteTask} className="btn btn-danger" data-dismiss="modal" id="deleteBtn">Xoá</button>
                            <button type="button" onClick={clickUpdateTask} className="btn btn-primary" data-dismiss="modal" id="updateBtn">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of tasks */}
            <div className="list-item">
                {tasksUser.map((item) => (
                    <button
                        key={item._id}
                        onClick={() => handleButtonClick(item)}
                        style={{ border: 'none', padding: 0, background: "none" }}
                        id="button-edit"
                        className=""
                    >
                        <div className="row row-cols-1 row-cols-md-3">
                            <div className="card border-info mb-3" style={{ maxWidth: '18rem', borderRadius: "10px" }}>
                                <img src={item.Image} className="card-img-top img-fluid" style={{ display: "block", height: "200px", borderRadius: "10px 10px 0 0" }} alt="..." />
                                <div className="card-header">{moment(item.Deadline).calendar()}</div>
                                <div className="card-body text-info">
                                    <h5 className="card-title">{item.Name}</h5>
                                    <p className="card-text">{item.Desc}</p>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
