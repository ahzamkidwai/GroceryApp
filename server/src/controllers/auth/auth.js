import { Customer, DeliveryPartner } from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({ phone, role: "Customer", isActivated: true });
      await customer.save();
    }

    const { accessToken, refreshToken } = generateToken(customer);

    return reply.send({
      message: customer
        ? "Customer Login Successfull!!!"
        : "Customer account created and logged In",
      accessToken,
      refreshToken,
      customerDetails: customer,
    });
  } catch (error) {
    return reply.code(500).send({
      status: 500,
      message: "An error occurred while logging customer user in",
      error: error.message,
    });
  }
};

export const loginDeliverPartner = async (req, reply) => {
  try {
    const { email, password } = req.body;
    let deliveryPartner = await DeliveryPartner.findOne({ email });

    if (!deliveryPartner) {
      return reply.status(404).send({
        status: 404,
        success: false,
        message: "Delivery Partner not found",
      });
    }

    const isMatched = password === deliveryPartner.password;

    if (!isMatched) {
      return reply.status(400).send({
        status: 400,
        success: false,
        message: "Invalid Delivery Partner Credentials",
      });
    }

    const { accessToken, refreshToken } = generateToken(deliveryPartner);

    return reply.send({
      message: "Delivery Partner Login Successfull!!!",
      accessToken,
      refreshToken,
      deliveryPartnerDetails: deliveryPartner,
    });
  } catch (error) {
    return reply.code(500).send({
      status: 500,
      message: "An error occurred while logging delivery partner in",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, reply) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return reply.status(401).send({
      status: 401,
      success: false,
      message: "Refresh Token Required",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    let user;

    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId);
    } else if (decoded.role === "DeliverPartner") {
      user = await DeliveryPartner.findById(decoded.userId);
    } else {
      return reply
        .status(403)
        .send({ message: "Invalid Role in Refresh Token" });
    }

    if (!user) {
      return reply.status(403).send({ message: "User Not Found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);
    return reply.send({
      message: "Token Refreshed",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    reply.status(500).send({
      status: 500,
      success: false,
      message: "Error occurred while getting refresh Token ",
      error,
    });
  }
};

export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;
    let user;
    if (role === "Customer") {
      user = await Customer.findById(userId);
    } else if (role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId);
    } else {
      return reply
        .status(403)
        .send({ message: "Invalid Role while fetching user" });
    }

    if (!user) {
      return reply.status(404).send({ message: "User Not Found" });
    }

    return reply.send({
      message: "User Profile fetched successfully",
      user,
    });
  } catch (error) {
    reply.status(500).send({
      status: 500,
      success: false,
      message: "Error occurred while fetching user profile ",
      error,
    });
  }
};
