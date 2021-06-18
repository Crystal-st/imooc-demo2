var playNode = document.querySelector(".playNode"),
    videoNode = document.querySelector(".videoNode"),
    fullNode = document.querySelector(".fullscreenNode"), /*全屏*/
    nowTime = document.querySelector(".now"), /*当前时间*/
    allTime = document.querySelector(".all"), /*视频长度*/
    load_line = document.querySelector('.load_line'), /*进度条*/
    ctrlNode = document.querySelector(".ctrlNode"), /*进度条上的拖动按钮*/
    loadNode = document.querySelector('.loadNode'), /*进度条外层*/
    playBtn = true;

// 播放暂停
playNode.onclick = function(){
    playBtn = !playBtn;
    if(playBtn == false){
        this.className = "pauseNode";
        videoNode.play();
    }
    else{
        this.className = "playNode";
        videoNode.pause();
    }
}

// 全屏
fullNode.onclick = function(){
    // 各浏览器兼容
    if(videoNode.webkitRequestFullScreen){
        videoNode.webkitRequestFullScreen();
    }
    else if(videoNode.mozRequestFullScreen){
        videoNode.mozRequestFullScreen();
    }
    else{
        videoNode.requestFullscreen();
    }
}

//分或秒不足10秒的前面加0
function addO(time){
    return time<10? "0"+ time : time;
} 
//视频时间:用canplay解决时间NaN问题
videoNode.addEventListener("canplay", function(){
    var allSeconds = parseInt(videoNode.duration);
    var s = allSeconds % 60;
    var m = parseInt(allSeconds / 60);
    allTime.innerHTML = addO(m) + ':' + addO(s);
}, false);
//当前播放时间:时间要动起来
videoNode.addEventListener("timeupdate", function(){
    //播放进度条：长度是当前播放时间占总时间的比例
    load_line.style.width = videoNode.currentTime/videoNode.duration*100 + "%";
    //进度条上的拖动按钮：和进度条位置一致
    if(load_line.offsetWidth - 12 <= 0){
        ctrlNode.style.left = 0 + "px";
    }else{
        ctrlNode.style.left = load_line.offsetWidth - 12 + 'px';
    }
    //当前时间
    var nowSeconds = parseInt(videoNode.currentTime);
    var now_s = nowSeconds % 60;
    var now_m = parseInt(nowSeconds / 60);
    nowTime.innerHTML = addO(now_m) + ':' + addO(now_s); 
}, false);

//拖拽进度条按钮
ctrlNode.onmousedown = function(e){
    var ev = e || window.event;
    var l = ev.clientX - this.offsetLeft;
    videoNode.pause();
    //拖动必须写在mousedown里
    document.onmousemove = function(e){
        var ev = e || window.event;
        var needX = ev.clientX - l;
        console.log(needX);
        if( needX < 0){
            needX = 0;
        }else if(needX > loadNode.offsetWidth - 12){
            needX = loadNode.offsetWidth - 12;
        }
        ctrlNode.style.left = needX + 'px';
        load_line.style.width = (ctrlNode.offsetLeft + 12 ) / loadNode.offsetWidth *100 + '%';
    };
    document.onmouseup = function(){
        //鼠标抬起后清空鼠标事件
        document.onmousemove =  document.onmouseup = null;
        //鼠标抬起后视频正常播放
        videoNode.play();
        //判断拖动前是在播放状态还是在暂停状态
        if(playBtn == false){
            playNode.className = "pauseNode";
            videoNode.play();
        }
        else{
            playNode.className = "playNode";
            videoNode.pause();
        }
    };
};
