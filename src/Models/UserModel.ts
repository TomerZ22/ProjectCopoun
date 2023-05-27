export class UserModel{
    id: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    type: string;

    constructor(id:number, name:string, firstName:string, lastName:string, email:string, type:string){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
    }
}
export default UserModel;