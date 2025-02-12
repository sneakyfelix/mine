let video;
let handPose;
let hands = [];




function preload() {
  
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
 
  let canvas = createCanvas(200, 200);
  canvas.parent('myCanvas');


  video = createCapture(VIDEO);
  video.size(640, 480); 
  video.hide(); 

 
  handPose.detectStart(video, gotHands);
  
}

function draw() {
  
  

  
  image(video, 0, 0, width, height);

  // check for hands 
  
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let pinkyup = hand.pinky_mcp; 
    let pinkydn = hand.pinky_tip;
    
    // scrolling with pinky 

   // erm not recognizing pinky hand points?  //
    
    
    // index to thumb distance blur, size, and letter speacing 
    
    
    let d = dist(index.x, index.y, thumb.x, thumb.y);

    noStroke();
    
    let p = document.querySelector('p'); 
    let blurAmount;
    
    
    if (d<25) {
      fill(200,200, 255);
      p.style.color = 'rgb(31,180,31, random(0, 300))';
      let blurAmount = map(d, 0, 25, 20, 40); 
      p.style.letterSpacing = `${map(d, 0, 25, 2.3, 0.7)}em`;
      fontSize = map(d, 25, 0, 1.5, 1) + "em";
    }
    
    else {
      fill (0,250,200);
      p.style.color = 'rgb(31,180,31)';
     p.style.letterSpacing = `${map(d, 25, 200, 0.7, 2.3)}em`
      blurAmount = map(d, 25, 200, 10, 40);
     fontSize = map(d, 0, 25, 1, 1.2) + "em"; 
    }
    
    
    //blurAmount = constrain(blurAmount, 10, 80); 
    p.style.filter = `blur(${blurAmount}px)`
     p.style.fontSize = fontSize;
 
    square(index.x * (width / video.width), index.y * (height / video.height), 25);
    square(thumb.x * (width / video.width), thumb.y * (height / video.height), 25);
  }
}
