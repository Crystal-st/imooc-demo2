var playNode = document.querySelector(".playNode"),
    videoNode = document.querySelector(".videoNode"),
    playBtn = true;
console.log(playNode);

playNode.onclick = function(){
    playBtn = !playBtn;
    if(playBtn == false){
        this.className = "pauseNode";
    }
    else{
        this.className = "playNode";
    }
}