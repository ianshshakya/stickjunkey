import React from "react";
import CategoryCard from "./CategoryCard";
import c1 from "../images/c1.webp";
import c2 from "../images/c2.webp";
import c3 from "../images/c3.webp";
import c4 from "../images/c4.webp";
import c5 from "../images/c5.webp";
import c6 from "../images/c6.webp";
import c7 from "../images/c7.webp";

const Categories = ({scrollY}) => {
  
  const styles = {
    cloud: {
      width: "100%", // Remains unchanged
      minHeight: "120vh", // Increased to 150% of viewport height

      backgroundImage: "linear-gradient(to bottom , #faebf8, #faebf8, #FF758F)",

      padding: "15px",
      position: "relative",
      margin: "0 auto",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      //clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 100%)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      
    },
    categ: {
      fontFamily:' "Boldonse", system- ui',
      fontWeight: "400",
      fontStyle: "normal"
      }
  };
  

return (
  <div style={styles.cloud} className="section" id="category">
    <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center mb-3">
      <div className="h1 fw-2 mb-5 pb-5" style={styles.categ}>CATEGORIES</div>
      <CategoryCard
        width={250}
        height={350}
        sticker={c1}
        title={""}
        nav={"/"}
      />
    </div>
    <div className="container col-12 col-md-8 d-flex flex-column justify-content-center">
      <div className="d-flex flex-wrap justify-content-around my-4">

        <CategoryCard width={200} height={280} sticker={c2} nav={"/"} />
        <CategoryCard width={200} height={280} sticker={c3} title={""} nav={"/"} />
        <CategoryCard width={200} height={280} sticker={c4} title={""} nav={"/"} />

      </div>
      <div className="d-flex flex-wrap justify-content-around my-4">
        <CategoryCard width={200} height={280} sticker={c5} title={""} nav={"/"} />
        <CategoryCard width={200} height={280} sticker={c6} title={""} nav={"/"} />
        <CategoryCard width={200} height={280} sticker={c7} title={""} nav={"/"} />
      </div>
    </div>
  </div>
);
};

export default Categories;