
const CampusBackground = () => {
  return (
    <div className="absolute inset-0 bg-green-100">
      {/* Campus paths */}
      <div className="absolute top-[40%] left-[20%] w-[60%] h-[4px] bg-gray-300"></div>
      <div className="absolute top-[20%] left-[45%] w-[4px] h-[60%] bg-gray-300"></div>
      <div className="absolute top-[60%] left-[30%] w-[40%] h-[4px] bg-gray-300"></div>
      <div className="absolute top-[30%] left-[30%] w-[4px] h-[30%] bg-gray-300"></div>
      
      {/* Green areas */}
      <div className="absolute top-[30%] left-[60%] w-[15%] h-[15%] rounded-full bg-green-300"></div>
      <div className="absolute top-[50%] left-[25%] w-[10%] h-[10%] rounded-full bg-green-300"></div>
    </div>
  );
};

export default CampusBackground;
