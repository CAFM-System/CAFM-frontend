import { Sparkles } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600"></div>

      <div className="relative p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-purple-100 text-sm">Welcome back</span>
            </div>

            <h2 className="text-4xl text-white">Hello, Sasindu! 👋</h2>
            <p className="text-purple-100 text-lg max-w-xl mt-2">
              You have 2 active maintenance requests.
            </p>
          </div>

          <button className="bg-white text-purple-600 rounded-xl px-6 py-4 hover:bg-purple-50 shadow-xl transition">
            + Create Request
          </button>
        </div>
      </div>
    </div>
  );
}
