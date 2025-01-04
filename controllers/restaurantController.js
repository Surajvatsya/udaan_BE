const Restaurant = require("../models/Restaurant");
const { Op } = require("sequelize");
const Order = require("../models/Order");
const Item = require("../models/Item");
const sequelize = require("../config/db");
Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" });
Restaurant.hasMany(Order, { foreignKey: "restaurant_id" });

Order.hasMany(Item, { foreignKey: "order_id" });
Item.belongsTo(Order, { foreignKey: "order_id" });
sequelize.sync();
const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create({
      name: req.body.name,
      location: req.body.location,
      cuisine_type: req.body.cuisine_type,
      lead_status: req.body.lead_status || "New",
    });
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(201).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLeadsData = async (req, res) => {
  try {
    const totalLeads = await Restaurant.count();

    const activeLeads = await Restaurant.count({
      where: {
        lead_status: "Active",
      },
    });

    res.status(200).json({
      totalLeads,
      activeLeads,
    });
  } catch (error) {
    console.error("Error fetching leads summary:", error);
    res.status(500).json({
      message: "Error fetching leads summary",
      error: error.message,
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const r_id = req.params.lead_id;
    const restaurant = await Restaurant.findByPk(r_id);
    if (!restaurant) throw new Error("Restaurant not found");
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRestaurantsByLeadStatus = async (req, res) => {
  try {
    const leadStatus = req.params.lead_status;
    const restaurants = await Restaurant.findAll({
      where: { lead_status: leadStatus },
    });

    if (!restaurants || restaurants.length === 0) {
      throw new Error("No restaurants found with the specified lead status");
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by lead status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRestaurant = async (id, data) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) throw new Error("Restaurant not found");

    const updatedRestaurant = await restaurant.update({
      name: data.name || restaurant.name,
      location: data.location || restaurant.location,
      cuisine_type: data.cuisine_type || restaurant.cuisine_type,
      lead_status: data.lead_status || restaurant.lead_status,
    });

    return updatedRestaurant;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

const deleteRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) throw new Error("Restaurant not found");

    await restaurant.destroy();
    return { message: "Restaurant deleted successfully" };
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};

const getRestaurantStats = async (req, res) => {
  const { days } = req.query;
  const daysAsNumber = parseInt(days, 10);

  if (isNaN(daysAsNumber) || daysAsNumber <= 0) {
    return res.status(400).json({ error: "Invalid time period specified" });
  }

  try {
    // Calculate time ranges
    const now = new Date();
    const startOfCurrentPeriod = new Date(now);
    startOfCurrentPeriod.setDate(now.getDate() - daysAsNumber);

    const startOfPreviousPeriod = new Date(startOfCurrentPeriod);
    startOfPreviousPeriod.setDate(
      startOfCurrentPeriod.getDate() - daysAsNumber,
    );

    // Fetch active accounts for current and previous periods
    const currentPeriodActiveAccounts = await Restaurant.count({
      where: {
        updated_at: {
          [Op.between]: [startOfCurrentPeriod, now],
        },
        lead_status: "Active",
      },
    });

    const previousPeriodActiveAccounts = await Restaurant.count({
      where: {
        updated_at: {
          [Op.between]: [startOfPreviousPeriod, startOfCurrentPeriod],
        },
        lead_status: "Active",
      },
    });

    // Calculate retention rates for current and previous periods
    const currentPeriodTotalAccounts = await Restaurant.count({
      where: {
        created_at: {
          [Op.between]: [startOfCurrentPeriod, now],
        },
      },
    });

    const previousPeriodTotalAccounts = await Restaurant.count({
      where: {
        created_at: {
          [Op.between]: [startOfPreviousPeriod, startOfCurrentPeriod],
        },
      },
    });

    const calculateRetentionRate = (total, active) => {
      if (total === 0) return 0;
      return (active / total) * 100;
    };

    const currentPeriodRetentionRate = calculateRetentionRate(
      currentPeriodTotalAccounts,
      currentPeriodActiveAccounts,
    );

    const previousPeriodRetentionRate = calculateRetentionRate(
      previousPeriodTotalAccounts,
      previousPeriodActiveAccounts,
    );

    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const activeAccountPercentageChange = calculatePercentageChange(
      currentPeriodActiveAccounts,
      previousPeriodActiveAccounts,
    );

    const retentionRatePercentageChange = calculatePercentageChange(
      currentPeriodRetentionRate,
      previousPeriodRetentionRate,
    );

    res.json({
      current_period: {
        active_accounts: currentPeriodActiveAccounts,
        retention_rate: currentPeriodRetentionRate.toFixed(2),
      },
      previous_period: {
        active_accounts: previousPeriodActiveAccounts,
        retention_rate: previousPeriodRetentionRate.toFixed(2),
      },
      changes: {
        active_account_percentage_change:
          activeAccountPercentageChange.toFixed(2),
        retention_rate_percentage_change:
          retentionRatePercentageChange.toFixed(2),
      },
    });
  } catch (err) {
    console.error("Error fetching restaurant stats:", err);
    res.status(500).json({ error: "Failed to fetch restaurant stats" });
  }
};

const getAccountPerformanceStats = async (req, res) => {
  const { days } = req.query;
  const daysAsNumber = parseInt(days, 10);

  if (isNaN(daysAsNumber) || daysAsNumber <= 0) {
    return res.status(400).json({ error: "Invalid time period specified" });
  }

  try {
    const now = new Date();
    const startOfCurrentPeriod = new Date(now);
    startOfCurrentPeriod.setDate(now.getDate() - daysAsNumber);

    const orders = await Order.findAll({
      where: { order_date: { [Op.gte]: startOfCurrentPeriod } },
      include: [
        { model: Restaurant, attributes: ["restaurant_id", "name"] },
        { model: Item, attributes: ["price", "quantity"] },
      ],
    });

    const performanceData = {};

    orders.forEach((order) => {
      const restaurantName = order.restaurant?.name || "Unknown";
      const revenue =
        order.items?.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0,
        ) || 0;

      if (!performanceData[restaurantName]) {
        performanceData[restaurantName] = {
          name: restaurantName,
          totalOrders: 0,
          totalRevenue: 0,
        };
      }

      performanceData[restaurantName].totalOrders += 1;
      performanceData[restaurantName].totalRevenue += revenue;
    });

    const performanceArray = Object.values(performanceData);

    const topPerformingAccounts = performanceArray
      .filter((account) => account.totalRevenue > 0) // Exclude accounts with zero revenue
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);

    const atRiskAccounts = await Restaurant.findAll({
      where: {
        updated_at: { [Op.lt]: startOfCurrentPeriod },
      },
      attributes: ["restaurant_id", "name"],
    });

    res.json({
      topPerformingAccounts: topPerformingAccounts.map((account) => ({
        name: account.name,
        totalOrders: account.totalOrders,
        totalRevenue: account.totalRevenue.toFixed(2),
      })),
      atRiskAccounts: atRiskAccounts.map((account) => ({
        name: account.name,
      })),
    });
  } catch (err) {
    console.error("Error fetching account performance stats:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch account performance stats" });
  }
};

const getRevenueContribution = async (req, res) => {
  const { days } = req.query;
  const daysAsNumber = parseInt(days, 10);

  if (isNaN(daysAsNumber) || daysAsNumber <= 0) {
    return res.status(400).json({ error: "Invalid time period specified" });
  }

  try {
    const now = new Date();
    const startOfPeriod = new Date(now);
    startOfPeriod.setDate(now.getDate() - daysAsNumber);

    // Fetch orders with associated restaurants and items
    const orders = await Order.findAll({
      where: { order_date: { [Op.gte]: startOfPeriod } },
      include: [
        { model: Restaurant, attributes: ["restaurant_id", "name"] },
        { model: Item, attributes: ["price", "quantity"] },
      ],
    });

    console.log("orders kwnd", orders);

    const revenueData = {};

    orders.forEach((order) => {
      const restaurantName = order.restaurant?.name || "Unknown";
      const revenue = order.items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0,
      );

      if (!revenueData[restaurantName]) {
        revenueData[restaurantName] = {
          restaurantName,
          totalRevenue: 0,
        };
      }

      revenueData[restaurantName].totalRevenue += revenue;
    });

    const formattedRevenueData = Object.values(revenueData).map(
      (restaurant) => ({
        restaurantName: restaurant.restaurantName,
        totalRevenue: restaurant.totalRevenue.toFixed(2),
      }),
    );

    res.json(formattedRevenueData);
  } catch (err) {
    console.error("Error fetching revenue contribution:", err);
    res.status(500).json({ error: "Failed to fetch revenue contribution" });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsByLeadStatus,
  getAllLeadsData,
  getRestaurantStats,
  getAccountPerformanceStats,
  getRevenueContribution,
};
