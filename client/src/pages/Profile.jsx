import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updtateUserSuccess,
  updateUserFailurre,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { app } from "../firebase.js";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef();
  const [uploadPerc, setUploadPerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailurre(data.message));
        return;
      }
      dispatch(updtateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailurre(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/user/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
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
        <input
          className="p-3 border rounded-lg"
          placeholder="username"
          onChange={handleChange}
          defaultValue={currentUser.userName}
          id="userName"
        />
        <input
          className="p-3 border rounded-lg"
          placeholder="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          id="email"
        />
        <input
          className="p-3 border rounded-lg"
          placeholder="password"
          type="password"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5 hover:cursor-not-allowed">
        {error ? error : ""}
      </p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
