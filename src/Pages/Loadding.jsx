import loading from '../assets/building.gif';

function Loadding() {
  return (
    <div className="w-screen overflow-hidden h-screen flex justify-center items-center bg-backgroundB">
      <div className="w-36">
        <img src={loading} alt="Loading..." className="rounded-xl" />
      </div>
    </div>
  );
}

export default Loadding;
