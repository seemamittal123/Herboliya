import { useSelector } from "react-redux";
import Card from "./Card";
import { HashLoader } from "react-spinners";

const Items = () => {
  const { items, loading } = useSelector((state) => state.shop);
  return (
    <>
      <div className="items">
        <div className="inner-container">
          <div className="item-card">
            {loading ? (
              <div className="spinner">
                <HashLoader color="#7cc242" />
              </div>
            ) : items.length > 0 ? (
              items.map((item) => (
                <Card item={item} key={item._id || item.name} />
              ))
            ) : (
              <h1 className="spinner">No Item</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
