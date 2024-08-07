import { Link, useSearchParams, useLocation } from "react-router-dom";

const PaginationResult = ({ pages, currentPage, onPageChange }) => {

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("name") || '';
    const totalPages = pages.total_page;

    
    const clickPage = (page)=>{
        // e.preventDefault();
        console.log(page);
        onPageChange(page);
    }

    const renderPagesHtml = (delta = 2) => {
        const left = pages.page_current - delta;
        const right = pages.page_current + delta;
        const pagesHtml = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || i === pages.page_current || (i >= left && i <= right)) {
                pagesHtml.push(i);
            } else if (i === left - 1 || i === right + 1) {
                pagesHtml.push("...");
            }
        }
        return pagesHtml;
    };

    return (
        <>
            <ul className="pagination">
                {pages.has_prev_page && <li className="page-item"><a className="page-link" to="" onClick={(e) => clickPage(pages.page_current - 1)}>Previous</a></li>}
                {renderPagesHtml().map((page, index) => (
                    page !== "..." ? (
                        <li key={index} className={`page-item ${pages.page_current === page ? "active" : ""}`}>
                            <a className="page-link" to="" onClick={(e) => clickPage(page)}>{page}</a>
                        </li>
                    ) : (
                        <li key={index} className="page-item"><span className="page-link">{page}</span></li>
                    )
                ))}
                {pages.has_next_page && <li className="page-item"><a className="page-link" to="" onClick={(e) => clickPage(pages.page_current + 1)}>Next</a></li>}
            </ul>
        </>
    );
};

export default PaginationResult;
