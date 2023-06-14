import { useState } from "react";

const AddDestination = (props) => {
  const {
    selectedDates,
    handleClickDate,
    selectedDayPlaces,
    setSelectedDayPlaces,

    selectedPlaces,
  } = props;

  const [isAll, setIsAll] = useState(true);
  const [showDayList, setShowDayList] = useState(false);

  const handleClickAll = () => {
    setIsAll(true);
    setShowDayList(false);
  };

  const handleClickDay = () => {
    setShowDayList(true);
    setIsAll(false);
  };

  const [items, setItems] = useState(selectedPlaces);

  console.log("items", items);

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
        {selectedDates.map((date, index) => (
          <button
            className="w-14 h-8 rounded mt-2"
            style={{
              backgroundColor: "#E9EBED",
              color: "#B09FCE",
            }}
            key={index}
            onClick={() => {
              handleClickDay();
              handleClickDate(date);
            }}
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
