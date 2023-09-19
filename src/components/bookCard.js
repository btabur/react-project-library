const bookCard = ({book, handleDelete,handleRead,handleModal}) => {
  

    return(
        <div className="d-flex align-items-center justify-content-between border rounded shadow p-2">
            {/* Sol taraf */}
            <div>
                <h5 style={{
                    textDecoration: book.isRead ? 'line-through':'none'
                }}>{book.bookTitle}</h5>
                <p>{book.date
               }</p>
            </div>
            {/* sağ taraf */}
            <div className="btn-group">
                <button className="btn btn-danger" onClick={()=>handleModal(book.id)}>Sil</button>
                <button className="btn btn-primary">Düzenle</button>
                <button className="btn btn-success" onClick={()=> handleRead(book)}>
                    {book.isRead ? "Okundu":"Okunmadı"}
                </button>
            </div>


        </div>
    )

}

export default bookCard;