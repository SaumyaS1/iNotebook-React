import React from 'react'
import Notes from './Notes'


function Home(props) {
  const {showAlert}= props

  return (
    <div>
      

      {/* <div className="container my-3"> */}
       {/* <h2>Your Notes</h2>  */}
       <Notes showAlert={showAlert}/>
      {/* </div> */}
      
    </div>
  )
}

export default Home