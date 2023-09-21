import React from "react";


function InputSearch({ searchByTag, setSearchByTag }) {
  const handleSearch = (e) => {
    setSearchByTag(e.target.value);
  };

  return (
    <>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search by tag.."
          value={searchByTag}
          onChange={handleSearch}
          className="searching"
        />
      </form>
    </>
  );
}

export default InputSearch;