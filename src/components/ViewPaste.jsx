import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste : ", paste);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      {/* Title */}
      <div className="flex w-full max-w-3xl mb-6">
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-gray-100 text-gray-700 font-semibold shadow-sm focus:outline-none cursor-not-allowed"
          placeholder="Title"
        />
        <button onClick={()=>navigate("/pastes")} className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 shadow-md transition ml-4">Pastes</button>
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
