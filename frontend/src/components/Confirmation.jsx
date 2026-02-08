export default function Confirmation({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-slideUp">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Registration Successful!
          </h3>
          
          <p className="text-slate-600 mb-6">
            Thank you for registering! We've sent a confirmation email to:
          </p>

          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="font-semibold text-emerald-600">{email}</p>
          </div>

          <p className="text-sm text-slate-500 mb-6">
            Please check your email and click the confirmation link to complete your registration. 
            Don't forget to check your spam folder!
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
