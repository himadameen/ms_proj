import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

const Login = () => {

    const initialValues = {
        name : '',
        email : '',
        password : '',
    }
    
    const navigate = useNavigate();
    const [data_, setData] = useState(initialValues);
    const [error, setError] = useState({});
    const [formErr, setFormErr] = useState(false); 
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data_, [name] : value});
    }
    
    const encode = btoa(`ad.missan.group\ ${data_.name}: ${data_.password}`);
    // let token = btoa(`ad.missan.group\testuser:Missan@123}`);

    let url = "https://dms.missancomputer.com:8081/windream.web.api/authentication/GetAuthenticationToken";

    const submit = async() => {
        if(data_.name !== "" && data_.password !== ""){
           try{
                const response = await axios.get(url, 
                    // data_(
                    //     data_.name, data_.password
                    // ),
                    {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        // Authorization :  `basic${encode}`,
                        Authorization: 'Basic YWQubWlzc2FuLmdyb3VwXHRlc3R1c2VyOk1pc3NhbkAxMjM='
                    }
                });
                console.log(response.data.Token);
                localStorage.setItem('Token', response.data.Token);
                window.alert('Successfully Login !!');
                navigate('/task');
           }
           catch(err){
                window.alert("Please fill the Credentials Correctly")
           }
        }else{
            setError(validate(data_));
            setFormErr(true);
        }
    }
    
    useEffect(() => {
        // submit();
        // callApi();
    }, []);

    const validate = (data_) => {
        let errors = {};
        const er = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(!data_.name){
            errors.name = "Please enter the name";
        }
        if(!data_.email){
            errors.email = "Please enter the email";
        }else if(!er.test(data_.email)){
            errors.email = "Please enter valid email";
        }
        if(!data_.password) {
            errors.password = "Please enter password";
        }

        return errors;
    }


  return (
    <>
    <div className='body'>
        <div className='for'>
            <div className='title'>
                <div className='head'>Missan <br/>FMS Login</div>
            </div>
            <div className='form'>
                <input type="text" values={initialValues.name} name="name" placeholder='Enter your name' onChange={handleChange} />
                <div className='err'>{error.name}</div>
                <input type="email" values={initialValues.email} name="email" placeholder='Enter your email' onChange={handleChange} />
                <div className='err'>{error.email}</div>
                <input type="password" values={initialValues.password} name="password" placeholder='Enter your password' onChange={handleChange} />
                <div className='err'>{error.password}</div>
            </div>
            <div className='btn'>
                <button onClick={submit}>LogIn</button>
            </div>
            </div>   
        </div>
    </>
  )
}

export default Login