import React, { useRef, useEffect, forwardRef } from "react";
import Loader from "react-js-loader"
const AddIImage = forwardRef((props, ref) => {
  const childref = useRef(null);
  const inputRef = useRef(null);
  const CloseDivs = (event) => {
    const parentref = ref.current;
    if (
      childref.current &&
      parentref &&
      !childref.current.contains(event.target) &&
      !parentref.contains(event.target)
    ) {
      props.func();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseup", CloseDivs);
    return () => {
      document.removeEventListener("mouseup", CloseDivs);
    };
  }, [ref, props]);
  const handleAddImageClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const Image = event.target.files[0];
    if (Image) {
      const reader = new FileReader();
      reader.readAsDataURL(Image);
      reader.onload = () => {
        props.AddImage(reader.result);
      };
    }
  };
  return (
    <div className="Add-Image-Container" ref={childref}>
      {!props.Loading&&
      <>
      <div className="Add-Image-Div">
        <label
          className="custom-file-input-label"
          onClick={handleAddImageClick}
        >
          Add Image
        </label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div className="Add-Close-Div">Delete Image</div>
      </>}
      {props.Loading&&<div className="Spinner-Class3"> <Loader
            type="spinner-cub"
            color="red"
            // style={{ position:"absolute", top:"2.9rem"}}
           
            // top="2.9rem"
            bgColor="red"
            // title={"spinner-cub"}
            size={50}
          ></Loader></div>}
   
    </div>
  );
});

export default AddIImage;
