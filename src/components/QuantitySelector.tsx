import React, { useState } from "react";

interface Props {
  quantity: number;
  onAddQuantity: () => void;
  onRemoveQuantity: () => void;
}
const QuantitySelector: React.FC<Props> = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const addQuantity = () => {
    props.onAddQuantity();
    setQuantity((p) => p + 1);
  };
  const removeQuantity = () => {
    if (quantity <= 1) return;

    props.onRemoveQuantity();
    setQuantity((p) => p - 1);
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={() => addQuantity()}
        className="bg-gray-700 text-blue-300 p-3 text-xl"
      >
        +
      </button>
      <input
        className="w-4/12 text-center text-xl"
        type="number"
        name="quantity"
        id="d"
        value={quantity}
        readOnly
      />
      <button
        className="bg-gray-700 text-blue-300 p-3 text-xl"
        onClick={() => removeQuantity()}
      >
        -
      </button>
    </div>
  );
};

export default QuantitySelector;
