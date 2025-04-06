import { Event } from "@/types";

// Mock events data - later this would be fetched from an API
const mockEvents: Event[] = [
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

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 500); // Simulate network delay
  });
};

// Get events by type
export const getEventsByType = async (type: string): Promise<Event[]> => {
  // In a real app, this would be an API call with filtering
  return new Promise((resolve) => {
    const filteredEvents = type.toLowerCase() === 'all' 
      ? mockEvents 
      : mockEvents.filter(event => event.type.toLowerCase() === type.toLowerCase());
    setTimeout(() => resolve(filteredEvents), 500); // Simulate network delay
  });
};

// Search events
export const searchEvents = async (query: string): Promise<Event[]> => {
  // In a real app, this would be an API call with search parameters
  return new Promise((resolve) => {
    const searchResults = mockEvents.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
    setTimeout(() => resolve(searchResults), 500); // Simulate network delay
  });
};

// Get event types - useful for generating filters dynamically
export const getEventTypes = async (): Promise<string[]> => {
  // In a real app, this might be a separate API call
  return new Promise((resolve) => {
    const types = ["all", ...new Set(mockEvents.map(event => event.type.toLowerCase()))];
    setTimeout(() => resolve(types), 300);
  });
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event | undefined> => {
  // In a real app, this would be an API call to get a specific event
  return new Promise((resolve) => {
    const event = mockEvents.find(event => event.id === id);
    setTimeout(() => resolve(event), 300);
  });
};

// Create a new event
export const createEvent = async (eventData: Omit<Event, "id">): Promise<Event> => {
  // In a real app, this would be an API call to create a new event
  return new Promise((resolve) => {
    // Generate a new ID - in a real app this would be done by the backend
    const newId = String(mockEvents.length + 1);
    
    // Create the new event with the generated ID
    const newEvent: Event = {
      id: newId,
      ...eventData
    };
    
    // Add to mock data (this would be handled by the backend in a real app)
    mockEvents.push(newEvent);
    
    // Simulate network delay
    setTimeout(() => resolve(newEvent), 500);
  });
};

// Helper function for color coding event types
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
