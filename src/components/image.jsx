import React from "react";

function Details({ data }) {
    console.log("Data:", data); 
  if (!data) {
    // Handle the case where data is not defined, e.g., by rendering a loading indicator or an error message.
    return null;
  }

  const { url, tags } = data;

  return (
    <>
      <div className="cube">
        <img className="pics" src={url} alt="Image" />
        <div className="painting">
          {tags.map((item, index) => (
            <span key={index} className="tags">
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Details;
