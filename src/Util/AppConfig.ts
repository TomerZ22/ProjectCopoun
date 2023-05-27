class AppConfig{}

class DevConfig extends AppConfig{
    public authUrl = "http://localhost:8080/auth/"
    public adminUrl = "http://localhost:8080/admin/"
    public companyUrl = "http://localhost:8080/company/"
    public customerUrl = "http://localhost:8080/customer/"
}

class ProductionConfig extends AppConfig{
    public authUrl = "http://localhost:8080/auth/"
    public adminUrl = "http://localhost:8080/admin/"
    public companyUrl = "http://localhost:8080/company/"
    public customerUrl = "http://localhost:8080/customer/"
}

const appConfig = process.env.NODE_ENV === "development" ? new DevConfig() : new ProductionConfig();
export default appConfig;