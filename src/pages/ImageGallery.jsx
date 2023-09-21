import React, { useState, useEffect } from "react";
import pictureData from "../components/pictures.jsx";
import InputSearch from "../components/search.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast, ToastContainer } from "react-toastify";
import "../styles/imageGallery.css";
import "react-toastify/dist/ReactToastify.css";

function ImageGallery() {
  const [images, setImages] = useState(pictureData);
  const [IsLoading, setIsLoading] = useState(true);
  const [searchByTag, setSearchByTag] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(delay);
    }, 2000);
  }, []);

  useEffect(() => {
    toast.success("Welcome!");
  }, [!IsLoading]);

  const filterImages = (picturesData, item) => {
    return picturesData.filter((image) =>
      image.tags.some((tag) => tag.toLowerCase().includes(item.toLowerCase()))
    );
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const item = Array.from(images);
    const [reorderedImage] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, reorderedImage);

    setImages(item);
  };

  const filteredImages = filterImages(images, searchByTag);
  console.log(filteredImages);

  return (
    <>
      {IsLoading ? (
        <div className="plenty"></div>
      ) : (
        <>
          <h5 className="gal-1">Niyi's gallery</h5>
          <div className="navi">
            <h5 className="gal-2">Niyi's gallery</h5>
            <InputSearch
              searchByTag={searchByTag}
              setSearchByTag={setSearchByTag}
            />
          </div>
          <h3 className="welcome-alert">Welcome to my Gallery</h3>
        
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="gallery">
              {(provided) => (
                <div
                  className="grid"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredImages.map((image, index) => (
                    <Draggable
                      key={image.id}
                      draggableId={image.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="cube">
                            <img className="pics" src={  image.url} alt="Image" />
                            <div className="painting">
                              {image.tags.map((item, index) => (
                                <span key={index} className="tags">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ToastContainer />
          
        </>
      )}
      
    </>
  );
}

export default ImageGallery;
