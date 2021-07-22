status = "";
objects = [];

function preload(){
    sound = loadSound('TF002.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting...";   
}

function draw(){
    image(video, 0,0,380,380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        if(objects.length < 0){
            document.getElementById("found").innerHTML = "Baby not found!"; 
            sound.play();
    }

        for(i = 0; i<objects.length; i++){
              if(objects[i].label == "person"){
              document.getElementById("found").innerHTML = "Baby Found!";
              sound.stop();
              percent = floor(objects[i].confidence * 100);
              text(objects[i].label +" "+ percent +"%",objects[i].x, objects[i].y);

              noFill();
              stroke(r,g,b);
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else{
                document.getElementById("found").innerHTML = "Baby not found!"; 
                sound.play();
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
        console.error(error);
    }
    console.log(results);
    objects = results;
}