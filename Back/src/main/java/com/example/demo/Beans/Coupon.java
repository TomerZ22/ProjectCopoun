package com.example.demo.Beans;

import com.example.demo.Enums.Category;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table (name = "Coupons")
public class Coupon {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private int companyId;
    private int amount;
    private Category category;
    private String title, description, image;
    private Date startDate, endDate;
    private double price;
    @ManyToMany (mappedBy = "coupons", fetch = FetchType.LAZY)
    private List<Customer> customers;

    public Coupon() {
    }

    public Coupon(int companyId, int amount, Category category, String title, Date startDate, Date endDate, double price) {
        this.companyId = companyId;
        this.amount = amount;
        this.category = category;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }

    //GETTERS
    public int getId() {
        return id;
    }

    public int getCompanyId() {
        return companyId;
    }

    public int getAmount() {
        return amount;
    }

    public Category getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public double getPrice() {
        return price;
    }

    //SETTERS
    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    @Override
    public String toString() {
        return "Coupon's id: " + id +
                ", Company Id: " + companyId +
                ", Category: " + category +
                ", Title: " + title+
                ", Description: " + description+
                ", Start Date: " + startDate.toString() +
                ", End Date: " + endDate.toString() +
                ", Amount: " + amount +
                ", Price: " + price +
                ", Image: " + image;
    }
}
