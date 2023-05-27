package com.example.demo.Controllers;

import com.example.demo.Beans.Coupon;
import com.example.demo.Beans.Session;
import com.example.demo.Enums.Category;
import com.example.demo.Exceptions.AlreadyExistsException;
import com.example.demo.Exceptions.CouponExpiredException;
import com.example.demo.Exceptions.NotFoundException;
import com.example.demo.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
@RestController
@RequestMapping(path = "/company")
public class CompanyController extends ClientController{

    @Autowired
    private Map<String, Session> sessionPack;
    @Autowired
    private HttpServletRequest request;

    public CompanyController() {
    }

    public CompanyService getService(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Session session = sessionPack.get(token);
        session.setLastUse(System.currentTimeMillis());
        return (CompanyService) session.getService();
    }


    @PostMapping
    public ResponseEntity<?> addCoupon (@RequestBody Coupon coupon){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.addCoupon(coupon));
        } catch (AlreadyExistsException | CouponExpiredException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping(path = "/coupons")
    public ResponseEntity<?> getCompanyCoupons(){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getCompanyCoupons());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/coupons/{category}")
    public ResponseEntity<?> getCompanyCoupons(@PathVariable Category category){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getCompanyCoupons(category));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/coupons/{max}")
    public ResponseEntity<?> getCompanyCoupons(@PathVariable double max){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getCompanyCoupons(max));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @GetMapping(path = "/details")
    public ResponseEntity<?> getCompanyDetails(){
        try{
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getCompanyDetail());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Oops, something went wrong\nplease try again later");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.updateCoupon(coupon));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable int id){
        try {
            CompanyService companyService = getService(request);
            companyService.deleteCoupon(id);
            return ResponseEntity.ok("Coupon deleted");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

