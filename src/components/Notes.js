import React, { useContext, useEffect } from 'react'
import {data1} from '../context/notes/NoteState'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate} from 'react-router-dom'
// import userEvent from '@testing-library/user-event';
  
function Notes(props) {
  // showalert
  const {showAlert}= props
// useContext part1
    const context = useContext(data1)
    const {notes, getallNotes} = context;

    let navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Check if the token is available
        const token = localStorage.getItem('token1');
        console.log('token1:', token);

        if (token) {
          await getallNotes();
        } else {
          // redirect to login page 
          navigate("/login")
        }
        } 
        catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
    
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
return (
    <>
    <AddNote showAlert={showAlert}/>

    <div className='row my-3'>
    <h2>Your Notes</h2> 
    <div className= "container mx-2">
    {Array.isArray(notes) && notes.length===0 && 'No notes to display'}
    </div>
    {/* //  useContext part2  */}
      {Array.isArray(notes) && notes.map((note)=>(  
        // <div key={notes.id}>{notes.title}</div>
        // return notes.title;
        <NoteItem key={note._id} note={note} showAlert={showAlert}/>
      )
       )}
    </div>
    </>  
)
}

export default Notes






// // Notes.js
// import React, { useContext, useEffect } from 'react';
// import { data1 } from '../context/notes/NoteState';
// import NoteItem from './NoteItem';
// import AddNote from './AddNote';

// function Notes() {
//   const context = useContext(data1);
//   const { notes, getallNotes } = context;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await getallNotes();
//       } catch (error) {
//         console.error('Error fetching notes:', error);
//       }
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <AddNote />

//       <div className='row my-3'>
//         <h2>Your Notes</h2>
//         {notes.map((note) => (
//           <NoteItem key={note._id} note={note} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Notes;
