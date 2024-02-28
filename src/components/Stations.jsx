import React from 'react';

const CreativeRailway = () => {
  const stations = [
    "Virar", "Nalasopara", "Vasai Road", "Naigaon", "Bhayandar", "Mira Road", "Dahisar", "Borivali", "Kandivali",
    "Malad", "Goregaon", "Jogeshwari", "Andheri", "Vile Parle", "Santa Cruz", "Khar Road", "Bandra", "Mahim",
    "Matunga Road", "Dadar", "Prabhadevi", "Lower Parel", "Mahalakshmi", "Mumbai Central", "Marine Lines",
    "Charni Road", "Grant Road", "Mumbai Central", "Churchgate"
  ];

  const highlightedStations = ["Virar", "Andheri", "Borivali", "Bandra", "Mumbai Central", "Dadar", "Churchgate"];

  const stationCoordinates = {
    "Virar": { x: 50, y: 200 },
    "Nalasopara": { x: 150, y: 200 },
    "Vasai Road": { x: 250, y: 200 },
    "Naigaon": { x: 350, y: 200 },
    "Bhayandar": { x: 450, y: 200 },
    "Mira Road": { x: 550, y: 200 },
    "Dahisar": { x: 650, y: 200 },
    "Borivali": { x: 750, y: 200 },
    "Kandivali": { x: 850, y: 200 },
    "Malad": { x: 950, y: 200 },
    "Goregaon": { x: 1050, y: 200 },
    "Jogeshwari": { x: 1150, y: 200 },
    "Andheri": { x: 1250, y: 200 },
    "Vile Parle": { x: 1350, y: 200 },
    "Santa Cruz": { x: 1450, y: 200 },
    "Khar Road": { x: 1550, y: 200 },
    "Bandra": { x: 1650, y: 200 },
    "Mahim": { x: 1750, y: 200 },
    "Matunga Road": { x: 1850, y: 200 },
    "Dadar": { x: 1950, y: 200 },
    "Prabhadevi": { x: 2050, y: 200 },
    "Lower Parel": { x: 2150, y: 200 },
    "Mahalakshmi": { x: 2250, y: 200 },
    "Mumbai Central": { x: 2350, y: 200 },
    "Marine Lines": { x: 2450, y: 200 },
    "Charni Road": { x: 2550, y: 200 },
    "Grant Road": { x: 2650, y: 200 },
    "Churchgate": { x: 2750, y: 200 }
  };

  return (
    <div className="relative h-screen bg-gray-200">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 2800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Railway track */}
        <line x1="50" y1="200" x2="2750" y2="200" stroke="black" strokeWidth="10" />

        {/* Buildings */}
        <rect x="150" y="100" width="100" height="100" fill="#9e9e9e" />
        <rect x="350" y="70" width="80" height="130" fill="#9e9e9e" />
        <rect x="950" y="60" width="110" height="140" fill="#9e9e9e" />
        <rect x="1850" y="80" width="90" height="120" fill="#9e9e9e" />


        {/* Stations */}
        {stations.map((station, index) => (
          <g key={index}>
            <rect x={stationCoordinates[station].x - 15} y={stationCoordinates[station].y - 15} width="30" height="30" fill={highlightedStations.includes(station) ? 'yellow' : 'blue'} />
            <text x={stationCoordinates[station].x} y={stationCoordinates[station].y + 30} fill="black" textAnchor="middle">{station}</text>
          </g>
        ))}

        {/* Train */}
        <rect x="0" y="170" width="50" height="60" fill="red">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0;2700"
            dur="20s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <footer className="absolute bottom-0 left-0 w-full py-4 bg-gray-800 text-white text-center">Contact us on +91 8601480711</footer>
    </div>
  );
};

export default CreativeRailway;
