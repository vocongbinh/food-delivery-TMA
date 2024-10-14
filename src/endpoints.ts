import axios from 'axios';

// Tạo một instance của axios
export const ContractInstance = axios.create({
  baseURL: import.meta.env.VITE_CONTRACT_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
});