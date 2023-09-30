import multer from "multer";

const upload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'images/');
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    new Date().valueOf() +
                    '_' +
                    file.originalname
                );
            }
        }
    ),
})

const MAX_COUNT = 100;

export default function uploadFiles() {
    return upload.array('images', MAX_COUNT);
}