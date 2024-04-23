import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listingData, setlistingData] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact,setContact]=useState(false)
  const currentUser= useSelector((state)=>state.user)

  useEffect(() => {
    const res = async () => {
      try {
        setLoading(true);
        setError(false);
        const listing = await fetch(`/api/listing/get/${params.id}`);
        const fetchedData = await listing.json();
        if (fetchedData.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setlistingData(fetchedData);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    res();
  }, [params.id]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listingData && !loading && !error && (
        <div>
          <Swiper navigation>
            {listingData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px] sm:h-[450px] md:h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="p-3 max-w-4xl mx-auto  my-7 flex flex-col gap-4">
            <p className="text-2xl font-semibold">
              {listingData.name} - ${" "}
              {listingData.offer
                ? listingData.discountedPrice.toLocaleString("en-US")
                : listingData.regularPrice.toLocaleString("en-US")}
              {listingData.type === "rent" && " /month"}
            </p>
            <p className="flex gap-2 text-slate-500 items-center">
              <FaMapMarkerAlt />
              {listingData.address}
            </p>
            <div className="flex max-sm:flex-col  gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listingData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listingData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listingData.regularPrice - +listingData.discountedPrice}{" "}
                  OFF
                </p>
              )}
            </div>
            <p className="flex gap-2 text-slate-500 items-center">
              <span className="font-semibold text-black">Description -</span>
              {listingData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listingData.bedrooms > 1
                  ? `${listingData.bedrooms} beds `
                  : `${listingData.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listingData.bathrooms > 1
                  ? `${listingData.bathrooms} baths `
                  : `${listingData.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listingData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listingData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listingData.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listingData} />}
          </div>
        </div>
      )}
    </main>
  );
}
