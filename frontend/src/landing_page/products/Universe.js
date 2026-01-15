export default function Universe() {
  const items = [
    {
      img: "media/images/zerodhaFundhouse.png",
      alt: "Zerodha Fundhouse",
      text: "Zerodha Fund house creates simple and transparent funds",
    },
    {
      img: "media/images/sensibullLogo.svg",
      alt: "Sensibull",
      text: "Sensibull can examine easy data points like open interest, FII/DII and more",
    },
    {
      img: "media/images/tijori.svg",
      alt: "Tijori",
      text: "Tijori is investment research platforms",
    },
    {
      img: "media/images/streakLogo.png",
      alt: "Streak",
      text: "Systematic trading platform that allows you to create and backtest without coding",
    },
    {
      img: "media/images/smallCaseLogo.png",
      alt: "SmallCase",
      text: "Thematic investing platform that helps you invest in diversified baskets of stocks or ETFs",
    },
    {
      img: "media/images/dittoLogo.png",
      alt: "Ditto",
      text: "Personalized advice on life and health insurance. No spam and mis-selling",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row g-4 text-center">
        {items.map((item, index) => (
          <div key={index} className="col-sm-6 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <img
                src={item.img}
                alt={item.alt}
                className="img-fluid mb-3"
                style={{ width: "180px", height: "180px", objectFit: "contain" }}
              />
              <p className="text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      <button className='btn btn-primary fs-4 mb-5 mt-5' style={{width:'300px',margin:'0 auto',fontWeight:"bold"}}>Sign up for free</button>

      </div>
    </div>
  );
}
