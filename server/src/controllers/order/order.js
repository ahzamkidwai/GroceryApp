import { Customer, DeliveryPartner } from "../../models/user";
import Branch from "../../models/branch.js";
import Order from "../../models/order.js";

export const createOrder = async (req, reply) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;

    const customerData = await Customer.findById(userId);
    const branchData = await Branch.findById(branch);

    if (!customerData) {
      return reply.status(404).send({ message: "Customer not found" });
    }

    const newOrder = new Order({
      customer: userId,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      branch,
      totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "No address available",
      },
      pickupLocation: {
        latitude: branchData.address.latitude,
        longitude: branchData.address.longitude,
        address: branchData.address || "No address available",
      },
    });

    const savedOrder = await newOrder.save();

    return reply.status(201).send({
      message: "Order created successfully",
      savedOrder,
    });
  } catch (error) {
    console.log("Error occurred while creating order : ", error);
    return reply.status(500).send({
      success: false,
      message: "Cannot create Order  ",
      error: error.message,
    });
  }
};

export const confirmOrder = async (req, reply) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.params;
    const { deliveryPersonLocation } = req.body;

    const deliveryPerson = await DeliveryPartner.findById(userId);

    if (!deliveryPerson)
      return reply.status(404).send({ message: "Delivery person not found" });

    const order = await Order.findById(orderId);

    if (!order) return reply.status(404).send({ message: "Order not found" });

    if (order.status !== "available") {
      return reply.status(400).send({
        message: "Order is not available",
      });
    }

    order.status = "confirmed";
    order.deliveryPartner = userId;
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      latitude: deliveryPersonLocation?.latitude,
      address: deliveryPersonLocation.address || "",
    };

    req.server.io.to(orderId).emit("orderConfirmed", order);

    await order.save();

    return reply.status(201).send({
      message: "Order Confirmed successfully",
      order,
    });
  } catch (error) {
    console.log("Error occurred while confirming order : ", error);
    return reply.status(500).send({
      success: false,
      message: "Cannot confirm Order  ",
      error: error.message,
    });
  }
};
