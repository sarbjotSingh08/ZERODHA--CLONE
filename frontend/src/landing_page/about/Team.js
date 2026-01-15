export default function Team() {
  return (
    <>
      <div className="container">
        <div className="row p-5 text-center mt-5 mb-5 border-top">
          <h1>People</h1>
        </div>
        <div className="row p-5">
          <div className="col-6">
            <img
              src="media/images/nithinKamath.jpg"
              style={{ borderRadius: "100%", width: "70%" }}
            />
            <h1 className="fs-5 text-muted ">Nithin Kamath</h1>
            <h2 className="fs-5 text-muted ">Founder, CEO</h2>
          </div>
          <div className="col-6 text-muted" style={{lineHeight:"1.8",fontSize:"1.2rem"}}>
            <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the<br/>
            hurdles he faced during his decade long stint as a trader. Today,<br/>
            Zerodha has changed the landscape of the Indian broking industry. </p>

            <p>He is a member of the SEBI Secondary Market Advisory Committee<br/> (SMAC)
            and the Market Data Advisory Committee (MDAC).</p>
            <p> Playing basketball is
            his zen.<br/> </p>
<p className="mb-0">
  <a href="" className="text-decoration-none me-1">
    Connect on Homepage /
  </a>
  <a href="" className="text-decoration-none me-1">
    TradingQnA /
  </a>
  <a href="" className="text-decoration-none">
    Twitter
  </a>
</p>
          </div>
        </div>
      </div>
    </>
  );
}
