export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Dr. John Doe's Reviews
        </h1>
        <div className="space-y-6">
          {/* Review 1 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 font-medium">
              <strong>Review by:</strong> Jane Smith
            </p>
            <p className="text-gray-700 mt-2">
              "Dr. John Doe is an excellent doctor. He listened to all my
              concerns patiently and provided effective treatment. Highly
              recommend!"
            </p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 mr-2">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-500 text-sm">5/5</span>
            </div>
          </div>
          {/* Review 2 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 font-medium">
              <strong>Review by:</strong> Mark Johnson
            </p>
            <p className="text-gray-700 mt-2">
              "I had a wonderful experience with Dr. Doe. He made me feel
              comfortable and ensured I understood the treatment process. Thank
              you!"
            </p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 mr-2">⭐⭐⭐⭐</span>
              <span className="text-gray-500 text-sm">4/5</span>
            </div>
          </div>
          {/* Review 3 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 font-medium">
              <strong>Review by:</strong> Emily Davis
            </p>
            <p className="text-gray-700 mt-2">
              "Great doctor, but the waiting time was a bit long. Other than
              that, the service was excellent!"
            </p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 mr-2">⭐⭐⭐⭐</span>
              <span className="text-gray-500 text-sm">4/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
