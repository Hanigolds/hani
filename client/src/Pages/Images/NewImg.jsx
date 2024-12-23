import React, { useState } from 'react';
import LeftBar from '../../Components/LeftBar';
import RightBar from '../../Components/RightBar';
import Heading from '../../Components/Heading';
import Button from '../../Components/Button';
import { toast } from 'react-toastify';
import { FaUpload } from "react-icons/fa6";
const url = import.meta.env.VITE_API_URL;


const NewImg = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhoto = async (e) => {
    e.preventDefault();

    if (!photo) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo); // Append the selected photo to FormData

    try {
      const response = await fetch(`${url}/api/add`, {
        method: 'POST',
        body: formData, // Use FormData as the body for file uploads
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.msg);
        setPhoto(null); // Clear the photo state after successful upload
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <RightBar>
        <div className="cat-container flex flex-wrap justify-center items-center p-[2px]">
          <div className="form-container w-[75%] h-full shadow p-2">
            <Heading title="Add Image" />
            <form onSubmit={handlePhoto}>
              <div className="form-group">
                <div className="w-full">
                  <label className="border-2 border-black p-2 block w-full rounded-md">
                    {photo ? photo.name : <FaUpload className="text-2xl" />}
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                      accept="image/*"
                    />
                  </label>
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Uploaded preview"
                      className="w-[100px] h-[100px] mt-4 rounded-xl"
                    />
                  )}
                </div>
              </div>
              <div className="w-[150px] lg:w-[220px] my-1">
                <Button title="Submit" />
              </div>
            </form>
          </div>
        </div>
      </RightBar>
    </div>
  );
};

export default NewImg;
