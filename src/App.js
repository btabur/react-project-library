import React, { useState } from "react";
import "./App.css";
import BookCard from "./components/bookCard"
import {toast} from "react-toastify";

function App() {
  const [bookName, setBookName] = useState("");

  const [bookList,setBookList]=useState([]);
  const [showConfirm,setShowConfirm]=useState(false);
  const [deletingId,setDeleteId]=useState(null);

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

    toast.success("Kitap Eklendi",{autoClose:2000})
  };
 
  const handleModal =(id)=> {
      setShowConfirm(true);
      setDeleteId(id)
  }

  const handleDelete = (deleteId)=> {

    const filteredList= bookList.filter(book => book.id !==deleteId)
    setBookList(filteredList)

    toast.error("Kitap Silindi", {autoClose:2000})
  }
  const handleRead =(book)=> {

    const updatedBook = {...book,isRead:!book.isRead} //okundu değerini tersine çevirir

    const cloneBooks = [...bookList];
   
    //findIndex Metodu
    //kitabın index değerini bulur.
   const index= cloneBooks.findIndex((item)=>item.id ===book.id); 
  

   cloneBooks.splice(index,1,updatedBook); //booklist dizisinde index nolu elemanı siler yerine yeni kitabı koyar
   setBookList(cloneBooks)

  
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
                key={book.id}
                handleModal={handleModal}
                handleRead = {handleRead}
                book={book}/>
              );
             
            })
          }
        </div>
      </div>
      {/* Modal tanımlama */}
      {showConfirm &&
        <div >
          <h5>Silmek istiyormusunuz ?</h5>
          <button onClick={()=>setShowConfirm(false)}>Vazgeç</button>
          <button onClick={()=>{ 
            handleDelete(deletingId); setShowConfirm(false);
            }}>Onayla</button>
        </div>
      }
    </div>
  );
}

export default App;
