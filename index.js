const submitBtn = document.querySelector(".submit-btn");
const Floors = document.querySelector(".floor-num");
const Lifts = document.querySelector(".lift-num");
const contentDiv = document.querySelector(".content-box");
const FloorInput=document.querySelector(".floor-num");
const FloorLabel=document.querySelector(".floor-label");
const liftInput=document.querySelector(".lift-num");
const LiftLabel=document.querySelector(".lift-label");


submitBtn.addEventListener("click", () => {
    numFloor = Number(Floors.value)
    numLift = Number(Lifts.value);

   FloorInput.style.display="none";
   liftInput.style.display="none";
   FloorLabel.style.display="none";
   LiftLabel.style.display="none";
   submitBtn.style.display="none";
    contentDiv.innerHTML = "";

    const allLifts = document.createElement('div')
    allLifts.classList.add('total-lifts')

    //Create the required number of floors
    let floors = [];
    for (let i = 1; i <= numFloor; i++) {
        const floorContainer = document.createElement('div')
        const floor = document.createElement('div');
        const buttonContainer = document.createElement('div')

        floorContainer.classList.add('floor-container')
        floor.classList.add('floor')
        floor.setAttribute('data-floor', i)

        const callLift = document.createElement('button')
        const floorNumber = document.createElement('h3')
        floorNumber.textContent = `Floor ${i}`
        floorNumber.classList.add('floor-Number');
        callLift.textContent = "Button"
        callLift.classList.add('call-lift-btn')
        callLift.setAttribute('data-floor', i)
        buttonContainer.appendChild(callLift)

        floorContainer.appendChild(floorNumber)
        floorContainer.appendChild(buttonContainer)
        if (i === 1) floorContainer.append(allLifts)
        floor.appendChild(floorContainer)
        floors.unshift(floor)
    }
    for (let i = 0; i < floors.length; i++) {
        contentDiv.appendChild(floors[i])
    }

    //Add the required number of lifts to the floors
    for (let i = 1; i <= numLift; i++) {
        const lift = document.createElement('div')
        lift.setAttribute('class', 'lift')
        lift.setAttribute('data-floor', 1)
         
        leftDoor=document.createElement('div');
        RightDoor=document.createElement('div');

        leftDoor.setAttribute("class", "left-door");
        RightDoor.setAttribute("class", "right-door");

       lift.appendChild(leftDoor);
       lift.appendChild(RightDoor);

        lift.setAttribute('data-lift', i)
        allLifts.appendChild(lift);
    }
})




let x=0;
let floorArr=[];
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("call-lift-btn")){
    const selectedFloor = Number(e.target.dataset.floor)

    if(selectedFloor===x){
      return;
    }
    else{
      floorArr.push(selectedFloor);
      if(floorArr.length>=1){
        MoveLift()
      }
    }
    x=selectedFloor;
  }
});

function LiftStatus(targetFloor, selectedLift, distance){
  console.log("floor : ", targetFloor)
  console.log("lift : ", selectedLift)

  const liftOnFloor = Number(selectedLift.dataset.floor);
  if (liftOnFloor !== targetFloor) {
    selectedLift.style.transition = `all ${distance * 2}s ease-in-out`;
    selectedLift.style.transform = `translateY(${-130 * (targetFloor - 1)}px)`;
    selectedLift.dataset.floor = targetFloor;

    selectedLift.classList.add("busy");

    setTimeout(()=>{
      selectedLift.children[0].style.transform="translateX(-100%)";
      selectedLift.children[1].style.transform="translateX(100%)"
    },distance * 2000 + 2000)

    setTimeout(() => {
      selectedLift.children[0].style.transform="none";
      selectedLift.children[1].style.transform="none"
    },distance*2000 + 4000)

    setTimeout(()=>{
      selectedLift.classList.remove("busy");
      // const nextFloor=floorArr[0];
      // if(nextFloor!==undefined){
      //   MoveLift();
      // }
    },distance*2000 + 7000)
   

  } 
  else {
    selectedLift.classList.add("busy");
    setTimeout(()=>{
      selectedLift.children[0].style.transform="translateX(-100%)";
      selectedLift.children[1].style.transform="translateX(100%)"
    },distance*2000+1000)

    setTimeout(() => {
      selectedLift.children[0].style.transform="none";
      selectedLift.children[1].style.transform="none"
    },distance*2000 + 4000);

    setTimeout(()=>{
      selectedLift.classList.remove('busy');
      // const nextFloor=floorArr[0];
      // if(nextFloor!==undefined){
      //   MoveLift();
      // }
    },distance*2000 + 7000);
  }
}

function MoveLift(){
  let lifts=[];

  let selectLift=document.getElementsByClassName('lift');
  for(let i=0;i<selectLift.length;i++){
    lifts.push(...selectLift);
  }
  const clickedFloor=floorArr[0];

  const freeLift = lifts.filter(lift => !lift.classList.contains('busy'))
  let distance = null;

  if(freeLift.length>=1){
    for(i=0;i<freeLift.length;i++){
      const floorDistance=Math.abs(clickedFloor-(freeLift[i].dataset.floor))
      console.log("floordistance"+floorDistance)
      if(distance==null || floorDistance<=distance){
        distance=floorDistance;
        liftAvailable=freeLift[i];
      }
    }
    LiftStatus(clickedFloor,liftAvailable,distance);
    floorArr.shift();
    console.log("floorArr"+floorArr[i]);
  }
  else{
    setTimeout(()=>{
      MoveLift()
    },1000);
  }
}