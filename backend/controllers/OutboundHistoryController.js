// outboundHistoryController.js
import OutboundHistory from "../models/outboundHistoryModel.js";

// Get Outbound History
export const getOutboundHistory = async (req, res) => {
  try {
    const outboundHistory = await OutboundHistory.findAll();
    res.status(200).json(outboundHistory);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
