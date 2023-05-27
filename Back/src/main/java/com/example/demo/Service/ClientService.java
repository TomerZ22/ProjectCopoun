package com.example.demo.Service;

import com.example.demo.Exceptions.IncorrectCredentialsException;
import com.example.demo.Repository.CompanyRepository;
import com.example.demo.Repository.CouponRepository;
import com.example.demo.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ClientService {
    @Autowired
    protected CustomerRepository customerRepo;
    @Autowired
    protected CompanyRepository companyRepo;
    @Autowired
    protected CouponRepository couponRepo;

    public ClientService() {

    }

    public abstract int login(String email, String password) throws IncorrectCredentialsException;
}