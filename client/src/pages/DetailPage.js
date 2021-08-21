import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/loader'
import { Cardlink } from '../components/cardlink'
import { useMessage } from '../hooks/message.hooks'



export const DetailPage = ()=>{
    const {token_a} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [lk, setLk] = useState(null)
    const linkCode = useParams().id
    const message = useMessage()
    const history = useHistory()



    async function deleteHandler(event){
        if(window.confirm("Are you sure?")){
            try{
                const  data = await request(`/api/link/${linkCode}`, 'DELETE', null, {
                    Authorization: `Bearer ${token_a}`
                })
                message(data.message)
    
                if((data.status === 200)||(data.status === 201)){
                    history.push("/links")
                }
            }catch(e){
                message(e.message)
            }
        }
      }
    
      async function rewriteHandler(event){
        try{
          let reLink = prompt("Insert link")
         
          if(reLink.length > 0 && reLink !== lk.link_to){
            
            const  data = await request(`/api/link/${linkCode}`, 'PUT', {link: reLink}, {
                Authorization: `Bearer ${token_a}`
            })
    
            message(data.message)
            console.log('DATA STATUS', data)
            if((data.status >= 200) < 300){
                let relk = {...lk}
                relk.link_to = reLink
                setLk(relk)
            }
          }
          
        }catch(e){
    
        }
      }


    const getLink = useCallback(async ()=>{
        try{
            const  data = await request(`/api/link/${linkCode}`, 'GET', null, {
                Authorization: `Bearer ${token_a}`
            })
            
           if((data.status === 200)||(data.status === 201)){
                setLk(data.link)
           }               
            
        }catch(e){}
    }, [token_a, linkCode, request])

    useEffect(()=>{
        getLink()
        
    }, [getLink])

    if(loading){
        return <Loader />
    }

    return(
        <div style={{padding:'0 4rem ', minWidth: "800px"}}>            
            {!loading && lk && <Cardlink link={lk} setLink={setLk}/>}

            <div  style={{padding:'3rem 0 3rem 0.5rem'}}>
                <button className="btn #03a9f4 blue darken-1 white-text bold left" onClick={rewriteHandler} disabled={loading}>rewrite</button> 
                <button className="btn #c70000 red darken-1 white-text bold right" onClick={deleteHandler} disabled={loading}>delete</button>
            </div>
        </div>
    )
}