import EventDispatcherInterface from "./event-dispatcher.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface{
    notify(event: eventInterface): void {
        throw new Error("Method not implemented.");
    }
    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        throw new Error("Method not implemented.");
    }
    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        throw new Error("Method not implemented.");
    }
    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }
    
}