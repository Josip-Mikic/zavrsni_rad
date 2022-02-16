import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsProduct,
  listCategories,
  updateProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Images from "../components/Images";
import { useTranslation } from "react-i18next";
export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //array of strings
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState({});
  let x = [
    {
      size: "XS",
      quantity: 0,
    },
    {
      size: "S",
      quantity: 0,
    },
    {
      size: "M",
      quantity: 0,
    },
    {
      size: "L",
      quantity: 0,
    },
    {
      size: "XL",
      quantity: 0,
    },
    {
      size: "XXL",
      quantity: 0,
    },
    {
      size: "XXXL",
      quantity: 0,
    },
    {
      size: "XXXXL",
      quantity: 0,
    },
    {
      size: "XXXXXL",
      quantity: 0,
    },
  ];
  let y = [
    {
      size: "32",
      quantity: 0,
    },
    {
      size: "34",
      quantity: 0,
    },
    {
      size: "36",
      quantity: 0,
    },
    {
      size: "38",
      quantity: 0,
    },
    {
      size: "40",
      quantity: 0,
    },
    {
      size: "42",
      quantity: 0,
    },
    {
      size: "44",
      quantity: 0,
    },
  ];
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [currentSize, setCurrentSize] = useState(x);
  const [currentName, setCurrentName] = useState("");
  const [type, setType] = useState("");
  const [subcategoryList, setSubcategoryList] = useState([]);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories: categorije } = categoryList;
  const { t } = useTranslation();

  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  useEffect(() => {
    dispatch(listCategories());
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
      //Update product
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setColors(product.colors);
      setImages(product.images);
      setGender(product.gender);
      var y = [];
      product.category.forEach((element) => {
        element.subcategories.forEach((subelement) => (y = [...y, subelement]));
      });
      setSubcategoryList(y);
    }
  }, [dispatch, product, productId, props.history, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Ubacite fotografije");
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          images,
          category,
          description,
          colors: colors,
          countInStock: 0,
          gender,
        })
      );
    }
  };
  const selectedColorHandler = ({ e, color }) => {
    switch (e.detail) {
      case 1:
        setCurrentName(color.name);
        setCurrentSize(color.size);
        break;
      case 2:
        let x = colors;
        let index = colors.indexOf(color);
        x.splice(index, 1);
        setColors([...x]);
        setCurrentName("");
        break;
      default:
        alert("Error occured");
    }
  };

  const newColorHandler = () => {
    let flag = 0;
    colors.forEach((item) => {
      if (item.name === colorName) {
        flag = 1;
      }
    });
    if (flag === 0) {
      if (type === "shirt") {
        //pants other
        colors.push({ name: colorName, size: x });
        setCurrentSize(x);
        setCurrentName(colorName);
      } else if (type === "pants") {
        colors.push({ name: colorName, size: y });
        setCurrentSize(y);
        setCurrentName(colorName);
      } else {
        colors.push({
          name: colorName,
          size: [
            {
              size: `${t("quantity")}`,
              quantity: 0,
            },
          ],
        });
        setCurrentSize([
          {
            size: `${t("quantity")}`,
            quantity: 0,
          },
        ]);
        setCurrentName(colorName);
      }
    }
  };
  const handleDeleteImage = (event, reqItem) => {
    event.preventDefault();
    setImages(images.filter((item) => reqItem !== item));
  };
  console.log(product);
  return (
    <div>
      <form action="" onSubmit={submitHandler} className="form">
        <div>
          <h1>
            {t("edit_product")} {productId}
          </h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">{t("name")}</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">{t("price")}</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>{t("sizes")}</label>
              <div>
                <input
                  type="radio"
                  id="shirt"
                  value="shirt"
                  checked={type === "shirt"}
                  name="types"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="shirt">XS-XL</label>
                <input
                  type="radio"
                  id="pants"
                  value="pants"
                  checked={type === "pants"}
                  name="types"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="pants">32-44</label>
                <input
                  type="radio"
                  id="other"
                  value="other"
                  checked={type === "other"}
                  name="types"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="other">{t("no_size")}</label>
              </div>
            </div>
            <div>
              <label>{t("colors")}</label>
              <div>
                {colors.map((color) => (
                  <div
                    style={{ backgroundColor: color.name }}
                    className={`color-box colored-circle ${
                      currentName === color.name ? "success-checkmark" : ""
                    }`}
                    key={color.name}
                    onClick={(e) => {
                      selectedColorHandler({ color, e });
                    }}
                  ></div>
                ))}
              </div>

              <div className="top-1">
                <input
                  type="text"
                  placeholder={t("enter_new_color")}
                  onChange={(e) => setColorName(e.target.value)}
                ></input>
                <button
                  disabled={!colorName.length > 0}
                  type="button"
                  onClick={newColorHandler}
                >
                  {t("add_new_color")}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="images">{t("images")}</label>
              <div className="flex padding-10 align-center">
                {images.map((item) => (
                  <div key={item.name + Math.random()} className="mr-10">
                    <img src={item.name} alt="slika" className="small" />
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteImage(e, item);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Images imagesSetter={setImages} images={images} colors={colors} />

            <div>
              <label htmlFor="category">{t("gender")}</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  name="genders"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">{t("male")}</label>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  name="genders"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">{t("female")}</label>
                <input
                  type="radio"
                  id="kids"
                  value="kids"
                  checked={gender === "kids"}
                  name="genders"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="kids">{t("kids")}</label>
              </div>
            </div>

            {currentName.length > 2 ? (
              <div>
                <h1>{t("sizes")}</h1>
                <div className="size-container">
                  {currentSize.map((item) => (
                    <div key={item.size}>
                      <div id="sizes">
                        <div>{item.size}</div>
                      </div>
                      <div className="sizes-test">
                        <input
                          id={item.size}
                          value={item.quantity}
                          type="number"
                          onChange={(e) => {
                            let quantity = parseInt(e.target.value);
                            if (quantity >= 0) {
                              item.quantity = parseInt(e.target.value);
                              setCurrentSize([...currentSize]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>Unesite boje za velicine </div>
            )}

            {/* <div> */}
            <label htmlFor="description">{t("category")}</label>
            <div>
              <div className="flex align-center flex-wrap">
                {categorije &&
                  categorije.map((cat) => (
                    <div key={Math.random()}>
                      <input
                        type="checkbox"
                        id={cat}
                        name={cat}
                        value={t(cat.name)}
                        checked={category.find(
                          (item) => item.name === cat.name
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            //add category
                            setCategory([
                              ...category,
                              { name: e.target.value, subcategories: [] },
                            ]);
                          } else {
                            //remove category

                            setCategory(
                              category.filter(
                                (item) =>
                                  item.name.trim() !== e.target.value.trim()
                              )
                            );
                            let index = category.indexOf(e.target.value);
                            category.splice(index, 1);
                          }
                          return "";
                        }}
                      />
                      <label htmlFor={cat}> {t(cat.name)}</label>
                      {category.find((item) => item.name === cat.name) !==
                        undefined &&
                        cat.subcategories.map(
                          (subcategory) =>
                            subcategory.length > 0 && (
                              <div key={subcategory}>
                                {
                                  <>
                                    <input
                                      type="checkbox"
                                      id={subcategory}
                                      value={subcategory}
                                      checked={subcategoryList.find(
                                        (item) => item === subcategory
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSubcategoryList([
                                            ...subcategoryList,
                                            e.target.value,
                                          ]);
                                          //add subcategory to a category
                                          category.forEach((element) => {
                                            if (element.name === cat.name) {
                                              element.subcategories.push(
                                                e.target.value
                                              );
                                            }
                                          });
                                        } else {
                                          //remove subcategory from a category
                                          setSubcategoryList(
                                            subcategoryList.filter(
                                              (item) =>
                                                item.trim() !==
                                                e.target.value.trim()
                                            )
                                          );
                                          category.forEach((element) => {
                                            if (element.name === cat.name) {
                                              let x =
                                                element.subcategories.filter(
                                                  (item) =>
                                                    item.trim() !==
                                                    e.target.value.trim()
                                                );
                                              let temp = [];
                                              //weird way for editing a object
                                              category.forEach((element) => {
                                                if (element.name !== cat.name)
                                                  temp = [...temp, element];
                                                else
                                                  temp = [
                                                    ...temp,
                                                    {
                                                      name: element.name,
                                                      subcategories: x,
                                                    },
                                                  ];
                                              });
                                              setCategory(temp);
                                            }
                                          });
                                          console.log("Unchecked");
                                        }
                                      }}
                                    />
                                    <label htmlFor={subcategory}>
                                      {" "}
                                      {t(subcategory)}
                                    </label>{" "}
                                  </>
                                }
                              </div>
                            )
                        )}
                    </div>
                  ))}
              </div>
            </div>
            {/* {categorije &&
              categorije.map((cat) => (
                <div key={cat.name}>
                  {" "}
                  <div>
                    {category.indexOf(cat.name) !== -1 && (
                      <div>
                        {cat.subcategories.map((subcategory) => (
                          <div>
                            <input
                              type="checkbox"
                              id={subcategory}
                              name={subcategory}
                              value={t(subcategory)}
                            />
                            <label htmlFor={subcategory}>
                              {" "}
                              {t(subcategory)}
                            </label>
                          </div>

                          //      <input
                          //   type="checkbox"
                          //   id={cat}
                          //   name={cat}
                          //   value={t(cat.name)}
                          //   checked={category.indexOf(cat.name) !== -1}
                          //   onChange={(e) => {
                          //     if (e.target.checked) {
                          //       setCategory([...category, e.target.value]);
                          //     } else {
                          //       console.log("category");
                          //       console.log(category);
                          //       console.log("e.target.value");
                          //       console.log(e.target.value);
                          //       setCategory(
                          //         category.filter(
                          //           (item) => item.trim() !== e.target.value.trim()
                          //         )
                          //       );
                          //       let index = category.indexOf(e.target.value);
                          //       category.splice(index, 1);
                          //     }
                          //     return "";
                          //   }}
                          // />
                          // <label htmlFor={cat}> {t(cat.name)}</label>
                        ))} */}
            {/* </div>
                    )}
                  </div>
                </div>
              ))}
            <br></br> */}
            {/* <textarea
                id="description"
                type="text"
                placeholder={t("enter_description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> */}
            <div>
              <button className="primary" type="submit">
                {t("update")}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
