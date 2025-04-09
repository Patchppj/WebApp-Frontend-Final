'use client';

import { useRouter } from 'next/navigation';
import axiosService from '@/service/axiosService';
import useMainStore from '@/store/mainStore';

export default function Send() {
    const router = useRouter();
    const { setUserData, userData, setResultDiabetesData, setResultHypertentionData, resultDiabetesData, resultHypertentionData } = useMainStore();

    const handleStartClick = async () => {
        try {
            await Promise.all([
                onReqDiabetesPredict(),
                onReqHypertentionPredict()
            ]);
            // Navigate to result page after both API calls are successful
            router.push('/result');
        } catch (error) {
            console.error('Error processing requests:', error);
        }
    }

    const onReqDiabetesPredict = async () => {
        const response = await axiosService.reqDiabetesPredict(userData);
        setResultDiabetesData(response.data);
        return response;
    };

    const onReqHypertentionPredict = async () => {
        const response = await axiosService.reqHypertentionPredict(userData);
        setResultHypertentionData(response.data);
        return response;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
            <div className="max-w-2xl w-full text-center space-y-5">
                {/* Doctor Character */}
                <div className="relative">
                    <img
                        src="/images/83.png"
                        alt="Send"
                        className="w-70 mx-auto"
                    />
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-green-800">
                        ตอบแบบสอบถามครบถ้วน
                    </h1>
                </div>

                {/* Start Button */}
                <div className="mb-[10px]">
                    <button
                        onClick={() => handleStartClick()}
                        className="bg-[#165B33] hover:bg-[#124a29] text-white px-10 py-4 rounded-full transition-all cursor-pointer hover:transform hover:-translate-y-1 w-60 text-lg"
                    >
                        ส่งแบบสอบถาม
                    </button>
                </div>
            </div>
        </div>
    );
}