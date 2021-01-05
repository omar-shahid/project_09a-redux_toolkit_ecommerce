import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import QuantitySelector from "./QuantitySelector";
import { cartSlice, itemsSelector } from "../features/cartSlice";

interface Props {
  isHidden: boolean;
  closeFunc: () => void;
}

const CartSide: React.FC<Props> = (props) => {
  const products = useSelector(itemsSelector);

  const dispatch = useDispatch();

  const classes = classnames(
    "h-screen w-screen fixed z-50 top-0 left-0 bg-black bg-opacity-70",
    { hidden: props.isHidden }
  );

  const handleAddQuantity = (id: number) =>
    dispatch(cartSlice.actions.addQuantity(id));
  const handleRemoveQuantity = (id: number) =>
    dispatch(cartSlice.actions.removeQuantity(id));

  return (
    <div className={classes}>
      <div className="w-4/12 right-0 fixed bg-white h-full">
        <div className="bg-gray-700 p-4 flex justify-between">
          <h1 className="text-white text-4xl">Cart</h1>
          <div className="overflow-auto pr-4">
            <i
              onClick={props.closeFunc}
              className="fas fa-times text-3xl text-white hover:text-red-400 cursor-pointer"
            ></i>
          </div>
        </div>
        <div className="p-3">
          {products.map((el) => (
            <div
              className="bg-gray-300 relative p-3 flex items-center justify-between"
              key={el.id}
            >
              <div className="absolute top-0 mr-3 right-0">
                <i
                  className="fas fa-times text-xl hover:text-red-400 cursor-pointer"
                  onClick={() =>
                    dispatch(cartSlice.actions.removeProduct(el.id))
                  }
                ></i>
              </div>
              <div className="max-w-md">
                <h1 className="text-xl font-medium text-gray-900">
                  {el.title}
                </h1>
                <p className="text-lg text-gray-700">${el.price}</p>
              </div>
              <QuantitySelector
                quantity={el.quantity}
                onAddQuantity={() => handleAddQuantity(el.id)}
                onRemoveQuantity={() => handleRemoveQuantity(el.id)}
              />
              <div>
                <h1 className="text-2xl text-gray-800 font-medium">
                  ${el.qtyPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSide;
