
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function K(p) {
  const Wrapper = ({ icon, hd, txt }) => (
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl text-center group transition-all duration-300 cursor-pointer">
          {icon}
          <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{hd}</h3>
          <p className="mt-3 text-gray-600 text-base ">
              {txt}
          </p>
      </div>
  );

  if (p.tp === "map") {
      return <Wrapper icon={<MapIcon />} hd={p.hd} txt={p.txt} />;
  }
  if (p.tp === "alert") {
      return <Wrapper icon={<AlertIcon />} hd={p.hd} txt={p.txt} />;
  }
  if (p.tp === "report") {
      return <Wrapper icon={<ReportIcon />} hd={p.hd} txt={p.txt} />;
  }
  return null;
}
