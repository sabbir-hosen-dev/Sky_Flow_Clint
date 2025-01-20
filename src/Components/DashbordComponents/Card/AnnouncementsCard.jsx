

function AnnouncementsCard({ title, description, datePosted, status }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Posted on: {new Date(datePosted).toLocaleDateString()}</span>
          <span>Status: <span className={`font-semibold ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status}</span></span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsCard;
