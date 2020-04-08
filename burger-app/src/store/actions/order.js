import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const burgerPurchaseSuccess = (id, orderData) =>{

  return {
    type: actionTypes.BURGER_PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const burgerPurchaseFailed = (error) =>{
  return {
    type: actionTypes.BURGER_PURCHASE_FAILED,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.BURGER_PURCHASE_START
  }
}

export const burgerPurchase = ( token, orderData ) =>{
  return dispatch => { 
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
    .then(res => {
      dispatch(burgerPurchaseSuccess(res.data.name, orderData));
    })
    .catch(err => {
      dispatch(burgerPurchaseFailed(err));
    });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
    .then(res => {
      const fetchedOrders = [];
      for(let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFailed());
    });
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders
  }
};

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED
  }
};