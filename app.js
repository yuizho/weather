window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            /* the api service is no longer available.*/
            // const api = `${lat},{long}`;

            // this is fake fetch
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const json = `{
                         "currently": {
                          "temperature": "36.15",
                          "summary": "Flurries",
                          "icon": "partly-cloudy-day"
                        },
                        "timezone": "Europe/Berin"
                    }`;
                    return resolve(JSON.parse(json));
                }, 200)
            }).then((data) => {
                const {
                    temperature,
                    summary,
                    icon
                } = data.currently;
                // set DOM Element from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // formula for celsius
                let celsius = (temperature - 32) * (5 / 9);

                // set icon
                setIcons(icon, document.querySelector(".icon"));

                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});