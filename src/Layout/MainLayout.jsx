import { Outlet } from "react-router-dom"


function MainLayout() {
  return (
    <div>
      Main Layout 
        <Outlet />
      Footer 
    </div>
  )
}

export default MainLayout
