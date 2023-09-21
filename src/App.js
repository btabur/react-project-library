import React, { useState } from "react";
import "./App.css";
import BookCard from "./components/bookCard"
import {toast} from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");

  const [bookList,setBookList]=useState([]);
  const [showConfirm,setShowConfirm]=useState(false);
  const [deletingId,setDeleteId]=useState(null);
  const [showEditModal,setShowEditModal] = useState(false);
  const [editItem,setEditItem] = useState(null)

 // console.log(showEditModal, editItem)

  const addBook = (e) => {
    e.preventDefault();

    if(!bookName)  {
      toast.warn('Kitap İsmi giriniz',{autoClose:2000})

      return; //bookname boş ise aşağıdaki satırları çalıştırmadan geri döner
    }
   

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

  const handleEditBook = ()=> {

    console.log(editItem);
    const index= bookList.findIndex(book =>book.id===editItem.id)

    const clonedBookList = [...bookList];

    clonedBookList.splice(index,1,editItem);
    setBookList(clonedBookList);

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
        <div className="d-flex flex-column gap-3 mt-3 pb-4">
          {bookList.length === 0 ? 
            <p className="text-center fs-3">Herhangi bir kitap eklenmedi</p> :
            bookList.map(book=>{
              return(
                <BookCard
                key={book.id}
                handleModal={handleModal}
                handleRead = {handleRead}
                book={book}
                setShowEditModal = {setShowEditModal}
                setEditItem = {setEditItem}
                />
              );
             
            })
          }
        </div>
      </div>
      {/* Modal tanımlama */}
      {showConfirm &&
        <div className="confirm-modal" >
          <div className="modal-inner shadow">
              <h5>Silmek istiyormusunuz ?</h5>
              <button className="btn btn-warning" onClick={()=>setShowConfirm(false)}>Vazgeç</button>
              <button className="btn btn-danger" onClick={()=>{ 
                handleDelete(deletingId); setShowConfirm(false);
                }}>Onayla</button>
          </div>
         
        </div>
      }

      {/* Düzenleme  modalı*/}
      {showEditModal&&
      <EditModal 
      setShowEditModal={setShowEditModal}
      setEditItem = {setEditItem}
      editItem={editItem}
      handleEditBook= {handleEditBook}
      />
      
      
      }
    </div>
  );
}

export default App;
