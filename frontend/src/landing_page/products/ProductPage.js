import Hero from "./Hero"
import LeftImageSection from "./LeftImageSection"
import RightImageSection from "./RightImageSection"
import Universe from "./Universe"
export default function ProductPage(){
    return (
        <>
      <Hero/>
      <LeftImageSection imageUrl="media/images/kite.png"
       productName="Kite"
  productDetails="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
  tryDemo="Try demo"
  learnMore="Learn more"
  googlePlay="media/images/googlePlayBadge.svg"
  appStore="media/images/appstoreBadge (1).svg"
   />

   <RightImageSection 
   dashboardName="Console"
   dashboardDetails="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
   learnMore="Learn more"
   imageUrl="media/images/console.png"/>
   
   <LeftImageSection imageUrl="media/images/coin.png"
       productName="Coin"
  productDetails="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
  tryDemo="Coin"
  googlePlay="media/images/googlePlayBadge.svg"
  appStore="media/images/appstoreBadge (1).svg"
   />
 <RightImageSection 
   dashboardName="Kite Connect API"
   dashboardDetails="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
   learnMore="Kite Connect"
   imageUrl="media/images/kiteconnect.png"/>
 <LeftImageSection imageUrl="media/images/varsity.png"
       productName="Varsity mobile
"
  productDetails="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
  googlePlay="media/images/googlePlayBadge.svg"
  appStore="media/images/appstoreBadge (1).svg"
   />
   <div className="text-center mt-5">
   <h1>The Zerodha Universe
</h1>
   <p className="fs-5">
Extend your trading and investment experience even further with our partner platforms</p></div>
   <Universe/>
        </>
    )
}