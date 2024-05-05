const { default: mongoose } = require("mongoose");

const connectedToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }else{

      await mongoose.connect("mongodb://127.0.0.1:27017/cms_project");
      console.log("database connected !");
    }
  } catch (error) {
    console.log("db connection error", err);
  }
};
export default connectedToDb