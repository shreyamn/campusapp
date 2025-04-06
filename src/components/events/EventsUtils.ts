
export const getEventTypeColor = (type: string): string => {
  switch (type) {
    case "Academic":
      return "bg-blue-100 text-blue-800";
    case "Cultural":
      return "bg-purple-100 text-purple-800";
    case "Club":
      return "bg-green-100 text-green-800";
    case "Staff":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const mockEvents = [
  {
    id: "1",
    title: "New Student Orientation",
    description: "Welcome session for new students",
    date: "Oct 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Main Auditorium",
    type: "Academic",
    organizer: "Student Affairs Office",
  },
  {
    id: "2",
    title: "Tech Career Fair",
    description: "Connect with tech companies for internships and job opportunities",
    date: "Oct 20, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Student Center",
    type: "Academic",
    organizer: "Career Services",
  },
  {
    id: "3",
    title: "Campus Music Festival",
    description: "Annual music festival featuring student bands and performers",
    date: "Oct 25, 2025",
    time: "5:00 PM - 10:00 PM",
    location: "Campus Grounds",
    type: "Cultural",
    organizer: "Student Activities Board",
  },
  {
    id: "4",
    title: "Coding Competition",
    description: "Test your programming skills and win prizes",
    date: "Nov 1, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Computer Science Building",
    type: "Club",
    department: "Computer Science",
    organizer: "Coding Club",
  },
  {
    id: "5",
    title: "Campus Cleanup Day",
    description: "Volunteer event to clean campus grounds",
    date: "Nov 5, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Campus Grounds",
    type: "Staff",
    organizer: "Facilities Management",
  },
];
