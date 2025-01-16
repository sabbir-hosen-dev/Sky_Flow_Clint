import About from "../Components/About/About"
import Coupons from "../Components/CoponsSection/Coupons"
import Location from "../Components/LocationSection/Location"
import Slider from "../Components/Slider/Slider"


function Home() {
  return (
    <>
      <Slider />
      <About />
      <Coupons />
      <Location />
    </>
  )
}

export default Home
