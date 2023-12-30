import React, {useContext, useState} from 'react'
// import Notes from './Notes'
import {data1} from '../context/notes/NoteState' 

function AddNote(props) {
    const context = useContext(data1)
    const { addNote} = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleAddNote = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      props.showAlert("Note added successfully","success");
    };

    const handleInputChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value
        });
      };

    

  return (
        <div>
        <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
            <div className="col-md-5 mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" name="title" id="title"  onChange={handleInputChange} value={note.title} className="form-control" aria-describedby="emailHelp"/>
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="col-md-5 mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" name="description" id="description" onChange={handleInputChange} value={note.description}  className="form-control"/>
            </div>
            <div className="col-md-5 mb-3">
                <label htmlFor="tag" className="form-label">Tag:</label>
                <input type="text" name="tag" id="description" onChange={handleInputChange} value={note.tag}  className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
        </form>
        </div>
      
    </div>
  )
}

export default AddNote;