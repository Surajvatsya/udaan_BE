const Interaction = require('../models/Interaction');
const { Op } = require('sequelize');
const PointOfContact = require('../models/PointOfContact');
const Restaurant = require('../models/Restaurant');

Interaction.belongsTo(PointOfContact, {
  foreignKey: 'poc_id'
});
Interaction.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});


async function getAllCalls(req, res)  {


  const { fromDate, toDate } = req.query;

  console.log("fromDate", fromDate);
  console.log("toDate", toDate);

  try {

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const dateCondition = {
      [Op.and]: [
        from ? { follow_up_date: { [Op.gte]: from } } : {},
        to ? { follow_up_date: { [Op.lte]: to } } : {},
      ],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0); 


    const interactions = await Interaction.findAll({
      where: dateCondition,
      include: [
        {
          model: PointOfContact,
          attributes: ['name', 'phone'],
        },
        {
          model: Restaurant,
          attributes: ['name'],
        },
      ],
      attributes: ['interaction_date', 'follow_up_date', 'details', 'outcome'],
    });




    const overdueCalls = [];
    const todaysCalls = [];
    const upcomingCalls = [];

    interactions.forEach((interaction) => {
      console.log(" interaction1 ", interaction);
      console.log(" interaction2", interaction);

      const followUpDate = new Date(interaction.follow_up_date);

      if (followUpDate < today) {
        overdueCalls.push(interaction);
      } else if (followUpDate.toDateString() === today.toDateString()) {
        todaysCalls.push(interaction);
      } else {
        upcomingCalls.push(interaction);
      }
    });


    const formatInteraction = (interaction) => ({
      poc_name: interaction.PointOfContact?.poc_name,
      poc_contact: interaction.PointOfContact?.poc_contact,
      restaurant_name: interaction.Restaurant?.name,
      follow_up_date: interaction.follow_up_date,
      last_call_details: interaction.details,
      last_call_outcome: interaction.outcome,
    });

    res.json({
      overdueCalls: overdueCalls.map(formatInteraction),
      todaysCalls: todaysCalls.map(formatInteraction),
      upcomingCalls: upcomingCalls.map(formatInteraction),
    });
  } catch (err) {
    console.error('Error fetching interactions:', err);
    res.status(500).json({ error: 'Failed to fetch interactions' });
  }
};



async function createInteraction(req, res) {
  try {
    const data = req.body;
    const interaction = await Interaction.create(data);
    console.log('Interaction created:', interaction);
    res.status(201).json(interaction);
  } catch (error) {
    console.error('Error creating interaction:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
}

// Read (Get) all Interactions
async function getAllInteractions(req, res) {
  try {
    const interactions = await Interaction.findAll();
    console.log('All interactions:', interactions);
    res.status(201).json(interactions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
}
async function todayFollowup(req, res){
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);


    const todaysCallsCount = await Interaction.count({
      where: {
        follow_up_date: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
    });


    res.status(200).json({
      todaysCallsCount,
    });
  } catch (error) {
    console.error('Error fetching today\'s calls count:', error);
    res.status(500).json({
      message: 'Error fetching today\'s calls count',
      error: error.message,
    });
  }
}

async function getInteractionById(interaction_id) {
  try {
    const interaction = await Interaction.findByPk(interaction_id);
    if (interaction) {
      console.log('Interaction found:', interaction);
      return interaction;
    } else {
      console.log('Interaction not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching interaction:', error);
    throw error;
  }
}

async function getInteractionByRestaureantId(req, res) {
  const { restaurant_id } = req.params;

  try {
    const interactions = await Interaction.findAll({
      where: { restaurant_id },
      order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
    });

    res.status(200).json(interactions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    res.status(500).json({ message: 'Error fetching interactions', error: error.message });
  }
};


async function updateInteraction(interaction_id, updatedData) {
  try {
    const interaction = await Interaction.findByPk(interaction_id);
    if (interaction) {
      await interaction.update(updatedData);
      console.log('Interaction updated:', interaction);
      return interaction;
    } else {
      console.log('Interaction not found');
      return null;
    }
  } catch (error) {
    console.error('Error updating interaction:', error);
    throw error;
  }
}


async function deleteInteraction(interaction_id) {
  try {
    const result = await Interaction.destroy({ where: { interaction_id } });
    if (result) {
      console.log(`Interaction with ID ${interaction_id} deleted.`);
    } else {
      console.log('Interaction not found');
    }
    return result;
  } catch (error) {
    console.error('Error deleting interaction:', error);
    throw error;
  }
}

module.exports = {
  createInteraction,
  getAllInteractions,
  getInteractionById,
  updateInteraction,
  deleteInteraction,
  getInteractionByRestaureantId,
  todayFollowup,
  getAllCalls
};


