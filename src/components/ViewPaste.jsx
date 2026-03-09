import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste : ", paste);

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      {/* Title */}
      <div className="w-full max-w-3xl mb-6">
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-gray-100 text-gray-700 font-semibold shadow-sm focus:outline-none cursor-not-allowed"
          placeholder="Title"
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl">
        <textarea
          value={paste.content}
          disabled
          className="w-full p-5 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 shadow-sm resize-none focus:outline-none cursor-not-allowed whitespace-pre-wrap break-words"
          rows={20}
          placeholder="Content"
        />
      </div>
    </div>
  );
};

export default ViewPaste;
