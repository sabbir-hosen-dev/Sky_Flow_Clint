import About from "../../Components/HomeContent/About/About"
import Apartments from "../../Components/HomeContent/Apartment/Apartments";
import Coupons from "../../Components/HomeContent/CoponsSection/Coupons";
import Location from "../../Components/HomeContent/LocationSection/Location";
import Slider from "../../Components/HomeContent/Slider/Slider"





function Home() {
  return (
    <>
      <Slider />
      <About />
      <Apartments />
      <Coupons />
      <Location />
    </>
  )
}

export default Home
