import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getUserTasks, deleteTask, updateTask, addTask, searchTask, addResultTask, saveEditResult, deleteResult, resultTask } from "../../services/Api";
import Pagination from "../../shared/components/Pagination";
import PaginationResult from "../../shared/components/Pagination-Result";
import moment from "moment";
import { toast } from "react-toastify";
import ResultModal from "../../shared/components/ResultModal";
import EditTaskModal from "../../shared/components/EditTaskModal";
import AddTaskModal from "../../shared/components/AddTaskModal";

const Home = () => {
    // const userID = useSelector(({ Auth }) => Auth.login.userCurrent?.data?._id);
    const userId = "6655f61a814c7f6072791ce0";
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('name')
    const page = searchParams.get('page') || 1;
    const filter = searchParams.get('filter') || '';
    const sort = searchParams.get('sort_created_at') || '';
    const [sortResult, setSortResult] = React.useState("");
    const [filterResult, setFilterResult] = React.useState("");
    const [pages, setPages] = React.useState({});
    const [total, setTotal] = React.useState(0);
    const [currentPage, setCurrentPage] = useState("");
    const [pagesResult, setPagesResult] = React.useState({});
    const [totalResult, setTotalResult] = React.useState(0);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({ name: "", desc: "", deadline: moment().format('yyyy-MM-ddThh:mm'), image: "", tags: [] });
    const [previewImage, setPreviewImage] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [newResult, setNewResult] = useState({
        description: '',
        outcome: '',
        score: '',
        createdAt: new Date().toISOString().slice(0, 16)
    });
    const [editingResults, setEditingResults] = useState([]);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [tasksUser, setTasksUser] = useState([]);
    console.log(editingResults);
    const handleStartDateChange = (event) => {
        try {
            return setStartDate(moment(event.target.value).format('YYYY-MM-DD'));
        } catch (error) {
            return console.log(error);
        }
    };

    const handleEndDateChange = (event) => {
        try {
            return setEndDate(moment(event.target.value).format('YYYY-MM-DD'));
        } catch (error) {
            return console.log(error);
        }
    };

    const handleClickFilter = async () => {
        try {
            const { data } = await searchTask({
                params: {
                    name: searchKeyword,
                    startDate: startDate,
                    endDate: endDate,
                }
            });
            setTasksUser(data.data);
            setPages(data.pagination);
            setTotal(data.pagination.totalPages);
            return;
        } catch (error) {
            toast(error.message);
            return console.log(error);
        }
    }
    /**
    * Thay đổi trang hiện tại.
    * @param {number} page - Số trang cần chuyển đến.
    */
    const handlePageChange = async (page) => {
        try {
            const { data } = await resultTask(selectedTask._id, {
                params: {
                    limit: 2,
                    outcome: filterResult || "",

                    page
                }
            });
            setEditingResults(data.data);
            setPagesResult(data.paginationInfo);
            setTotalResult(data.paginationInfo.total_page);
            return;
        } catch (error) {
            toast(error.message);
            console.log(error.message);
        }
    };

    /**
     * Xóa một kết quả cụ thể.
     * @param {Object} result - Đối tượng kết quả cần xóa.
     */
    const handleDeleteResult = async (result) => {
        try {
            await deleteResult(result._id);
            toast("Delete Success!");
            return;
        } catch (error) {
            toast(error.message);
            return console.log(error.message);
        }
    };

    /**
     * Cập nhật kết quả đang chỉnh sửa theo input người dùng.
     * @param {number} index - Vị trí của kết quả trong mảng editingResults.
     * @param {Object} e - Sự kiện thay đổi input.
     */
    const handleChangeInputResult = (index, e) => {
        try {
            const { name, value } = e.target;
            const updatedResults = editingResults.map((result, i) =>
                i === index ? { ...result, [name]: value } : result
            );
            return setEditingResults(updatedResults);
        } catch (error) {
            toast(error.message);
            return console.log(error);
        }
    };

    /**
     * Lưu các thay đổi kết quả chỉnh sửa lên server.
     */
    const handleSaveChanges = async () => {
        try {
            for (const result of editingResults) {
                const formData = new FormData();
                formData.append('description', result.description);
                formData.append('outcome', result.outcome);
                formData.append('score', result.score);
                await saveEditResult(result._id, formData);
                renderTask();
                toast("Save Success!")
                return;
            }
        } catch (error) {
            return console.log(error.message);
        }
    };

    /**
     * Cập nhật từ khóa tìm kiếm dựa trên input người dùng.
     * @param {Object} event - Sự kiện thay đổi input.
     */
    const handleSearchChange = (event) => {
        try {
            return setSearchKeyword(event.target.value);
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Thực hiện tìm kiếm nhiệm vụ dựa trên từ khóa và cập nhật danh sách nhiệm vụ.
     */
    const handleSearchClick = async () => {
        try {
            const { data } = await searchTask({
                params: {
                    name: searchKeyword,
                    startDate: startDate,
                    endDate: endDate,
                }
            });
            setTasksUser(data.data);
            setPages(data.pagination);
            setTotal(data.pagination.totalPages);
            return;
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Cập nhật kết quả mới dựa trên input người dùng.
     * @param {Object} e - Sự kiện thay đổi input.
     */
    const handleInputResultChange = (e) => {
        try {
            const { name, value } = e.target;
            return setNewResult({
                ...newResult,
                [name]: value
            });
        } catch (error) {
            return console.log(error);
        }
    };
    /**
 * Lấy và hiển thị danh sách nhiệm vụ của người dùng.
 */
    const renderTask = async () => {
        try {
            const { data } = await getUserTasks(userId, {
                params: {
                    page,
                    name: searchKeyword,
                }
            });
            console.log(data);
            setTasksUser(data.data);
            setPages(data.pagination);
            setTotal(data.pagination.totalPages);
            return;
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Xóa một nhiệm vụ cụ thể.
     * @param {Object} task - Đối tượng nhiệm vụ cần xóa.
     */
    const clickDeleteTask = async (task) => {
        try {
            console.log(task._id);
            await deleteTask(task._id, { delete_by: userId });
            renderTask();
            toast("Delete Success!")
            return;
        } catch (error) {
            toast(error.message)
            return console.log(error);
        }
    };

    /**
     * Xử lý sự kiện khi bấm vào nhiệm vụ.
     * @param {Object} task - Đối tượng nhiệm vụ cần xử lý.
     */
    const handleButtonClick = async (task) => {
        try {
            console.log(task._id);
            const { data } = await resultTask(task._id, {
                params: {
                    limit: 2,
                }
            });
            console.log(data);
            setEditingResults(data.data);
            setPagesResult(data.paginationInfo);
            setTotalResult(data.paginationInfo.total_page);
            setSelectedTask(task);
            const modal = new window.bootstrap.Modal(document.getElementById('eventModalUpdate'));
            modal.show();
            return;
        } catch (error) {
            return console.log(error);
        }
    };

    const handleFilterChange = async (e) => {
        const newFilter = e.target.value;
        setFilterResult(newFilter);
        try {
            const { data } = await resultTask(selectedTask._id, {
                params: {
                    limit: 2,
                    outcome: newFilter,
                    sort_created_at: sortResult,
                }
            });
            setEditingResults(data.data);
            setPagesResult(data.paginationInfo);
            setTotalResult(data.paginationInfo.total_page);
            return;
        } catch (error) {
            toast("error.message", error)
            console.log(error.message);
        }
    };
    const handleSortChange = async (e) => {
        const newSort = e.target.value;
        setSortResult(newSort);
        try {
            const { data } = await resultTask(selectedTask._id, {
                params: {
                    limit: 2,
                    sort_created_at: newSort,
                    outcome: filterResult,
                }
            });
            setEditingResults(data.data);
            setPagesResult(data.paginationInfo);
            setTotalResult(data.paginationInfo.total_page);
            return;
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Thay đổi giá trị trong input của nhiệm vụ được chọn.
     * @param {Object} e - Sự kiện thay đổi input.
     */
    const handleInputChange = (e) => {
        try {
            const { name, value } = e.target;
            setSelectedTask({ ...selectedTask, [name]: value });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Chọn file để thêm vào nhiệm vụ mới.
     * @param {Object} e - Sự kiện thay đổi file input.
     */
    const handleFileChange = (e) => {
        try {
            const file = e.target.files[0];
            setNewTask({ ...newTask, image: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
                return;
            } else {
                return setPreviewImage(null);
            }
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Thay đổi giá trị trong input của nhiệm vụ mới.
     * @param {Object} e - Sự kiện thay đổi input.
     */
    const handleNewTaskChange = (e) => {
        try {
            const { name, value } = e.target;
            return setNewTask({ ...newTask, [name]: value });
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Quản lý thẻ (tags) cho nhiệm vụ mới.
     * @param {Object} e - Sự kiện thay đổi input của thẻ.
     * @param {number} index - Vị trí của thẻ trong mảng tags.
     */
    const handleNewTagChange = (e, index) => {
        const newTags = [...newTask.tags];
        newTags[index] = e.target.value;
        return setNewTask({ ...newTask, tags: newTags });
    };

    /**
     * Thêm input thẻ mới cho nhiệm vụ mới.
     * @param {Object} e - Sự kiện bấm nút thêm thẻ.
     */
    const addNewTagInput = (e) => {
        e.preventDefault();
        return setNewTask({ ...newTask, tags: [...newTask.tags, ''] });
    };

    /**
     * Thay đổi giá trị trong input của thẻ đã chọn.
     * @param {Object} e - Sự kiện thay đổi input của thẻ.
     * @param {number} index - Vị trí của thẻ trong mảng tags.
     */
    const handleTagChange = (e, index) => {
        try {
            const newTags = [...selectedTask.tags];
            newTags[index] = e.target.value;
            return setSelectedTask({ ...selectedTask, tags: newTags });
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Thêm input thẻ mới cho nhiệm vụ đã chọn.
     * @param {Object} e - Sự kiện bấm nút thêm thẻ.
     */
    const addTagInput = (e) => {
        e.preventDefault();
        try {
            return setSelectedTask({ ...selectedTask, tags: [...selectedTask.tags, ''] });
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * Xử lý sự kiện thêm mới nhiệm vụ.
     */
    /**
 * Xử lý sự kiện thêm mới nhiệm vụ.
 */
    const clickAddTask = async () => {
        try {
            if (!newTask.name || !newTask.desc || !newTask.deadline || !newTask.tags.length) {
                throw new Error('Các trường name, desc, deadline và tags không được để trống.');
            }

            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('name', newTask.name);
            formData.append('desc', newTask.desc);
            formData.append('deadline', newTask.deadline);
            if (newTask.image) {
                formData.append('image', newTask.image);
            }
            formData.append('tags', newTask.tags);
            formData.append('create_by', userId);

            const { data } = await addTask(formData);
            setTasksUser((tasksUser) => [...tasksUser, data]);
            setNewTask({ name: "", desc: "", deadline: moment().format('YYYY-MM-DDTHH:mm'), image: null, tags: [] });
            toast("Add successfully!");
            return renderTask();
        } catch (error) {
            toast(error.message);
            return console.log(error.message);
        }
    };


    /**
     * Xử lý sự kiện cập nhật nhiệm vụ.
     */
    const clickUpdateTask = async () => {
        try {
            console.log(selectedTask._id);
            const { data } = await updateTask(selectedTask._id, selectedTask);
            const updatedTasks = tasksUser.map((task) => (task._id === data._id ? data : task));
            setTasksUser(updatedTasks);
            toast("Update task success!");
            return renderTask();
        } catch (error) {
            toast(error.message);
            return console.log(error);
        }
    };

    /**
     * Thêm kết quả mới cho nhiệm vụ đã chọn.
     */
    const clickAddResult = async () => {
        try {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('description', newResult.description);
            formData.append('outcome', newResult.outcome);
            formData.append('score', newResult.score);
            await addResultTask(selectedTask._id, formData);
            setNewResult({
                description: '',
                outcome: '',
                score: '',
                createdAt: new Date().toISOString().slice(0, 16)
            });
            toast("Add result successfully!");
            return renderTask();
        } catch (error) {
            toast(error.message);
            return console.log(error);
        }
    };

    /**
     * Gọi API để render các nhiệm vụ khi component được mount hoặc khi page, keyword, selectedTask, hoặc pagesResult thay đổi.
     */

    useEffect(() => {
        renderTask();
    }, [page, keyword, selectedTask]);


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

            <div className="input-group mt-3 mb-3">
                <div className="search-container">
                    <input
                        type="text"
                        className="inputsearch"
                        placeholder="Search tasks..."
                        aria-label="Search tasks"
                        aria-describedby="button-search"
                        onChange={handleSearchChange}
                    />
                    <div className="input-group-append ">
                        <button
                            className="btn btn-success btn-search "
                            type="button"
                            id="button-search"
                            onClick={handleSearchClick}
                        >
                            Search
                        </button>
                    </div>
                </div>


            </div>

            <div className="date-picker-container">
                <label htmlFor="start-date">Start Date:</label>
                <input onChange={handleStartDateChange} type="date" id="start-date" name="start-date" />
                <label htmlFor="end-date">End Date:</label>
                <input onChange={handleEndDateChange} type="date" id="end-date" name="end-date" />
                <button onClick={handleClickFilter}>Lọc</button>
            </div>

            {/* Modal for Add Event */}
            <AddTaskModal newTask={newTask} handleNewTaskChange={handleNewTaskChange} handleFileChange={handleFileChange} previewImage={previewImage} handleNewTagChange={handleNewTagChange} addNewTagInput={addNewTagInput} clickAddTask={clickAddTask} />

            {/* Modal for Edit Event */}
            <EditTaskModal selectedTask={selectedTask} handleInputChange={handleInputChange} handleFileChange={handleFileChange} previewImage={previewImage} addTagInput={addTagInput} clickUpdateTask={clickUpdateTask} handleTagChange={handleTagChange} />

            {/* Modal for Results Task */}
            <ResultModal handleFilterChange={handleFilterChange} handleInputResultChange={handleInputResultChange} handleSortChange={handleSortChange} handleDeleteResult={handleDeleteResult} handleChangeInputResult={handleChangeInputResult} editingResults={editingResults} filter={filter} newResult={newResult} clickAddResult={clickAddResult} pagesResult={pagesResult} totalResult={totalResult} currentPage={currentPage} handlePageChange={handlePageChange} handleSaveChanges={handleSaveChanges} />
            <div className="row">
                {tasksUser && tasksUser.map((task, index) => {

                    if (task.is_delete === false) {
                        return ((
                            <>
                                <div className="col-md-4 col-sm-6" key={index}>
                                    <div className="card" style={{ margin: "0 0 20px 0", width: "auto", height: "470px" }}>
                                        {task.image && (
                                            <img
                                                src={task.image}
                                                className="card-img-top img-fluid"
                                                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                                                alt="Task Image" onClick={() => handleButtonClick(task)}
                                            />
                                        )}
                                        <div className="card-body" style={{ overflow: "hidden", height: "calc(100% - 200px)" }}>
                                            <button
                                                className="btn btn-danger btn-sm delete-button"
                                                style={{ position: "absolute", top: "10px", right: "10px" }}
                                                data-toggle="modal" data-target="#comfirmDelTask"
                                            >
                                                &times;
                                            </button>
                                            <h5 className="card-title" onClick={() => handleButtonClick(task)}>{task.name} </h5>
                                            <p className="card-text" onClick={() => handleButtonClick(task)}>{task.desc}</p>
                                            <p className="card-text" onClick={() => handleButtonClick(task)}>
                                                <small className="text-muted">
                                                    {new Date(task.deadline).toLocaleString("en-US", {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </small>
                                            </p>
                                            <div className="tags">
                                                {task.tags && task.tags.map((tag, tagIndex) => (
                                                    <span key={tagIndex} style={{ margin: "3px" }} className="badge badge-secondary">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-primary btn-sm edit-button"
                                            style={{ position: "absolute", bottom: "10px", left: "10px" }}
                                            data-toggle="modal"
                                            data-target="#editEventModal"
                                            onClick={(e) => {
                                                setSelectedTask(task); // Set the task data for editing
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <div class="modal" id="comfirmDelTask" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Confirm delete task</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>You have confirmed that you want to delete?</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={(e) => {
                                                    clickDeleteTask(task);
                                                }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>


                        ))
                    }
                }
                )}
            </div>
            <Pagination pages={{ ...pages, total }} />

        </div>
    );
};

export default Home;
