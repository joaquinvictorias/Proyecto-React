import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (_id, size) => { },
    clearCart: () => { }
});

function getInitialState() {
    const savedItems = localStorage.getItem("items");
    return savedItems ? { items: JSON.parse(savedItems) } : { items: [] };
};

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item._id === action.item._id && item.size === action.item.size
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = updatedItems[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item._id === action._id && item.size === action.size
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "CLEAR_CART") {
        return { ...state, items: [] };
    }

    return state;
}

function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, null, getInitialState);

    useEffect(function () {
        localStorage.setItem("items", JSON.stringify(cart.items));
    }, [cart.items]);

    function addItem(item) {
        dispatchCartAction({
            type: "ADD_ITEM",
            item
        });
    }

    function removeItem(_id, size) {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            _id,
            size
        });
    }

    function clearCart() {
        dispatchCartAction({
            type: "CLEAR_CART"
        })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
