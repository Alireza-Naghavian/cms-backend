import courseModel from "@/models/course";

const { default: connectedToDb } = require("@/utils/db");
import { isValidObjectId } from "mongoose";
const singleCourseHandler = async (req, res) => {
  connectedToDb();
  const { id } = req.query;
  const { title } = req.body;
  try {
    switch (req.method) {
      case "DELETE": {
        if (isValidObjectId(id)) {
          try {
            const removeCourse = await courseModel.findOneAndDelete({
              _id: id,
            });
            return res
              .status(200)
              .json({ message: "دوره  با موفقیت حذف گردید." });
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Internal server error !!", error });
          }
        } else {
          return res
            .status(422)
            .json({ message: "هیچ دوره ای با این آیدی وجود ندارد!" });
        }
      }
      case "PUT": {
        if (isValidObjectId(id)) {
          try {
            const updateCourse = await courseModel.findOneAndUpdate(
              { _id: id },
              { title }
            );
            return res
              .status(201)
              .json({ message: "دوره با موفقیت ویرایش شد", updateCourse });
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Internal server error !!", error });
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !!", error });
  }
};
export default singleCourseHandler;
