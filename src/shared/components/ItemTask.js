import { Link } from "react-router-dom";
const ItemTask = (item) => {
    console.log(item.item);
    return (

        <button style={{ border: 'none', padding: 0, background: "none" }} id="button-edit" className="" data-toggle="modal" data-target="#eventModalUpdate">
            <Link to={`/ItemTask/${item._id}`}>
                <div className="row row-cols-1 row-cols-md-3">
                    <div className="card border-info mb-3" style={{ maxWidth: '18rem', borderRadius: "10px" }}>
                        <img src={item.Image} className="card-img-top img-fluid" style={{ display: "block", height: "200px", borderRadius: "10px 10px 0 0 " }} alt="..." />
                        <div className="card-header">{item.CreateAt}</div>
                        <div className="card-body text-info">
                            <h5 className="card-title">{item.Name}</h5>
                            <p className="card-text">{item.Desc}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </button>

    );
}
export default ItemTask