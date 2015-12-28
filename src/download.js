( function(){

    window.downloadFile = function (sUrl, filename) {
        //iOS devices do not support downloading. We have to inform user about this.
        if (/(iP)/g.test(navigator.userAgent)) {
            alert('Your device does not support files downloading. Please try again in desktop browser.');
            return false;
        }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        console.dir(link);
        console.log('download ' + link.download);
        if (link.download !== undefined) {

            console.log('a element click' + link.download + sUrl);
            if( filename ){ 
                link.download =  filename;
            } else {
                //Set HTML5 download attribute. This will prevent file from opening if supported.
                var fileNameUrl = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
                link.download = fileNameUrl;
            }

        }
        //console.log('a element click' + link.download + sUrl);
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    //console.log('window.open' + sUrl);
    window.open(sUrl, '_self');
    return true;
}

    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();

    //拦截判断 一些基于chrome 修改浏览器不支持html5 a标签download
    if( ua.indexOf('xiaomi') > -1){
        console.log("XiaoMi");

    } else {

        if (window.ActiveXObject){
            Sys.ie = ua.match(/msie ([\d.]+)/)[1]
        } else if (document.getBoxObjectFor){
            Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
        } else if (window.MessageEvent && !document.getBoxObjectFor){

            Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
        } else if (window.opera) {
            Sys.opera = ua.match(/opera.([\d.]+)/)[1]
        } else if (window.openDatabase) {
            Sys.safari = ua.match(/version\/([\d.]+)/)[1];
        }

        if ( Sys.chrome ) {
            window.downloadFile.isChrome = true;
        } else  if ( Sys.safari ){
            window.downloadFile.isSafari = true;
        }
    } 

} ());
