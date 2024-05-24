import React from "react";
import Empty from "../../assets/images/empty.png";

const EmptyState = () => {
  return (
    <>
      <div className="w-full flex justify-center  h-[90vh] items-center flex-col animate-pulse">
        <div className="w-[500px] h-[373px] mb-5">
          <img
            className="w-full h-full object-contain animate-pulse"
            src={Empty}
            alt="Empty"
          />
        </div>
        <h3 className="text-xl bold">No Contacts found ,Please add Contacts</h3>
      </div>
    </>
  );
};

export default EmptyState;
