import express from "express";
import expressAsyncHandler from "express-async-handler";
import { data } from "../Data.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const category = req.query.categories || "";
    const gender = req.query.gender || "";
    const categoryFilter = category === "all" ? {} : { category };
    const genderFilter = gender === "none" ? {} : { gender };
    //, ...genderFilter
    let products;
    if (category === "all") {
      products = await Product.find({
        ...genderFilter,
      });
    } else if (category === "all" && gender === "none") {
      products = await Product.find({});
    } else
      products = await Product.find({
        $and: [
          { ...genderFilter },
          {
            $or: [
              { "category.subcategories": { $all: [category] } },
              {
                "category.name": category,
              },
            ],
          },
        ],
      });

    res.send(products);
  })
);
const CategoryListHandler = (categories) => {
  let template = [];
  categories.forEach((element) => {
    const result = template.find((value) => value.name === element.name);
    if (result === undefined) {
      console.log("nema ga");
      template.push(element);
    } else {
      console.log("ima ga");
      console.log(template);

      let index = template.findIndex((templateItem) => {
        return templateItem.name === element.name;
      });
      console.log(index);
      console.log(element);
      console.log(template);

      let mergedElement = SubcategoryMerge(element, template, index);
      template[index] = mergedElement;
    }

    // if (temp === undefined) {
    //   // nema spremljenog objekta
    //   template.push(element);
    // } else {
    //   //postoji objekt, append on it
    //   SubcategoryMerge(element, template, temp);
    // }
  });
  return template;
};
const SubcategoryMerge = (newElement, array, index) => {
  let x = new Set([...newElement.subcategories, ...array[index].subcategories]);
  return { name: newElement.name, subcategories: Array.from(x) };
};
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const gender = req.query.gender || "";
    const genderFilter = gender ? { gender } : {};
    const categories = await Product.find({
      ...genderFilter,
    }).distinct("category");
    let x = categories;
    let y = CategoryListHandler(x);
    res.send(y);
  })
);

productRouter.get(
  "/categories/:category",
  expressAsyncHandler(async (req, res) => {
    const category = req.query.category || "";
    const categoryFilter = category ? { category } : {};
    const filteredProducts = await Product.find({ ...categoryFilter });
    res.send(filteredProducts);
  })
);
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found " });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample Name" + Date.now(),
      images: [],
      price: 0,
      category: [],
      brand: "Sample Brand",
      countInStock: 0,
      rating: 0,
      gender: "male",
      description: "Sample description",
      colors: [],
    });
    const createdProduct = await product.save();
    res.send({ message: "Product created!", product: createdProduct });
  })
);
productRouter.post(
  "/category",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.name);
    const category = new Category({
      name: req.body.name,
      subcategories: [""],
    });
    const createdCategory = await category.save();
    res.send({ message: "Category created!", category: createdCategory });
  })
);
productRouter.put(
  "/category",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const foundCategory = await Category.find({
      name: req.body.cat.name,
    });
    // console.log(foundCategory);

    let category = foundCategory[0];
    let index = category.subcategories.indexOf(req.body.subcat);
    category.subcategories[index] = req.body.txt;
    let editedSubcategory = category.subcategories;
    console.log(editedSubcategory);
    const updatedCategory = await Category.findOneAndUpdate(
      {
        name: req.body.cat.name,
      },
      { subcategories: editedSubcategory }
    );
    // const updatedCategory = await category.save();
    // // category.markModified(`subcategories`);
    // const newCategory = await Category.find({});
    res.send({ message: "Category edited!", category: updatedCategory });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.colors = req.body.colors;
      product.gender = req.body.gender;

      const updatedProduct = await product.save();
      res.send({ message: "Product updated!", product: updatedProduct });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: "Product Deleted!", product: deletedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
