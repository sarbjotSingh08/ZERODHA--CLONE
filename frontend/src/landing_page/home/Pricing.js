import React from 'react'

export default function Pricing(){
    return (
 
        <div className="container ">
  <div className="row align-items-center" style={{marginTop:"10%"}}>
    {/* LEFT TEXT SECTION */}
    <div className="col-6">
      <h1>Unbeatable pricing</h1>
      <br />
      <p className='fs-5'>
        We pioneered the concept of discount broking and price
        <br />
        transparency in India. Flat fees and no hidden charges.
      </p>
      <br />
      <a
        href="#"
        className="fs-5"
        style={{ color: "blue", marginLeft: "20%", textDecoration: "none" }}
      >
        <b>
          See Pricing <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </b>
      </a>
    </div>

    {/* RIGHT PRICE BOXES */}
    <div className="col-6">
      <div className="row g-0 justify-content-center">
        {/* BOX 1 */}
        <div className="col-5 p-4 text-center border">
          <h1 style={{ color: "black" }}>₹0</h1>
          <p className="text-muted">
            Free equity delivery and <br /> direct mutual funds
          </p>
        </div>

        {/* BOX 2 */}
        <div className="col-5 p-4 text-center border border-start-0">
          <h1 style={{ color: "black" }}>₹20</h1>
          <p className="text-muted">Intraday and F&O</p>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}