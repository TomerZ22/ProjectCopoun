package com.example.demo.Service.Login;

import com.example.demo.Enums.ClientType;
import com.example.demo.Exceptions.IncorrectCredentialsException;
import com.example.demo.Exceptions.LoginErrorException;
import com.example.demo.Exceptions.NotFoundException;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.ClientService;
import com.example.demo.Service.CompanyService;
import com.example.demo.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
@Service
public class LoginManager {
    @Autowired
    AdminService adminService;
    @Autowired
    CompanyService companyService;
    @Autowired
    CustomerService customerService;

    public LoginManager() {
    }

    /**checks client type and tries to log in with it and given email and password
     * @param email email of the requested user
     * @param password password of the requested user
     * @param clientType client type of the requested user (Administrator/Company/CUSTOMER)
     * @return a service of the requested Administrator/Company/CUSTOMER
     * @throws IncorrectCredentialsException incorrect email or password
     * @throws NotFoundException unknown client type
     */
    public ClientService Login(String email, String password, ClientType clientType)
            throws IncorrectCredentialsException, NotFoundException, LoginErrorException {
        switch (clientType){

            case Administrator:
                AdminService adminService = new AdminService();
                if (email.equals("admin@admin.com")  && password.equals("admin")) {
                    return adminService;
                }
                else
                    throw new LoginErrorException("Your email or password isn't valid");

            case Company:
                if(companyService.login(email, password) > 0) {
                    return companyService;
                }
                else throw new IncorrectCredentialsException();

            case Customer:
                if(customerService.login(email, password) > 0){
                    return customerService;
                }
                else throw new IncorrectCredentialsException();
        }
        throw new NotFoundException("Unknown Client Type");
    }
}