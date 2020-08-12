import React, { createContext, useState, useEffect } from "react";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [likeArr, setLikeArr] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    label: "",
    healthLabels: "",
    ingredients: "",
    yield: "",
    totalNutrients: "",
  });
  const [isBackground, setIsBackground] = useState(true);
  const [firstSearch, setFirstSearch] = useState(false);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setFirstSearch(true);
  };

  const deleteLike = (obj) => {
    setLikeArr(likeArr.filter((item) => item.id !== obj.id));
    obj.bookmarked = false;
  };

  const sortByProteins = () => {
    setData(data.slice().sort((a, b) => (a.proteins < b.proteins ? 1 : -1)));
  };

  const sortByCarbs = () => {
    setData(data.slice().sort((a, b) => (a.carbs < b.carbs ? 1 : -1)));
  };

  const sortByFat = () => {
    setData(data.slice().sort((a, b) => (a.fat < b.fat ? 1 : -1)));
  };

  const openModal = (id) => {
    const item = data.filter((recipe) => recipe.id === id);
    setModalObj({
      label: item[0].recipe.label,
      totalNutrients: item[0].recipe.totalNutrients,
      healthLabels: item[0].recipe.healthLabels,
      ingredients: item[0].recipe.ingredientLines,
      yield: item[0].recipe.yield,
    });
    document.body.classList.add("modal-open");
    setIsModal(true);
  };

  const closeModal = (e) => {
    if (e.target.getAttribute("data-type") !== "close") return;
    document.body.classList.remove("modal-open");
    setIsModal(false);
  };
  const getProteins = (recipe) => {
    return (recipe.proteins = parseInt(
      recipe.recipe.totalNutrients.PROCNT.quantity,
      10
    ));
  };
  const getCarbs = (recipe) => {
    return (recipe.carbs = parseInt(
      recipe.recipe.totalNutrients.CHOCDF.quantity,
      10
    ));
  };
  const getFat = (recipe) => {
    return (recipe.fat = parseInt(
      recipe.recipe.totalNutrients.FAT.quantity,
      10
    ));
  };
  const getRecipes = async () => {
    const id = process.env.REACT_APP_API_ID;
    const key = process.env.REACT_APP_API_KEY;
    const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`;
    setIsLoading(true);
    try {
      const response = await fetch(searchUrl);
      const json = await response.json();
      const { hits } = json;
      if (response.status === 200) {
        hits.map((recipe) => {
          return getProteins(recipe), getCarbs(recipe), getFat(recipe);
        });
        // setInStorage("list", hits);
        setData(hits);
        setIsLoading(false);
        setIsBackground(false);
        // deleteFromStorage("liked");
      }
    } catch (err) {
      console.log(err);
    }
    console.log("fetching", data);
  };

  useEffect(() => {
    if (query) getRecipes();
  }, [query]);

  return (
    <RecipesContext.Provider
      value={{
        data,
        search,
        query,
        likeArr,
        isModal,
        modalObj,
        isLoading,
        firstSearch,
        isBackground,
        onChange: onChange,
        onSubmit: onSubmit,
        deleteLike: deleteLike,
        openModal: openModal,
        closeModal: closeModal,
        sortByProteins: sortByProteins,
        sortByCarbs: sortByCarbs,
        sortByFat: sortByFat,
        setFirstSearch: setFirstSearch,
        setIsBackground,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
