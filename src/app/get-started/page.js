'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function OnboardingForm() {
  const router = useRouter();
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    businessName: '',
    catalogFile: null,
    catalogText: '',
    deliveryRules: '',
    pickupRules: '',
    additionalNotes: ''
  });
  
  const [operatingHours, setOperatingHours] = useState({
    Monday: { active: false, open: '09:00', close: '17:00' },
    Tuesday: { active: false, open: '09:00', close: '17:00' },
    Wednesday: { active: false, open: '09:00', close: '17:00' },
    Thursday: { active: false, open: '09:00', close: '17:00' },
    Friday: { active: false, open: '09:00', close: '17:00' },
    Saturday: { active: false, open: '09:00', close: '17:00' },
    Sunday: { active: false, open: '09:00', close: '17:00' }
  });
  
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        catalogFile: file
      }));
      setFileName(file.name);
    }
  };

  const toggleDay = (day) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active
      }
    }));
  };

  const updateDayTime = (day, type, value) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  const formatOperatingHours = () => {
    const activeDays = Object.entries(operatingHours)
      .filter(([_, data]) => data.active)
      .map(([day, data]) => `${day}: ${data.open} - ${data.close}`);
    
    return activeDays.length > 0 ? activeDays.join(', ') : 'Not specified';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append('whatsappNumber', formData.whatsappNumber);
    submitData.append('businessName', formData.businessName);
    submitData.append('catalogText', formData.catalogText);
    submitData.append('operatingHours', formatOperatingHours());
    submitData.append('deliveryRules', formData.deliveryRules);
    submitData.append('pickupRules', formData.pickupRules);
    submitData.append('additionalNotes', formData.additionalNotes);
    
    if (formData.catalogFile) {
      submitData.append('catalogFile', formData.catalogFile);
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-52 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-200 via-sky-200 to-violet-200 blur-3xl opacity-70" />
        </div>

        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Successfully Submitted!</h2>
            <p className="text-slate-600 mb-6">We'll get back to you shortly with your KueBot setup.</p>
            <p className="text-sm text-slate-500">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-52 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-200 via-sky-200 to-violet-200 blur-3xl opacity-70" />
      </div>

      <Navbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 glass ring-soft px-3 py-1.5 text-xs font-semibold text-slate-700 mb-4">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            Simple setup. Start in minutes.
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Get Started with KueBot
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fill in your details below and we'll set up your personalized AI ordering assistant on WhatsApp.
          </p>
        </div>

        <div>
          <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 md:p-8 mb-6">
            
            <div className="mb-6">
              <label className="block text-slate-900 font-semibold mb-2 text-sm">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                         text-slate-900 placeholder-slate-400 
                         focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                         transition-all"
              />
              <p className="text-xs text-slate-500 mt-1.5">Include country code (e.g., +1 for US)</p>
            </div>

            <div className="mb-6">
              <label className="block text-slate-900 font-semibold mb-2 text-sm">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="e.g., Joe's Pizza"
                required
                className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                         text-slate-900 placeholder-slate-400 
                         focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                         transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-900 font-semibold mb-2 text-sm">
                Catalog / Menu *
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="file"
                    id="catalogFile"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.csv"
                    className="hidden"
                  />
                  <label
                    htmlFor="catalogFile"
                    className="flex items-center justify-center w-full px-6 py-6 
                             bg-white/90 border-2 border-dashed border-slate-300 rounded-xl 
                             hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer 
                             transition-all group"
                  >
                    <div className="text-center">
                      <svg className="w-10 h-10 mx-auto mb-2 text-slate-400 group-hover:text-emerald-500 transition-colors" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-slate-900 font-medium mb-0.5 text-sm">
                        {fileName || 'Click to upload menu image'}
                      </p>
                      <p className="text-xs text-slate-500">
                        OCR will extract items & prices automatically
                      </p>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white/75 text-slate-500">OR paste your menu</span>
                  </div>
                </div>

                <textarea
                  name="catalogText"
                  value={formData.catalogText}
                  onChange={handleInputChange}
                  placeholder="Paste your menu items here...&#10;Example:&#10;Pizza Margherita - $12.99&#10;Caesar Salad - $8.99&#10;Pasta Alfredo - $14.99"
                  rows="5"
                  className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                           text-slate-900 placeholder-slate-400 
                           focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                           transition-all resize-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours with Interactive Selector */}
          <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 md:p-8 mb-6">
            <label className="block text-slate-900 font-semibold mb-4 text-sm">
              Operating Hours
            </label>
            
            <div className="space-y-3">
              {daysOfWeek.map(day => (
                <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all w-32 ${
                      operatingHours[day].active
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                  
                  {operatingHours[day].active && (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={operatingHours[day].open}
                        onChange={(e) => updateDayTime(day, 'open', e.target.value)}
                        className="px-3 py-2 bg-white/90 border border-slate-200 rounded-lg text-sm
                                 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                      <span className="text-slate-500">to</span>
                      <input
                        type="time"
                        value={operatingHours[day].close}
                        onChange={(e) => updateDayTime(day, 'close', e.target.value)}
                        className="px-3 py-2 bg-white/90 border border-slate-200 rounded-lg text-sm
                                 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              Click on days to activate, then set opening and closing times
            </p>
          </div>

          {/* Business Rules */}
          <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 md:p-8 mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Business Rules</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-900 font-medium mb-2 text-sm">
                  Delivery Rules
                </label>
                <textarea
                  name="deliveryRules"
                  value={formData.deliveryRules}
                  onChange={handleInputChange}
                  placeholder="e.g., Free delivery over $30, $5 delivery fee otherwise, 5-mile radius"
                  rows="3"
                  className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                           text-slate-900 placeholder-slate-400 
                           focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                           transition-all resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-900 font-medium mb-2 text-sm">
                  Pickup Rules
                </label>
                <textarea
                  name="pickupRules"
                  value={formData.pickupRules}
                  onChange={handleInputChange}
                  placeholder="e.g., 15-minute pickup time, curbside available"
                  rows="3"
                  className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                           text-slate-900 placeholder-slate-400 
                           focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                           transition-all resize-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 md:p-8 mb-6">
            <label className="block text-slate-900 font-medium mb-2 text-sm">
              Additional Notes (Optional)
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any special instructions, preferences, or questions..."
              rows="4"
              className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl 
                       text-slate-900 placeholder-slate-400 
                       focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 
                       transition-all resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 md:p-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold
                       hover:bg-slate-800 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:bg-slate-900"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit & Get Your KueBot'
              )}
            </button>

            <p className="text-center text-xs text-slate-500 mt-3">
              We'll process your information and reach out within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}