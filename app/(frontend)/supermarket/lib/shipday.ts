import Shipday from 'shipday';
import OrderInfoRequest from 'shipday/integration/order/request/order.info.request.js';
import OrderItem from 'shipday/integration/order/request/order.item.js';

export interface ShipdayConfig {
  apiKey: string;
}

export interface DeliveryTask {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  orderValue: number;
  deliveryInstructions?: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface ShipdayDelivery {
  orderId: string;
  status: string;
  trackingUrl?: string;
}

export class ShipdayService {
  private client: Shipday;
  private pickupDetails = {
    name: 'Prixair Supermarket',
    address: 'Plot 688, Markus Kangye Blvd, Off Oladipo Diya Way, Gaduwa, Abuja.',
    phone: '08181888892'
  };

  constructor(config: ShipdayConfig) {
    this.client = new Shipday(config.apiKey, 10000);
  }

  async createDelivery(task: DeliveryTask): Promise<ShipdayDelivery> {
    console.log('Creating Shipday delivery for order:', task.orderNumber);

    try {
      const orderInfoRequest = new OrderInfoRequest(
        task.orderNumber,
        task.customerName,
        task.customerAddress,
        task.customerEmail || 'no-email@prixair.com',
        task.customerPhone,
        this.pickupDetails.name,
        this.pickupDetails.address
      );

      orderInfoRequest.setRestaurantPhoneNumber(this.pickupDetails.phone);
      orderInfoRequest.setTotalOrderCost(task.orderValue);
      if (task.deliveryInstructions) {
        orderInfoRequest.setDeliveryInstruction(task.deliveryInstructions);
      }

      const orderItems = task.items.map(item => {
        return new OrderItem(
          item.name,
          item.price,
          item.quantity
        );
      });

      orderInfoRequest.setOrderItems(orderItems);

      const response = await this.client.orderService.insertOrder(orderInfoRequest);

      console.log('Shipday order created:', response);

      return {
        orderId: response.orderId.toString(),
        status: 'pending', // Initial status
        trackingUrl: `https://track.shipday.com/${response.orderId}`
      };
    } catch (error) {
      console.error('Shipday API Error:', error);
      throw error;
    }
  }

  /**
   * Get delivery status
   */
  async getDeliveryStatus(orderId: string) {
    console.log('Getting Shipday delivery status for:', orderId);
    try {
      const order = await this.client.orderService.getOrderDetails(orderId);
      return order;
    } catch (error) {
      console.error('Shipday API Error:', error);
      throw error;
    }
  }

  /**
   * Get tracking URL for a delivery
   */
  getTrackingUrl(orderId: string): string {
    return `https://track.shipday.com/${orderId}`;
  }
}

export const getShipdayConfig = (): ShipdayConfig => {
  return {
    apiKey: process.env.SHIPDAY_API_KEY || '',
  };
};

export const shipdayService = new ShipdayService(getShipdayConfig());
