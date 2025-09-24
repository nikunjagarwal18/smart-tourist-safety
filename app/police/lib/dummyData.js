// In a real application, this data would be fetched from a secure backend API.
// Location context: Barrackpore, West Bengal, India.
// SIMULATED CURRENT TIME for demo: Monday, Sept 22, 2025, 9:56 PM IST (16:26 UTC)

export const POLICE_STATION_LOCATION = {
  lat: 22.7650,
  lng: 88.3700,
  name: "Barrackpore Police Station",
};

export const panicAlerts = [
  {
    id: "sos-001",
    tourist: {
      name: "Ananya Sharma",
      age: 28,
      nationality: "Indian",
      abcId: "ABC-789012",
      photoUrl: "https://placehold.co/100x100/EFEFEF/333?text=AS",
    },
    location: { lat: 22.7595, lng: 88.3658 }, // Live location
    // FIXED: Timestamp is now a few minutes in the past relative to 9:56 PM
    timestamp: "2025-09-22T16:20:15Z", 
    emergencyContacts: ["+91 9876543210", "+91 9123456789"],
    itinerary: "Kolkata -> Barrackpore",
  },
];

export const reportedIncidents = [
  {
    id: "inc-001",
    type: "Road Blockage",
    description: "Fallen tree blocking the main road near the cantonment.",
    // UPDATED: More descriptive placeholder image
    imageUrl: "https://tse3.mm.bing.net/th/id/OIP.CFUyX3lJ6qhmYEhjfFOkyAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    location: { lat: 22.7689, lng: 88.3645 },
    // FIXED: Timestamp is now a few hours in the past
    timestamp: "2025-09-22T13:45:00Z",
    reportedBy: {
      name: "David Lee",
      abcId: "ABC-456789",
    },
  },
  {
    id: "inc-002",
    type: "Suspicious Activity",
    description: "A group of people are fighting near the riverfront.",
    // UPDATED: More descriptive placeholder image
    imageUrl: "https://onmilwaukee.com/images/articles/al/alternate-site-altercation/alternate-site-altercation_fullsize_story1.jpg?20170103102007",
    location: { lat: 22.7611, lng: 88.3723 },
    // FIXED: Timestamp is now about an hour in the past
    timestamp: "2025-09-22T15:10:00Z",
    reportedBy: {
      name: "Priya Singh",
      abcId: "ABC-112233",
    },
  },
];

export const historicalPanicAlerts = [
  { id: "hist-sos-001", tourist: { name: "Ravi Kumar" }, location: { lat: 22.76, lng: 88.36 }, timestamp: "2025-09-21T10:00:00Z", type: 'panic' },
  { id: "hist-sos-002", tourist: { name: "Priya Patel" }, location: { lat: 22.77, lng: 88.38 }, timestamp: "2025-09-20T18:30:00Z", type: 'panic' },
];

export const historicalIncidents = [
  { id: "hist-inc-001", type: "Theft", location: { lat: 22.765, lng: 88.375 }, timestamp: "2025-09-21T14:00:00Z" },
  { id: "hist-inc-002", type: "Harassment", location: { lat: 22.75, lng: 88.35 }, timestamp: "2025-09-19T12:00:00Z" },
];

export const resolvedEfirs = [
  { id: "efir-001", details: "Theft case from 21/09 resolved.", location: { lat: 22.765, lng: 88.375 }, timestamp: "2025-09-22T09:00:00Z", type: 'efir' }
];

export const nearbyFamilies = [
  {
    id: "fam-001",
    familyName: "Gupta Family",
    abcId: "GRP-GUP-01",
    parent: { lat: 22.7705, lng: 88.3712 },
    members: [
      { name: "Rajesh Gupta", active: true, lat: 22.7706, lng: 88.3713 },
      { name: "Sunita Gupta", active: true, lat: 22.7704, lng: 88.3711 },
      { name: "Rohan Gupta", active: true, lat: 22.7705, lng: 88.3710 },
    ],
    memberCount: 3,
  },
  {
    id: "fam-002",
    familyName: "Bose Family",
    abcId: "GRP-BOS-02",
    parent: { lat: 22.7580, lng: 88.3690 },
    members: [
        { name: "Amit Bose", active: true, lat: 22.7581, lng: 88.3691 },
        { name: "Debjani Bose", active: true, lat: 22.7595, lng: 88.3699 }, // This member is >100m away, triggering a potential alert in UI logic
    ],
    memberCount: 2,
  },
];

