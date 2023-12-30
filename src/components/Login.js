import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

const handleInputChange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value
  });
};

// onchange
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const host = "http://localhost:5000";

      // todo API call
      const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}),
      });
      const json = await response.json();
    
    // navigate to the notes after login
      if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token1', json.token);
        props.showAlert("logged in successfully","success");
        navigate("/")
      }
      else{
        props.showAlert("Invalid details", "danger");
      }
  }
      




  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleInputChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={handleInputChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login