import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";


import { sendEmail } from "../services/emailService.js";
import { welcomeEmail } from "../services/emailTemplates.js";


import { randomBytes, createHash } from "node:crypto";
import { passwordResetEmail } from "../services/emailTemplates.js";
// Hash the password
async function hashPassword(password) {
  const hashedPassword = await hash(password, 10);

  return hashedPassword;
}

// Create JWT token
function createToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return token;
}

// Return user information
function getUserInfo(user) {
  return {
    name: user.name,
    id: user._id,
    email: user.email,
    role: user.role,
  };
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};

    // Check fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "learner",
    });


    try {
  await sendEmail(
    newUser.email,
    "Welcome to LMS",
    welcomeEmail(newUser.name),
  );
} catch (emailError) {
  console.error("Failed to send welcome email:", emailError.message);
}

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: getUserInfo(newUser),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    // Compare passwords
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    // Create token
    const token = createToken(user);

    // Send response
    res.status(200).json({
      message: "Logged in successfully",
      token: token,
      user: getUserInfo(user),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      user: getUserInfo(user),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}




// POST /api/auth/forgot-password
export async function forgotPassword(req, res) {
  try {
    const email = req.body?.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const resetToken = randomBytes(32).toString("hex");

      user.resetPasswordToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordExpires = new Date(
        Date.now() + 15 * 60 * 1000,
      );

      await user.save();

      try {
        const resetUrl = new URL(
          "/reset-password",
          process.env.FRONTEND_URL || "http://localhost:3000",
        );

        resetUrl.searchParams.set("token", resetToken);

        await sendEmail(
          user.email,
          "Reset your LMS password",
          passwordResetEmail(user.name, resetUrl.toString()),
        );
      } catch (emailError) {
        console.error(
          "Failed to send password reset email:",
          emailError.message,
        );
      }
    }

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      message: "Unable to process password reset request.",
    });
  }
}

// POST /api/auth/reset-password
export async function resetPassword(req, res) {
  try {
    const { token, password } = req.body || {};

    if (
      typeof token !== "string" ||
      typeof password !== "string" ||
      !token ||
      !password
    ) {
      return res.status(400).json({
        message: "Token and new password are required.",
      });
    }

    const hashedToken = createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      message: "Unable to reset password.",
    });
  }
}
