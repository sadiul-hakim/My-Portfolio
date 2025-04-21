const hourSpan = document.getElementById("hour");
const minSpan = document.getElementById("min");
const secSpan = document.getElementById("sec");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const cancelBtn = document.getElementById("cancel");
const alerm = document.getElementById("alerm");

let paused = false;
let intervalId;

let hour;
let min;
let sec;

start.onclick=()=>{
	hour = hourSpan.innerText;
	min = minSpan.innerText;
	sec = secSpan.innerText;

	// Validate Time
	if(hour < 0 || hour > 99 ||
		min < 0 || min > 59 ||
		sec < 0 || sec > 59)
	{
		alert(`Invalid Time\nValid Till: 99 : 59 : 59\nNo Negative time allowed`);

		return;
	}

	setTime();

	startBtn.disabled = true;
	pauseBtn.disabled=false;
	cancelBtn.disabled=false;

	intervalId = setInterval(decrease, 1000);
}

pauseBtn.onclick = () => {
	paused = true;
	pauseBtn.disabled=true;
	resumeBtn.disabled=false;
}

resumeBtn.onclick = () => {
	paused = false;
	resumeBtn.disabled=true;
	pauseBtn.disabled=false;
}

cancelBtn.onclick = () => {
	clear();
}

function decrease(){
	if(sec <= 0 || paused){
		return;
	}

	sec--;
	secSpan.innerText = sec;
	setTime();
	
	if(finished()){
		handleFinished();
	}
}

function setTime(){
	
	if(sec == 0 && min > 0){
		secSpan.innerText = 59;
		sec = 59;
		minSpan.innerText = Number(min) - 1;
		min = Number(min) - 1;
	}

	if(sec == 0 && min == 0 && hour > 0){
		minSpan.innerText = 59;
		min = 59;
		hourSpan.innerText = Number(hour) -1;
		hour = Number(hour) -1;

		secSpan.innerText = 59;
		sec = 59;
	}
}

function finished(){
	if(hour == 0 && min == 0 && sec == 0){
		return true;
	}
	return false;
}

function handleFinished(){
	alerm.play();
	setTimeout(() => {
		confirm("Timer is finished!");
	}, 3000);
	clear();
}

function clear(){
	hour = 0;
	min = 0;
	sec = 0;

	hourSpan.innerText="00";
	minSpan.innerText="00";
	secSpan.innerText="00";

	paused = false;

	clearInterval(intervalId);

	startBtn.disabled = false;
	pauseBtn.disabled = true;
	resumeBtn.disabled = true;
	cancelBtn.disabled = true;
}