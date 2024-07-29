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