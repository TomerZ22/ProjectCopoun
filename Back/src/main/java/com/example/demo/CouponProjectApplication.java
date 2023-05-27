package com.example.demo;
import com.example.demo.Beans.Company;
import com.example.demo.Beans.Coupon;
import com.example.demo.Beans.Customer;
import com.example.demo.Enums.Category;
import com.example.demo.Exceptions.*;
import com.example.demo.Repository.CouponRepository;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.CompanyService;
import com.example.demo.Service.CustomerService;
import com.example.demo.Thread.CouponExpirationDailyJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import javax.transaction.Transactional;
import java.sql.Date;

@SpringBootApplication
public class CouponProjectApplication {

@Autowired
static
ConfigurableApplicationContext ctx = SpringApplication.run(CouponProjectApplication.class);

    public static void main(String[] args) throws IncorrectCredentialsException, NotFoundException {
        ConfigurableApplicationContext ctx = SpringApplication.run(CouponProjectApplication.class, args);
        try {
            Thread CouponExpirationDailyJob = new Thread(ctx.getBean(com.example.demo.Thread.CouponExpirationDailyJob.class));
            CouponExpirationDailyJob.start();
            testAdminService();
            testCompanyService();
            testCustomerService();


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
@Transactional
    public static void testAdminService() throws CompanyExistsException, CustomerExistsException, NotFoundException {
        AdminService adminService = ctx.getBean(AdminService.class);
        adminService.login("admin@admin.com","admin");
        Company comp3 = new Company("Gotham3","Gotham3City@gmail.com","1235");
        Company comp4 = new Company("Gotham4","Gotham4City@gmail.com","1236");
        Customer customer1 = new Customer("Tomer","Tzigel","T123@gmail,com","!234");
        Customer customer2 = new Customer("Tomer2","Tzigel","T1234@gmail,com","!2345");
        Coupon coup1 =  new Coupon(comp3.getId(), 10, Category.BEVERAGES,"Your NextSexTape", Date.valueOf("2023-09-09"),Date.valueOf("2023-10-10"),100);
    System.out.println(adminService.getAllCompanies());
       // adminService.addCustomer(customer2);
    //        adminService.deleteCustomer(1);
//        System.out.println(adminService.getOneCompany(3));
//        System.out.println(adminService.getOneCustomer(2));

    }
    @Transactional
    public static void testCompanyService() throws CouponDoesntExistException, NotFoundException, CouponAlreadyBoughtException {
        CompanyService companyService = ctx.getBean(CompanyService.class);
        Company comp3 = new Company("Gotham3","Gotham3City@gmail.com","1235");
        Company comp4 = new Company("Gotham4","Gotham4City@gmail.com","1236");
        Coupon coup1 =  new Coupon(comp3.getId(), 10, Category.BEVERAGES,"Your NextSexTape", Date.valueOf("2023-09-09"),Date.valueOf("2023-10-10"),100);
        Coupon coup2 =  new Coupon(comp3.getId(), 15, Category.BEVERAGES,"Your NextSexTape2", Date.valueOf("2025-09-09"),Date.valueOf("2025-10-10"),200);
        Coupon coup3 =  new Coupon(comp3.getId(), 20, Category.BEVERAGES,"Your NextSexTape3", Date.valueOf("2025-11-09"),Date.valueOf("2025-12-10"),300);
        companyService.login("Gotham4City@gmail.com","1236");
        System.out.println(companyService.getCompanyCoupons());
        System.out.println(companyService.getCompanyCoupons(300));
        companyService.deleteCoupon(9);
        companyService.updateCoupon(companyService.getCompanyCoupon(9));
//        System.out.println(companyService.getCompanyDetail());
//        System.out.println(companyService.getCompanyCoupon(1));
//        System.out.println(companyService.getCompanyCoupons(Category.BEVERAGES));
//        System.out.println(companyService.getCompanyCoupons(100));

    }
    @Transactional
    public static void testCustomerService() throws IncorrectCredentialsException, NotFoundException, CouponExpiresException, CouponNotInStockException, CouponAlreadyBoughtException, CouponDoesntExistException {
        CustomerService customerService = ctx.getBean(CustomerService.class);
        CompanyService companyService = ctx.getBean(CompanyService.class);
        Customer customer2 = new Customer("Tomer2","Tzigel","T1234@gmail,com","!2345");
        Company comp3 = new Company("Gotham3","Gotham3City@gmail.com","1235");
        Company comp4 = new Company("Gotham4","Gotham4City@gmail.com","1236");
        Coupon coup1 =  new Coupon(1, 10, Category.BEVERAGES,"Your NextSexTape", Date.valueOf("2023-09-09"),Date.valueOf("2023-10-10"),100);
        Coupon coup2 =  new Coupon(comp3.getId(), 15, Category.BEVERAGES,"Your NextSexTape2", Date.valueOf("2025-09-09"),Date.valueOf("2025-10-10"),200);
        Coupon coup3 =  new Coupon(comp3.getId(), 20, Category.ELECTRONICS,"Your NextSexTape3", Date.valueOf("2025-11-09"),Date.valueOf("2025-12-10"),300);
        Coupon coup4 =  new Coupon(comp4.getId(), 25, Category.ELECTRONICS,"Your NextSexTape7", Date.valueOf("2030-11-09"),Date.valueOf("2025-12-10"),400);
        customerService.login(customer2.getEmail(),customer2.getPassword());
       // companyService.addCoupon(coup4);
       // customerService.purchaseCoupon(coup4);
//        customerService.getCoupon(2);
//        customerService.getCoupon(1);
//        System.out.println(customerService.getCustomerDetail());
        ;






    }

}