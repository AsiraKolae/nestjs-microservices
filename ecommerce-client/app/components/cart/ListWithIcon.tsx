import { useCartStore } from "@/app/store/CartStore";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";

const ListWithIcon: React.FC<{ cartItem: any }> = ({ cartItem }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateAmount, removeFromCart, cartItems, updateNewCart, removeCart } = useCartStore();

  const handleAmountChange = async (amountChange: number) => {
    setIsLoading(true);
    const updatedAmount = cartItem.amount + amountChange;
    if (updatedAmount < 1) {
      handleRemoveFromCart();
    } else {
      updateAmount(cartItem.id, updatedAmount);
      const dataUpdated = prepareData(cartItems, updatedAmount);
      const resApi = await updateNewCart(dataUpdated);
      if (resApi) {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cartItem.id);
    const dataDeleted = prepareDataDelete(cartItems, cartItem.id);
    removeCart(dataDeleted);
  };

  const prepareData = (cartItems: any[], updatedAmount: number) => {
    return {
      "cart_items": cartItems.map(item => ({
        "product_id": item.product.id,
        "amount": (item.id === cartItem.id) ? updatedAmount : item.amount
      }))
    };
  };

  const prepareDataDelete = (cartItems: any[], id: number) => {
    const filteredItems = cartItems.filter((item) => item.id === id);
    const ids = filteredItems.map((item) => item.product.id);
    return {
      "ids": ids
    };
  };

  return (
    <>
      <ListItemSuffix placeholder=''>
        {isLoading ? (
          <div
            className="flex items-center gap-2 rounded-full"
          >
            <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-2 border-t-blue-600" />
          </div>
        ) : (
          <>
            <IconButton
              variant="text"
              color="black"
              className="flex items-center gap-2 rounded-full"
              placeholder=''
              onClick={() => { handleAmountChange(-1) }}
            >
              <MinusIcon strokeWidth={2} className="h-4 w-4" aria-hidden="true" />
            </IconButton>
            <p className="text-bold text-lg">{cartItem.amount}</p>
            <IconButton
              variant="text"
              color="black"
              className="flex items-center gap-2 rounded-full"
              placeholder=''
              onClick={() => handleAmountChange(1)}
            >
              <PlusIcon
                strokeWidth={2}
                className="h-4 w-4"
                aria-hidden="true"
              />
            </IconButton>
          </>
        )}
      </ListItemSuffix>
      <ListItemSuffix placeholder=''>
        {isLoading ? (
          <div
            className="flex items-center gap-2 rounded-full"
          >
            <div className="h-10 w-10 rounded-full" />
          </div>
        ) : (
          <IconButton
            variant="text"
            color="black"
            className="flex items-center gap-2 rounded-full"
            placeholder=''
            onClick={handleRemoveFromCart}
          >
            <TrashIcon
              strokeWidth={1}
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </IconButton>
        )}
      </ListItemSuffix>
    </>
  );
};

export default ListWithIcon;