import React from 'react';

const CreativeRailway = () => {
  const stations = [
    "Virar", "Nalasopara", "Vasai Road", "Naigaon", "Bhayandar", "Mira Road", "Dahisar", "Borivali", "Kandivali",
    "Malad", "Goregaon", "Jogeshwari", "Andheri", "Vile Parle", "Santa Cruz", "Khar Road", "Bandra", "Mahim",
    "Matunga Road", "Dadar", "Prabhadevi", "Lower Parel", "Mahalakshmi", "Mumbai Central", "Marine Lines",
    "Charni Road", "Grant Road", "Churchgate"
  ];

  const highlightedStations = ["Virar", "Andheri", "Borivali", "Bandra", "Mumbai Central", "Dadar", "Churchgate"];

  // Calculate station coordinates dynamically for vertical layout
  const stationCoordinates = stations.reduce((acc, station, index) => {
    acc[station] = { x: 200, y: 50 + index * 100 };
    return acc;
  }, {});

  // Calculate the total height of the track until "Churchgate"
  const totalHeight = stationCoordinates["Churchgate"].y;

  return (
    <div className="relative">
       <h1 className="text-4xl font-bold text-center text-orange-500 mt-8 mb-4">Our Services</h1>
      <svg
        className="w-full"
        viewBox={`0 0 400 ${totalHeight + 100}`} // Adding extra space for footer
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Railway track */}
        <line x1="200" y1="50" x2="200" y2={totalHeight} stroke="black" strokeWidth="10" />

        {/* Stations */}
        {stations.map((station, index) => (
          <g key={index}>
            <rect x={stationCoordinates[station].x - 15} y={stationCoordinates[station].y - 15} width="30" height="30" fill={highlightedStations.includes(station) ? 'yellow' : 'blue'} />
            <text x={stationCoordinates[station].x + 35} y={stationCoordinates[station].y + 5} fill="black">{station}</text>
          </g>
        ))}

        {/* Train */}
        <image href={"./train.png"} x="150" y="0" width="100" height="250" transform="rotate(90 200 25)">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0;0,2950"
            dur="20s"
            repeatCount="indefinite"
          />
        </image>
      </svg>
      <footer className="py-4 bg-gray-800 text-white text-center">Contact us on +91 8601480711</footer>
    </div>
  );
};

export default CreativeRailway;



