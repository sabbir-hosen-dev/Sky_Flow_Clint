import About from "../Components/About/About"
import Apartments from "../Components/Apartment/Apartments"
import Coupons from "../Components/CoponsSection/Coupons"
import Location from "../Components/LocationSection/Location"
import Slider from "../Components/Slider/Slider"


function Home() {
  return (
    <>
      <Slider />
      <About />
      <Apartments/>
      <Coupons />
      <Location />
    </>
  )
}

export default Home
