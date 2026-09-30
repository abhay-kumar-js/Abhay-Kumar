import { DataStore } from '../utils/dataStore.js';
import { getIsConnected } from '../config/db.js';

// @desc    Submit a contact inquiry
// @route   POST /api/contact
// @access  Public
export const submitMessage = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and project message details',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long',
      });
    }

    const messageData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: service ? service.trim() : 'General Inquiry',
      message: message.trim(),
    };

    const isDb = getIsConnected();
    const savedMessage = await DataStore.createMessage(messageData);
    console.log(
      `📩 New Contact Message received from ${messageData.name} <${messageData.email}> [Stored in: ${
        isDb ? 'MongoDB Atlas' : 'Local In-Memory Store'
      }]`
    );

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully. Thank you for getting in touch!',
      destination: isDb ? 'MongoDB Atlas' : 'Local In-Memory Store',
      data: savedMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
export const getMessages = async (req, res, next) => {
  try {
    const messages = await DataStore.getMessages();
    return res.status(200).json({
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact message status (read, replied, archived)
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['new', 'read', 'replied', 'archived'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const updated = await DataStore.updateMessageStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Message status updated to '${status}'`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await DataStore.deleteMessage(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
