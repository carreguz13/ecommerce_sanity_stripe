import React, {createContext, useContext, useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'

const Context = createContext()


export const StateContext = ({children}) => {
const [showCart, setshowCart] = useState(false)
const [cartItems, setcartItems] = useState([])
const [totalPrice, settotalPrice] = useState(0)
const [totalQuantities, settotalQuantities] = useState(0)
const [qty, setqty] = useState(1)

let  foundProduct;
let index;


//Add to Cart function//////////////
const AddToCart = (product, quantity) => {

    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    settotalPrice((prevtotalPrice) => prevtotalPrice + product.price * quantity)
    settotalQuantities((prevtotalQuantities) => prevtotalQuantities + quantity)

    //this is gonna happen if we try to add an item that is already in the cart//////////////////////////////////////////////////////
    if(checkProductInCart) {

       const updateCartItems = cartItems.map((cartProdcuct)=>{
    if(cartProdcuct._id === product._id) return {
        ...cartProdcuct, 
        quantity: cartProdcuct.quantity + quantity
       }
})

setcartItems(updateCartItems)

    }else{
product.quantity = quantity

setcartItems([...cartItems, {...product}])
    }

 toast.success(`${qty} ${product.name} added to the cart.`)

}
//////////////////////////////////////////////////////////




const removeCartItem = (id) => {
    const index = cartItems.findIndex((item) => item._id === id);
  
    if (index === -1) {
      return; // Item not found in the cart, handle this case accordingly
    }
  
    const removedItem = cartItems[index];
    const updatedCartItems = [...cartItems];
  
    // Remove the item from the cartItems array
    updatedCartItems.splice(index, 1);
  
    // Update the total price and total quantities
    settotalPrice((prevTotalPrice) => prevTotalPrice - (removedItem.price * removedItem.quantity));
    settotalQuantities((prevTotalQuantities) => prevTotalQuantities - removedItem.quantity);
  
    // Update the cartItems state
    setcartItems(updatedCartItems);
  };





const toggleCartItemQuantity = (id, value) => {
    const index = cartItems.findIndex((item) => item._id === id);
  
    if (index === -1) {
      return; // Item not found in the cart, handle this case accordingly
    }
  
    const updatedCartItems = [...cartItems];
  
    if (value === 'inc') {
      updatedCartItems[index].quantity += 1;
      settotalPrice((prevTotalPrice) => prevTotalPrice + updatedCartItems[index].price);
      settotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec' && updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      settotalPrice((prevTotalPrice) => prevTotalPrice - updatedCartItems[index].price);
      settotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  
    setcartItems(updatedCartItems);
  };





//selector of quantity in product detail page//////////////
const decreaseqty = ()=>{
     setqty((prevqty)=>prevqty -1)
    if(qty === 1){
        setqty(1)
    }
}

const increaseqty = ()=>{
setqty((prevqty)=> prevqty + 1)
    }
//////////////////////////////////////////////////////////
  
return (
    //we'll be able to access to all this values states from absolutely every component, to make that happen after we put the values in te Context.provider down below, we need to go to _app.js and wrap everything inside <StateContext>
    <Context.Provider value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        decreaseqty,
        increaseqty,
        AddToCart,
        showCart,
        setshowCart,
        toggleCartItemQuantity,
        removeCartItem,
        setcartItems,
        settotalPrice,
        settotalQuantities
      
    }} >
        {children}
    </Context.Provider>
) 
}


export const useStateContext = () => useContext(Context)
