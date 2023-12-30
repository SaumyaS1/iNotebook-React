import React, {useContext, useState, useEffect} from 'react'
import { data1 } from '../context/notes/NoteState';

function NoteItem(props) {
    const context = useContext(data1);
    const {deleteNote} = context;
    const {note: initialNote } = props;
    const [note, setNote] = useState(initialNote );

    useEffect(() => {
      // Update localNote when the initial note changes
      setNote(initialNote);
    }, [initialNote]);

  const handleDelete = () => {
    // Call the deleteNote function with the note's id
    deleteNote(note._id);
    props.showAlert("note deleted successfully","success");
  };

  
  const handleInputChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value,
    });
  };


  // update note after clicking save changes  (copy code from NoteState.js file of update note)
  const host = "http://localhost:5000";
  const handleUpdateChanges = async ()=>{
    // todo API call
    const response = await fetch(`${host}/api/notes/updatenote/${note._id}`,{
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem('token1'),
      },
      body: JSON.stringify(note),
    });
    
    // console.log(response);  // Log the entire response
    const json = await response.json();
    console.log(json)
    
    setNote(json.updatedNote)
    props.showAlert("note updated successfully","success");

  }


  return (
    <div className='col-md-3'> 
        <div className="card">
            <div className="card-body">
                <div className='d-flex align-items-center'>
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i> 
                    {/* for little gap between delete icon and edit icon , we use css class= "mx-2" */}
                    <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target={`#exampleModal-${note._id}`}></i>
                </div>
            <p className="card-text">{note.description}</p>

            </div>
        </div>
        {/* Edit Modal */}
      <div className="modal fade" id={`exampleModal-${note._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel-${note._id}`}>Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
              {/* Add your form or content for editing here */}
{/* ---------------------------------------------------------------------------------------------------------------------------------- */}
            <div className='modal-body'>
              <form>
                <div className="col-md-5 mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" name="title" id="title"  value={note.title} onChange={handleInputChange} className="form-control" aria-describedby="emailHelp"/>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" name="description" id="description" value={note.description} onChange={handleInputChange} className="form-control"/>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input type="text" name="tag" id="tag" value={note.tag} onChange={handleInputChange} className="form-control"/>
                </div>
              </form>
            </div>
{/* ---------------------------------------------------------------------------------------------------------------------------------- */}

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateChanges} data-bs-dismiss='modal'>Save changes</button>
              {/* onClick={handleUpdateChanges} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
export {data1}





// // NoteItem.js
// import React, { useContext } from 'react';
// import { data1 } from '../context/notes/NoteState';

// function NoteItem(props) {
//   const context = useContext(data1);
//   const { deleteNote } = context;
//   const { note } = props;

//   const handleDelete = () => {
//     deleteNote(note._id);
//   };

//   return (
//     <div className='col-md-3'>
//       <div className="card">
//         <div className="card-body">
//           <div className='d-flex align-items-center'>
//             <h5 className="card-title">{note.title}</h5>
//             <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
//             <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target={`#editModal-${note._id}`}></i>
//           </div>
//           <p className="card-text">{note.description}</p>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       <div className="modal fade" id={`editModal-${note._id}`} tabIndex="-1" aria-labelledby={`editModalLabel-${note._id}`} aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id={`editModalLabel-${note._id}`}>Edit Note</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               {/* Add your form or content for editing here */}
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NoteItem;
// export { data1 };
