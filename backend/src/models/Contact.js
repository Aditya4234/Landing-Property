const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters'],
    default: 'Property Inquiry'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    default: null
  },
  inquiryType: {
    type: String,
    enum: ['general', 'property_inquiry', 'newsletter', 'schedule_visit'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed', 'active'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date,
    default: null
  },
  response: {
    type: String,
    trim: true,
    maxlength: [2000, 'Response cannot exceed 2000 characters'],
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'mobile_app', 'referral', 'direct'],
    default: 'website'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
contactSchema.index({ email: 1, inquiryType: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ inquiryType: 1 });
contactSchema.index({ submittedAt: -1 });

// Virtual for response time calculation
contactSchema.virtual('responseTime').get(function() {
  if (this.respondedAt && this.submittedAt) {
    return Math.floor((this.respondedAt - this.submittedAt) / (1000 * 60 * 60)); // hours
  }
  return null;
});

// Static method to get contact statistics
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalContacts: { $sum: 1 },
        pendingContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        respondedContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'responded'] }, 1, 0] }
        },
        newsletterSubscriptions: {
          $sum: { $cond: [{ $eq: ['$inquiryType', 'newsletter'] }, 1, 0] }
        },
        propertyInquiries: {
          $sum: { $cond: [{ $eq: ['$inquiryType', 'property_inquiry'] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalContacts: 0,
    pendingContacts: 0,
    respondedContacts: 0,
    newsletterSubscriptions: 0,
    propertyInquiries: 0
  };
};

module.exports = mongoose.model('Contact', contactSchema);