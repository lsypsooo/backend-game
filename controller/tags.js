const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.insert = async (req, res) => {
  try {
    await prisma.tags.create(
      {
        data: req.body
      }
    )
    res.json({
      status: true,
      message: 'tags berhasil ditambahkan'
    })
  } catch (error) {
    console.log(error)
  }
}

exports.read = async (req, res) => {
  try {
    const data = await prisma.tags.findMany()
    res.json({
      status: true,
      message: 'berhasil menampilkan data',
      data: data
    })
  } catch (error) {
    console.log(error)
  }
}

exports.edit = async (req, res) => {
  try {
    await prisma.tags.update({
      data: req.body,
      where: {
        id_tags: Number(req.params.id)
      }
    })
    res.json({
      status: true,
      message: 'berhasil edit data'
    })
  } catch (error) {
    console.log(error)
  }
}

exports.deleteTags = async (req, res) => {
  try {
    await prisma.tags.delete({
      where: {
        id_tags: Number(req.params.id)
      }
    })
    res.json({
      status: true,
      message: 'berhasil hapus data'
    })
  } catch (error) {

  }
}