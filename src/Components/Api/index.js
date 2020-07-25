import axios from 'axios';


export const totalData = async() => {
    try {
        const total = await axios.get('https://api.covid19api.com/world/total');
        return total
    } catch (error) {
        
    }
}

export const topCountries = async() => {
    try {
        const TopCountry = await axios.get('https://api.covid19api.com/summary');
        return TopCountry
    }
    catch(error) {

    }
}