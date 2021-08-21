import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hooks'



export const RegistrationPage = ()=>{
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState(
        {
            uname:'',
            email:'',
            upass:'',
            c_upass:''
        }
    )
    const history = useHistory()



    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(()=>{
            message(error)
            clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const registerHandler = async ()=>{
            try{
                let f = {...form}
                if(f.c_upass === f.upass){
                    const data = await request('/api/auth/signup', 'POST', {uname:f.uname, email:f.email,upass:f.upass})
                    message(data.message)

                    if(data.status < 400){
                        history.push('/signin')
                    }

                }else{
                    message('Password mismatch!')
                    clearError()
                }
            }catch(e){

            }
    }


    const loginHandler = ()=>{
            history.push('/signin')
        }



        return(
            <div style={{minWidth: "800px"}}>
                <div style={{width:"450px", margin: "auto"}}>

                    <div className="card  grey lighten-4 box2" style={{marginBottom: "5rem"}}>
                        <div className="card-content black-text">
                            <strong className="title">Registration</strong>
                            
                            <div className="box">
                                
                                <div className="input-field smbox">
                                    <input onChange={changeHandler} className="yellow-input" placeholder="username" name="uname" id="uname" type="text" value={form.uname}/>
                                    <label htmlFor="Uresname">Username</label>
                                </div>

                                <div className="input-field smbox">
                                    <input onChange={changeHandler} className="yellow-input" placeholder="email" name="email" id="email" type="email" value={form.email}/>
                                    <label htmlFor="Email">Email</label>
                                </div>

                                <div className="input-field smbox">
                                    <input onChange={changeHandler} className="yellow-input" placeholder="password" name="upass" id="password" type="password" value={form.upass}/>
                                    <label htmlFor="Password">Password</label>
                                </div>

                                <div className="input-field smbox">
                                    <input onChange={changeHandler} className="yellow-input" placeholder="password" name="c_upass" id="c_password" type="password" value={form.c_upass}/>
                                    <label htmlFor="CPassword">Confirm password</label>
                                </div>

                            </div> 
                        </div>
                        <div className="card-action">
                            <button className="btn #ffb300 amber darken-1 black-text bold" onClick={registerHandler} disabled={loading}>Create account</button>
                            <div className="right">
                            <button className="btn bttn" onClick={loginHandler} disabled={loading}>account?</button>
                            </div>
                        </div>
                    </div>


                    <a href="/api/auth/google" style={{textDecorationLine: "none"}}>	
                        <div className="google-btn">
                            <div className="google-icon-wrapper ">
                                <svg
                                    width="25"
                                    height="37"
                                    viewBox="0 0 25 25"
                                >
                                    <g fill="none" fillRule="evenodd">
                                        <path
                                            d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                            fill="#EA4335"
                                        />
                                    </g>
                                </svg>
                            </div>
                            
                            <div className="btn-text">
                                <span>Sign in with Google</span>
                            </div>
                        </div>
                    </a>                  
                </div>                
            </div>
        )
}