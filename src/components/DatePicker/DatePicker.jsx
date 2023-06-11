import React, { useState, useEffect } from 'react';

const DatePicker = ({ getDateList }) => {
  const [dates, setDates] = useState([]); //선택된 날짜 목록
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); //현재 표시되는 달

  useEffect(() => {
    // 시작일과 완료일이 모두 선택되었을 때에만 날짜 목록을 전달
    if (selectedStartDate !== null && selectedEndDate !== null) {
      getDateList(dates);
    }
  }, [dates]);

  //날짜 관련된 데이터 계산 함수
  const getNewDateObj = (newDate) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();

    return { year, month, date, day };
  };

  const getMonthDate = (newDate, page = 0) => {
    const doMonth = getNewDateObj(
      new Date(newDate.year, newDate.month - 1 + page, 1)
    );

    const prevMonthLastDate = getNewDateObj(
      new Date(doMonth.year, doMonth.month - 1, 0)
    );
    const startDate =
      prevMonthLastDate.day === 0
        ? prevMonthLastDate
        : prevMonthLastDate.day === 6
        ? doMonth
        : getNewDateObj(
            new Date(doMonth.year, doMonth.month - 1, -prevMonthLastDate.day)
          );

    let monthDate = [];
    for (let i = 0; i < 42; i++) {
      monthDate.push(
        getNewDateObj(
          new Date(startDate.year, startDate.month - 1, startDate.date + i)
        )
      );
    }

    const week1 = monthDate.slice(0, 7);
    const week2 = monthDate.slice(7, 14);
    const week3 = monthDate.slice(14, 21);
    const week4 = monthDate.slice(21, 28);
    const week5 = monthDate.slice(28, 35);
    const week6 = monthDate.slice(35);

    const week4LastDate = week4[week4.length - 1];
    const week5LastDate = week5[week5.length - 1];
    const lastDate = new Date(doMonth.year, doMonth.month, 0);
    const isLastWeek4 =
      week4LastDate.month !== doMonth.month ||
      !(week4LastDate.date < lastDate.getDate());
    const isLastWeek5 =
      week5LastDate.month !== doMonth.month ||
      !(week5LastDate.date < lastDate.getDate());
    const dateArr = [week1, week2, week3, week4];

    return {
      year: doMonth.year,
      month: doMonth.month,
      date: isLastWeek4
        ? dateArr
        : isLastWeek5
        ? [...dateArr, week5]
        : [...dateArr, week5, week6],
    };
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const prevMonthDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() - 1,
        1
      );
      return prevMonthDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonthDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };

  const handleDateClick = (date) => {
    //시작일 선택되지 않은 경우
    if (selectedStartDate === null) {
      setSelectedStartDate(date);
      setSelectedEndDate(null); //완료일 초기화
    } else if (selectedEndDate === null) {
      //시작일이 선택되고 완료일이 선택되지 않은 경우
      if (date >= selectedStartDate) {
        //선택 날짜가 시작일 이후인 경우에만 완료일 지정
        setSelectedEndDate(date);

        // 시작일부터 완료일까지의 날짜 목록 생성
        const dates = getDatesBetween(selectedStartDate, date);
        console.log('시작일부터 완료일까지 날짜 목록:', dates);
        setDates(dates);
      } else {
        //선택한 날짜가 시작일보다 빠른 경우 시작일 초기화
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    } else {
      //시작일과 완료일 이미 선택 경우 새로운 시작일 설정하고 완료일 초기화
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.date
    );

    while (
      currentDate <= new Date(endDate.year, endDate.month - 1, endDate.date)
    ) {
      dates.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  //datepicker 렌더링 함수
  //getMonthDate 함수 이용하여 현재 월에 대한 날짜 데이터 가져온 후, 해당 데이터 바탕으로 달력 생성, 선택 날짜 표시
  const renderDatePicker = () => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthValue = currentMonth.getMonth() + 1;
    const monthData = getMonthDate({
      year: currentYear,
      month: currentMonthValue,
    });
    // console.log('monthData', monthData);
    return (
      <div>
        <div className="flex justify-between items-center">
          <button
            className="w-16 h-9 rounded"
            style={{ backgroundColor: '#E9EBED', color: '#B09FCE' }}
            onClick={handlePrevMonth}
          >
            Prev
          </button>
          <h3>{`${monthData.year}년 ${monthData.month}월`}</h3>
          <button
            className="w-16 h-9 rounded"
            style={{ backgroundColor: '#E9EBED', color: '#B09FCE' }}
            onClick={handleNextMonth}
          >
            Next
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              height: '160px',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
            }}
          >
            <div className="h-6" style={{ borderBottom: '2px solid black' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="w-8 flex justify-center">일</div>
                <div className="w-8 flex justify-center">월</div>
                <div className="w-8 flex justify-center">화</div>
                <div className="w-8 flex justify-center">수</div>
                <div className="w-8 flex justify-center">목</div>
                <div className="w-8 flex justify-center">금</div>
                <div className="w-8 flex justify-center">토</div>
              </div>
            </div>
            <div>
              {monthData.date.map((week, weekIndex) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  key={weekIndex}
                >
                  {week.map((dateObj, dateIndex) => {
                    const isStartDate =
                      selectedStartDate?.date === dateObj.date &&
                      selectedStartDate?.month === dateObj.month &&
                      selectedStartDate?.year === dateObj.year;
                    const isEndDate =
                      selectedEndDate?.date === dateObj.date &&
                      selectedEndDate?.month === dateObj.month &&
                      selectedEndDate?.year === dateObj.year;
                    const isInRange =
                      selectedStartDate !== null &&
                      selectedEndDate !== null &&
                      dateObj >= selectedStartDate &&
                      dateObj <= selectedEndDate;

                    let cellStyle = {};
                    if (isStartDate) {
                      cellStyle = {
                        backgroundColor: '#B09FCE',
                        borderRadius: '50%',
                      };
                    } else if (isEndDate) {
                      cellStyle = {
                        backgroundColor: '#B09FCE',
                        borderRadius: '50%',
                      };
                    } else if (isInRange) {
                      cellStyle = {
                        // backgroundColor: '#E9EBED',
                        // borderRadius: '50%',
                      };
                    }

                    return (
                      <div
                        className="w-8 h-8 flex justify-center items-center"
                        key={dateIndex}
                        onClick={() => handleDateClick(dateObj)}
                        style={cellStyle}
                      >
                        {dateObj.date.toString()}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-20 text-2xl font-medium flex justify-center items-center">
        장소
      </div>
      <div className="h-20 text-2xl font-medium flex justify-center items-center">
        {dates.length} Day
      </div>
      <div className="w-72 h-72 drop-shadow bg-white rounded flex justify-center items-center">
        <div style={{ width: '250px', height: '250px' }}>
          {renderDatePicker()}
        </div>
      </div>

      <div className="py-5 w-48 flex justify-center">
        <div className="text-sm">
          {selectedStartDate
            ? `${selectedStartDate.year}-${selectedStartDate.month}-${selectedStartDate.date} ~ `
            : '0000-00-00 ~ '}
          {selectedEndDate
            ? `${selectedEndDate.year}-${selectedEndDate.month}-${selectedEndDate.date}`
            : '0000-00-00'}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
