package com.example.demo.Controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.Beans.*;
import com.example.demo.Exceptions.IncorrectCredentialsException;
import com.example.demo.Exceptions.LoginErrorException;
import com.example.demo.Exceptions.NotFoundException;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.ClientService;
import com.example.demo.Service.CompanyService;
import com.example.demo.Service.CustomerService;
import com.example.demo.Service.Login.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    private AdminService adminService = new AdminService();
    private final LoginManager loginManager;
    @Autowired
    private Map<String, Session> sessionPack;

    public AuthController(LoginManager loginManager) {
        this.loginManager = loginManager;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Credentials credentials){
        try{
            ClientService service = loginManager.Login(credentials.getEmail(), credentials.getPassword(), credentials.getType());

            String token ="";
            switch (credentials.getType()) {
                case Administrator:
                    token = createToken(new Admin());
                    break;
                case Company:
                    token = createToken(((CompanyService)service).getCompanyDetail());
                    break;
                case Customer:
                    token = createToken(((CustomerService)service).getCustomerDetail());
                    break;
            }
            sessionPack.put(token, new Session(service, token));
            return ResponseEntity.ok(token);
        } catch (IncorrectCredentialsException | NotFoundException | NotFoundException | LoginErrorException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Credentials");
        }
    }

    private String createToken(Client client){
        if(client instanceof Company) {
            Company company = (Company) client;
            return JWT.create()
                    .withIssuer("reem")
                    .withIssuedAt(new Date())
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("email", company.getEmail())
                    .withClaim("type", "COMPANY")
                    .sign(Algorithm.HMAC256("top-secret"));
        }
        else if (client instanceof Customer) {
            Customer customer = (Customer) client;
            return JWT.create()
                    .withIssuer("reem")
                    .withIssuedAt(new Date())
                    .withClaim("id", customer.getId())
                    .withClaim("firstName", customer.getFirstName())
                    .withClaim("lastName", customer.getLastName())
                    .withClaim("email", customer.getEmail())
                    .withClaim("type", "CUSTOMER")
                    .sign(Algorithm.HMAC256("top-secret"));
        }
        else
            return JWT.create()
                    .withIssuer("reem")
                    .withIssuedAt(new Date())
                    .withClaim("email", "admin@admin.com")
                    .withClaim("type", "ADMIN")
                    .sign(Algorithm.HMAC256("top-secret"));
    }
}