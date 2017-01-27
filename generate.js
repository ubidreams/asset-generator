const fse = require('fs-extra');
const sharp = require('sharp');
const glob = require("glob");
const path = require("path");

function ensureTrailingSlash(path) {
    return (path.endsWith('/') === false) ? path + "/" : path;
}

function resizeAndSave(factor, source, target) {
    const image = sharp(source);
    image.metadata().then(function(metadata) {
        image.resize(Math.round(metadata.width * factor))
             .toFile(target)
             .then(() => {
                 console.log(target + " generated");
             })
             .catch(error => {
                 console.error(target + " ERROR: " + error);
             });
    });
}

module.exports = (q, targetAndroid, targetIos) => {
    targetAndroid = ensureTrailingSlash(targetAndroid);
    targetIos = ensureTrailingSlash(targetIos);

    fse.ensureDirSync(targetAndroid + 'drawable-hdpi');
    fse.ensureDirSync(targetAndroid + 'drawable-ldpi');
    fse.ensureDirSync(targetAndroid + 'drawable-mdpi');
    fse.ensureDirSync(targetAndroid + 'drawable-xhdpi');
    fse.ensureDirSync(targetAndroid + 'drawable-xxhdpi');
    fse.ensureDirSync(targetIos);

    glob(q, function (er, files) {
        for (let file of files) {
            let filename = path.basename(file);
            let filetype = filename.substr(filename.lastIndexOf('.'), filename.length);

            filename = filename.substr(0, filename.lastIndexOf('.'));
            if (filename.indexOf("@3x")!==false) {
                filename = filename.substr(0, filename.lastIndexOf('@'));
            }

            console.info("process " + filename + filetype);

            resizeAndSave(0.5, file, targetAndroid + 'drawable-hdpi/' + filename + filetype);
            resizeAndSave(0.25, file, targetAndroid + 'drawable-ldpi/' + filename + filetype);
            resizeAndSave(1/3, file, targetAndroid + 'drawable-mdpi/' + filename + filetype);
            resizeAndSave(2/3, file, targetAndroid + 'drawable-xhdpi/' + filename + filetype);
            resizeAndSave(1, file, targetAndroid + 'drawable-xxhdpi/' + filename + filetype);

            resizeAndSave(1/3, file, targetIos + filename + filetype);
            resizeAndSave(2/3, file, targetIos + filename + '@2x' + filetype);
            resizeAndSave(1, file, targetIos + filename + '@3x' + filetype);
        }
    });
}