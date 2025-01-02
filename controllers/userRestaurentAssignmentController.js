const UserRestaurantAssignment = require('../models/UserRestaurentAssignment');


async function createAssignment(userId, restaurantId) {
    try {
      const assignment = await UserRestaurantAssignment.create({
        user_id: userId,
        restaurant_id: restaurantId,
      });
      console.log('Assignment created:', assignment);
      return assignment;
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  }
  

  async function getAssignmentById(assignmentId) {
    try {
      const assignment = await UserRestaurantAssignment.findByPk(assignmentId);
      if (!assignment) {
        console.log('Assignment not found.');
        return null;
      }
      console.log('Assignment found:', assignment);
      return assignment;
    } catch (error) {
      console.error('Error fetching assignment:', error);
      throw error;
    }
  }
  

  async function getAllAssignments() {
    try {
      const assignments = await UserRestaurantAssignment.findAll();
      console.log('All assignments:', assignments);
      return assignments;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      throw error;
    }
  }
  

  async function updateAssignment(assignmentId, updatedData) {
    try {
      const [updatedRows] = await UserRestaurantAssignment.update(updatedData, {
        where: { assignment_id: assignmentId },
      });
      if (updatedRows === 0) {
        console.log('Assignment not found or no changes made.');
        return false;
      }
      console.log('Assignment updated.');
      return true;
    } catch (error) {
      console.error('Error updating assignment:', error);
      throw error;
    }
  }
  

  async function deleteAssignment(assignmentId) {
    try {
      const deletedRows = await UserRestaurantAssignment.destroy({
        where: { assignment_id: assignmentId },
      });
      if (deletedRows === 0) {
        console.log('Assignment not found.');
        return false;
      }
      console.log('Assignment deleted.');
      return true;
    } catch (error) {
      console.error('Error deleting assignment:', error);
      throw error;
    }
  }
  

  async function getAssignmentsByUserId(userId) {
    try {
      const assignments = await UserRestaurantAssignment.findAll({
        where: { user_id: userId },
      });
      console.log(`Assignments for user ${userId}:`, assignments);
      return assignments;
    } catch (error) {
      console.error('Error fetching assignments for user:', error);
      throw error;
    }
  }
  

  async function getAssignmentsByRestaurantId(restaurantId) {
    try {
      const assignments = await UserRestaurantAssignment.findAll({
        where: { restaurant_id: restaurantId },
      });
      console.log(`Assignments for restaurant ${restaurantId}:`, assignments);
      return assignments;
    } catch (error) {
      console.error('Error fetching assignments for restaurant:', error);
      throw error;
    }
  }
  
  module.exports = {
    UserRestaurantAssignment,
    createAssignment,
    getAssignmentById,
    getAllAssignments,
    updateAssignment,
    deleteAssignment,
    getAssignmentsByUserId,
    getAssignmentsByRestaurantId,
  };
  