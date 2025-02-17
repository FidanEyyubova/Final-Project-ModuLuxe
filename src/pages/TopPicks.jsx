import React, { useContext } from "react";
import { MyContext } from "../context/MyProvider";
import { Link } from "react-router-dom";

const TopPicks = () => {
  const { product, setProduct } = useContext(MyContext);
  
  const handleColor = (id, color) => {
    setProduct((prev) =>
      prev.map((furn) => {
        if (furn.id === id) {
          const newCheckImg = Object.keys(furn.checkImg).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});

          newCheckImg[color] = true;

          return { ...furn, checkImg: newCheckImg };
        }
        return furn;
      })
    );
  };

  return (
    <div className="top py-5">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-12 py-3">
            <h1>Top Picks</h1>
            <p className="py-2">
              Find a bright ideal to suit your taste with our great selection of
              suspension, floor and table lights.
            </p>
          </div>
        </div>
        <div></div>
        <div className="row mx-3 py-5">

          {product.slice(0, 8).map((el) => (
            <div key={el.id} className="col-lg-3 col-md-4 col-sm-6 col-12 product">
              <div className="image  text-center">
                {Object.keys(el.checkImg).map((color) =>
                  el.checkImg[color] ? (
                    <img key={color} src={el.linkImg[color]} alt={color} />
                  ) : null
                )}
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center py-2">
                <div>
                    <p>{el.title}</p>
                </div>
              <div className="color d-flex gap-2">
                {el.colors?.map((color) => (
                  <p
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      border: el.checkImg[color] ? "1px solid black" : "none",
                    }}
                    onClick={() => handleColor(el.id, color)}
                  ></p>
                ))}
              </div>
              <div>
                    <p><b>${el.price}</b></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-2">
        <Link className="view px-5 py-3" to={"/products"}>View More</Link>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
