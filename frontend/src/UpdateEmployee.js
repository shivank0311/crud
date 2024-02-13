import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateEmployee() {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    function SubmitForm(event) {
        event.preventDefault();
        
        axios.put('http://localhost:8081/update/'+id, {name, email})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

  return (
   <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={SubmitForm}>
            <h2>Update Employee</h2>
            <div className='mb-2'>
                <label>Name</label>
                <input type="text" placeholder="Enter Name" className='form-control'
                onChange={e => setName(e.target.value)}                
                />

            </div>
            <div className='mb-2'>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" className='form-control'
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className='btn btn-success'>Update</button>
        </form>
   </div>
   </div>
  )
}

export default UpdateEmployee
