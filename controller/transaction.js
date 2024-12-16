const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.insert = async (req, res) => {
  try {
    console.log(req.body)
    const data = req.body
    const game = await prisma.game.findUnique({
      where: {
        id_game: Number(data.id_game)
      }
    })

    await prisma.transaction.create({
      data: {
        ...data,
        id_game: Number(data.id_game),
        total: Number(game.price)
      }
    })
    res.json({
      status: true,
      msg: 'transaksi berhasil'
    })
  } catch (error) {
    console.log(error)
  }
}

exports.confirmTransaction = async (req, res) => {
  try {
    await prisma.transaction.update({
      data: {
        status: 2
      },
      where: {
        id_transaction: Number(req.params.id)
      }
    })
    res.json({
      status: true,
      msg: 'transaksi terkonfirmasi'
    })
  } catch (error) {
    console.log(error)
  }
}

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        game: true,
        users: true
      }
    })
    res.json({
      status: true,
      msg: 'success',
      data
    })
  } catch (error) {

  }
}

exports.getByUserID = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        username: req.params.id,
        users: {
          role: 2
        }
      },
      include: {
        game: true
      }
    })
    res.json({
      status: true,
      msg: 'success',
      data
    })
  } catch (error) {

  }
}