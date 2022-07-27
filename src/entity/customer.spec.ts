import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "joao");
        }).toThrowError("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    })

    it("should change name", () => {
        const customer = new Customer("123", "john");
        customer.changeName("Johny");
        expect(customer.name).toEqual("Johny");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Johny");
        const address = new Address("street", 123, "13", "city");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should desactivate customer", () => {
        const customer = new Customer("123", "Johny");
        customer.desactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw when address is undefined when activate a customer", () => {
        expect(() => {
            const customer = new Customer("123", "Johny");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

});