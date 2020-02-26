const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = (produto) => {
    const multerConfig = {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..','..','uploads',`${produto}`))
            },
            filename: (req, file, cb) => {
                crypto.randomBytes(16, (err, hash) => {
                    if(err) cb(err)

                    const fileName = `${file.originalname}`

                    cb(null, fileName)
                })
            }
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ]

            if(allowedMimes.includes(file.mimetype)) {
                cb(null, true)
            } else{
                cb(new Error("O formato do arquivo é inválido"))
            }
        }
    }

    return multerConfig

}