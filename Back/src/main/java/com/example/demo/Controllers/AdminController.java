package com.example.demo.Controllers;

import com.example.demo.Beans.Company;
import com.example.demo.Beans.Customer;
import com.example.demo.Beans.Session;
import com.example.demo.Exceptions.AlreadyExistsException;
import com.example.demo.Exceptions.CompanyExistsException;
import com.example.demo.Exceptions.CustomerExistsException;
import com.example.demo.Exceptions.NotFoundException;
import com.example.demo.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(path = "/admin")
public class AdminController extends ClientController{

    @Autowired
    private Map<String, Session> sessionPack;
    @Autowired
    private HttpServletRequest request;

    public AdminController() {
    }

    public AdminService getService(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Session session = sessionPack.get(token);
        session.setLastUse(System.currentTimeMillis());
        return (AdminService) session.getService();
    }

    @PostMapping(path = "/company")
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws AlreadyExistsException, CompanyExistsException {
        AdminService adminService = getService(request);
        return ResponseEntity.ok(adminService.addCompany(company));
    }

    @PostMapping(path = "/customer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer){
        try{
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.addCustomer(customer));
        } catch (CustomerExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping(path = "companies")
    public ResponseEntity<?> getAllCompanies(){
        try{
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getAllCompanies());
        } catch (Exception e){
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/company/{id}")
    public ResponseEntity<?> getOneCompany(@PathVariable int id){
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getOneCompany(id));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping(path = "/customers")
    public ResponseEntity<?> getAllCustomers(){
        try {AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getAllCustomers());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getOneCustomer(@PathVariable int id){
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getOneCustomer(id));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping(path = "/company")
    public ResponseEntity<?> updateCompany(@RequestBody Company company){
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.updateCompany(company));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping(path = "/customer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer){
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.updateCustomer(customer));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/company/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable int id){
        try {
            AdminService adminService = getService(request);
            adminService.deleteCompany(id);
            return ResponseEntity.ok("Company deleted");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id){
        try {
            AdminService adminService = getService(request);
            adminService.deleteCustomer(id);
            return ResponseEntity.ok("Customer deleted");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}