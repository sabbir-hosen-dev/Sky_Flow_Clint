import AnnouncementsCard from "../../Components/DashbordComponents/Card/AnnouncementsCard";

const announcementsData = [
  {
    announcementId: "1",
    title: "Building Maintenance Schedule",
    description: "There will be a maintenance on the 5th floor on January 25th from 10:00 AM to 4:00 PM. Kindly plan accordingly.",
    datePosted: "2025-01-18",
    postedBy: "Admin",
    status: "Active",
  },
  {
    announcementId: "2",
    title: "New Payment System Launch",
    description: "We are launching a new online payment system starting February 1st. Please make sure to register your payment methods before the launch date.",
    datePosted: "2025-01-17",
    postedBy: "Admin",
    status: "Active",
  },
  {
    announcementId: "3",
    title: "Emergency Fire Drill",
    description: "There will be a mandatory fire drill on January 22nd. All tenants must participate.",
    datePosted: "2025-01-16",
    postedBy: "Admin",
    status: "Active",
  },
  {
    announcementId: "4",
    title: "Updated Parking Policy",
    description: "Please be informed that the parking fees will be revised starting from next month. For further details, please visit the admin office.",
    datePosted: "2025-01-15",
    postedBy: "Admin",
    status: "Inactive",
  },
];
function Announcements() {
  return (
    <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-6">Announcements</h2>
    <div>
      {announcementsData.map(announcement => (
        <AnnouncementsCard key={announcement.announcementId} {...announcement} />
      ))}
    </div>
  </div>
  )
}

export default Announcements
