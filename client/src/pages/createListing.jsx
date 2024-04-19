import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = () => {
    setUploading(true);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(error);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload only 6 images per lisitng");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-4xl p-3 mx-auto">
      <div className="text-center text-2xl font-semibold my-7">
        Create Listing
      </div>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            minLength="10"
            maxLength="40"
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Address"
            id="address"
            required
            className="border p-3 rounded-lg"
          />
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <input type="checkBox" id="sale" />
              <p>Sell</p>
            </div>
            <div className="flex gap-2">
              <input type="checkBox" id="rent" />
              <p>Rent</p>
            </div>
            <div className="flex gap-2">
              <input type="checkBox" id="parking" />
              <p>Parking Spot</p>
            </div>
            <div className="flex gap-2">
              <input type="checkBox" id="furnished" />
              <p>Furnished</p>
            </div>
            <div className="flex gap-2">
              <input type="checkBox" id="offer" />
              <p>Offer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bedrooms"
                className="p-3 border rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bathrooms"
                className="p-3 border rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bedrooms"
                className="p-3 border rounded-lg w-24"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {/* {formData.type === 'rent' && ( */}
                <span className="text-xs">($ / month)</span>
                {/* )} */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bedrooms"
                className="p-3 border rounded-lg w-24"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                {/* {formData.type === 'rent' && ( */}
                <span className="text-xs">($ / month)</span>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <p>
            Images:{" "}
            <span className="text-gray-400 text-sm">
              The first images will be the cover.
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border p-3"
              onChange={(e) => setFiles(e.target.files)}
            ></input>
            <button
              className="p-3 w-28 uppercase border rounded-lg text-white bg-green-500 hover:opacity-90"
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
            >
              {uploading?"uploading...":"upload"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex items-center justify-between border p-3"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="text-red-500 hover:opacity-70"
                  onClick={() => handleDeleteImage(index)}
                >
                  delete
                </button>
              </div>
            ))}
          <button
            type="button"
            className="bg-gray-700 p-3 rounded-lg text-white uppercase hover:opacity-95"
          >
            create listing
          </button>
        </div>
      </form>
    </div>
  );
}
