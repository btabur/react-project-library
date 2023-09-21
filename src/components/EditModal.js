

function EditModal({setShowEditModal,setEditItem,editItem,handleEditBook}) {


    
  return (
    <div className='confirm-modal'>
      <div className="modal-inner">
        <h5>Kitap İsmini Düzenle</h5>

        <input type="text" className='form-control shadow' placeholder={editItem.bookTitle} onChange={(e)=>setEditItem({...editItem,bookTitle:e.target.value})}/>

        <div className='d-flex justify-content-between'>
            <button className='btn btn-warning'onClick={()=>setShowEditModal(false)}>Vazgeç </button>
            <button className='btn btn-success'onClick={()=>{
             
                handleEditBook()
                setShowEditModal(false)
                }}>Kaydet </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
