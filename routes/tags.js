const router = require('express').Router()
const { insert, read, edit, deleteTags, } = require('../controller/tags')

router.post("/insert", insert)
router.get("/get-all", read)
router.put("/edit/:id", edit)
router.delete("/delete/:id", deleteTags)

module.exports = router