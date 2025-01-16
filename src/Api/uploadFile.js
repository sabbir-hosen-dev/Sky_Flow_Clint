import axios from 'axios';

const UPLOAD_URL = 'https://api.imgbb.com/1/upload';
const API_KEY = import.meta.env.VITE_ImgBB_kEY; // Replace with your actual ImgBB API key

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${UPLOAD_URL}?key=${API_KEY}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.data.url; // Return the uploaded image URL
    } else {
      throw new Error('File upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error; // Propagate the error
  }
};

export default uploadFile;
