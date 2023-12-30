import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
// import { useNavigate, Link } from 'react-router-dom'

function Signup(props) {

  // onChange
  const [credentials, setCredentials] = useState({ name: "", email: "", password: ""});
  let navigate = useNavigate();

  const handleInputChange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value
  });
}

  const handleSubmit = async (e) => {
    e.preventDefault();
      // todo API call
      const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
      });
      const json = await response.json();
      // console.log(json)

      if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token1', json.token);
        console.log('Navigating to home page');
        navigate("/")
        props.showAlert("account created successfully","success");
      }
      else{
        props.showAlert("Invalid credentials","danger");
      }
};

return (
  <div>
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderradius: '25px'}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="name">Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} minLength={5} required/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleInputChange} minLength={5} required />
                      <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
                    </div>
                  </div>

                  {/* <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <Link to="/">Terms of service</Link>
                    </label>
                  </div> */}

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt=""/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>

    )
}

export default Signup





// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleInputChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleInputChange}/>
//           {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} minLength={5} required/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//           <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleInputChange} minLength={5} required/>
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Signup