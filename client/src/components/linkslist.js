import React from "react"
import {Link} from 'react-router-dom'




export const LinksList = ({links})=>{
    if(!links.length){
        return (<p style={{textAlign:'center'}}>You have no links</p>)
    }


    return (
        <div style={{padding:'2rem 4rem'}}>
            <h4>List of Links</h4>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Full</th>
                    <th>Shortened</th>
                    <th>Clicks</th>
                    <th>Info</th>
                </tr>
                </thead>

                <tbody>
                    {links.map((item, i)=>{
                        return (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><div className="flex-wrap">{item.link_to}</div></td>
                                <td><div className="flex-wrap">{item.link_redirect}</div></td>
                                <td style={{textAlign:'center'}}>{item.counter}</td>
                                <td>
                                    <Link to={`/detail/${item.code}`}>Info</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}