import React from 'react'

export default function Hero(){
    return (
      <div className='container text-center mb-5'>
        <div className='row p-3 mt-4'>
            <img src='media/images/homeHero.png' alt='Hero image'  />
            <h1 style={{marginTop:"12px"}}>Invest in everything</h1>
            <p className='fs-3'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
            <button className='btn btn-primary fs-4 mb-5 mt-3' style={{width:'300px',margin:'0 auto',fontWeight:"bold"}}>Sign up for free</button>
        </div>
      </div>
    )
}