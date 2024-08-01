import { Link, useSearchParams, useLocation } from "react-router-dom";

const Pagination = ({ pages }) => {

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("name") || '';
    const startDate = searchParams.get("startDate") ||"";
    const endDate = searchParams.get("endDate") || "";
    const totalPages = pages.totalPages;

    const formatUrl = (page, keyword, startDate, endDate) => {
        return `${location.pathname}?name=${keyword}&startDate=${startDate}&endDate=${endDate}&page=${page}`;
    };

    const renderPagesHtml = (delta = 2) => {
        const left = pages.page - delta;
        const right = pages.page + delta;
        const pagesHtml = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || i === pages.page || (i >= left && i <= right)) {
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
                {pages.hasPrevPage && <li className="page-item"><Link className="page-link" to={formatUrl(pages.page - 1, keyword, startDate, endDate)}>Trang trước</Link></li>}
                {renderPagesHtml().map((page, index) => (
                    page !== "..." ? (
                        <li key={index} className={`page-item ${pages.page === page ? "active" : ""}`}>
                            <Link className="page-link" to={formatUrl(page, keyword, startDate, endDate)}>{page}</Link>
                        </li>
                    ) : (
                        <li key={index} className="page-item"><span className="page-link">{page}</span></li>
                    )
                ))}
                {pages.hasNextPage && <li className="page-item"><Link className="page-link" to={formatUrl(pages.page + 1, keyword, startDate, endDate)}>Trang sau</Link></li>}
            </ul>
        </>
    );
};

export default Pagination;
