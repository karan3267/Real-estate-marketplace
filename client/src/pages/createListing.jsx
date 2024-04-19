export default function CreateListing() {
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
          <p>Images: <span className="text-gray-400 text-sm">The first images will be the cover.</span></p>
          <div className="flex gap-3 items-center">
            <input type="file" id="images" accept="image/*" multiple className="border p-3"></input>
            <button className="p-3 uppercase border rounded-lg text-white bg-green-500 hover:opacity-90">upload</button>
          </div>
        <button className="bg-gray-700 p-3 rounded-lg text-white uppercase hover:opacity-95">create listing</button>
        </div>
      </form>
    </div>
  );
}
