export default function Hero(){
    return (
        <>
        <section className="container-fluid" id="support">
        <div className="p-5" id="supportWrapper">
           <h5 style={{color:"white"}}>Support Portal</h5>
           <a href=""><h5 style={{color:"white"}}>Track Tickets</h5></a>
        </div>
        <div className="row p-5 mx-5">
            <div className="col-6">
           <h1 style={{fontSize:"30px",color:"white",lineHeight:"40px"}}>Search for an answer or browse help topics<br/>to create ticket</h1>
           <input className="text-center fs-5 text-muted mt-3 mb-3"  style={{borderRadius:"3%",outline:"none",border:"none",width:"80%",padding:"20px"}} type="text" placeholder="Eg:how do i activate F&O,why is my order getting rejected.."/>
             <div>
             <a href="" style={{color:"white",marginRight:"20px"}}>Track account opening</a>
             <a href="" style={{color:"white",marginRight:"20px"}}>Track segment activation</a>
             <a href="" style={{color:"white",marginRight:"20px"}}>Intraday</a><br/>
             <a href="" style={{color:"white",marginRight:"20px"}}>margins</a>
             <a href="" style={{color:"white",marginRight:"20px"}}>Kite user manual</a>
             </div>
            </div>
              <div className="col-6">
                <h1 style={{fontSize:"30px",color:"white"}}>Featured</h1>
                <ol type="1">
                    <a href="" style={{color:"white"}}><li>Current Takeover and Delistings- January 2024</li></a><br/>
                    <a href="" style={{color:"white"}}><li>Latest Intraday Leverages-MIS & CO</li></a>
                </ol>
            </div>
        </div>
        </section>
        </>
    )
}