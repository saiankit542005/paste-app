import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(30),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      {/* Title + Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition placeholder-gray-400"
        />

        <button
          onClick={createPaste}
          className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-600 hover:shadow-lg transition font-semibold"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* Content Textarea */}
      <textarea
        placeholder="Enter content here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        className="w-full max-w-3xl p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none resize-none transition placeholder-gray-400 text-gray-800 font-sans"
      />
    </div>
  );
};

export default Home;
