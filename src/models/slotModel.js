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

exports.insertSlot = async (slotData) => {
  const {
    teacherId,
    timeOfSubmission,
    location,
    date,
    startTime,
    endTime,
  } = slotData;

  const query = `
    INSERT INTO "Slots" ("teacherId", "timeOfSubmission", "location", "date", "startTime", "endTime")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [teacherId, timeOfSubmission, location, date, startTime, endTime];

  try {
    const result = await db.query(query, values);
    return result.rows[0]; 
  } catch (err) {
    console.error('Error inserting slot:', err.message);
    throw err;
  }
};

exports.getTeacherSlotsWithCourseImage = async (teacherId) => {
  try {
    const result = await db.query(
      `SELECT 
         "Slots"."slotId",
         "Slots"."date", 
         "Slots"."startTime", 
         "Slots"."endTime", 
         "Slots"."location", 
         "Slots"."status", 
         "Courses"."image"
       FROM 
         "Slots"
       INNER JOIN 
         "Teachers" ON "Slots"."teacherId" = "Teachers"."teacherId"
       INNER JOIN 
         "Courses" ON "Teachers"."courseId" = "Courses"."courseId"
       WHERE 
         "Slots"."teacherId" = $1`,
      [teacherId]
    );
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch teacher slots with course image');
  }
};