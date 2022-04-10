import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../../redux/actions/index";

import "./Searchbar.css";

function Searchbar(props) {
  const dispatch = useDispatch();

  const [nameDog, setnameDog] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setnameDog(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameDog(nameDog));
    setnameDog("");
  };

  return (
    <div className="">
      <section className="searchbar-section">
        <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="search-div">
            <input
              type="text"
              name="q"
              className="search_text"
              placeholder="Search"
              value={nameDog}
              onChange={(e) => handleChange(e)}
             
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default Searchbar;
