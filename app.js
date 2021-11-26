const debug = document.getElementById("debug");
const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

function setContent(domId, content) {
  document.getElementById(domId).innerHTML = content;
}
// first 4 cards
fetch("https://hf3xzw.deta.dev/")
  .then((r) => r.json())
  .then((body) => {
    for (let index = 0; index < 4; index++) {
      const sensor = JSONToSensor(body["sensors"][index]);


      let newCard = document.createElement("div");
      newCard.innerHTML = `
        <h2>${sensor.description}</h2>
          <h2>ID:${sensor.id}</h2>
          <h2><span>lat: </span>${sensor.lat}</h2>
          <h2><span>lng: </span>${sensor.lng}</h2>
          <h2><span>place: </span>${sensor.place}</h2>

          <h2>readonly: <button class="button" onclick="changeStatusSensor${index}()" />
          <label for="readonly"></label><span id="sensorReadOnlytf${index}">${sensor.readonly}</span></h2>
      
          <h2><span>state_code: </span>${sensor.state_code}</h2>
          <h2><span>value: </span><span id="sensorValuetf${index}">${sensor.value}</span></h2> 
      `;

      newCard.classList.add("card1");
      newCard.classList.add("hvr-float", "hvr-bounce-to-top");
      container1.appendChild(newCard);
    }
  });

// last four cards
let request = 0;
fetch("https://hf3xzw.deta.dev/")
  .then((r) => r.json())
  .then((body) => {
    for (let index = 4; index < 8; index++) {
      const sensor = JSONToSensor(body["sensors"][index]);

      let newCard = document.createElement("div");
      newCard.innerHTML = `
          <h2><span></span>${sensor.description}</h2>
          <h2><span>ID: </span>${sensor.id}</h2>
          <h2><span>lat: </span>${sensor.lat}</h2>
          <h2><span>lng: </span>${sensor.lng}</h2>
          <h2><span>place: </span>${sensor.place}</h2>
      
      <h2><span>readonly: </span>${sensor.readonly}</h2>
      
       <h2><span>state_code: </span>${sensor.state_code}</h2>
          <h2><span>value: </span>${sensor.value}</h2>  
      <div style=" width: 100%; margin-bottom: 10px; margin-top 20px;">
        <canvas id="myChart${index}"></canvas>
      </div>
      `;

      newCard.classList.add("card2");
      newCard.classList.add("hvr-grow", "hvr-round-corners");
      container2.appendChild(newCard);

      let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //x
      let datas = [];                               //y

      for (let index = 0; index < 10; index++) {
        fetch("https://hf3xzw.deta.dev/")
          .then((r) => r.json())
          .then((body) => {
            const sensorLabel = JSONToSensor(body["sensors"][5]);
            request++;
            datas.push(sensorLabel.value);  //mette le temps nella y
            if (request == 40) {
              document.getElementById("spinner").style.display = "none";  
              document.getElementById("container2").style.display = "flex"; //tolgo lo spinner e mostro le altre card
            }
          });
      }
      //Proprietà grafiche
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Dati",
            backgroundColor: "#8cacd0",
            borderColor: "black",
            data: datas,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          lineTension: 0,
          scales: {
            y: {
              lineHeight: 3,
              ticks: {
                callback: function (value, index, values) {
                  return value + "°"; //gradi
                },
              },
            },
          },
        },
      };
      let nomeChart = "myChart" + index;  //inserire ogni grafico nella card
      const myChart = new Chart(document.getElementById(nomeChart), config);
    }
  });

let sensor0 = false;
let sensor1 = false;
let sensor2 = false;
let sensor3 = false;

function changeStatusSensor0() {
  if (sensor0 == false) {
    document.getElementById("sensorValuetf0").innerText = "true";
    document.getElementById("sensorReadOnlytf0").innerText = "true";
    sensor0 = true;
  } else {
    document.getElementById("sensorValuetf0").innerHTML = "false";
    document.getElementById("sensorReadOnlytf0").innerText = "false";
    sensor0 = false;
  }
  changeStatus(1);
}
function changeStatusSensor1() {
  if (sensor1 == false) {
    document.getElementById("sensorValuetf1").innerText = "true";
    document.getElementById("sensorReadOnlytf1").innerText = "true";
    sensor1 = true;
  } else {
    document.getElementById("sensorValuetf1").innerHTML = "false";
    document.getElementById("sensorReadOnlytf1").innerText = "false";
    sensor1 = false;
  }
  changeStatus(1);
}
function changeStatusSensor2() {
  if (sensor2 == false) {
    document.getElementById("sensorValuetf2").innerText = "true";
    document.getElementById("sensorReadOnlytf2").innerText = "true";
    sensor2 = true;
  } else {
    document.getElementById("sensorValuetf2").innerHTML = "false";
    document.getElementById("sensorReadOnlytf2").innerText = "false";
    sensor2 = false;
  }
  changeStatus(1);
}
function changeStatusSensor3() {
  if (sensor3 == false) {
    document.getElementById("sensorValuetf3").innerText = "true";
    document.getElementById("sensorReadOnlytf3").innerText = "true";
    sensor3 = true;
  } else {
    document.getElementById("sensorValuetf3").innerHTML = "false";
    document.getElementById("sensorReadOnlytf3").innerText = "false";
    sensor3 = false;
  }
  changeStatus(1);
}