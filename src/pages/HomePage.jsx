import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #2d1b3d 0%, #1a0f2e 50%, #0a0510 100%)",
      }}
    >
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        {/* Pink Heart - Featured Content */}
        <div className="mb-8 animate-pulse">
          <Heart className="w-28 h-28 text-pink-400 fill-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
        </div>

        {/* Special Message */}
        <p className="text-center text-xl text-gray-300 mb-12">Adoro Você</p>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/principal")}
            className="bg-purple-900 shadow-2xl rounded-4xl p-8 hover:bg-pink-600 transition-colors duration-300 cursor-pointer"
          >
            <p className="text-2xl font-bold">
              <Heart className="inline w-6 h-6 text-white mr-2 fill-white" />
              Clique aqui, amor
              <Heart className="inline w-6 h-6 text-white ml-2 fill-white" />
            </p>
          </button>
        </div>
        <div>
          <p>Toque para revelar</p>
        </div>
      </div>
    </div>
  );
}
