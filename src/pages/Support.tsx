
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageSquare, HelpCircle, FileText, Send } from "lucide-react";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  category: string;
}

// FAQ data
const faqData: FAQ[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page. Enter your registered email, and we'll send you a link to reset your password.",
    category: "account",
  },
  {
    id: "2",
    question: "How can I contact support?",
    answer: "You can reach us through the live chat button or email us at support@example.com. We're here to help!",
    category: "general",
  },
  {
    id: "3",
    question: "Why am I not receiving verification emails?",
    answer: "Please check your spam or junk folder. If it's still missing, try resending the email or update your address in your profile.",
    category: "account",
  },
  {
    id: "4",
    question: "How do I update my profile information?",
    answer: "Go to your dashboard, click on your profile, then choose 'Edit' to update your details like name, email, or contact number.",
    category: "account",
  },
  {
    id: "5",
    question: "Can I use the platform on mobile?",
    answer: "Yes! You can use our mobile-friendly website or download the app from the Play Store or App Store.",
    category: "general",
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newTicket, setNewTicket] = useState({ title: "", description: "", category: "technical" });
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "Cannot access my course materials",
      description: "I've been trying to access my CS101 course materials but keep getting an error message.",
      status: "in-progress",
      createdAt: "2 days ago",
      category: "technical",
    },
    {
      id: "2",
      title: "Request for late submission",
      description: "Due to medical reasons, I need an extension for my assignment due tomorrow.",
      status: "open",
      createdAt: "1 day ago",
      category: "academic",
    },
  ]);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle ticket submission
  const handleSubmitTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmittingTicket(true);

    // Simulate API call
    setTimeout(() => {
      const ticket: Ticket = {
        id: (tickets.length + 1).toString(),
        title: newTicket.title,
        description: newTicket.description,
        status: "open",
        createdAt: "Just now",
        category: newTicket.category,
      };

      setTickets([ticket, ...tickets]);
      setNewTicket({ title: "", description: "", category: "technical" });
      setIsSubmittingTicket(false);
      toast.success("Support ticket submitted successfully");
    }, 1000);
  };

  // Get badge color for ticket status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return "secondary";
      case "in-progress":
        return "default";
      case "resolved":
        return "outline";
      case "closed":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Handle selecting a FAQ
  const handleSelectFaq = (faq: FAQ) => {
    setSelectedFaq(faq);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <Button variant="outline">Contact Admin</Button>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>FAQ Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setSearchQuery("")}>
                    All Questions
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setSearchQuery("account")}>
                    Account & Login
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setSearchQuery("course")}>
                    Courses & Enrollment
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setSearchQuery("technical")}>
                    Technical Issues
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setSearchQuery("general")}>
                    General Information
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{selectedFaq ? "Answer" : "Common Questions"}</CardTitle>
                  {selectedFaq && (
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSelectedFaq(null)}>
                      Back to questions
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedFaq ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-lg">{selectedFaq.question}</h3>
                        <Badge className="mt-1">{selectedFaq.category}</Badge>
                      </div>
                      <p>{selectedFaq.answer}</p>
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Was this answer helpful?
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => toast.success("Thank you for your feedback!")}>
                            Yes
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => toast.success("We'll work to improve this answer. Thank you!")}>
                            No
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFAQs.length === 0 ? (
                        <div className="text-center py-8">
                          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                          <p className="mt-2 text-muted-foreground">No questions found matching your search</p>
                        </div>
                      ) : (
                        filteredFAQs.map((faq) => (
                          <div 
                            key={faq.id} 
                            className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => handleSelectFaq(faq)}
                          >
                            <div className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <h3 className="font-medium">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {faq.answer.substring(0, 100)}
                                  {faq.answer.length > 100 ? "..." : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Ticket</CardTitle>
                  <CardDescription>We'll respond as soon as possible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Brief description of your issue"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="academic">Academic Request</option>
                      <option value="account">Account Problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details about your issue..."
                      rows={5}
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    />
                  </div>
                  <Button 
                    className="w-full mt-2" 
                    onClick={handleSubmitTicket} 
                    disabled={isSubmittingTicket}
                  >
                    {isSubmittingTicket ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Tickets</CardTitle>
                  <CardDescription>Track status of your support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <p className="mt-2 text-muted-foreground">You haven't submitted any tickets yet</p>
                      </div>
                    ) : (
                      tickets.map((ticket) => (
                        <div key={ticket.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{ticket.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge>{ticket.category}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {ticket.createdAt}
                                </span>
                              </div>
                            </div>
                            <Badge variant={getStatusBadge(ticket.status)}>
                              {ticket.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm">{ticket.description}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {ticket.status !== "closed" && (
                              <div className="flex items-center">
                                <Input
                                  placeholder="Add a comment..."
                                  className="text-xs h-8 mr-2"
                                />
                                <Button size="icon" className="h-8 w-8">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Tickets</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
