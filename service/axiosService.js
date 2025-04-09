import axios from 'axios';

// สร้าง instance ของ axios แบบง่าย
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://web-d1geyfeenwte.up-de-fra1-k8s-1.apps.run-on-seenode.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

// เพิ่ม interceptor สำหรับจัดการ response error
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // จัดการ error ที่นี่
        if (error.response) {
            // กรณีเซิร์ฟเวอร์ตอบกลับด้วย status code นอกเหนือจาก 2xx
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // กรณีที่ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์
            console.error('Request error:', error.request);
        } else {
            // กรณีอื่นๆ
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

const axiosService = {
    reqDiabetesPredict: (userData) => axiosInstance.post("/diabetes/predict", userData),
    reqHypertentionPredict: (userData) => axiosInstance.post("/hypertention/predict", userData),
};

export default axiosService;