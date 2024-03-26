import {useState} from 'react';
import  {useRequest}  from '../../hooks/use-request';
import Router from 'next/router';

const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState([]);
    const { doRequest , errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess:  () => Router.push('/')
    })

    const onSubmit = async (event) =>{
        event.preventDefault();
        await doRequest();

        // try{
        //     const response = await axios.post('/api/users/signup', {
        //         email, password
        //     })
        //     console.log(response.data);
        // } catch(err){
        //     console.log(err.response.data);
        //     setErrors(err.response.data.errors);
        // }


        // console.log(response.data);

    }

    return (
<form onSubmit={onSubmit}>
        <h1>SignUp</h1>
        <div className='form-group'>
            <label>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className='form-control'/>
        </div>
        <div>
            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control'/>
        </div>
        {errors}
        {/* {errors.length > 0 && (<div className='alert alert-danger'>
        <h4>Ooopss.....</h4>
        <ul className='my-0'>
        {errors.map(err => <li key={err.message}>{err.message}</li>)}
        </ul>
        </div>)} */}
        <button className='btn btn-primary'>Sign Up</button>
</form>
    )
}
export default SignUp;