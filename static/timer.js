var timer

function startTimer(canvas, duration) {

  //var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.save();
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90;
  var endDate = new Date();
  endDate.setSeconds(endDate.getSeconds()+duration);
  timer = setInterval(updateClock, 1000, ctx, radius, endDate);
  }

function resetClock(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90;
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  ctx.strokeStyle="black";
  //hour
  drawHand(ctx, 0, radius*0.5, radius*0.05);
  //minute
  drawHand(ctx, 0, radius*0.8, radius*0.05);
  // second
  drawHand(ctx, 0, radius*0.9, radius*0.015);
}

function updateClock(ctx, radius, duration) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius, duration);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, 'red');
  //grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, 'red');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.05;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = "bold "+ radius*0.15 + "px sans-serif";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius, endDate){
    var now = new Date(); //calculate now
    //var hour = endDate.getHours() - now.getHours();
    //var minute = endDate.getMinutes() - now.getMinutes();
    var secondsLeft = Math.floor((endDate.getTime() - now.getTime()) / 1000);
    if (secondsLeft <= 0)
    {
      alert("Done!");
      clearInterval(timer);
      //ctx.restore();
    }
    var second = secondsLeft % 60;
    var minute = Math.floor(secondsLeft / 60) % 60;
    var hour = Math.floor(secondsLeft / 3600);

    var hours = document.getElementById("hours");
    hours.value = hour
    var minutes = document.getElementById("minutes");
    minutes.value = minute
    var seconds = document.getElementById("seconds");
    seconds.value = second




    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    ctx.strokeStyle = "black";
    drawHand(ctx, hour, radius*0.5, radius*0.05);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.05);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.015);



}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


