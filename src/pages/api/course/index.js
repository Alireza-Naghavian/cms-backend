import courseModel from "@/models/course";
import connectedToDb from "@/utils/db";

const courseHandler = async (req, res) => {
  connectedToDb();

  try {
    switch (req.method) {
      case "GET": {
        const getAll = await courseModel.find();
        if (getAll) {
          return res.status(200).json({ data: getAll });
        } else {
          return res.json({
            message: "عملیات با مشمکل مواجه شد لطفا مجددا تلاش کنید!",
          });
        }
      }
      case "POST": {
        const { title } = req.body;
        if (title.trim()) {
          try {
            await courseModel.create({ title });

            return res
              .status(201)
              .json({ message: "دوره با موفقیت ایجاد شد !" });
          } catch (error) {
            return res.json({
              message: "عملیات با مشمکل مواجه شد لطفا مجددا تلاش کنید!",
              error,
            });
          }
        }
        break;
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export default courseHandler;
