package com.example.demo.Controllers;

import com.example.demo.Beans.Coupon;
import com.example.demo.Beans.Session;
import com.example.demo.Enums.Category;
import com.example.demo.Exceptions.*;
import com.example.demo.Service.CompanyService;
import com.example.demo.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(path = "/customer")
public class CustomerController extends ClientController{

    @Autowired
    private Map<String, Session> sessionPack;
    @Autowired
    private HttpServletRequest request;

    public CustomerController() {
    }

    public CustomerService getService(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Session session = sessionPack.get(token);
        session.setLastUse(System.currentTimeMillis());
        return (CustomerService) session.getService();
    }

    @PostMapping
    public ResponseEntity<?> purchaseCoupon(@RequestBody Coupon coupon){
        try {
            CustomerService customerService = getService(request);
            try {
                customerService.purchaseCoupon(coupon);
            } catch (CouponExpiresException | CouponNotInStockException e) {
                throw new RuntimeException(e);
            }
            return ResponseEntity.ok("Coupon Purchased");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (CouponAlreadyBoughtException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping(path = "/coupons")
    public ResponseEntity<?> getAllCoupons (){
        CustomerService customerService = getService(request);
        return ResponseEntity.ok(customerService.getAllCoupons());
    }

    @GetMapping(path = "/customersCoupons")
    public ResponseEntity<?> getCustomerCoupons(){
        try {
            CustomerService customerService = getService(request);
            return ResponseEntity.ok(customerService.getCustomerCoupons());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/coupons/{category}")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable Category category){
        try {
            CustomerService customerService = getService(request);
            return ResponseEntity.ok(customerService.getCustomerCoupons(category));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/coupons/{max}")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable double max){
        try {
            CustomerService customerService = getService(request);
            return ResponseEntity.ok(customerService.getCustomerCoupons(max));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/details")
    public ResponseEntity<?> getCustomerDetails(){
        try {
            CustomerService customerService = getService(request);
            return ResponseEntity.ok(customerService.getCustomerDetail());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }
}
