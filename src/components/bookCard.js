const bookCard = ({bookInfo, handleDelete}) => {
    console.log('book card', bookInfo)

    return(
        <div className="d-flex align-items-center justify-content-between border rounded shadow p-2">
            {/* Sol taraf */}
            <div>
                <h5>{bookInfo.bookTitle}</h5>
                <p>{bookInfo.date
               }</p>
            </div>
            {/* sağ taraf */}
            <div className="btn-group">
                <button className="btn btn-danger" onClick={()=>handleDelete(bookInfo.id)}>Sil</button>
                <button className="btn btn-primary">Düzenle</button>
                <button className="btn btn-success">Okunmadı</button>
            </div>


        </div>
    )

}

export default bookCard;