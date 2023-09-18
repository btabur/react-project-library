import React, { useState } from "react";
import "./App.css";
import BookCard from "./components/bookCard"

function App() {
  const [bookName, setBookName] = useState("");

  const [bookList,setBookList]=useState([]);

  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleDateString(),
      isRead: false,
    };

    setBookList([newBook,...bookList]) //önceki kitapların başına yeni bir kitap eklemek için
    setBookName('')
  };
 
  const handleDelete = (deleteId)=> {

    const filteredList= bookList.filter(book => book.id !==deleteId)
    setBookList(filteredList)

  }

  return (
    <div className="App">
      <header className="bg-dark p-2 text-white text-center fs-5">
        Kitap Kurdu
      </header>
      <div className="container border" onSubmit={addBook}>
        <form className="d-flex gap-4 p-3">
          <input
          value={bookName}
          onChange={(e)=>setBookName(e.target.value)}
            id="inputBook"
            type="text"
            placeholder="Kitap ismi giriniz"
            className="form-control shadow"
          />
          <button className="btn btn-warning">Ekle</button>
        </form>
        <div className="d-flex flex-column gap-3 mt-3">
          {!bookList.length ===0 ? 
            <p>"Herhangi bir kitap eklenmedi"</p> :
            bookList.map(book=>{
              return(
                <BookCard
                handleDelete={handleDelete}
                bookInfo={book}/>
              );
             
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
