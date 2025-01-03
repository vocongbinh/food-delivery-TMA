import axios from 'axios';

// Tạo một instance của axios
export const ContractInstance = axios.create({
  baseURL: import.meta.env.VITE_CONTRACT_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
  timeout: 100000
});

export const endpoint = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
  timeout: 100000
});
