export default function Brokerage(){
    return (
        <>
        <div className="container border-top">
            <div className="row mt-5 p-5">
                <div className="col-8 ">
               <a href="#" style={{textDecoration:"none"}}><h3 className="text-center mb-5 fs-4">Brokerage calculator</h3></a>
               <ul>
                <li className="text-muted mb-3">
                   Call & Trade and RMS auto-squareoff.Additional charges of ₹50+GST per order. 
                </li>
                  <li className="text-muted mb-3">
                  Digital contracts will be send via e-mail.
                </li>
                   <li className="text-muted mb-3">
                 Physical copies of contract notes,if required,shall be charged ₹20 per contract note.Courier charges apply.
                </li>
                  <li className="text-muted mb-3">
                    For NRI account (non-PIS),0.5% or ₹100 per executed order for equity (whichever is lower).
                </li>
                 <li className="text-muted mb-3">
                    For NRI account (PIS),0.5% or ₹200 per executed order for equity(whichever is lower).
                </li>
                 <li className="text-muted mb-3">
If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.
                </li>
               </ul>
                </div>
                <div className="col-4">
                 <a href="#" style={{textDecoration:"none"}}><h3 className="text-center mb-5 fs-4" style={{textDecoration:"none"}}>List of charges</h3></a>
                </div>
            </div>

        </div>
        </>
    )
}