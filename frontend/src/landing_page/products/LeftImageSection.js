export default function LeftImageSection({
  imageUrl,
  productName,
  productDetails,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-3">
            <img src={imageUrl} alt="productimage" />
          </div>
          <div className="col-3"></div>
          <div className="col-6 text-muted">
         <h2>{productName}</h2>
         <p className="fs-5">{productDetails}</p>
         <a href="#" className="fs-5 text-decoration-none" style={{marginRight:"20px"}}>{tryDemo}</a> 
         <a href="#" className="fs-5 text-decoration-none" style={{marginRight:"20px"}}>{learnMore}</a><br/>
         <div className="mt-3">         
        <img src={googlePlay} alt="googleplay"  style={{marginRight:"20px"}}/>
         <img src={appStore} alt="appstore"/>
         </div>

          </div>
        </div>
      </div>
    </>
  );
}
