import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef();
  const [uploadPerc, setUploadPerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPerc(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar ||currentUser.avatar}
          alt="profile"
          className="w-32 h-32 object-cover rounded-full self-center hover:cursor-pointer mt-2"
          onClick={() => {
            fileRef.current.click();
          }}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-500">Error Uploading Image</span>
          ) : uploadPerc > 0 && uploadPerc < 100 ? (
            <span className="text-slate-700">{`uploading ${uploadPerc}%`}</span>
          ) : uploadPerc === 100 ? (
            <span className="text-green-400">uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input className="p-3 border rounded-lg" placeholder="username" />
        <input className="p-3 border rounded-lg" placeholder="email" />
        <input className="p-3 border rounded-lg" placeholder="password" />
      </form>
    </div>
  );
}
