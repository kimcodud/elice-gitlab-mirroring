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
      <div
        className="flex flex-col items-center mt-4"
        style={{
          height: "300px",
          whiteSpace: "nowrap",
          overflow: "auto",
        }}
      >
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
            // onClick={() => {
            //   // handleClickDay();
            //   // handleClickDate(date);

            //   setSelectedDay(`${date.year}-${date.month}-${date.date}`);
            // }}
            onClick={() => handleClickDateButton(date)}
          >
            DAY {index + 1}
          </button>
        ))}
      </div>
    );
  }
  return null;
};

export default AddDestination;
