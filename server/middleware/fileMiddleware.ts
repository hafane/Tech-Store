import { NextFunction, Request, Response } from "express"
import multer from "multer"
import {v4 as uuidv4} from 'uuid'
import sharp from "sharp"
import SetError from "../Errors/SetError"

const uploadFileArrays = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, `${uuidv4()}-${file.originalname}`)
        }
    }),
    limits: {fileSize: 1024 * 1024 * 7, files: 4},
    fileFilter: (req, file, cb) => {
       if(!file.mimetype.includes('image')){
           return cb(new Error("Неверный формат файла."))
       }
       cb(null, true)
    }
}).array('images', 4)

export function uploadItemImages(req: Request, res: Response, next: NextFunction) {
    uploadFileArrays(req, res, async (err) => {
        if(err) {
            try {
                switch(err.code) {
                    case 'LIMIT_FILE_SIZE':
                        return res.status(400).json({message: "Превышен размер файла."})
                    case 'LIMIT_FILE_COUNT':
                        return res.status(400).json({message: "Превышен лимит количества файлов."})
                    case 'LIMIT_UNEXPECTED_FILE':
                        return res.status(400).json({message: "Неверный формат файла."})
                    default:
                        return next(SetError.BadRequestException(err.message))
                }
            } catch (error) {
                next(error)
            }
        }
        try {
            const files = Array.isArray(req.files) ? req.files.map(async file => await sharp(file.path).resize(400, 400).png().toFile(`images/${file.filename}`)) : []
            await Promise.all(files)
            if(!files) {
                return res.status(400).json({message: "Ошибка при сжатии изображений."})
            }
            next()
        } catch (error) {
            next(error)
        }
    })
}