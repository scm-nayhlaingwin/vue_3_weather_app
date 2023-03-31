<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state, Start with UpperCase"
        class="
          py-2 px-1 w-full bg-transparent border-b
          focus:border-weather-secondary focus:outline-none 
          focus:shadow-[0px_1px_0_0_#004E71]
        "
      >
      <div 
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px] custom-h"
      >
        <p v-if="searchError">
          Sorry, No result match your query, try a different term!!!!
        </p>
        <template v-else>  
          <div
            v-for="data in mapboxSearchResults"
            :key="data.id"
            class="py-2 cursor-pointer"
            @click="previewCity(data)"
          >
            {{ city(data) }}
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
  import allData from '@/assets/allDataOfmm.json'
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const searchQuery = ref("")
  const mapboxSearchResults = ref(null)
  const searchError = ref(false)

  const city = computed(() => {
    return (data) => {
      return data.City_Town == data.City ? `${data.City_Town}, ${data.Region}` : `${data.City_Town} ${data.City}, ${data.Region}`
    }
  })
  const getSearchResults  = () => {
    if (searchQuery.value !== '') {
      const result = allData.filter( data => {
        if (
          data.City_Town.includes(searchQuery.value) ||
          data.Region.includes(searchQuery.value)
        ) return data
      })
      mapboxSearchResults.value = (result == undefined) || (result.length < 1) ? [] : result
      searchError.value = (result == undefined) || (result.length < 1) ? true : false
      return
    }
    mapboxSearchResults.value = null
  }
  const previewCity = (searchResult) => {
    const[city,state] = [searchResult.City_Town, searchResult.Region]
    router.push({
      name:'cityView',
      params: {state, city},
      query: {
        lat: searchResult.Lattitude,
        lng: searchResult.Longitude,
        preview: true
      }
    })
  }
</script>
<style scoped>
  .custom-h {
    max-height: 80vh;
    overflow-y: auto;
  }
  
.custom-h::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: #F5F5F5;
}

.custom-h::-webkit-scrollbar
{
	width: 7px;
	background-color: #F5F5F5;
}

.custom-h::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #5cdff3;
}
</style>