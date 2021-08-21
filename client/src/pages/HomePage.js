import React from 'react'
import {useHistory} from 'react-router-dom'




export const HomePage = ()=>{
    const history = useHistory()

    function clickStarted(e){
        history.push('/signup')
    }
    

    return(
        <div  style={{minWidth: "800px"}}>
            <div style={{margin:'6rem 3rem'}}>
                <div className='center'>
                    <h4 className='bold'>Short links</h4>
                    <p style={{fontWeight:'600', fontSize:'18pt'}}>
                        Shortener links built with us app to help you to watch for activity users.
                    </p>
                </div>
            </div>

            <div style={{margin:'8rem 3rem'}}>
                
                <div className='center'>
                    <h4 className='bold'>Results</h4>
                    <p style={{fontWeight:'600', fontSize:'18pt'}}>
                        Click-through, rich link-level data gives you crucial insight into your link engagement.
                    </p>

                    <button style={{marginTop:'3rem'}} onClick={clickStarted} className='btn #03a9f4 light-blue white-text bold'>Get started for FREE</button>
                </div>                
            </div>
            
        </div>
    )
}