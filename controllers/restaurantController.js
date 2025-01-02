const Restaurant = require('../models/Restaurant');

// Create a new restaurant
// Create a new restaurant
const createRestaurant = async (req, res) => {
  // console.log("createRestaurant data = ", req.body);
  try {
      const newRestaurant = await Restaurant.create({
          name: req.body.name,
          location: req.body.location,
          cuisine_type: req.body.cuisine_type,
          lead_status: req.body.lead_status || 'New', // Default value
      });
      res.status(201).json(newRestaurant); 
  } catch (error) {
      console.error('Error creating restaurant:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
  }
};
// Read all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(201).json(restaurants); 
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllLeadsData = async (req, res) => {
  try {

    const totalLeads = await Restaurant.count();

    const activeLeads = await Restaurant.count({
      where: {
        lead_status: 'Active',
      },
    });

    res.status(200).json({
      totalLeads,
      activeLeads,
    }); 
  } catch (error) {
    console.error('Error fetching leads summary:', error);
    res.status(500).json({
      message: 'Error fetching leads summary',
      error: error.message,
    });
  }
};


const getRestaurantById = async (req, res) => {
  try {
    const r_id = req.params.lead_id; 
    const restaurant = await Restaurant.findByPk(r_id);
    if (!restaurant) throw new Error('Restaurant not found');
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRestaurantsByLeadStatus = async (req, res) => {
  try {
    const leadStatus = req.params.lead_status; 
    const restaurants = await Restaurant.findAll({
      where: { lead_status: leadStatus },
    });
    
    if (!restaurants || restaurants.length === 0) {
      throw new Error('No restaurants found with the specified lead status');
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants by lead status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateRestaurant = async (id, data) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) throw new Error('Restaurant not found');

    const updatedRestaurant = await restaurant.update({
      name: data.name || restaurant.name,
      location: data.location || restaurant.location,
      cuisine_type: data.cuisine_type || restaurant.cuisine_type,
      lead_status: data.lead_status || restaurant.lead_status,
    });

    return updatedRestaurant;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};


const deleteRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) throw new Error('Restaurant not found');

    await restaurant.destroy();
    return { message: 'Restaurant deleted successfully' };
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};


module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsByLeadStatus,
  getAllLeadsData
};
