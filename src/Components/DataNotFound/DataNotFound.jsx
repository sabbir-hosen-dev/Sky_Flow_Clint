import img from "../../assets/serverError.png"

function DataNotFound() {
  return (
    <div className="flex justify-center items-center py-5">
      <img src={img} alt="" />
    </div>
  )
}

export default DataNotFound
