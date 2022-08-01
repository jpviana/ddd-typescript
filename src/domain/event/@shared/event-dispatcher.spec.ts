import SendLog2WhenCustomerIsCreatedHandler from "../customer/handler/send-log2-when-customer-is-created.handler";
import SendLog1WhenCustomerIsCreatedHandler from "../customer/handler/send-log1-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerAddressChangeEvent from "../customer/customer-address-change.event";
import Customer from "../../entity/customer";
import Address from "../../entity/address";
import SendLogWhenCustomerAddressIsChangedHandler from "../customer/handler/send-log-when-customer-address-is-changed.handler";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should register an event customer handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister an event customer handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event customer handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event customer handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendLog2WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should register an event customer change address handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerAddressIsChangedHandler();

    eventDispatcher.register("CustomerAddressChangeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event customer change address handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerAddressIsChangedHandler();

    eventDispatcher.register("CustomerAddressChangeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChangeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event customer change address handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerAddressIsChangedHandler();

    eventDispatcher.register("CustomerAddressChangeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"]
    ).toBeUndefined();
  });

  it("should notify all event customer change address handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerAddressChangeEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
    ).toMatchObject(eventHandler1);

    const address =  new Address("Rua",123,"38700000","Rio de Janeiro")
    let customer = new Customer("1","customer 1")
    customer.Address = address;

    const newAddress =  new Address("Rua 1",1234,"38700001","Belo Horizonte")

    customer.changeAddress(newAddress);
    const customerAddressChangeEvent = new CustomerAddressChangeEvent({
      customer
    });

    eventDispatcher.notify(customerAddressChangeEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
  });

});