import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ width, sticker, title, nav, height }) => {
  const styles = {
    outline: {
      position: "relative",
      width: "12.5rem",
      height: height + 8,
      backgroundColor: "#f7daf2",
      clipPath: "polygon(5% 0, 93% 0, 100% 5%, 100% 93%, 93% 100%, 5% 100%, 0 93%, 0 5%)",
      zIndex: 0,
      transition: "box-shadow 0.3s ease-in-out",
    },
    card: {
      width: width,
      height: height,
      position: "relative",
      zIndex: 1,
      backgroundImage:`url(${sticker})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "transform 0.3s ease-in-out",
    },
    cardIcon: {
      top: "8px",
      right: "14px",
      height: "20px",
      width: "20px",
      backgroundColor: "#f55bad",
      display: "flex", // Make it a flex container
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
    },
  };

  return (
   
     
        <Link to={nav} className="card category rounded-3 d-flex justify-content-center align-items-center" style={styles.card}>

          <div className="card-body">
            <h5 className="card-title text-center fw-bold" style={{ fontFamily: "Georgia", color: "#382437" }}>
              {title}
            </h5>
          </div>
          <div
            className="position-absolute rounded-circle text-center"
            style={styles.cardIcon}
          >
            <i className="fa-solid fa-plus" style={{ color: "white" }}></i>
          </div>
        </Link>
     
  );
};

export default CategoryCard;