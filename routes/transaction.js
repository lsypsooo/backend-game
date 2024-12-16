const router = require('express').Router()


const { insert, confirmTransaction, getAll, getByUserID } = require('../controller/transaction')

router.post("/insert", insert)
router.put("/confirm-transaction/:id", confirmTransaction)
router.get("/get-all", getAll)
router.get("/get/:id", getByUserID)


module.exports = router