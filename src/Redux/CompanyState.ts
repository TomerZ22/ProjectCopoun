import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel"

export class CompanyState{
    public companies: CompanyModel[] = [];
}

export enum CompanyActionType{
    FetchCompanies, AddCompany, EditCompany, DeleteCompany
}

export interface CompanyAction{
    type: CompanyActionType;
    payload: any;
}

export function createAddCompanyAction(company: CompanyModel){
    return {type: CompanyActionType.AddCompany, payload: company};
}

export function createFetchCompaniesAction(companies: CompanyModel[]){
    return {type: CompanyActionType.FetchCompanies, payload: companies};
}

export function createUpdateCompanyAction(company: CompanyModel){
    return {type: CompanyActionType.EditCompany, payload: company};
}

export function createDeleteCompanyAction(id: number){
    return {type: CompanyActionType.DeleteCompany, payload: id};
}

export function CompanyReducer(currentState : CompanyState = new CompanyState(), action: CompanyAction){
    const newState = {...currentState};

    switch(action.type){
        case CompanyActionType.AddCompany:
            newState.companies.push(action.payload);
            break;

        case CompanyActionType.FetchCompanies:
            newState.companies = action.payload;
            break;

        case CompanyActionType.EditCompany:
            const indexToEdit = newState.companies.findIndex(c => c.id === action.payload.id);
            if(indexToEdit > 0)
                newState.companies[indexToEdit] = action.payload;
            break;

        case CompanyActionType.DeleteCompany:
            const indexToDelete = newState.companies.findIndex(c => c.id === action.payload.id);
            if(indexToDelete > 0)
                newState.companies.splice(indexToDelete, 1);
            break;
        
    }
    return newState;
}

export const companyStore = createStore(CompanyReducer);