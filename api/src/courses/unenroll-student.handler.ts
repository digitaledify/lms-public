import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";

export const unenrollStudentHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const courseId = IdSchema.parse(req.params.courseId);
    const studentId = z.string().parse(req.params.studentId);

    // Get course
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        enrolledBy: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll student from course
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        enrolledBy: course.enrolledBy.filter((u) => u !== studentId),
      },
    });

    return res.json({
      message: "Student unenrolled successfully",
    });
  } catch (error) {
    next(error);
  }
};
