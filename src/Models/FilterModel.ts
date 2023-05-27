class FilterModel{
    public category? : string = "ALL"
    public maxPrice : number

    constructor(category : string, maxPrice : number){
        this.category = category
        this.maxPrice = maxPrice
    }
}

export default FilterModel