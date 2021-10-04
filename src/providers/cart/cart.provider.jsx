import React from "react";
import { 
  addItemToCart, 
  removeItemFromCart, 
  filterItemFromCart, 
  getCartItemsCount,
  getCartTotal 
} from "./cart.utils";

export const CartContext = React.createContext({
  hidden: true,
  cartItems: [],
  cartItemsCount: 0,
  total: 0,
  toggleHidden: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {}
})

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = React.useState(true)
  const [cartItems, setCartItems] = React.useState([])
  const [cartItemsCount, setCartItemsCount] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  const toggleHidden = () => setHidden(!hidden)
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item))
  const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item))
  const clearItemFromCart = (item) => setCartItems(filterItemFromCart(cartItems, item))

  React.useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
    setTotal(getCartTotal(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        hidden,
        cartItems,
        cartItemsCount,
        total,
        toggleHidden,
        addItem,
        removeItem,
        clearItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider