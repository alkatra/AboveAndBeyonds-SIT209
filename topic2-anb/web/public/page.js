document.getElementById("first-row").style.backgroundColor = "lightblue";

document.getElementById("color-red").style.backgroundColor = "pink";
document.getElementById("color-blue").style.backgroundColor = "lightblue";
document.getElementById("color-grey").style.backgroundColor = "lightgrey";
document.getElementById("color-orange").style.backgroundColor = "orange";
document.getElementById("color-green").style.backgroundColor = "lightgreen";
document.getElementById("color-plum").style.backgroundColor = "plum";
document.getElementById("color-slateblue").style.backgroundColor = "slateblue";
document.getElementById("color-lightsalmon").style.backgroundColor = "lightsalmon";
document.getElementById("color-khaki").style.backgroundColor = "khaki";
document.getElementById("color-seagreen").style.backgroundColor = "seagreen";
document.getElementById("color-rosybrown").style.backgroundColor = "rosybrown";

const API_URL = 'http://localhost:5000/api';
var items = 0;
var colors = [];
var selectedLight = 0;

$.get(`${API_URL}/lights`)
.then(
  response => {
    let i = 0;
    response.forEach(light => {
      $('#lightListTable tbody').append(`
        <tr>
          <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="light${i}">
          <label class="form-check-label" for="flexRadioDefault1">${light.id}</label></td>
          <td>${light.name}</td>
        </tr>
        <script>console.log("item ${i} loaded.");</script>`
      );     
      i++;
      items = i;
    });
})
.catch(error => {
  console.error(`Error: ${error}`);
});


$('#light-adder').on('click', () => {
    const id = $('#id').val();
    const name = $('#light-name').val();

  const body = {
    id,
    name
  };

  $.post(`${API_URL}/lights`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
})

function colorchanger(colorname) {
  colors[selectedLight] = colorname;
  console.log("color of " + selectedLight + " changed to " + colors[selectedLight]);
  document.getElementById("first-row").style.backgroundColor = colors[selectedLight];
}

function resolveLater() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");

      for(let i = 0; i < items; i++) {
        colors[i] = "lightblue"; // default color for lights
      }
      for(let i = 0; i < items; i++) {
        $('#light'+i).on('click', () => {
          selectedLight = i;
          console.log("light " + selectedLight + " selected.");
          document.getElementById("first-row").style.backgroundColor = colors[i];
        })
      }
    }, 1000);
  });
}

async function asyncCall() {
  console.log("start");
  const result = await resolveLater();
  console.log(result);
}

asyncCall();

