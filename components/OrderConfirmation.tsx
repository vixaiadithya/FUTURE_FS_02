import React from 'react';
import { CheckCircle, Download, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface OrderConfirmationProps {
  orderData: any;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ orderData, onContinueShopping }: OrderConfirmationProps) {
  const handleDownloadReceipt = () => {
    // Create a simple text receipt
    const receipt = `
Order Confirmation
Order ID: ${orderData.id}
Date: ${new Date(orderData.date).toLocaleDateString()}

Customer Information:
${orderData.customer.name}
${orderData.customer.email}
${orderData.customer.phone}

Shipping Address:
${orderData.shipping.address}
${orderData.shipping.city}, ${orderData.shipping.state} ${orderData.shipping.zipCode}

Items:
${orderData.items.map((item: any) => 
  `${item.product.title} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
).join('\n')}

Total: $${orderData.total.toFixed(2)}

Thank you for your order!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${orderData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <Card className="text-left mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Order ID:</span>
                <p className="text-muted-foreground">{orderData.id}</p>
              </div>
              <div>
                <span className="font-medium">Order Date:</span>
                <p className="text-muted-foreground">
                  {new Date(orderData.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Customer Information</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{orderData.customer.name}</p>
                <p>{orderData.customer.email}</p>
                <p>{orderData.customer.phone}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{orderData.shipping.address}</p>
                <p>{orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Items Ordered</h4>
              <div className="space-y-3">
                {orderData.items.map((item: any) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-12 w-12 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-semibold">
              <span>Total Paid</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button onClick={onContinueShopping}>
            <Home className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            You will receive an email confirmation shortly. Your order will be processed within 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
}