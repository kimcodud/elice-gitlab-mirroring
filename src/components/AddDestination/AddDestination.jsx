import { useCallback, useEffect } from "react";
import { usePlannerMapContext } from "../../Contexts/PlannerMapContext";

const AddDestination = (props) => {
  const { selectedDates } = props;

  const { setSelectedDay, selectedPlanDate, handleDeleteSelectedPlanDate } =
    usePlannerMapContext();

  useEffect(() => {
    console.log("selectedDates", selectedDates);
  }, [selectedPlanDate]);

  const handleClickDateButton = useCallback(
    (date) => {
      console.log("handleClickDateButton");
      const formatDate = `${date.year}-${date.month}-${date.date}`;
      setSelectedDay(formatDate);
    },
    [setSelectedDay]
  );

  if (selectedDates.length > 0) {
    return (
      <div>
        {/* 선택된 날짜가 있을 때 */}
        <div
          className="flex flex-col items-center mt-4 bg-white drop-shadow"
          style={{
            width: "320px",
            height: "300px",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          {Array.isArray(selectedDates) &&
            selectedDates.map((date, index, selectedPlaces) => {
              return (
                <div key={index}>
                  <div>
                    <button
                      className="w-40 h-8 mt-4 rounded"
                      style={{
                        backgroundColor: "#E9EBED",
                        color: "#B09FCE",
                      }}
                      data={selectedPlaces}
                      onClick={() => handleClickDateButton(date)}
                    >
                      DAY {index + 1}
                    </button>
                  </div>
                  <div>
                    {selectedPlanDate &&
                      selectedPlanDate[
                        `${date.year}-${date.month}-${date.date}`
                      ] &&
                      selectedPlanDate[
                        `${date.year}-${date.month}-${date.date}`
                      ].map((place) => {
                        return (
                          <div
                            key={place.id}
                            className="p-4 mt-3 border-2 rounded shadow-lg info box-sizing: border-box h-13 w-50"
                          >
                            <div className="text-sm font-bold whitespace-normal">
                              <p className="overflow-hidden truncate">
                                {place.place_name}
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span className="text-xs">
                                {place.category_group_name}
                              </span>
                              <img
                                src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
                                alt="remove icon"
                                className="cursor-pointer"
                                onClick={() => handleDeleteSelectedPlanDate()}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* 선택된 날짜가 없을 때 */}
        <h1>날짜를 선택하고 장소를 추가하세요</h1>
      </div>
    );
  }
};

export default AddDestination;
