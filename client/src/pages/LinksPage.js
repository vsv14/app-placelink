import React, { useCallback, useContext, useEffect, useState } from "react"
// import { useHistory } from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/loader'
import { LinksList } from "../components/linkslist"
import { useMessage } from "../hooks/message.hooks"



export const LinksPage = ()=>{
    const message = useMessage()
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token_a} = useContext(AuthContext)




    // const history = useHistory()
    const [link, setLink] = useState('')



    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    async function pressHandler(event){

        if((event.key === 'Enter')||(event.type === 'click')){
            try{
               if(link.length > 0){
                   const data = await request('/api/link/generate', 'POST', {to: link},
                                            {
                                                Authorization: `Bearer ${token_a}`
                                            })
               
                    if((data.status === 200)||(data.status === 201)){
                        message("Link was created")

                        setLinks([data.link, ...links])
                        setLink('')
                    }

                } else{
                    message("Link is empty!")
                }              
               

            }catch(e){
                message(e.message)
            }
        }
    }


    const getLinks = useCallback(async ()=>{
        try{
            let arrData = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token_a}`
            })

            if((arrData.status === 200)||(arrData.status === 201)){
                setLinks(arrData.links)
            }
        }catch(e){

        }
    }, [token_a, request])

    useEffect(()=>{
        getLinks()
    }, [getLinks])


    return(
        <div>
            {loading && <Loader/>}
            <div className="smbox" style={{padding:'2rem 4rem', minWidth:"800px"}}>
                <div>
                    <div className="input-field">
                        
                                <input onChange={e=>setLink(e.target.value)}
                                    onKeyPress={pressHandler} 
                                    className="yellow-input" 
                                    placeholder="insert link" 
                                    id="link" 
                                    value={link}
                                    type="text"/>
                            
                                <label htmlFor="link" className="active" style={{fontSize:"16pt"}}>Insert link</label>
                    </div>

                    <button className="btn #03a9f4 blue darken-1 white-text bold right" onClick={pressHandler} disabled={loading}>shorten</button>
                </div>
            </div>

            {!loading && <LinksList links={links}/>}
        </div>
    )
}