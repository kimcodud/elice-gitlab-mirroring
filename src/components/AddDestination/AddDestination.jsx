import { useEffect, useState } from "react";
import { usePlannerMapContext } from "../PlannerMap/PlannerMap";

const AddDestination = (props) => {
  const {
    selectedDates,
    handleClickDate,
    selectedDayPlaces,
    setSelectedDayPlaces,
    handleAddPlace,
    selectedPlaces,
    setSelectedPlaces,
  } = props;

  const [isAll, setIsAll] = useState(true);
  const [showDayList, setShowDayList] = useState(false);
  const [items, setItems] = useState(selectedPlaces);

  const { setSelectedDay, selectedPlanDate, handleDeleteSelectedPlanDate } =
    usePlannerMapContext();

  const clickPlaces = Object.values(selectedPlanDate);
  const clickPlacesKeys = Object.keys(selectedPlanDate);

  if (clickPlaces.length > 0 && clickPlaces[0][0] !== undefined) {
    console.log(
      "AddDestination",
      clickPlaces[0][clickPlaces[0].length - 1].place_name
    );

    // setSelectedPlaces((selectedPlaces) => [...selectedPlaces, place]);
  }

  useEffect(() => {
    console.log("AddDestination", selectedPlanDate);
  }, [selectedPlanDate]);

  const handleClickDateButton = (date) => {
    const formatDate = `${date.year}-${date.month}-${date.date}`;
    setSelectedDay(formatDate);
  };

  const handleClickAll = () => {
    // setIsAll(true);
    // setShowDayList(false);
    clickPlaces.map((a) => {
      return (
        <div>
          <div className="info box-sizing: border-box h-15 w-50 p-4 border-2 shadow-lg rounded">
            <div className="font-bold text-sm">{a.place_name}</div>
            <div>
              <span className="text-xs">{a.category_group_name}</span>
              <img
                src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
                alt="remove icon"
                className="cursor-pointer"
                onClick={() => handleDeleteSelectedPlanDate()}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  // const handleClickDay = () => {
  //   setShowDayList(true);
  //   setIsAll(false);
  // };

  if (selectedDates.length > 0) {
    return (
      <div>
        <div
          className="flex flex-col items-center mt-4"
          style={{
            height: "400px",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          {/* 첫 번째 요소 */}
          {selectedDates.map((date, index, selectedPlaces) => {
            console.log(selectedPlanDate, date);
            return (
              <div>
                <div>
                  <button
                    className="w-40 h-8 rounded mt-4"
                    style={{
                      backgroundColor: "#E9EBED",
                      color: "#B09FCE",
                    }}
                    key={index}
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
                    ].map((a) => {
                      return (
                        <div className="info box-sizing: border-box h-13 w-50 p-4 border-2 shadow-lg rounded mt-3">
                          <div className="font-bold text-sm">
                            {a.place_name}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="text-xs">
                              {a.category_group_name}
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
  }
  return null;
};

export default AddDestination;
