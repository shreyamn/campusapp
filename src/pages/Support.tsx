
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
    
    // Add user message to chat history
    setChatHistory([...chatHistory, {message: chatMessage, isBot: false}]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        message: "Thank you for your message. A support representative will get back to you soon.",
        isBot: true
      }]);
    }, 1000);
    
    // Clear input
    setChatMessage("");
  };
  
  const getFAQsByCategory = (category: string) => {
    return filteredFAQs.filter(faq => faq.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support</h1>
        <Button>Contact Admin</Button>
      </div>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="mt-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="campus">Campus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No FAQs found matching your search</p>
                </div>
              ) : (
                filteredFAQs.map(faq => (
                  <Card key={faq.id}>
                    <CardHeader>
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                      <Badge variant="outline" className="mt-2">{faq.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            {["account", "academic", "campus"].map(category => (
              <TabsContent key={category} value={category} className="mt-4 space-y-4">
                {getFAQsByCategory(category).length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No FAQs found in this category</p>
                  </div>
                ) : (
                  getFAQsByCategory(category).map(faq => (
                    <Card key={faq.id}>
                      <CardHeader>
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        
        <TabsContent value="chat" className="mt-4">
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle>Live Support Chat</CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-4">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Create and manage support tickets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-10">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No Active Tickets</p>
                <p className="text-muted-foreground mb-4">Create a new ticket to get help from our support team</p>
                <Button>Create New Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
