const PointOfContact = require("../models/PointOfContact");

const createPointOfContact = async (req, res) => {
  try {
    const data = req.body;
    const poc = await PointOfContact.create({
      restaurant_id: data.restaurant_id,
      name: data.name,
      role: data.role,
      phone: data.phone,
      email: data.email,
    });
    res.status(201).json(poc);
  } catch (error) {
    console.error("Error creating Point of Contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPointsOfContactByRId = async (req, res) => {
  try {
    const rid = req.params.rId;
    const pointsOfContact = await PointOfContact.findAll({
      where: { restaurant_id: rid },
    });
    res.status(201).json(pointsOfContact);
  } catch (error) {
    console.error("Error fetching Points of Contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read a single Point of Contact by ID
const getPointOfContactById = async (req, res) => {
  try {
    const id = req.params.poc_id; 
    const poc = await PointOfContact.findByPk(id);
    if (!poc) throw new Error(`Point of Contact with ID ${id} not found`);
    res.status(201).json(poc);
  } catch (error) {
    console.error("Error fetching Point of Contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPointOfContactByRoleAndId = async (req, res) => {
  try {
    const { role, id } = req.params; 


    const pointOfContact = await PointOfContact.findOne({
      where: {
        role: role,
        restaurant_id: id,
      },
    });

    if (!pointOfContact) {
      throw new Error("Point of Contact not found");
    }

    res.status(200).json(pointOfContact);
  } catch (error) {
    console.error("Error fetching Point of Contact by role and ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Point of Contact by ID
const updatePointOfContact = async (id, data) => {
  try {
    const poc = await PointOfContact.findByPk(id);
    if (!poc) throw new Error(`Point of Contact with ID ${id} not found`);

    const updatedPoc = await poc.update({
      restaurant_id: data.restaurant_id || poc.restaurant_id,
      name: data.name || poc.name,
      role: data.role || poc.role,
      phone: data.phone || poc.phone,
      email: data.email || poc.email,
    });
    return updatedPoc;
  } catch (error) {
    console.error("Error updating Point of Contact:", error);
    throw error;
  }
};


const deletePointOfContact = async (id) => {
  try {
    const deletedCount = await PointOfContact.destroy({
      where: { poc_id: id },
    });
    if (deletedCount === 0)
      throw new Error(`Point of Contact with ID ${id} not found`);
    return { message: `Point of Contact with ID ${id} deleted successfully` };
  } catch (error) {
    console.error("Error deleting Point of Contact:", error);
    throw error;
  }
};

module.exports = {
  createPointOfContact,
  getAllPointsOfContactByRId,
  getPointOfContactById,
  updatePointOfContact,
  deletePointOfContact,
  getPointOfContactByRoleAndId,
};
