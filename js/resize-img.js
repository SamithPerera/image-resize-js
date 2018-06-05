var _$resizeImg = {};

_$resizeImg.getRatio = function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
    ratio = Math.min(ratio[0], ratio[1]);
    return { width:srcWidth*ratio, height:srcHeight*ratio };
};

jQuery.resizeImg = function(imageSrc, outputFormat, quality, newWidth, newHeight, callback) {
    var img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous"; /// remove before go live
    img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var resizedRatio = _$resizeImg.getRatio(this.width, this.height, newWidth, newHeight);
        canvas.height = resizedRatio.height;
        canvas.width = resizedRatio.width;
        ctx.drawImage(this, 0, 0, resizedRatio.width, resizedRatio.height);
        var dataURL = canvas.toDataURL(outputFormat, quality);
        callback(dataURL);
    }
}
