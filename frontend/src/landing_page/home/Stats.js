import React from 'react'
export default function Stats(){
    return (
         <div className='container'>
            <div className='row mt-5'>
         <div className='col-6'>          
            <h1>Trust with confidence</h1> <br></br><br></br>
<h2>Customer-first always</h2><br></br>
<p className='text-muted fs-5'>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 <br></br> lakh crores of equity investments, making us India’s <br></br>largest broker; contributing to 15% of daily retail <br></br>exchange volumes in India.</p>
  
    <h2>No spam or gimmicks</h2><br></br>
    <p  className='text-muted fs-5'>No gimmicks, spam, "gamification", or annoying push<br></br> notifications. High quality apps that you use at your<br></br> pace, the way you like. Our 
        philosophies.</p>
        <h2>The Zerodha universe</h2><br></br>
        <p  className='text-muted fs-5'>Not just an app, but a whole ecosystem. Our investments <br></br>in 30+ fintech startups offer you tailored services<br></br>     specific to your needs.</p>
        <h2>Do better with money </h2><br></br>
        <p  className='text-muted fs-5'>With initiatives like Nudge and Kill Switch, we don't just <br></br>facilitate transactions, but actively help you do better <br></br>   with your money.

</p>
   </div>
   <div className='col-6'>
    <img style={{width:"100%",height:"95%"}} src="media/images/ecosystem.png" alt='Stats Images'/>
    <a href='' style={{color:"blue",marginLeft:"20%",textDecoration:"none"}} className='fs-5'> <b>Explore our products <i class="fa fa-arrow-right" aria-hidden="true"></i></b></a> 
    <a href='' style={{color:"blue",textDecoration:"none",marginLeft:"5%"}} className='fs-5'> <b>Try Kite demo <i class="fa fa-arrow-right" aria-hidden="true"></i> </b></a>
   </div>
        </div>
        </div>
    )
}