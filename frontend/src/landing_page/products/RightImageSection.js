export default function RightImageSection({
dashboardName,dashboardDetails,learnMore,imageUrl
}) {
  return (
    <>
      <div className="container p-5">
        <div className="row align-items-center ">
         <div className="col-6 text-muted">
            <h2>{dashboardName}</h2><br/>
            <p className="fs-5">{dashboardDetails}</p>
            <a href="#" className="fs-5" style={{textDecoration:"none"}}>{learnMore}</a>
         </div>
         <div className="col-6 ">
            <img src={imageUrl} alt="image"/>
         </div>
      </div>
      </div>
    </>
  );
}
