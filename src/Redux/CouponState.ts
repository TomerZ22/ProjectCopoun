import { createStore } from "redux";
import { CouponModel } from "../Models/CouponModel";

export class CouponState{
    public coupons: CouponModel[] = [];
}

export enum CouponActionType{
    FetchCoupons, AddCoupon, EditCoupon, DeleteCoupon
}

export interface CouponAction{
    type: CouponActionType;
    payload: any;
}

export function createAddCouponAction(coupon: CouponModel){
    return {type: CouponActionType.AddCoupon, payload: coupon};
}

export function createFetchCouponsAction(coupons: CouponModel[]){
    return {type: CouponActionType.FetchCoupons, payload: coupons};
}

export function createEditCouponAction(coupon: CouponModel){
    return {type: CouponActionType.EditCoupon, payload: coupon};
}

export function createDeleteCouponAction(id: number){
    return {type: CouponActionType.DeleteCoupon, payload: id};
}

export function couponReducer(currentState = new CouponState(), action: CouponAction){
    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.AddCoupon:
            newState.coupons.push(action.payload);
            break;

        case CouponActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CouponActionType.EditCoupon:
            const indexToEdit = newState.coupons.findIndex(c => c.id === action.payload.id);
            if(indexToEdit > 0)
                newState.coupons[indexToEdit] = action.payload;
            break;

        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload.id);
            if(indexToDelete > 0)
                newState.coupons.splice(indexToDelete, 1);
            break;
    }
    return newState;
}

export const couponStore = createStore(couponReducer);