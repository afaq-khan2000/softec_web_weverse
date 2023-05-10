import React from "react";
import { Favorites } from "../components/favorite";

function FavoritesPage(props) {
  return (
    <div className="paddingX background-dark pb-10 w-100 mx-auto pt-10">
      <Favorites />
    </div>
  );
}

export default FavoritesPage;
