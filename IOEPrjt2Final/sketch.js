// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example

Based on PoseNet example using p5.js provided by Doug Witten
=== */

let video;
let poseNet;
let poses = [];
const myRec = new p5.SpeechRec()
const myVoice = new p5.Speech('Google UK English Female')

let word = ''

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    poseNet.on('pose', function (results) {
        poses = results;
    });

    video.hide();

    myRec.onResult = function () {
        if (myRec.resultValue) {
            word = myRec.resultString
        }
    }
    myRec.continuous = true
    myRec.start()

    myVoice.speak('Welcome. Please say something')
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 0, 0, width, height);
    //filter(THRESHOLD, 1);

    if (poses.length > 0) {
        const pose = poses[0].pose;


        fill(255, 0, 0);
        const nose = pose.nose;
        //ellipse(nose.x, nose.y, 20, 20);
        triangle(nose.x - 20, nose.y, nose.x + 20, nose.y, nose.x, nose.y - 40);

        fill(255, 255, 255);
        text(word, nose.x + 50, nose.y + 50);
        
        arc(nose.x, nose.y + 30, 80, 50, PI, TWO_PI, CHORD);

        fill(255, 255, 255);
        const rightEye = pose.rightEye;
        arc(rightEye.x, rightEye.y, 50, 50, 0, PI + QUARTER_PI, CHORD);


        fill(255, 255, 255);
        const leftEye = pose.leftEye;
        arc(leftEye.x, leftEye.y, 50, 50, 0 - QUARTER_PI, PI, CHORD);
        
        fill(255,255,255);
        quad(rightEye.x - 30, rightEye.y - 60, rightEye.x + 20, rightEye.y - 30, rightEye.x + 20, rightEye.y - 20, rightEye.x - 30, rightEye.y - 40);
        
        quad(leftEye.x + 20, leftEye.y - 60, leftEye.x -30, leftEye.y - 30, leftEye.x - 30, leftEye.y - 20, leftEye.x + 20, leftEye.y -40);

    }

}
