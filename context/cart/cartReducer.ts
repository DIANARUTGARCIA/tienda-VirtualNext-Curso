import { ICartProduct, ShippingAddress } from '../../interfaces';
import { CartState } from './';


type CartActionType =
   | { type: 'Cart - LoadCart from cookies I storage', payload: ICartProduct[] }
   | { type: 'Cart - Add Product', payload: ICartProduct[] }
   | { type: 'Cart - Change cart canti', payload: ICartProduct }
   | { type: 'Cart - Remove product in cart', payload: ICartProduct }
   | { type: 'Cart - LoadAddress from Cookies', payload: ShippingAddress }
   | { type: 'Cart - Update Address', payload: ShippingAddress }
   | { type: 'Cart - Order complete' }
   | {
      type: '[Cart] - Update order summary',
      payload: {
         numberOfItems: number;
         subTotal: number;
         tax: number;
         total: number;
      }
   }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

   switch (action.type) {
      case 'Cart - LoadCart from cookies I storage':
         return {
            ...state,
            isLoaded: true,
            cart: [...action.payload]
         }
      case 'Cart - Add Product':
         return {
            ...state,
            cart: [...action.payload]
         }

      case 'Cart - Change cart canti':
         return {
            ...state,
            cart: state.cart.map(product => {
               if (product._id !== action.payload._id) return product;
               if (product.size !== action.payload.size) return product;
               return action.payload;
            })
         }
      case 'Cart - Remove product in cart':
         return {
            ...state,
            cart: state.cart.filter(product => {
               if (product._id === action.payload._id && product.size === action.payload.size) {
                  return false;
               }
               return true;
            })
         }
      case '[Cart] - Update order summary':
         return {
            ...state,
            ...action.payload
         }
      case 'Cart - Update Address':
      case 'Cart - LoadAddress from Cookies':
         return {
            ...state,
            shippingAddress: action.payload
         }
      case 'Cart - Order complete':
         return {
            ...state,
            cart: [],
            numberOfItems: 0,
            subTotal: 0,
            tax: 0,
            total: 0
         }
      default:
         return state;
   }

}