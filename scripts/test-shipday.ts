import OrderInfoRequest from 'shipday/integration/order/request/order.info.request.js';
import OrderItem from 'shipday/integration/order/request/order.item.js';

async function testShipday() {
    console.log('Testing Shipday Integration with Classes (ESM)...');
    try {
        // @ts-ignore
        const item = new OrderItem('Test Item', 100, 1);
        console.log('Item request body:', item.getRequestBody());

        // @ts-ignore
        const request = new OrderInfoRequest(
            'TEST-123', 'John Doe', '123 St', 'john@example.com', '123456789',
            'Restaurant', '456 St'
        );
        console.log('Request request body:', request.getRequestBody());
        console.log('Success - Classes are working!');
    } catch (e) {
        console.error('Import/Usage failed:', e);
    }
}

testShipday();
