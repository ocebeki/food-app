import React, { useContext } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext'
import PropTypes from 'prop-types';
import uniqid from "uniqid";
import Result from '../result/Result'
import Modal from '../modal/Modal'

export default function Results() {
  const { data, isModal, recipeObj } = useContext(MyRecipesContext)

  const isVegeterian = (recipe) => {
    if (recipe.recipe.healthLabels.indexOf("Vegetarian") > -1) {
      return recipe.vegeterian = true
    } else {
      return
    }
  }

  return (
    <div className="results">{console.log(data)}
      <div className="results__wrapper">
        {data.map((recipe, index) => {
          return <Result {...recipe.recipe} recipeObj={recipe} bookmarked={recipe.bookmarked} key={index} id={recipe.id = uniqid()}
            vegeterian={isVegeterian(recipe)}
          />
        })}
      </div>
      {isModal && <Modal isModal={isModal} modalObj={recipeObj} />}
    </div>
  )
}

Results.propTypes = {
  data: PropTypes.array
}








