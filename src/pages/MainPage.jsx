import { useState, useEffect } from 'react';
import { API_URL } from "../config/const.js";
import mainImg from "../images/mainBackground.png";
import dkImg from "../images/douzone_knu.png"
import phoneImg from "../images/phone.png";
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    
    return (
        <div
            id="mainPage">
            <img src={dkImg} className='w-[300px] sm:w-[50vw] h-auto absolute left-[12px] sm:left-[46px] top-[100px] sm:top-[120px]' />
            <div className='absolute w-[80vw] h-[4px] left-0 top-[200px] sm:top-[350px] bg-[#285BA9]' />
            <h1 className='absolute left-[12px] sm:left-[55px] top-[200px] sm:top-[370px] font-sans font-bold text-[6vw] sm:text-[3vw] leading-[60px] text-[#285BA9]'>화상영어 수강신청 사이트</h1>
            <img src={phoneImg} className='w-[] sm:w-[45vw] h-auto absolute right-0 bottom-0' />

            
            <div className='absolute left-[10px] sm:left-[55px] bottom-[300px] sm:bottom-[100px] flex gap-10'>

                <button className='
                    bg-[#6AC3E7] hover:bg-[#58a0bf] text-white font-sans font-bold 
                    h-[80px] w-[120px] sm:w-[200px] sm:h-[100px] rounded-[20px] shadow-lg
                    text-[20px] sm:text-[28px] transition duration-300'
                    onClick={() => (navigate("/login"))}>
                        로그인
                </button>

                <button className='
                    bg-[#6AC3E7] hover:bg-[#58a0bf] text-white font-sans font-bold 
                    h-[80px] w-[120px] sm:w-[200px] sm:h-[100px] rounded-[20px] shadow-lg
                    text-[20px] sm:text-[28px] transition duration-300'
                    onClick={() => (navigate("/signup"))}>
                    회원가입
                </button>
            </div>
        </div>

    );
}


export default MainPage;