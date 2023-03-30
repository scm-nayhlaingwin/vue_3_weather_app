<template>
    <div class="flex flex-col flex-1 items-center">
        <div
            v-if="route.query.preview"
            class="test"
        >
            <p>
                You are currently previewing this city, click the "+" icon to start tracking this city.
            </p>
        </div>
        <!-- Weather overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ route.params.city }}</h1> 
            <p class="text-sm mb-12">
                {{ currentDateTime }}
            </p>
            <p class="text-6xl mb-8">
                {{ celsiusFahrenheit }}<sup 
                    class="text-4xl cursor-pointer"
                    :class="{'text-gray-500': !isActive}" 
                    @click="celsiusOrFahrenheit('celsius')"
                >°C</sup>
                <sup 
                    class="text-4xl cursor-pointer fahrenheit" 
                    :class="{'text-gray-500': isActive}"
                    @click="celsiusOrFahrenheit('fahrenheit')"
                >°F</sup>
            </p>
            <p>
                Feels like
                {{  Math.round(weatherData.current.feelslike_c) }}<sup>°C</sup>
            </p>
            <p class="capitalize">
                {{ weatherData.current.condition.text }}
            </p>
            <img 
                class="w-[150px] h-auto"
                :src="weatherData.current.condition.icon" alt="Weather icon"
            >
        </div>
        <!-- Hourly weather of current day-->
        <hr class="w-full border border-white border-opacity-10">
        <div class="w-full max-w-screen-md py-10">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-auto customize-scroll pb-2">
                    <div
                        v-for="data in hourlyWeatherData"
                        :key="data.id"
                        class="flex flex-col gap-4 items-center"
                    >
                        <p class="whitespace-nowrap text-md">
                            {{ data.hour }}
                        </p>
                        <img 
                            class="w-[50px] h-auto"
                            :src="data.icon" alt="Weather icon"
                        >
                        <p class="text-md">{{ data.temp }}&deg;</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Weekly weather -->
        <hr class="w-full border border-white border-opacity-10">
        <div class="w-full max-w-screen-md py-10">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Days Forecast</h2>
                <div
                    v-for="data in weeklyWeatherData"
                    :key="data.id"
                    class="flex items-center"
                >
                <p class="flex-1"> {{ data.day }}</p>
                <img 
                    class="w-[50px] h-[50px] object-cover"
                    :src="data.icon" alt="Weather icon"
                >
                <div class="flex gap-2 flex-1 justify-end">
                    <p>H: {{ data.max_temp }}</p>
                    <p>L: {{ data.min_temp }}</p>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from "vue"
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    /**
     * data
     */
    const route = useRoute()
    const celsiusFahrenheit = ref(0)
    const isActive = ref(true)
    const hourlyWeatherData = ref([])
    const weeklyWeatherData = ref([])

    /**
     * methods
     */ 
    // get weather data
    const getWeatherData = async () => {
        try { 
            const ApiKey = '4f9d9f94cbff477288b43522232003';
            const latLang = `${route.query.lat},${route.query.lng}`
            const forecast_day = 7
            const weatherData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${latLang}&days=${forecast_day}&aqi=yes&alerts=yes`)
            
            return weatherData.data
        } catch (error) {
            console.log(error);
        }
    }

    const weatherData = await getWeatherData()
    // set hourly data of current day
    weatherData.forecast.forecastday[0].hour.forEach((data, index) => {
        hourlyWeatherData.value.push({
            id: index,
            hour: new Date(data.time).toLocaleTimeString('en-us', {hour: 'numeric'}),
            temp: Math.round(data.temp_c),
            text: data.condition.text,
            icon: data.condition.icon
        })
    });

    // set hourly data of current day
    weatherData.forecast.forecastday.forEach((data, index) => {
        weeklyWeatherData.value.push({
            id: index,
            date: data.date,
            day: new Date(data.date).toLocaleDateString("en-us",{weekday: 'long'}),
            max_temp: Math.round(data.day.maxtemp_c),
            min_temp: Math.round(data.day.mintemp_c),
            text: data.day.condition.text,
            icon: data.day.condition.icon
        })
    });

    // calculate celsius or fahrenheit
    const celsiusOrFahrenheit = (value) => {
        if (value == 'celsius') {
            celsiusFahrenheit.value = Math.round((weatherData.current.temp_f - 32) * 5/9) 
            isActive.value = true
        } else {
            celsiusFahrenheit.value = Math.floor(weatherData.current.temp_f)
            isActive.value = false
        }
    }
    // change celsius to fahrenheit
    // const changeCelsiusToFahrenheit = (value) => {
    //     hourlyWeatherData.value = hourlyWeatherData.value.map( data => {
    //         return {
    //             id: data.id,
    //             hour: data.hour,
    //             temp:  value == 'celsius' ? Math.round(data.temp) :Math.floor(( data.temp * 9/5 ) + 32),
    //             text: data.text,
    //             icon: data.icon
    //         }
    //     })
    // }
    /**
     * mounted
     */
    onMounted(() => celsiusOrFahrenheit('celsius'))

    /**
     * computed
     */
    // get current date & time
    const currentDateTime = computed(() => {
        const date = new Date().toLocaleDateString(
                    "en-us",
                    {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long'
                    }
                )
        const time = new Date().toLocaleTimeString(
                    "en-us",
                    {
                        timeStyle: 'short'
                    }
                )
        return `${date} ${time}`

    })

    console.log(weeklyWeatherData);
</script>

<style scoped>
    .fahrenheit::before {
        content: '|';
        color: #fff;
        padding: 0 3px 0 5px;
        font-size: 35px;
        bottom: 3px;
        position: relative;
        opacity: 0.5;
        font-weight: 300;
    }
        
    /* width */
    .customize-scroll::-webkit-scrollbar {
        height: 3px;
    }

    /* Track */
    .customize-scroll::-webkit-scrollbar-track {
        background: transparent; 
    }
    
    /* Handle */
    .customize-scroll::-webkit-scrollbar-thumb {
        width: 130px;
        background: #b9fafa; 
        outline: 1px solid rgb(159, 226, 254);
        border-radius: 5px;
    }
</style>