import User from "../models/User.js";

export const getPhone = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      phone: user.phone || ""
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const savePhone = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { phone },
      { new: true }
    );

    res.json({
      phone: user.phone,
      message: "Phone number saved"
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const runSecurityCheck = async (req, res) => {
  try {
    const { network } = req.body;

    const user = await User.findById(req.user.id);

    const phone = user.phone || "";

    if (!phone) {
      return res.status(400).json({
        message: "No phone number saved."
      });
    }

    // Wi-Fi simulacija
    if (network === "wifi") {
      return res.json({
        error: true,
        message:
          "CAMARA verification unavailable. Please switch to a 4G or 5G mobile network."
      });
    }

    // HIGH RISK simulacija
    if (phone.endsWith("99")) {
      return res.json({
        numberVerified: true,
        simSwapDetected: true,
        risk: "HIGH"
      });
    }

    // LOW RISK simulacija
    return res.json({
      numberVerified: true,
      simSwapDetected: false,
      risk: "LOW"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};