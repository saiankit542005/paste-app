import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  console.log(pastes);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(paste) {
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard");
  }

  const generatePasteLink = (paste) => {
    return `${window.location.origin}/pastes/${paste._id}`;
  };

  const handleShare = (paste) => {
    const pasteUrl = generatePasteLink(paste); // call function here
    const pasteTitle = paste.title || "My Paste";

    if (navigator.share) {
      navigator
        .share({
          title: pasteTitle,
          url: pasteUrl,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(pasteUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Search Box */}
      <input
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg border border-gray-300 rounded-xl px-4 py-3 mb-8 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition outline-none"
      />

      {/* Paste Cards */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="border border-gray-400 rounded-xl p-5 shadow-lg bg-white hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Title */}
              <div className="text-2xl font-bold mb-3 text-gray-800">
                {paste.title}
              </div>

              {/* Content */}
              <div className="text-gray-700 line-clamp-2 mb-4 whitespace-pre-wrap">
                {paste.content}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 items-center justify-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md transition">
                  <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                </button>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleCopy(paste)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md transition"
                >
                  Copy
                </button>

                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 shadow-md transition">
                  <Link to={`/pastes/${paste?._id}`}>View</Link>
                </button>

                <button
                  onClick={() => handleShare(paste)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md transition"
                >
                  Share
                </button>
              </div>

              {/* Date */}
              <div className="text-lg text-gray-500">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;