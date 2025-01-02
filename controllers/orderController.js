const Order = require('../models/Order');
const Item = require('../models/Item');
const sequelize = require('../config/db');


Order.hasMany(Item, { foreignKey: 'order_id' });
Item.belongsTo(Order, { foreignKey: 'order_id' });


sequelize.sync();



const createOrder =  async (req, res) => {
  const { restaurant_id, order_by, order_date, order_status, items } = req.body;

  try {
    // Create the order
    const order = await Order.create({
      restaurant_id,
      order_by,
      order_date,
      order_status,
    });


    if (items && items.length > 0) {
      for (const item of items) {
        await Item.create({
          order_id: order.order_id,
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getOrdersCountAndDateByRId =  async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    const orders = await Order.findAll({
      where: { restaurant_id },
      attributes: ['order_date'],
    });


    const dateCounts = orders.reduce((acc, order) => {
      const date = order.order_date.toISOString().split('T')[0]; 
      acc[date] = (acc[date] || 0) + 1; 
      return acc;
    }, {});


    const heatmapData = Object.keys(dateCounts).map((date) => ({
      date,
      count: dateCounts[date],
    }));

    res.status(200).json(heatmapData);
  } catch (error) {
    console.error('Error fetching order count by date:', error);
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};

const getOrdersByRId = async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    const orders = await Order.findAll({
      where: { restaurant_id },
      include: [{
        model: Item,
        attributes: ['item_name', 'quantity', 'price'],
      }],
    });


    const ordersWithTotal = orders.map(order => {
      const totalAmount = order.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);

      return {
        order_id: order.order_id,
        restaurant_id: order.restaurant_id,
        order_by: order.order_by,
        order_date: order.order_date,
        order_status: order.order_status,
        items: order.items,
        total_amount: totalAmount, 
      };
    });

    res.status(200).json(ordersWithTotal);
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};


  

  const getAllOrders = async () => {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);

    } catch (error) {
      throw new Error(`Failed to retrieve orders: ${error.message}`);
      res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
  };
  

  const getOrderById = async (order_id) => {
    try {
      const order = await Order.findByPk(order_id);
      if (!order) throw new Error('Order not found');
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order details', error: error.message });
      throw new Error(`Failed to retrieve order: ${error.message}`);
    }
  };
  

  const updateOrder = async (order_id, updatedData) => {
    try {
      const order = await Order.findByPk(order_id);
      if (!order) throw new Error('Order not found');
      await order.update(updatedData);
      return order;
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  };
  
 
  const deleteOrder = async (order_id) => {
    try {
      const order = await Order.findByPk(order_id);
      if (!order) throw new Error('Order not found');
      await order.destroy();
      return 'Order successfully deleted';
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  };
  
  module.exports = {
    Order,
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersCountAndDateByRId,
    getOrdersByRId,
  };
  