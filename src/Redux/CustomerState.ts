import { createStore } from "redux";
import CustomerModel from "../Models/CustomerModel";

export class CustomerState{
    public customers: CustomerModel[] = [];
}

export enum CustomerActionType{
    FetchCustomers, AddCustomer, EditCustomer, DeleteCustomer
}

export interface CustomerAction{
    type: CustomerActionType;
    payload: any;
}

export function createAddCustomerAction(customer: CustomerModel){
    return {type: CustomerActionType.AddCustomer, payload: customer};
}

export function createFetchCustomersAction(customers: CustomerModel[]){
    return {type: CustomerActionType.FetchCustomers, payload: customers};
}

export function createEditCustomerAction(customer: CustomerModel){
    return {type: CustomerActionType.EditCustomer, payload: customer};
}

export function createDeleteCustomerAction(id: number){
    return {type: CustomerActionType.DeleteCustomer, payload: id};
}

export function customerReducer(cusrrentState : CustomerState = new CustomerState(), action: CustomerAction){
    const newState = {...cusrrentState};

    switch(action.type){
        case CustomerActionType.AddCustomer:
            newState.customers.push(action.payload);
            break;

        case CustomerActionType.FetchCustomers:
            newState.customers = action.payload;
            break;

        case CustomerActionType.EditCustomer:
            const indexToEdit = newState.customers.findIndex(c => c.id === action.payload.id);
            if(indexToEdit > 0)
                newState.customers[indexToEdit] = action.payload;
            break;

        case CustomerActionType.DeleteCustomer:
            const indexToDelete = newState.customers.findIndex(c => c.id === action.payload.id);
            if(indexToDelete > 0)
                newState.customers.splice(indexToDelete, 1);
            break;
    }
    return newState;
}

export const customerStore = createStore(customerReducer);