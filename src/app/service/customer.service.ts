export class CustomerService {
  customer: {name: string, email: string} = {name: "Bhanuka" , email:"bhanuka152@gmail.com"};

  getName(){
    console.log(this.customer.name);
  }
}
