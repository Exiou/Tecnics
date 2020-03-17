//importar dependências
const multer = require('multer')
const path = require('path')


module.exports = (produto) => {
    //configuração do multer
    const multerConfig = {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..','..','uploads',`${produto}`)) //pasta onde será armazenada a imagem
            },
            filename: (req, file, cb) => {

                const fileName = `${file.originalname}` //nome da imagem

                cb(null, fileName)
            
            }
        }),
        //formatos de imagem permitidos
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