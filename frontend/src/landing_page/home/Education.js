import React from 'react'
export default function Education(){
    return (
     <div className='container' style={{marginTop:"5%"}}>
        <div className='row'>
            <div className='col-6'>
        <img  src="media/images/Education.svg" alt="Education Image" style={{width:"85%"}}/>
        
            </div>
            <div className='col-6'>
       <h1 className='mt-5 fs-2'>Free and open market education</h1>
      <p className='text-muted fs-5 mt-4'>Varsity, the largest online stock market education book in the world <br></br>covering everything from the basics to advanced trading.</p>
           <a href="" style={{color:"blue",textDecoration:"none"}} className='fs-5'> <b>Varsity<i className="fa fa-arrow-right" aria-hidden="true"></i> </b></a>
           <p className='text-muted fs-5  mt-4'>TradingQ&A, the most active trading and investment community in <br></br>India for all your market related queries.</p>
           <a href="" style={{color:"blue",textDecoration:"none"}} className='fs-5'> <b>TradingQ&A <i className="fa fa-arrow-right" aria-hidden="true"></i></b></a>
            
            </div>
        </div>
     </div>
    )
}