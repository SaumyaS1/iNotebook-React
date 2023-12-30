import React, {createContext, useState} from 'react'
// import {noteContext} from './noteContext'

const data1 = createContext();

function NoteState(props){
  const host = "http://localhost:5000"

    // fetching notes from context
    const notesInitial= []
      const [notes, setNotes] = useState(notesInitial)

      // Get all notes
      const getallNotes= async ()=>{
        // todo API call
        // const token = localStorage.getItem('Authorization'),;
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg0YzcxMmQ3ZTA4YWJhZjdjOGZhZDAiLCJpYXQiOjE3MDM3NzA5NzR9.fZJuF7-l9U6kYq2ADLC8C44JxvTGvmxkngr3JDf40pk";
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token1'),
          },
         

        })
        const json = await response.json();
        console.log(json)
        console.log('Server Response:', response);
        
        setNotes(json)

      }

// _________________________________________________________________________________________________________________________________
      // Add a Note
      const addNote= async (title, description, tag)=>{
        // todo API call
        const response = await fetch(`${host}/api/notes/addnote`,{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token1'),
          },
          body: JSON.stringify({title, description, tag})

        })
        const note = await response.json();
        console.log("Adding a new note")
        setNotes(notes.concat(note))


        // console.log("Adding a new note")
        // // const note = {
        // //     "_id": "65822b2b19a6c93e0783cb763",
        // //     "user": "65807eee5107ab884b2c92ad",
        // //     "title": title,
        // //     "description": description ,
        // //     "tag": tag,
        // //     "date": "2023-12-19T23:45:47.100Z",
        // //     "__v": 0
        // //   }
        // setNotes(notes.concat(note))

      }

// ____________________________________________________________________________________________________________________________
      // Delete a Note
      const deleteNote= async(id)=>{
        
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token1'),
          },
        });
          const json = await response.json();
          console.log(json)
          
        console.log("deleting the note with id" + id);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        
      }
 

// ________________________________________________________________________________________________________________________________
      // Edit a Note
      const EditNote= async(id, updatedTitle, updatedDescription, updatedTag)=>{
        // APi call

        // // logic to edit in client
        // for (let index=0 ; index < notes.length; index++){
        //   const element = notes[index];
        //   if(element._id === id){
        //     notes[index].title = title;
        //     notes[index].description = description;
        //     notes[index].tag = tag;
        //   }
        // }

        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token1'),
                    },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            tag: updatedTag,})

        })
        const updatedNote = await response.json();
        console.log('Note updated:', updatedNote);

        // logic to edit in client
        console.log("Editing the note with id " + id);
        console.log('Notes:', notes);
        const updatedNotes = notes.map((note) =>
          note._id === id
            ? { ...note, title: updatedTitle, description: updatedDescription, tag: updatedTag }
            : note
        );
        setNotes(updatedNotes)
        
      }
 

    return(
        <>
        <data1.Provider value = {{notes, addNote, deleteNote, EditNote, getallNotes}}>
            {props.children}
        </data1.Provider>
        </>
    )

}
export default NoteState
export  {data1}
