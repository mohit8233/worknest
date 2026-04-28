import { Notification } from "../models/notificationModel.js";

export const myNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: notifications });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Notifications fetch failed", error: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ status: false, message: "Notification not found" });
    }

    return res.status(200).json({ status: true, message: "Notification marked as read", data: notification });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Notification update failed", error: error.message });
  }
};
