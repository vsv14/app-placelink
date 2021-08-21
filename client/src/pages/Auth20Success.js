import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useHistory, } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/loader'
import { AuthContext } from '../context/AuthContext'



export const Auth2Page = ()=>{
    const {request} = useHttp()
    const [data, setDate] = useState(false)
    const history = useHistory()
    const context = useContext(AuthContext)


     
    const getTokens = useCallback(async ()=>{
        let dt = await request('api/auth/auth2.0/success', 'GET')
        
        if(dt.status === 200){
            context.login(dt.user, dt.accessT, dt.refreshT)
        }
    
        history.push('/')
    }, [request, context, history])

    

    useEffect(()=>{
        getTokens()
        
    }, [data, getTokens])

    return <Loader />
}