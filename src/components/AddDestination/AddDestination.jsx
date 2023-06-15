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
  if (clickPlaces.length > 0 && clickPlaces[0][0] !== undefined) {
    console.log(
      "AddDestination",
      clickPlaces[0][clickPlaces[0].length - 1].place_name
    );
  }

  // const renderPlaces = () => {
  //   return clickPlaces.map((_, idx) => (
  //     <div
  //       className="info box-sizing: border-box h-20 w-60 p-4 border-2 shadow-lg rounded"
  //       style={{ marginLeft: "10px" }}
  //       key={idx}
  //     >
  //       <div className="font-bold text-sm">
  //         {clickPlaces[0][clickPlaces[0].length - 1].place_name}
  //       </div>
  //       <div style={{ display: "flex ", justifyContent: "right" }}>
  //         <span className="text-xs">
  //           {clickPlaces[0][clickPlaces[0].length - 1].category_group_name}
  //         </span>
  //         <img
  //           src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
  //           alt="remove icon"
  //           className="cursor-pointer"
  //           onClick={() => handleDeleteSelectedPlanDate()}
  //         />
  //       </div>
  //     </div>
  //   ));
  // };

  useEffect(() => {
    console.log("AddDestination", selectedPlanDate);
  }, [selectedPlanDate]);

  const handleClickDateButton = (date) => {
    const formatDate = `${date.year}-${date.month}-${date.date}`;
    setSelectedDay(formatDate);
  };

  const handleClickAll = () => {
    setIsAll(true);
    setShowDayList(false);
  };

  const handleClickDay = () => {
    setShowDayList(true);
    setIsAll(false);
  };

  if (selectedDates.length > 0) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="flex flex-col items-center mt-4"
          style={{
            height: "300px",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          {/* 첫 번째 요소 */}
          <button
            className="px-3 py-2 rounded bg-purple-500 text-white"
            onClick={handleClickAll}
          >
            전체
          </button>
          {selectedDates.map((date, index, selectedPlaces) => (
            <button
              className="w-14 h-8 rounded mt-2"
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
          ))}
        </div>
        <div>
          {/* 두 번째 요소 */}
          {clickPlaces.map((el) =>
            el.map((_, idx) => (
              <div
                className="info box-sizing: border-box h-20 w-60 p-4 border-2 shadow-lg rounded"
                style={{ marginLeft: "10px" }}
                key={idx}
              >
                <div className="font-bold text-sm">
                  {clickPlaces[0][clickPlaces[0].length - 1].place_name}
                </div>
                <div style={{ display: "flex ", justifyContent: "right" }}>
                  <span className="text-xs">
                    {
                      clickPlaces[0][clickPlaces[0].length - 1]
                        .category_group_name
                    }
                  </span>
                  <img
                    src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
                    alt="remove icon"
                    className="cursor-pointer"
                    onClick={() => handleDeleteSelectedPlanDate()}
                  />
                </div>
              </div>
            ))
          )}
          {/* {clickPlaces.map((_, idx) => (
            <div
              className="info box-sizing: border-box h-20 w-60 p-4 border-2 shadow-lg rounded"
              style={{ marginLeft: "10px" }}
              key={idx}
            >
              <div className="font-bold text-sm">
                {clickPlaces[0][clickPlaces[0].length - 1].place_name}
              </div>
              <div style={{ display: "flex ", justifyContent: "right" }}>
                <span className="text-xs">
                  {
                    clickPlaces[0][clickPlaces[0].length - 1]
                      .category_group_name
                  }
                </span>
                <img
                  src="https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v1/24px.svg"
                  alt="remove icon"
                  className="cursor-pointer"
                  onClick={() => handleDeleteSelectedPlanDate()}
                />
              </div>
            </div>
          ))} */}
        </div>
      </div>
    );
  }
  return null;
};

export default AddDestination;
