export class CouponModel{
    id?: number;
    title: string;
    amount: number;
    category: string;
    companyId: number;
    description: string;
    startDate: Date;
    endDate: Date;
    image: FileList | string;
    price: number;

    constructor(id:number, title: string, amount: number, category: string, companyId: number, description:
        string, startDate: Date, endDate: Date, image: FileList | string, price: number){
            this.id = id
            this.title = title
            this.amount = amount
            this.category = category
            this.companyId = companyId
            this.description = description
            this.startDate = startDate
            this.endDate = endDate
            this.image = image
            this.price = price
            
        }
}