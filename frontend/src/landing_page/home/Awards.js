import React from 'react'
export default function Awards(){
    return (
       <div className='container p-5' style={{marginTop:"110px"}}> 
        <div className='row'>
            <div className='col-6'>
         <img src='media/images/largestBroker.svg' alt='Award Image' style={{width:"80%"}}/>
            </div>
        <div className='col-6 mt-3'>
                <h1>Largest stock broker in India</h1> <br></br>
                <p className='fs-5'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                <br></br>
                <div className='row'>
                    <div className='col-6'>
                 <ul>
                    <li className='fs-5'>Future and Options</li> <br></br>
                    <li className='fs-5'>Commodity derivatives</li><br></br>
                    <li className='fs-5'>Currency derivatives</li>
                 </ul>
                    </div>
                      <div className='col-6'>
                        <ul>
                            <li className='fs-5'>Stocks & IPOs</li><br></br>
                            <li className='fs-5'>Direct mutual funds</li><br></br>
                            <li className='fs-5'>Bonds and Govt. Securities</li>
                        </ul>
                    </div>
                </div>
                <img src='media/images/pressLogos.png' alt='PRESS LOGO' style={{width:"90%"}}/>
            </div>
        </div>
       </div>
    )
}