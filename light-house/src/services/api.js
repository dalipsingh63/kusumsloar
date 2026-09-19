// import axios from "axios";

// const API = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;



// ye api jab fontend vercel pr ho backend render pr to tb 


import axios from "axios";

const API = axios.create({
  baseURL: "https://kusumsloar-3backend.onrender.com/api",
  withCredentials: true,
});

export default API;
