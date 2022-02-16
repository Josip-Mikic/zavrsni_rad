import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import path from "path";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import Category from "./models/categoryModel.js";
const categoryClothes = {
  name: "Clothes",
  subcategories: [
    "Pants",
    "Shirts",
    "Jackets",
    "Jeans",
    "T_shirt",
    "Underwear",
    "Pullover",
    "Coat",
    "Swimsuit",
    "Pajamas",
    "Dress",
    "Long",
    "Short",
  ],
};
const categoryShoes = {
  name: "Shoes",
  subcategories: [""],
};
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/veki", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// app.get(
//   "/category/",
//   expressAsyncHandler(async (req, res) => {
//     await Category.remove({}); // brise sve korisnike
//     const createdCategories = await Category.insertMany([
//       categoryClothes,
//       categoryShoes,
//     ]);
//     res.send({ createdCategories });
//   })
// );
app.get(
  "/api/categories/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send({ categories });
  })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
//Sending an email to client
app.post(
  "/api/send",
  expressAsyncHandler(async (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      port: 465,
      secureConnection: true,
      auth: {
        user: "example@gmail.com", //email
        pass: "12345678", //password
      },
    });
    let mailOptions = {
      from: "skola.i.slicno@gmail.com",
      to: [data.user.userInfo.email, "josipmiki53@gmail.com"],
      subject: "Narudzba T.O. Veki",
      html: `<p>Hvala Vam na narudžbi.</p>
      <p>Za sve dodatne informacije javite se na 0993505307.</p>`,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send("Success");
      }
    });

    smtpTransport.close();
  })
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
