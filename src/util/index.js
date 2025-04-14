import axios from "axios";

// Fetch data with query parameters
const getData = async (url, params = {}) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

// Fetch all data (without params) from a given URL
const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
  }
};

export { getData, getAllData };
