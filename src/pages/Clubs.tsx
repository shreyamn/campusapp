
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, BookOpen, Calendar, MessageSquare } from "lucide-react";

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  imageUrl?: string;
  tags: string[];
}

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedClubs, setJoinedClubs] = useState<string[]>([]);

  // Mock data - in a real app, this would come from an API
  const clubs: Club[] = [
    {
      id: "1",
      name: "Programming Club",
      description: "Learn programming languages and work on exciting projects together",
      category: "Academic",
      memberCount: 45,
      tags: ["Tech", "Coding", "Computer Science"],
    },
    {
      id: "2",
      name: "Chess Club",
      description: "Weekly chess tournaments and strategy discussions",
      category: "Hobby",
      memberCount: 28,
      tags: ["Games", "Strategy"],
    },
    {
      id: "3",
      name: "Debate Society",
      description: "Improve public speaking and debate skills through regular competitions",
      category: "Academic",
      memberCount: 32,
      tags: ["Public Speaking", "Critical Thinking"],
    },
    {
      id: "4",
      name: "Photography Club",
      description: "Explore photography techniques and participate in campus exhibitions",
      category: "Arts",
      memberCount: 36,
      tags: ["Arts", "Creative"],
    },
    {
      id: "5",
      name: "Environmental Club",
      description: "Promote sustainability and organize campus clean-up events",
      category: "Service",
      memberCount: 27,
      tags: ["Environment", "Volunteering"],
    },
    {
      id: "6",
      name: "Film Society",
      description: "Weekly film screenings followed by critical discussions",
      category: "Arts",
      memberCount: 42,
      tags: ["Movies", "Arts", "Discussion"],
    },
  ];

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinToggle = (clubId: string) => {
    if (joinedClubs.includes(clubId)) {
      // Leave club
      setJoinedClubs(joinedClubs.filter(id => id !== clubId));
    } else {
      // Join club
      setJoinedClubs([...joinedClubs, clubId]);
    }
  };

  const getClubsByCategory = (category: string) => {
    return filteredClubs.filter(club => club.category.toLowerCase() === category.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campus Clubs</h1>
        <Button>+ Create Club</Button>
      </div>
      
      <p className="text-muted-foreground">
        Discover and join clubs based on your interests and department
      </p>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clubs by name, description, or tags..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="arts">Arts</TabsTrigger>
          <TabsTrigger value="hobby">Hobby</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard 
                key={club.id}
                club={club}
                isJoined={joinedClubs.includes(club.id)}
                onJoinToggle={handleJoinToggle}
              />
            ))}
          </div>
        </TabsContent>
        
        {["academic", "arts", "hobby", "service"].map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getClubsByCategory(category).map((club) => (
                <ClubCard 
                  key={club.id}
                  club={club}
                  isJoined={joinedClubs.includes(club.id)}
                  onJoinToggle={handleJoinToggle}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ClubCardProps {
  club: Club;
  isJoined: boolean;
  onJoinToggle: (clubId: string) => void;
}

const ClubCard = ({ club, isJoined, onJoinToggle }: ClubCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{club.name}</CardTitle>
        <CardDescription>{club.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {club.tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{club.memberCount} members</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Chat
        </Button>
        <Button 
          className="flex-1"
          variant={isJoined ? "destructive" : "default"}
          onClick={() => onJoinToggle(club.id)}
        >
          {isJoined ? "Leave" : "Join"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Clubs;
