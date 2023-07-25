const express = require("express")
const router = express.Router()
const {createCourse,getAllCourse,getCourseDetails,getFullCourseDetails,editCourse,getInstructorCourses,deleteCourse,} = require("../controllers/course")
const {showCategories,categoryPageDetails,createCategory} = require("../controllers/category")
const {createSection,updateSection,deleteSection} = require("../controllers/section")
const {createSubSection,updateSubSection,deleteSubSection,} = require("../controllers/subSection")
const {createRating,getAllRating,getAverageRating} = require("../controllers/ratingAndReviews")
const {updateCourseProgress} = require("../controllers/courseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getAllCourses", getAllCourse)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router