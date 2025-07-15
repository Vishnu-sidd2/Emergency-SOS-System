import React from "react";

const ReporterNameInput = ({ reporterName, setReporterName }) => {
  return (
    <div>
      <label className="block text-xl font-bold mb-4 text-white">
        Your Name (Optional)
      </label>
      <input
        type="text"
        value={reporterName}
        onChange={(e) => setReporterName(e.target.value)}
        placeholder="Enter your name (optional)"
        className="w-full bg-gray-700/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
};

export default ReporterNameInput;