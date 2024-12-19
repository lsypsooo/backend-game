const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.insert = async (req, res) => {
  try {

    const body = req.body

    const { rating, price, tags, title,description } = body

    let image;


    await prisma.game.create({
      data:{
      price: Number(price),
      rating: Number(rating),
      tags: Number(tags),
      title: title,
      description: description,
      image: req.file.filename
      }
    })
    res.json({
      status: true,
      msg: 'game berhasil ditambahkan'
    })
  } catch (error) {
    console.log(error)
  }
}

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.game.findMany({
      include: {
        tags_game_tagsTotags: true
      }
    })
    res.json({
      status: true,
      msg: 'Berhasil',
      data
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: false,
      msg: 'Error',
      data
    })
  }
}

exports.getByID = async (req, res) => {
  try {
    const data = await prisma.game.findFirst({
      include: {
        tags_game_tagsTotags: true
      }, where: {
        id_game: Number(req.params.id)
      }
    })
    res.json({
      status: true,
      msg: 'Berhasil',
      data
    })
  } catch (error) {
    res.json({
      status: false,
      msg: 'Error',
      data
    })
  }
}


exports.edit = async (req, res) => {
  try {
    const body = req.body
    const { rating, price, tags } = body
    let data = {
      ...body,
      price: Number(price),
      rating: Number(rating),
      tags: Number(tags)
    }
    if (req.file) {
      data.image = req.file.filename
    }

    await prisma.game.update({
      where: {
        id_game: Number(req.params.id)
      },
      data
    })
    res.json({
      status: true,
      msg: 'edit berhasil'
    })

  } catch (error) {
    console.log(error)
    res.json({
      status: false,
      msg: 'Error',

    })
  }

}

exports.deleteGame = async (req, res) => {
  try {
    await prisma.game.delete({
      where: {
        id_game: Number(req.params.id)
      }
    })
    res.json({
      status: true,
      msg: 'game berhasil dihapus '
    })
  } catch (error) {
    res.json({
      status: false,
      msg: 'error'
    })
  }
}
