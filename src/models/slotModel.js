const db = require('./db');

exports.getAvailableSlots = async (teacherId, date) => {
  try {
    const result = await db.query(
      `SELECT 
         "Slots"."slotId", 
         "Slots"."date", 
         "Slots"."startTime", 
         "Slots"."endTime", 
         "Slots"."location", 
         "Teachers"."fullName", 
         "Teachers"."photo" 
       FROM 
         "Slots" 
       INNER JOIN 
         "Teachers" ON "Slots"."teacherId" = "Teachers"."teacherId" 
       WHERE 
         "Slots"."teacherId" = $1 AND "Slots"."date" = $2 AND "Slots"."status" = 'Unbooked'`,
      [teacherId, date]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch available slots');
  }
};

exports.updateSlot = async (slotId, newLocation, newStatus) => {
  try {
    await db.query(
      `UPDATE "Slots" 
       SET "location" = $1, "status" = $2
       WHERE "slotId" = $3`,
      [newLocation, newStatus, slotId]
    );
  } catch (err) {
    throw new Error('Failed to update slot');
  }
};

exports.unbookSlot = async (slotId) => {
  try {
    await db.query(
      `UPDATE "Slots" 
       SET "status" = 'Unbooked', "location" = NULL
       WHERE "slotId" = $1`,
      [slotId]
    );
  } catch (err) {
    throw new Error('Failed to unbook slot');
  }
};