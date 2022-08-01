import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangeEvent from "../customer-address-change.event";

export default class SendLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangeEvent>
{
  handle(event: CustomerAddressChangeEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: 
    rua: ${event.eventData.customer.Address.street} 
    num: ${event.eventData.customer.Address.number} 
    cep: ${event.eventData.customer.Address.zip} 
    cidade: ${event.eventData.customer.Address.city}`); 
  }
}