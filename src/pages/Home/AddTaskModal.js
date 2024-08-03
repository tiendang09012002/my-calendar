const AddTaskModal = ({newTask, handleNewTaskChange , handleFileChange , previewImage, handleNewTagChange, addNewTagInput, clickAddTask})=>{
    return(
        <>
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
                                    <label htmlFor="eventTitle">Task Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="eventTitle"
                                        value={newTask.name}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDateTime">Task Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="eventDateTime"
                                        name="deadline"
                                        value={newTask.deadline}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskImage">Image</label>
                                    <input
                                        name="image"
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
                                        name="desc"
                                        value={newTask.desc}
                                        onChange={handleNewTaskChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tags</label>
                                    <div>
                                        {newTask.tags.map((tag, index) => (
                                            <div className="d-flex align-items-center mb-2" key={index}>
                                                <input
                                                    type="text"
                                                    className="form-control mr-2"
                                                    value={tag}
                                                    onChange={(e) => handleNewTagChange(e, index)}
                                                />
                                                {index === newTask.tags.length - 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={addNewTagInput}
                                                    >
                                                        +
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={addNewTagInput} className="btn btn-secondary mt-2">Add Tag</button>
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
            
        </>
    );
}
export default AddTaskModal;