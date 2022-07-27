import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";

let customer = new Customer("123", "John");
const address = new Address("Rua dois",123,"123", "cidade1")
customer.Address = address;
customer.activate();
