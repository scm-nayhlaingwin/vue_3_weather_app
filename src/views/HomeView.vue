<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="
          py-2 px-1 w-full bg-transparent border-b
          focus:border-weather-secondary focus:outline-none 
          focus:shadow-[0px_1px_0_0_#004E71]
        "
      >
      {{ mapboxSearchResults ? 'hi' : 'hello' }}
      <ul 
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >

        <p v-if="searchError">
          Sorry, Something went wrong please try again!!
        </p>
        <p v-if="!searchError && mapboxSearchResults == null">
          No result match your query, try a different term!!
        </p>
        <template v-else>  
          <li
            class="py-2 cursor-pointer"
            @click="previewCity(mapboxSearchResults)"
          >
            {{ mapboxSearchResults.City_Town }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import allData from '@/assets/allDataOfmm.json'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const searchQuery = ref("")
  const mapboxSearchResults = ref(null)
  const searchError = ref(false)

  const getSearchResults  = () => {
    if (searchQuery.value !== '') {
      const result = allData.find( data => data.City_Town == searchQuery.value)
      mapboxSearchResults.value = result == undefined ? null : result
      searchError.value = result == undefined ? true : false
      return
    }
    mapboxSearchResults.value = null
  }
  const previewCity = (searchResult) => {
    const[city,state] = searchResult.place_name.split(",")
    router.push({
      name:'cityView',
      params: {state: state.replaceAll(" ",""),city},
      query: {
        lat: searchResult.geometry.coordinates[1],
        lng: searchResult.geometry.coordinates[0],
        preview: true
      }
    })
  }
</script>
