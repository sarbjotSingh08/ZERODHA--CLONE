export default function Hero(){
    return (
        <>
        <div className="container">
            <div className="row p-5 text-center border-bottom">
                <h1 className="mt-5">Pricing</h1>
                <p className="text-muted mt-4  fs-5">Free equity investments and flat ₹20 traday and F&O trades</p>
            </div>
           <div className="row mt-4 p-5">
            <div className="col-4">
                <img src="media/images/pricingEquity.svg" alt="" style={{width:"70%"}}/>
                <h2 className="text-muted">Free equity delivery</h2>
                <p className="text-muted mt-4 fs-5">All equity delivery investments (NSE,BSE),<br/>are absolutely free - ₹ 0 brokerage.</p>
            </div>
            <div className="col-4">
                <img src="media/images/intradayTrades.svg" alt="" style={{width:"70%"}}/>
                <h2 className="text-muted">Intraday and F&O trades</h2>
                <p className="text-muted mt-4 fs-5">Flat ₹ 20 or 0.03% (whichever is lower) per<br/> executed order on intraday trades across<br/> equity, currency, and commodity trades. Flat ₹20 on all option trades</p>
            </div>
             <div className="col-4">
                <img src="media/images/pricingEquity.svg" alt="" style={{width:"70%"}}/>
                <h2 className="text-muted">Free direct MF</h2>
                <p className="text-muted mt-4 fs-5">All direct mutual fund investments are <br/>absolutely free — ₹ 0 commissions & DP<br/>charges.</p>
            </div>
           </div>
        </div>
        </>
    )
}