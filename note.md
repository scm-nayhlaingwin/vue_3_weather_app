 // get hourly weather data
            // const hourlyForecast = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lng}&current_weather=true&past_days=7&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
            // const hourlyForecast = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
            // // const hourlyForecast = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${route.query.lat}&lon=${route.query.lng}&appid=${weatherApiKey}`)
            
            // const hourly = hourlyForecast.data.hourly
            // // set hour for current day
            // hourly.time.forEach(time => {
            //     hourlyWeatherData.value.push({
            //         hour: new Date(time).toLocaleTimeString([], {hour: '2-digit'}),
            //         temp: null
            //     })
            // });
            // // set temperature for current day
            // hourly.temperature_2m.forEach((temp,index) => {
            //     hourlyWeatherData.value[index].temp = Math.round(temp)
            // });
             // calculate current date & time
            // 1000 milliseconds = 1 second, and 1 minute = 60 seconds. Therefore,
            // converting minutes to milliseconds involves multiplying by 60 * 1000 = 60000.
            // const localOffset = new Date().getTimezoneOffset() * 60000;
            // const utc = weatherData.data.dt * 1000 +localOffset;
            
            // new Date('2023-03-20T01:00').toLocaleTimeString([], {hour: '2-digit'});
            // hourlyForecast.data.forEach(element => {
                
            // });