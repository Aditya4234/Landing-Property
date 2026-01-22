const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message, propertyId, inquiryType } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create contact inquiry
    const contactInquiry = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'Property Inquiry',
      message: message.trim(),
      propertyId: propertyId || null,
      inquiryType: inquiryType || 'general',
      status: 'pending',
      submittedAt: new Date()
    });

    // Here you could add email notification logic
    // await sendContactNotificationEmail(contactInquiry);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
      data: {
        id: contactInquiry._id,
        status: contactInquiry.status
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.'
    });
  }
};

// @desc    Submit newsletter subscription
// @route   POST /api/contact/newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    const existingSubscription = await Contact.findOne({
      email: email.trim().toLowerCase(),
      inquiryType: 'newsletter'
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Create newsletter subscription
    const newsletterSubscription = await Contact.create({
      name: 'Newsletter Subscriber',
      email: email.trim().toLowerCase(),
      inquiryType: 'newsletter',
      status: 'active',
      submittedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
};

// @desc    Submit property inquiry
// @route   POST /api/contact/property-inquiry
// @access  Public
const submitPropertyInquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;

    if (!propertyId || !name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Property ID, name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create property inquiry
    const propertyInquiry = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      propertyId,
      inquiryType: 'property_inquiry',
      status: 'pending',
      submittedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Your property inquiry has been submitted. Our agent will contact you soon.',
      data: {
        id: propertyInquiry._id,
        status: propertyInquiry.status
      }
    });

  } catch (error) {
    console.error('Property inquiry submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.'
    });
  }
};

// @desc    Get all contact inquiries (for admin)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const inquiryType = req.query.type;

    let query = {};

    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('propertyId', 'title location price');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'responded', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, responded, or closed'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
};

module.exports = {
  submitContactForm,
  subscribeNewsletter,
  submitPropertyInquiry,
  getAllContacts,
  updateContactStatus
};