import React, { Component } from "react";

class ClockWatcher extends Component {

  canvas = "";
  ctx = "";
  radius = "";

  constructor(props) {
    super(props);
    this.dateUTC = props.utc;
    this.canvasID = props.id;
    var date = new Date();
    this.state = {date: new Date(date.toLocaleString('en-US', { timeZone: this.dateUTC })), running: true, showClock: true, afterClickShowHide: false};
  }

  componentDidMount() {
    // Draw clock watcher
    this.canvas = document.getElementById("canvas" + this.canvasID);
    this.ctx = this.canvas.getContext("2d");
    this.radius = this.canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = this.radius * 0.90;

    this.setState({firstRun: false});

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    if (this.state.afterClickShowHide && this.state.showClock)
    {
      // Draw clock watcher
      this.canvas = document.getElementById("canvas" + this.canvasID);
      this.ctx = this.canvas.getContext("2d");
      this.radius = this.canvas.height / 2;
      this.ctx.translate(this.radius, this.radius);
      this.radius = this.radius * 0.90;
      this.setState({afterClickShowHide: false});
    }
  }

  tick() {
    if (this.state.running)
    {
      var date = new Date();
      this.setState({
        date: new Date(date.toLocaleString('en-US', { timeZone: this.dateUTC })), running: true
      });

      this.drawClock(this.state.date);
    }
  }

  // Functions re-draw clock watcher
  drawClock(date) {
    this.drawFace(this.ctx, this.radius);
    this.drawNumbers(this.ctx, this.radius);
    this.drawTime(this.ctx, this.radius, date);
  }
  
  drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }
  
  drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
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
  
  drawTime(ctx, radius, date){
      //var now = new Date();
      var now = date;
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      //hour
      hour=hour%12;
      hour=(hour*Math.PI/6)+
      (minute*Math.PI/(6*60))+
      (second*Math.PI/(360*60));
      this.drawHand(ctx, hour, radius*0.5, radius*0.07);
      //minute
      minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
      this.drawHand(ctx, minute, radius*0.8, radius*0.07);
      // second
      second=(second*Math.PI/30);
      this.drawHand(ctx, second, radius*0.9, radius*0.02);
  }
  
  drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
  }

  stopClockWatcher() {
    this.setState({running: false});
  }

  resumeClockWatcher() {
    this.setState({running: true});
  }

  showToday() {
    alert("Hom nay la: " + this.state.date.toString());
  }

  showHide() {
    this.setState({afterClickShowHide: true});
    if (this.state.showClock) this.setState({showClock: false});
    else
    {
      

    this.setState({showClock: true});
    } 
  }

  render() {
    console.log(this.state.running);
    return (
      <div>
        {
          this.state.showClock ? 
            <div>
              <canvas id={`canvas` + this.canvasID} width="400" height="400" style={{backgroundColor:'#333'}}></canvas>
            </div> : 
            <div></div>
        }
        <div>
          <button id="resume" onClick={() => this.resumeClockWatcher()}>Resume Clock</button>
        </div>
        <div>
          <button id="stop" onClick={() => this.stopClockWatcher()}>Stop Clock</button>
        </div>
        <div>
          <button id="xuLySuKien" onClick={() => this.showToday()}>Show Today</button>
        </div>
        <div>
          <button id={`showHidebtn` + this.canvasID} onClick={() => this.showHide()}>{this.state.showClock ? "Hide" : "Show"}</button>
        </div>
      </div>
    );
  }
}

export default ClockWatcher;
