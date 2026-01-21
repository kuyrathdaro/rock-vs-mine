import React from "react";
import { NavLink } from "react-router";

const TermsPrivacy: React.FC = () => (
  <div className="flex flex-col items-center justify-center px-4">
    <div className="backdrop-blur-md bg-white/10 border border-blue-200/30 rounded-xl shadow-lg max-w-2xl w-full p-8 mt-8 mb-8">
      <div className="flex flex-col items-center mb-6">
        <span className="text-4xl mb-2" role="img" aria-label="ocean">🌊🪨⚓️</span>
        <h1 className="text-2xl font-bold mb-2 text-blue-100 drop-shadow">Terms of Service & Privacy Policy</h1>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-200">Terms of Service</h2>
      <p className="mb-4 text-blue-50">
        By using the Rock vs Mine Sonar Data Prediction app ("the App"), you agree to use it for educational and informational purposes only.
        The App is provided "as is" without warranty of any kind. We do not guarantee the accuracy, reliability, or suitability of the predictions or information provided by the App.
        You are solely responsible for any decisions or actions taken based on the results from this App.
      </p>
      <p className="mb-4 text-blue-50">
        You agree not to misuse the App, attempt to disrupt its operation, or use it for unlawful purposes. We reserve the right to modify or discontinue the App at any time without notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-200">Privacy Policy</h2>
      <p className="mb-4 text-blue-50">
        Your privacy is important to us. This App does not collect, store, or share any personal information. Any data you input (such as sonar data or CSV files) is processed only in your browser or sent to our server solely for prediction purposes and is not retained after processing.
      </p>
      <p className="mb-4 text-blue-50">
        We do not use cookies or tracking technologies. We may collect anonymous usage statistics to improve the App, but these do not include any personal or identifying information.
      </p>

      <div className="mt-8 text-center">
        <NavLink
          to="/"
          end
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </NavLink>
      </div>
    </div>
  </div>
);

export default TermsPrivacy;