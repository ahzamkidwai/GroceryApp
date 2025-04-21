import Category from "../../models/category.js";

export const getAllCategories = async (req, reply) => {
  try {
    const categories = await Category.find();

    return reply.send({
      success: true,
      message: "All Categories Fetched Successfully",
      categories,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
    });
  }
};
