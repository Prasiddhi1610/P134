status = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Detected";
            if(objects.label != "person"){
                alarm.play();
                document.getElementById("detection").innerHTML = "Baby Not Found";
            }
            else{
                alarm.stop();
                document.getElementById("detection").innerHTML = "Baby Found";
            }
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}