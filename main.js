var song1 = "";
var song2 = "";
var scoreleftWrist = 0;
var song1Status = "";
var leftWristX = 0;
var leftWristY = 0;

function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);

    songStatus = song1.isPlaying();

    fill("red");
    stroke("black");
    lineWidth = 4;

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if (song1Status == "false") {
            song1.play();
           document.getElementById("song").innerHTML = "Harry Potter";
        }
    }
}