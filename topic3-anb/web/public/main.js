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

class currentUserClass {
    constructor(username, climSetting, seatSetting, lightColor, addresses) {
        this.username = username;
        this.climSetting = climSetting;
        this.seatSetting = parseInt(seatSetting);
        this.lightColor = lightColor;
        this.addresses = addresses;
    } 
}

$.get(`${API_URL}/users`).then(
    response => {
        response.forEach(users => {
            if(users.username == curUser) {
                console.log("checking");
                currentUser = new currentUserClass(users.username, users.climSetting, users.seatSetting, users.lightColor, users.addresses);
            }
        });
    })

$('#temp-increase').on('click', () => {
    currentUser.climSetting++;
    const username_ = currentUser.username;
    const newtemp = JSON.stringify(currentUser.climSetting);
    const body = {username_,newtemp};
    
    $.post(`${API_URL}/users/update/temp`, body).then(response => {
        location.href = '/success';
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      });
})

$('#temp-decrease').on('click', () => {
  currentUser.climSetting--;
  const username_ = currentUser.username;
  const newtemp = JSON.stringify(currentUser.climSetting);
  const body = {username_,newtemp};
  
  $.post(`${API_URL}/users/update/temp`, body).then(response => {
      location.href = '/success';
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
})

$('#seat-increase').on('click', () => {
  currentUser.seatSetting += 10;
  const username_ = currentUser.username;
  const newseat = currentUser.seatSetting;
  const body = {username_,newseat};
  
  $.post(`${API_URL}/users/update/seat`, body).then(response => {
      // location.href = '/success';
      updateSeat();
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
})

$('#seat-decrease').on('click', () => {
  currentUser.seatSetting -= 10;
  const username_ = currentUser.username;
  const newseat = currentUser.seatSetting;
  const body = {username_,newseat};
  
  $.post(`${API_URL}/users/update/seat`, body).then(response => {
      // location.href = '/success';
      updateSeat();
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
})

$('#new-address').on('click', () => {
  
  const username_ = currentUser.username;
  const newaddress = $('#addressx').val();
  const body = {username_,newaddress};
  console.log(body);
  
  $.post(`${API_URL}/users/update/address`, body).then(response => {
      location.href = '/success';
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
})

function updateSeat() {
  document.getElementById("seat-div").style.transform = `translate(${currentUser.seatSetting}px)`;
}

function addressAdder(idx) {
  $('#addressTable tbody').append(`
        <tr>
          <td>${currentUser.addresses[idx]}</td>
        </tr>
        <script>console.log("item ${idx} loaded.");</script>`
      ); 
}

function colorchanger(colorname) {
  currentUser.lightColor = colorname;
  document.getElementById("current-ambience").style.backgroundColor = currentUser.lightColor;

  const username_ = currentUser.username;
  const newcolor = currentUser.lightColor;
  const body = {username_,newcolor};
  console.log(body);

  $.post(`${API_URL}/users/update/color`, body).then(response => {
    // location.href = '/success';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function resolveLater() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("resolved");
        console.log("current user: " + curUser);
        $('#add-temp').append(`${currentUser.climSetting} degrees.`);
        updateSeat();
        for(let i = 0; i< currentUser.addresses.length; i++) {
          addressAdder(i);
        }
        document.getElementById("current-ambience").style.backgroundColor = currentUser.lightColor;
      }, 150);
    });
  }
  
  async function asyncCall() {
    console.log("start");
    const result = await resolveLater();
    console.log(result);
  }
  
  asyncCall();