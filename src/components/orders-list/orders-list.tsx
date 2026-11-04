import { memo } from 'react';

import { OrderCard } from '../order-card';

import type { OrdersListProps } from './type';

export const OrdersList = memo(function OrdersList({
  orders,
}: OrdersListProps): React.JSX.Element {
  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
});
