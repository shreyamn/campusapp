
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, HelpCircle, FileText } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{message: string, isBot: boolean}[]>([
    {message: "Hello! How can I help you today?", isBot: true}
  ]);
  
  // Mock FAQ data
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your registered email.",
      category: "account"
    },
    {
      id: "2",
      question: "How do I join a club?",
      answer: "Navigate to the Clubs page, find the club you're interested in, and click the 'Join' button. You'll receive a confirmation once your request is processed.",
      category: "campus"
    },
    {
      id: "3",
      question: "How do I access my class materials?",
      answer: "You can access class materials by going to the Subjects page, selecting the specific course, and clicking on the 'Materials' button.",
      category: "academic"
    },
    {
      id: "4",
      question: "What are the library hours?",
      answer: "The main campus library is open Monday through Friday from 8 AM to 10 PM, Saturday from 9 AM to 6 PM, and Sunday from 12 PM to 8 PM.",
      category: "campus"
    },
    {
      id: "5",
      question: "How do I submit an assignment?",
      answer: "Go to your subject page, find the assignment, and click 'Submit'. You can upload your files and confirm submission before the deadline.",
      category: "academic"
    },
  ];
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {message: chatMessage, isBot: false}]);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm not sure how to help with that. Could you try asking something about campus services, academic questions, or account help?";
      
      // Very simple response logic
      const msg = chatMessage.toLowerCase();
      if (msg.includes("password") || msg.includes("reset")) {
        botResponse = "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your registered email.";
      } else if (msg.includes("class") || msg.includes("materials") || msg.includes("subject")) {
        botResponse = "You can access class materials by going to the Subjects page, selecting the specific course, and clicking on the 'Materials' button.";
      } else if (msg.includes("club") || msg.includes("join")) {
        botResponse = "To join a club, navigate to the Clubs page, find the club you're interested in, and click the 'Join' button.";
      }
      
      setChatHistory(prev => [...prev, {message: botResponse, isBot: true}]);
    }, 1000);
    
    // Clear input
    setChatMessage("");
  };
  
  const getFAQsByCategory = (category: string | null) => {
    if (!category) return filteredFAQs;
    return filteredFAQs.filter(faq => faq.category === category);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <Button>Contact Admin</Button>
      </div>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat">Chat Support</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <Card className="h-[60vh] flex flex-col">
            <CardHeader>
              <CardTitle>Support Chat</CardTitle>
              <CardDescription>Ask questions about campus services, academic matters, or technical help</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        chat.isBot 
                          ? "bg-muted text-muted-foreground" 
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="campus">Campus</TabsTrigger>
            </TabsList>
            
            {["all", "account", "academic", "campus"].map((category) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="space-y-4">
                  {getFAQsByCategory(category === "all" ? null : category).map((faq) => (
                    <Card key={faq.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                          <Badge variant="outline">{faq.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        
        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Get help with specific issues not covered in the FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full p-2 border rounded-md" id="category">
                    <option>Technical Problem</option>
                    <option>Account Issue</option>
                    <option>Academic Question</option>
                    <option>Campus Services</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="description"
                    className="min-h-[100px] w-full p-2 border rounded-md"
                    placeholder="Please provide details about your issue..."
                  ></textarea>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Attach Files
              </Button>
              <Button>Submit Ticket</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
