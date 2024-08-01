import moment from "moment";
import PaginationResult from "./Pagination-Result";
const ResultModal = ({ handleChangeInputResult, handleDeleteResult, handleFilterChange, handleInputResultChange, handleSortChange, filter, editingResults, newResult, clickAddResult, handleSaveChanges, pagesResult, totalResult, currentPage, handlePageChange }) => {
    return (
        <>
            <div className="modal fade" id="eventModalUpdate" tabIndex={1} role="dialog" aria-labelledby="eventModalUpdateLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eventModalUpdateLabel">Results</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>

                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="filter-select">Filter Results By OutCome</label>
                                <select
                                    className="form-control"
                                    id="filter-select"
                                    value={filter}
                                    onChange={(e) => handleFilterChange(e)}

                                >

                                    <option value="partial success">Choose</option>
                                    <option value="success">success</option>
                                    <option value="partial success">partial success</option>
                                    <option value="failure">failure</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="filter-select">Sort by Date</label>
                                <select
                                    className="form-control"
                                    id="filter-select"
                                    value={""}
                                    onChange={(e) => handleSortChange(e)}
                                >

                                    <option value="1">Choose</option>
                                    <option value="-1">Decrease</option>
                                    <option value="1">Ascending</option>
                                </select>
                            </div>
                            {editingResults.map((result, index) => {
                                // if (result.is_delete === false) {
                                return (
                                    <>
                                        <div className="modal" id="comfirmDelete" tabIndex={-1}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Confirm delete result</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>You have confirmed that you want to delete?</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" onClick={(e) => {
                                                            handleDeleteResult(result);
                                                        }} className="btn btn-primary" data-dismiss="modal" >Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3" key={index}>
                                            <div className="card-body">
                                                <h6 className="card-title">Result {index + 1}</h6>
                                                <div className="row">
                                                    <button
                                                        className="btn btn-danger btn-sm delete-button"
                                                        data-toggle="modal" data-target="#comfirmDelete"
                                                    >
                                                        &times;
                                                    </button>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor={`description-${index}`}>Description</label>
                                                            <input onChange={(e) => handleChangeInputResult(index, e)}
                                                                type="text"
                                                                className="form-control"
                                                                name="description"
                                                                id={`description-${index}`}
                                                                value={result.description}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor={`outcome-${index}`}>Outcome</label>
                                                            <select onChange={(e) => handleChangeInputResult(index, e)}
                                                                className="form-control"
                                                                name="outcome"
                                                                id={`outcome-${index}`}
                                                                value={result.outcome}

                                                            >
                                                                <option value="success">success</option>
                                                                <option value="partial success">partial success</option>
                                                                <option value="failure">failure</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor={`score-${index}`}>Score</label>
                                                            <input
                                                                onChange={(e) => handleChangeInputResult(index, e)}
                                                                type="number"
                                                                className="form-control"
                                                                name="score"
                                                                id={`score-${index}`}
                                                                value={result.score}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor={`createdAt-${index}`}>Time create</label>
                                                            <input
                                                                onChange={(e) => handleChangeInputResult(index, e)}
                                                                type="datetime-local"
                                                                className="form-control"
                                                                id={`createdAt-${index}`}
                                                                name="createdAt"
                                                                value={moment(result.createdAt).format("YYYY-MM-DDTHH:mm:ss")}
                                                            />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )
                                // }
                            })}
                            <PaginationResult pages={{ ...pagesResult, totalResult }} currentPage={currentPage} onPageChange={handlePageChange} />
                            <div className="mt-3">
                                <h6>Add New Result</h6>
                                <div className="form-group">
                                    <label htmlFor="new-description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        id="new-description"
                                        value={newResult.description}

                                        onChange={handleInputResultChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-outcome">Outcome</label>
                                    <select
                                        className="form-control"
                                        name="outcome"
                                        id="new-outcome"
                                        value={newResult.outcome}
                                        onChange={handleInputResultChange}
                                    >
                                        <option value="partial success">Chọn</option>
                                        <option value="success">success</option>
                                        <option value="partial success">partial success</option>
                                        <option value="failure">failure</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-score">Score</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="score"
                                        id="new-score"
                                        value={newResult.score}
                                        onChange={handleInputResultChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={clickAddResult} >Add Result</button>
                            <button type="button" style={{}} className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={handleSaveChanges}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default ResultModal;