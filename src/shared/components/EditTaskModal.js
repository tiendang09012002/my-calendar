const EditTaskModal = ({ selectedTask, handleInputChange, handleFileChange, previewImage, addTagInput, clickUpdateTask, handleTagChange }) => {
    return (
        <>
            <div className="modal fade" id="editEventModal" tabIndex={1} role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eventModalLabel">Add/Edit Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                selectedTask && (<form>
                                    <div className="form-group">
                                        <label htmlFor="eventTitle">Task Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="eventTitle"
                                            value={selectedTask.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="eventDateTime">Task Date and Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="eventDateTime"
                                            name="deadline"
                                            value={selectedTask.deadline}
                                            onChange={handleInputChange}
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
                                            value={selectedTask.desc}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tags</label>
                                        <div>
                                            {selectedTask.tags.map((tag, index) => (
                                                <div className="d-flex align-items-center mb-2" key={index}>
                                                    <input
                                                        type="text"
                                                        className="form-control mr-2"
                                                        value={tag}
                                                        onChange={(e) => handleTagChange(e, index)}
                                                    />
                                                    {index === selectedTask.tags.length - 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={addTagInput}
                                                        >
                                                            +
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={addTagInput} className="btn btn-secondary mt-2">Add Tag</button>
                                    </div>
                                </form>)
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#comfirmUpdate" data-dismiss="modal" id="saveEvent">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="comfirmUpdate" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirm update task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>You have confirmed that you want to update?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={clickUpdateTask}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTaskModal;