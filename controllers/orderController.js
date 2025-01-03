const Order = require('../models/Order');
const Item = require('../models/Item');
const sequelize = require('../config/db');
const { Op } = require('sequelize');

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



const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};


const calculateAOV = (orders = []) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return 0; 
  }

  // console.log("Calculating AOV...", orders);

  return (
    orders.reduce((sum, order) => {
      // console.log("order.Items", order.Items);
      if (!order.Items || order.Items.length === 0) return sum;
      const orderValue = order.Items.reduce(
        (itemSum, item) => itemSum + item.price * item.quantity,
        0
      );
      return sum + orderValue;
    }, 0) / orders.length
  );
};


const getOrderStats = async (req, res) => {
  const { days } = req.query; 
  const daysInt = parseInt(days, 10);

  if (isNaN(daysInt) || daysInt <= 0) {
    return res.status(400).json({ error: 'Invalid number of days provided' });
  }

  try {

    const now = new Date();
    const currentPeriodStart = new Date(now.getTime() - daysInt * 24 * 60 * 60 * 1000); // Current period
    const previousPeriodStart = new Date(currentPeriodStart.getTime() - daysInt * 24 * 60 * 60 * 1000); // Previous period


    const currentOrders = await Order.findAll({
      where: {
        order_date: {
          [Op.between]: [currentPeriodStart, now],
        },
      },
      include: [
        {
          model: Item, 
          attributes: ['price', 'quantity'],
        },
      ],
    });


    // console.log("currentOrders", currentOrders);


    const previousOrders = await Order.findAll({
      where: {
        order_date: {
          [Op.between]: [previousPeriodStart, currentPeriodStart],
        },
      },
      include: [
        {
          model: Item,
          attributes: ['price', 'quantity'],
        },
      ],
    });

    console.log("previousOrders", previousOrders);



    const currentTotalOrders = currentOrders.length;
    const previousTotalOrders = previousOrders.length;


    const totalOrderChange = calculatePercentageChange(currentTotalOrders, previousTotalOrders);





    const currentAOV = calculateAOV(currentOrders);
    console.log("currentAOV", currentAOV);

    const previousAOV = calculateAOV(previousOrders);
    console.log("previousAOV", previousAOV);



    const aovChange = calculatePercentageChange(currentAOV, previousAOV);


    return res.json({
      current_period: {
        total_orders: currentTotalOrders,
        average_order_value: currentAOV.toFixed(2),
      },
      previous_period: {
        total_orders: previousTotalOrders,
        average_order_value: previousAOV.toFixed(2),
      },
      changes: {
        total_order_percentage_change: totalOrderChange.toFixed(2),
        average_order_value_percentage_change: aovChange.toFixed(2),
      },
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    return res.status(500).json({ error: 'Failed to fetch order stats' });
  }
};

const getOrderTrends = async (req, res) => {
  try {
    const now = new Date();
    const { days } = req.query;
    const daysAsNumber = parseInt(days, 10) || 30; // Default to last 30 days if not specified
    const startDate = new Date(now.setDate(now.getDate() - daysAsNumber));


    const orders = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('order_date')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('order_id')), 'count'],
      ],
      where: {
        order_date: {
          [Op.gte]: startDate,
        },
      },
      group: [sequelize.fn('DATE', sequelize.col('order_date'))],
      order: [[sequelize.fn('DATE', sequelize.col('order_date')), 'ASC']],
    });


    const trends = orders.map(order => ({
      date: order.getDataValue('date'),
      count: parseInt(order.getDataValue('count'), 10),
    }));

    res.json(trends);
  } catch (error) {
    console.error('Error fetching order trends:', error);
    res.status(500).json({ error: 'Failed to fetch order trends' });
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
    getOrderStats,
    getOrderTrends,
  };
  