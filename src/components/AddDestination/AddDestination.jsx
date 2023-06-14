import { useState } from "react";

const AddDestination = (props) => {
  const { selectedPlaces, isAll, selectedDayPlaces, setSelectedDayPlaces } =
    props;

  const [items, setItems] = useState(selectedPlaces);

  console.log("items", items);

  // if (selectedDates.length > 0) {
  //   return (
  //     <div
  //       className="flex flex-col items-center mt-4"
  //       style={{
  //         height: "300px",
  //         whiteSpace: "nowrap",
  //         overflow: "auto",
  //       }}
  //     >
  //       {selectedDates.map((date, index) => (
  //         <button
  //           className="w-14 h-8 rounded mt-2"
  //           style={{
  //             backgroundColor: "#E9EBED",
  //             color: "#B09FCE",
  //           }}
  //           key={index}
  //           onClick={() => {
  //             handleClickDate(date);
  //           }}
  //         >
  //           DAY {index + 1}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // }
  // return null;
};

export default AddDestination;
