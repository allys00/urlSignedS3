const AWS = require('aws-sdk');
const { bucketName } = require('../helpers/constants');

AWS.config.update({
    accessKeyId: '[accessKey]',
    secretAccessKey: '[secretKey]'
});

module.exports = {
    sign: (req, res) => {
        const S3 = new AWS.S3();
        const params = {
            Bucket: bucketName,
            Expires: 60,
            Key: req.body.filename,
            ContentType: req.body.filetype,
        };

        S3.getSignedUrl('putObject', params, (err, data) => {
            if (err) {
                res.status(400).send({ message: err.message });
            } else {
                res.status(200).send(data)
            };
        });
    }
}
