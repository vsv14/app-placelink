import {useCallback, useEffect, useState, useRef} from 'react'
import { useHttp } from './http.hook'
import {useMessage} from './message.hooks'


const storageName = 'userData'




export const useAuth = ()=>{
    const {request} = useHttp()
    const [token_a, setToken_a] = useState('')
    const [token_ref, setToken_ref] = useState('')
    const [ready, setReady] = useState(false)
    const [userName, setUserName] = useState('')
    const stateAccess = useRef(1)
    const message = useMessage()





    const getAccess = useCallback(async (refToken)=>{  
        // return await request('http://localhost:5000/access/tkns', 'GET', null,
        return await request('/access/tkns', 'GET', null,
            {
                Authorization: `Bearer ${refToken}`
            })

    }, [request])

    useEffect(()=>{

        if(!(stateAccess.current%3)){
            setTimeout(async ()=>{
                await request('access/atkn', 'GET', null,
                {
                    Authorization: `Bearer ${token_ref}`
                }).then(resp=>{
                    if(resp.status === 200){
                        setToken_a(resp.accessT)
                    }else{
                        
                    }
                    return resp
                })
                
            }, 600000)
        }else{
            stateAccess.current++
        }
        
        
    }, [token_a, request, token_ref])

    const login = useCallback((uname, atoken, reftoken)=>{
        setUserName(uname)
        setToken_a(atoken)
        setToken_ref(reftoken)

        localStorage.setItem(storageName, JSON.stringify({ uname:uname, reftoken:reftoken}))
    }, [])

    const logout = useCallback(()=>{
        setUserName(null)
        setToken_a(null)
        setToken_ref(null)


        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        const d = JSON.parse(localStorage.getItem(storageName))
        if(d && d.hasOwnProperty('reftoken')){
            setUserName(d.hasOwnProperty('uname')?d.uname:'noname')

            getAccess(d.reftoken).then(data=>{

                if(data.status === 202){
                    setToken_a(data.accessT)
                    setToken_ref(data.refreshT)
                    localStorage.setItem(storageName, JSON.stringify({ uname:d.uname, reftoken:data.refreshT}))
                }else{
                    logout()
                    message(data.message)
                } 
            }).finally(()=>{
                setReady(true) 
            })    
        }else{
            setReady(true)
        } 

                       
    }, [logout, getAccess, message])


    return {login, logout, userName, token_a, token_ref, ready}
}