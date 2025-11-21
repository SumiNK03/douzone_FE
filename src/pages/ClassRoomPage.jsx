import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";


// 1. 상태별 색상 정의

const STATUS_COLORS = {
    CLASS: "#946AFF", // 수업 (보라색)
    TODAY: "#6AC3E7", // 오늘 (하늘색 스티커)
};


// 2. Styled Components 정의


const StyledCalendarWrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 10px auto;
  font-family: sans-serif;
  padding: 1rem;
  background-color: #f7f7f7;

  .react-calendar {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: white;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  /* 헤더 스타일 */
  .react-calendar__navigation {
    height: 60px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation__label {
    font-size: 1.5rem;
    font-weight: bold;
    color: #454545;
  }
  
  /* 요일 텍스트 색상 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(1) abbr { /* 일요일 */
    color: #FF0000;
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr { /* 토요일 */
    color: #2E7AF2;
  }

  /* 날짜 셀 스타일 */
  .react-calendar__tile {
    max-width: 100%;
    height: 60px; 
    padding: 0;
    background: none;
    border: none;
    position: relative;
    border-radius: 0.5rem;
    
    abbr {
      font-size: 1rem;
      font-weight: normal;
    }
  }
  
  /* 이전/다음 달 날짜 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #E0E0E0 !important;
  }
  
  /* 오늘 날짜 스타일 초기화 (스티커만 표시) */
  .react-calendar__tile--now {
    background-color: transparent; 
    border: none; 
    
    abbr {
      position: static;
      display: block;
      line-height: inherit;
      color: initial;
    }
  }

  /* Hover 스타일 */
  .react-calendar__tile:hover {
    background-color: #f0f0f0;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  margin: 10px 0 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #454545;
`;

const LegendDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`;

// 수업일 동그란 스티커 (보라색)
const StyledClassDot = styled.div`
  background-color: ${STATUS_COLORS.CLASS};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 10px; 
  right: 10px;
`;

// 오늘 날짜 동그란 스티커 (하늘색)
const StyledTodayDot = styled.div`
  background-color: ${STATUS_COLORS.TODAY};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 10px; 
  right: 25px; 
`;



// 3. Legend 컴포넌트

const Legend = () => (
    <LegendContainer>
        <LegendItem><LegendDot color={STATUS_COLORS.CLASS} /> 수업 (보라)</LegendItem>
        <LegendItem><LegendDot color={STATUS_COLORS.TODAY} /> 오늘 (하늘)</LegendItem>
    </LegendContainer>
);

// 4. ClassRoomPage 컴포넌트

function ClassRoomPage() {
    const [date, setDate] = useState(new Date());
    // classDates는 수업이 있는 날짜들의 Date 객체 배열.
    const [classDates, setClassDates] = useState([]);

    useEffect(() => {
        // /data/classDates.json에서 데이터를 불러오기
        fetch("/data/classDates.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                // 데이터가 날짜 문자열 배열이라고 가정하고 Date 객체로 변환.
                const parsedData = data.map(dateString => new Date(dateString));
                setClassDates(parsedData);
            })
            .catch((err) => console.error("Failed to load class dates:", err));
    }, []);

    const isClassDay = (tileDate) => {
        // 수업 날짜 배열에 tileDate와 같은 날짜가 있는지 확인합니다.
        return classDates.some((classDate) => isSameDay(classDate, tileDate));
    };

    const isToday = (tileDate) => {
        // 현재 날짜와 tileDate가 같은지 확인합니다.
        return isSameDay(new Date(), tileDate);
    };

    return (
        <div id='classRoomPage' className="flex flex-col items-center w-screen font-sans">
            <div className="w-full bg-gray-200 pt-10 pb-10 px-4">
                <h1 className="font-bold text-4xl">내 수업 일정</h1>
            </div>
            <StyledCalendarWrapper>
                <Legend />
                <Calendar
                    onChange={setDate}
                    value={date}
                    calendarType="gregory"
                    showNeighboringMonth={true}
                    formatMonthYear={(locale, date) => date.toLocaleDateString(locale, { year: 'numeric', month: 'long' })}
                    formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 1)}
                    tileContent={({ date: tileDate, view }) => {
                        if (view !== "month") return null;

                        const dots = [];

                        // 1. 수업 스티커 (보라)
                        if (isClassDay(tileDate)) {
                            dots.push(<StyledClassDot key="class" />);
                        }

                        // 2. 오늘 스티커 (하늘)
                        if (isToday(tileDate)) {
                            // 수업일이면서 오늘인 경우, 두 개의 도트가 표시됩니다.
                            dots.push(<StyledTodayDot key="today" />);
                        }

                        return dots.length > 0 ? dots : null;
                    }}
                />
            </StyledCalendarWrapper>
        </div>
    );
}

export default ClassRoomPage;