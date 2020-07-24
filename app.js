const app=()=>{
    const song=document.querySelector(".song");
    const play=document.querySelector(".play");
    const outline=document.querySelector(".moving-outline circle");
    const video=document.querySelector(".video-container video");
    const sounds=document.querySelectorAll(".soundpicker button");
    const timeDisplay=document.querySelector(".time-display");
    const outlinelength=outline.getTotalLength();
    const timeselect=document.querySelectorAll(".timesection button");
    let fakeduration=600;
    outline.style.strokeDasharray=outlinelength;
    outline.style.strokeDashoffset=outlinelength;

    play.addEventListener("click",()=>{
        checkPlaying(song);
    });

    sounds.forEach(sound=>{
        sound.addEventListener("click",function(){
            song.src=this.getAttribute("data-sound");
            video.src=this.getAttribute("data-video");
            checkPlaying(song);
        })
    })

    timeselect.forEach(option=>{
        option.addEventListener('click',function(){
            fakeduration=this.getAttribute("data-time");
            timeDisplay.textContent=`${Math.floor(fakeduration/60)}:${Math.floor(fakeduration%60)}`;
        });
    })


    const checkPlaying=song=>{
        if(song.paused){
            song.play();
            video.play();
            play.src="./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    };
    song.ontimeupdate=()=>{
        let currentTime=song.currentTime;
        let elasped=fakeduration-currentTime;
        let seconds=Math.floor(elasped%60);
        let minutes=Math.floor(elasped/60);


        let progress=outlinelength-(currentTime/fakeduration)*outlinelength;
        outline.style.strokeDashoffset=progress;
        timeDisplay.textContent=`${minutes}:${seconds}`;

        if(currentTime>=fakeduration){
            song.pause();
            song.currentTime=0;
            play.src="./svg/play.svg";
            video.pause();
        }

    };
   

};
app();
