//useFetcher.js

//import ref function to define reactive properties
import {ref} from 'vue'

export default function useFetcher(){

    const data = ref(null);

    async function fetchData() {
        let baseUrl = "http://wandern.cube-online.de/";
        if (process.env.NODE_ENV === "development") {
          baseUrl = "http://localhost:8080/"
        } 
        console.log("baseURL " , baseUrl);
        const res = await fetch(baseUrl + 'content/data.json')
        data.value = await res.json()
        return data.value
    }
    return {
        data,
        fetchData 
    }
}