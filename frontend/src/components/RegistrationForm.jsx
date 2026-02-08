import { useState } from 'react';

export default function RegistrationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    country: '',
    age: '',
    experience: '',
    motivation: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Egypt', 'Tanzania', 'Uganda', 
    'Ethiopia', 'Rwanda', 'Senegal', 'Morocco', 'Tunisia', 'Zimbabwe', 'Zambia', 'Other'
  ];

  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];
  
  const experienceLevels = [
    'No Experience',
    'Beginner (Some IT knowledge)',
    'Intermediate (IT Professional)',
    'Advanced (Security Background)'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim() || formData.fullname.length < 2) {
      newErrors.fullname = 'Please enter your full name';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim() || formData.phone.length < 5) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }
    
    if (!formData.age) {
      newErrors.age = 'Please select your age range';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(formData.email);
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          country: '',
          age: '',
          experience: '',
          motivation: ''
        });
      } else {
        alert(data.detail || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Register Now
          </h2>
          <p className="text-xl text-slate-600">
            Join the next cohort starting February 15, 2026. Enrollment is completely free!
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-emerald-200 rounded-2xl p-8 md:p-12 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.fullname ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                } focus:outline-none transition`}
                placeholder="John Doe"
              />
              {errors.fullname && (
                <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                } focus:outline-none transition`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.phone ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                } focus:outline-none transition`}
                placeholder="+234 xxx xxx xxxx"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Country & Age Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.country ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                  } focus:outline-none transition bg-white`}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Age Range *
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.age ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                  } focus:outline-none transition bg-white`}
                >
                  <option value="">Select Age Range</option>
                  {ageRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cybersecurity Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.experience ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                } focus:outline-none transition bg-white`}
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Why do you want to learn cybersecurity? (Optional)
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition resize-none"
                placeholder="Tell us what motivates you to join this program..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/50'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>

            <p className="text-sm text-slate-500 text-center">
              By registering, you agree to receive program updates via email. 
              We'll never share your information with third parties.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
