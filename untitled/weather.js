
window.addEventListener("load", () =>{
    let temp = document.querySelector(".degree");
    let desc = document.querySelector(".description");
    let tim = document.querySelector(".timezone");
    let degs = document.querySelector(".degreesection");
    let la = document.querySelector(".label");
    let hour = document.querySelector(".hour");
    let longi = document.querySelector(".longi");
    let lati = document.querySelector(".lati");
    let sel = document.querySelector(".butto");



   if (navigator.geolocation){
       let longitude;
       let latitude;
       navigator.geolocation.getCurrentPosition((position) => {
          longitude = position.coords.longitude;
          latitude = position.coords.latitude;
          let proxy = 'https://cors-anywhere.herokuapp.com/';
          let api = `${proxy}https://api.darksky.net/forecast/{YOUR API KEY}/${longitude},${latitude}`;
          let api2 = `http://api.timezonedb.com/v2.1/get-time-zone?key=VD5XRK6GDOGC&format=json&by=position&lat=${latitude}&lng=${longitude}`;
           window.setInterval(()=>{
               fetch(api2)
                   .then((response2) =>{
                       return response2.json();
                   })
                   .then((data2)=>{
                       hour.textContent = data2.formatted;
                   });
           }, 1000);
          fetch(api)
              .then((response) => {
                  return response.json();
              })
              .then((data) => {

                  console.log(data);
                  tim.textContent = data.timezone;
                  let {temperature, icon} = data.currently;
                  let summary = data.daily.summary;
                  temp.textContent = temperature;
                  desc.textContent = summary;
                  let trueicon = icon.replace(/-/g, '_').toUpperCase();
                  let skycons = new Skycons({"color": "white"});
                  skycons.add("icon1", Skycons[trueicon]);
                  skycons.play();

                  sel.addEventListener("click", ()=>{
                      let longitude = parseFloat(longi.value);
                      let latitude = parseFloat(lati.value);
                      api2 = `http://api.timezonedb.com/v2.1/get-time-zone?key=VD5XRK6GDOGC&format=json&by=position&lat=${latitude}&lng=${longitude}`;
                      if ((isNaN(longitude)||isNaN(latitude)|| (-180 > longitude) || (longitude > 180) || (latitude < -90) || (latitude > 90))){
                          tim.textContent = "Invalid Coordinates!";
                          la.textContent = "";
                          temp.textContent = "";
                          desc.textContent = "";
                      }else{
                          api = `${proxy}https://api.darksky.net/forecast/4e5fc308fd2d82f77cf9bca92642b482/${longitude},${latitude}`;
                          fetch(api)
                              .then((response2)=>{
                                  return response2.json();
                              })
                              .then((data2)=>{
                                  tim.textContent = data2.timezone;
                                  let {temperature, icon} = data2.currently;
                                  let summary = data2.daily.summary;
                                  temp.textContent = temperature;
                                  if (la.textContent === ""){
                                      la.textContent = "F";
                                  }
                                  desc.textContent = summary;
                                  let trueicon = icon.replace(/-/g, '_').toUpperCase();
                                  let skycons = new Skycons({"color": "white"});
                                  skycons.add("icon1", Skycons[trueicon]);
                                  skycons.play();

                              });
                      }
                  });
                  degs.addEventListener("click", () =>{
                      if (la.textContent === 'F'){
                          let cel = (temp.textContent - 32)*(5/9);
                          cel = parseFloat(cel.toFixed(3));
                          temp.textContent = cel.toFixed(2);
                          la.textContent = 'C';
                      }else{
                          let far = temp.textContent*(9/5) + 32;
                          far = parseFloat(far.toFixed(3));
                          temp.textContent = far.toFixed(2);
                          la.textContent = 'F';
                      }

                  });

              });
       });

   }else{
       alert("The content requires the permission to locate your position!");
   }

});
