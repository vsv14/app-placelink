import React from  "react"

export const Cardlink = ({link, setLink})=>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let created = new Date( Date.parse(link.createdat))


    return (
      <div style={{marginTop: '4rem'}}>
        
          <h4>Information of link</h4>          

          <div style={{padding:'0.1rem 1rem'}}>
            <p>Full link: <a href={link.link_to} target='_blank' rel='noopener noreferrer'>{link.link_to} </a></p>
            <p>Shortened redirect link: <span style={{color: '#039be5', textDecorationLine:'underline'}}>{link.link_redirect}</span></p>
            <p>Number of clicks: <strong>{link.counter}</strong></p>
            <p>Date of created: {created.toLocaleDateString("en-US", options)}</p>
            
            <strong>Owner: {link['user.email']}</strong>
          </div>
        
      </div>
    )
}