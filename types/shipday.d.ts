declare module 'shipday' {
    export default class Shipday {
        constructor(apiKey: string, timeout?: number);
        orderService: {
            insertOrder(orderInfo: unknown): Promise<{ orderId: number;[key: string]: unknown }>;
            getOrderDetails(orderId: string): Promise<Record<string, unknown>>;
        };
    }
}

declare module 'shipday/integration/order/request/order.info.request.js' {
    export default class OrderInfoRequest {
        constructor(
            orderNumber: string,
            customerName: string,
            customerAddress: string,
            customerEmail: string,
            customerPhoneNumber: string,
            restaurantName: string,
            restaurantAddress: string
        );
        setRestaurantPhoneNumber(phone: string): void;
        setTotalOrderCost(orderCost: number): void;
        setDeliveryInstruction(deliveryInstruction: string): void;
        setOrderItems(orderItems: unknown[]): void;
        getRequestBody(): Record<string, unknown>;
    }
}

declare module 'shipday/integration/order/request/order.item.js' {
    export default class OrderItem {
        constructor(name: string, unitPrice: number, quantity: number, addOns?: unknown[], detail?: string);
        getRequestBody(): Record<string, unknown>;
    }
}
