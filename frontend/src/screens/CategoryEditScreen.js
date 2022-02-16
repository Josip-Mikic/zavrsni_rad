import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  listCategories,
} from "../actions/productActions";

export default function CategoryEditScreen() {
  const categories = useSelector((state) => state.categoryList.categories);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubcategory, setSelectedSubcategory] = useState();
  const [editCheck, setEditCheck] = useState(false);
  const [editText, setEditText] = useState(false);
  const [newCategory, setNewCategory] = useState();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const addHandler = (e) => {
    e.preventDefault();

    dispatch(addCategory(newCategory));
  };
  const editSubcategoryHandler = () => {
    dispatch(editCategory(editText, selectedCategory, selectedSubcategory));
  };
  console.log(editText);
  return (
    <div className="flex  row align-baseline justify-around">
      <div>
        <h2> CATEGORIES</h2>

        {categories !== undefined &&
          categories.map((item) => (
            <div key={item._id}>
              <div id="sizes">
                <div
                  onClick={(e) => {
                    setSelectedCategory(
                      categories.find(
                        (element) => element.name === e.target.innerText
                      )
                    );
                  }}
                >
                  {item.name}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        {selectedCategory && <h2>SELECTED SUBCATEGORIES</h2>}

        {selectedCategory &&
          selectedCategory.subcategories.map((subcategory) => (
            <div
              key={subcategory + Date.now()}
              onClick={(e) => {
                setSelectedSubcategory(e.target.innerText);
              }}
            >
              {subcategory}
            </div>
          ))}
        {selectedCategory && (
          <h2>
            Add New Subcategory To :{" "}
            {selectedCategory && <>{selectedCategory.name}</>}
          </h2>
        )}

        {selectedCategory && (
          <>
            <input
              type="text"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={addHandler}>Add</button>{" "}
          </>
        )}
      </div>

      <div>
        <div className="flex">
          <h2>Add New Category:</h2>
          <input type="text" onChange={(e) => setNewCategory(e.target.value)} />
          <button onClick={addHandler}>Add</button>
        </div>

        <div>
          {selectedSubcategory && (
            <div>
              <h2>What to do with {selectedSubcategory}</h2>
              <button>Delete</button>
              <button onClick={() => setEditCheck(!editCheck)}>Edit</button>
              {editCheck && (
                <>
                  <input
                    type="text"
                    onChange={(e) => setEditText(e.target.value)}
                  ></input>
                  <button onClick={() => editSubcategoryHandler()}>Edit</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
