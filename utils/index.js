const fs = require('fs');

exports.removeFile = (path) => {
    fs.stat(path, (err, stat) => {
        if (stat) {
            fs.unlink(path, (err) => {
                if (err) console.error(err);
                console.log('File deleted!');
            })
        } else {
            console.log('file not found!');
        }
    })
}