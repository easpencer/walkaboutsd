'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Users, CreditCard, MapPin, Star, Shield, CheckCircle } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    title: string
    description: string
    price: number
    duration?: string
    groupSize?: string
    rating?: number
    reviews?: number
    nextAvailable?: string
    type: 'tour' | 'experience'
    image?: string
  } | null
}

export function BookingModal({ isOpen, onClose, item }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [guests, setGuests] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Available dates and times (in a real app, this would come from an API)
  const availableDates = [
    '2024-04-01',
    '2024-04-02',
    '2024-04-03',
    '2024-04-05',
    '2024-04-07',
    '2024-04-08',
    '2024-04-09'
  ]

  const availableTimes = [
    '09:00 AM',
    '11:00 AM',
    '2:00 PM',
    '4:00 PM'
  ]

  const totalPrice = item ? item.price * guests : 0
  const serviceFee = totalPrice * 0.1
  const taxes = (totalPrice + serviceFee) * 0.08
  const finalTotal = totalPrice + serviceFee + taxes

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setBookingConfirmed(false)
      setSelectedDate('')
      setSelectedTime('')
      setGuests(1)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
      })
    }
  }, [isOpen])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setBookingConfirmed(true)
    setIsSubmitting(false)
    setStep(4)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left Panel - Item Details */}
              <div className="lg:w-2/5 p-6 bg-gray-50 border-r">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book {item.type === 'tour' ? 'Tour' : 'Experience'}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {item.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    {item.groupSize && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{item.groupSize}</span>
                      </div>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{item.rating} ({item.reviews} reviews)</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Price Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${item.price} × {guests} guest{guests > 1 ? 's' : ''}</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>${serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <span>${taxes.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                </div>
              </div>

              {/* Right Panel - Booking Form */}
              <div className="lg:w-3/5 p-6 overflow-y-auto">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              selectedDate === date
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            {formatDate(date).split(',')[0]}
                            <br />
                            <span className="text-xs opacity-75">
                              {formatDate(date).split(', ')[1]}
                            </span>
                          </button>
                        ))}
                      </div>

                      {selectedDate && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                          {availableTimes.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 text-sm rounded-lg border transition-colors ${
                                selectedTime === time
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'bg-white hover:bg-gray-50 border-gray-200'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of guests
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} guest{i > 0 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Contact Information</h3>
                      <button
                        onClick={() => setStep(1)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        ← Back
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        rows={3}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                      />
                    </div>

                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Payment Information</h3>
                      <button
                        onClick={() => setStep(2)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        ← Back
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Secure Payment</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Full name as it appears on card"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span>{guests}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing Payment...' : `Pay $${finalTotal.toFixed(2)}`}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By completing this booking, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </motion.div>
                )}

                {step === 4 && bookingConfirmed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                      <p className="text-gray-600">
                        Thank you for booking with WalkAboutSD. You'll receive a confirmation email shortly.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg text-left">
                      <h4 className="font-semibold text-gray-900 mb-4">Booking Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking ID:</span>
                          <span className="font-mono">WSD-{Date.now().toString().slice(-6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{item.type === 'tour' ? 'Tour' : 'Experience'}:</span>
                          <span>{item.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span>{guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contact:</span>
                          <span>{formData.firstName} {formData.lastName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Print Confirmation
                      </button>
                      <button
                        onClick={onClose}
                        className="flex-1 btn-primary"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}