import { Customer, DeliveryPartner } from "../../models/user.js";

export const updateUser = async (req, reply) => {
  try {
    const { userId } = req.user;
    const updateData = req.body;
    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));

    if (!user) {
      return reply.status(404).send({
        message: "User Not Found",
      });
    }

    let userModel;

    if (user.role === "Customer") {
      userModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      userModel = DeliveryPartner;
    } else {
      return reply.status(400).send({ message: "Invalid user Model Role" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return reply.status(404).send({ message: "USER NOT FOUND" });
    }

    return reply.status(200).send({
      success: true,
      message: "User data updated successfully",
      user: updatedUser,
    });

    // Object.assign(user, updateData);
    // await user.save();

    // return reply.send({
    //   success: true,
    //   message: "User updated successfully",
    //   data: user,
    // });
  } catch (error) {
    return reply.status(500).send({
      status: 500,
      success: false,
      message: "Failed to update user",
      message: error.message,
    });
  }
};
