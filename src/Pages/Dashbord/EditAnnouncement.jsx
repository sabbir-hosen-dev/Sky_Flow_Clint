import { useNavigate, useParams } from "react-router-dom";
import { axiosInt, useAxiosSecure } from "../../Hooks/useAxios";
import { useState, useEffect } from "react";
import Breadcrumb from "../../Components/DashbordComponents/BreadCrumb/BreadCrumb";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Utlites/Helmate/Helmate";

function EditAnnouncement() {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    status: "Active",
    description: "",
  });

  // Fetch announcement data
  const { data } = useQuery({
    queryKey: ["announcement", id],
    queryFn: () => axiosInt.get(`/announcement/${id}`).then((res) => res.data),
  });

  // Set form data when API response is available
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        status: data.status ? "Active" : "Inactive",
        description: data.description || "",
      });
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosSecure.patch(`/announcement/${id}`, formData);
      console.log("Success:", response.data);
      toast.success("Announcement edited successfully!");
      navigate("/dashboard/make-announcement");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to edit announcement.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Title title='Edit Announcement' />

      <Breadcrumb pageName="Edit Announcement" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Title Field */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter announcement title"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Status Select */}
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAnnouncement;
