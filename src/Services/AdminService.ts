import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import { companyStore, createAddCompanyAction, createDeleteCompanyAction, createFetchCompaniesAction, createUpdateCompanyAction } from "../Redux/CompanyState";
import { customerStore, createAddCustomerAction, createFetchCustomersAction, createEditCustomerAction, createDeleteCustomerAction } from "../Redux/CustomerState";
import appConfig from "../Util/AppConfig";

class AdminService{
    public async addCompany(company:CompanyModel){
        const newCompany = (await axios.post<CompanyModel>(appConfig.adminUrl + "company", company)).data;
        companyStore.dispatch(createAddCompanyAction(newCompany));
    }

    public async addCustomer(customer:CustomerModel){
        const newCustomer = (await axios.post<CustomerModel>(appConfig.adminUrl + "customer", customer)).data;
        customerStore.dispatch(createAddCustomerAction(newCustomer));
    }

    public async getAllCompanies(){
        if(companyStore.getState().companies.length === 0){
            const companies = (await axios.get<CompanyModel[]>(appConfig.adminUrl + "companies")).data
            companyStore.dispatch(createFetchCompaniesAction(companies))
            return companies
        } else return companyStore.getState().companies
    }

    public async getOneCompany(id:number){
        if(companyStore.getState().companies.length === 0)
            await this.getAllCompanies()
        const company = companyStore.getState().companies.find(c => c.id === id);
        if(typeof company === "undefined")
            throw new Error ("COMPANY NOT FOUND")
        return company
    }

    public async getAllCustomers(){
        if(customerStore.getState().customers.length === 0){
            const customers = (await axios.get<CustomerModel[]>(appConfig.adminUrl + "customers")).data
            customerStore.dispatch(createFetchCustomersAction(customers))
            return customers
        } return customerStore.getState().customers
    }

    public async getOneCustomer(id:number){
        if(customerStore.getState().customers.length === 0)
            await this.getAllCustomers()
        const customer = customerStore.getState().customers.find(c=> c.id === id)
        if(typeof customer === "undefined")
            throw new Error ("CUSTOMER NOT FOUND")
        return customer
    }

    public async updateCompany(company:CompanyModel){
        const newCompany = (await axios.put<CompanyModel>(appConfig.adminUrl + "company/", company)).data
        companyStore.dispatch(createUpdateCompanyAction(newCompany))
        return newCompany
    }

    public async updateCustomer(customer:CustomerModel){
        const newCustomer = (await axios.put<CustomerModel>(appConfig.adminUrl + "customer/", customer)).data
        customerStore.dispatch(createEditCustomerAction(newCustomer))
        return newCustomer
    }

    public async deleteCompany(id:number){
        companyStore.dispatch(createDeleteCompanyAction(id))
        const response = (await axios.delete<string>(appConfig.adminUrl + "company/" + id)).data;
        return response
    }

    public async deleteCustomer(id:number){
        const response =  (await axios.delete<string>(appConfig.adminUrl + "customer/" + id)).data;
        customerStore.dispatch(createDeleteCustomerAction(id))
        return response
    }
}

const adminService = new AdminService();
export default adminService;