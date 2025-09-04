import express from "express";

const router = express.Router();

const courses = [
    {
        id: 1,
        title: "Web Development",
        description: "Learn HTML, CSS, JavaScript, and modern web frameworks.",
        duration: "3 months",
    },
    {
        id: 2,
        title: "Data Science",
        description: "Explore Python, machine learning, and data visualization.",
        duration: "6 months",
    },
    {
        id: 3,
        title: "Graphic Design",
        description: "Master design principles and tools like Adobe Photoshop.",
        duration: "4 months",
    },
];

// Get all courses
router.get("/", (req, res) => {
    res.status(200).json({
        error: false,
        data: courses,
        msg: "Courses fetched successfully",
    });
});

// Add a new course
router.post("/", (req, res) => {
    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
        return res.status(400).json({
            error: true,
            data: null,
            msg: "All fields (title, description, duration) are required",
        });
    }

    const newCourse = {
        id: courses.length + 1,
        title,
        description,
        duration,
    };

    courses.push(newCourse);

    res.status(201).json({
        error: false,
        data: newCourse,
        msg: "Course added successfully",
    });
});

// Get a single course by ID
router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));

    if (!course) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "Course not found",
        });
    }

    res.status(200).json({
        error: false,
        data: course,
        msg: "Course found successfully",
    });
});

// Update a course by ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    const courseIndex = courses.findIndex((c) => c.id === Number(id));

    if (courseIndex === -1) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "Course not found",
        });
    }

    const updatedCourse = {
        ...courses[courseIndex],
        title: title || courses[courseIndex].title,
        description: description || courses[courseIndex].description,
        duration: duration || courses[courseIndex].duration,
    };

    courses[courseIndex] = updatedCourse;

    res.status(200).json({
        error: false,
        data: updatedCourse,
        msg: "Course updated successfully",
    });
});

// Delete a course by ID
router.delete("/:id", (req, res) => {
    const courseIndex = courses.findIndex((c) => c.id === Number(req.params.id));

    if (courseIndex === -1) {
        return res.status(404).json({
            error: true,
            data: null,
            msg: "Course not found",
        });
    }

    const [deletedCourse] = courses.splice(courseIndex, 1); // Destructure to get the deleted course object

    res.status(200).json({
        error: false,
        data: deletedCourse,
        msg: "Course deleted successfully",
    });
});

export default router;
