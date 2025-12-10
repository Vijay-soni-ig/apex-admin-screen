import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Send,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ticketData = {
  id: "TCK-4902",
  subject: "Refund delay for booking BKG-2034",
  description: "I have been waiting for my refund for over 7 days now. The booking was cancelled on 22nd October and I still haven't received my money back. Please look into this urgently.",
  user: "Priya Sharma",
  userEmail: "priya.sharma@email.com",
  userType: "Customer",
  category: "Payment",
  priority: "High",
  status: "Open",
  assignedTo: "Ankit (Support)",
  createdAt: "29 Oct 2024 09:15 AM",
  updatedAt: "29 Oct 2024 10:42 AM",
  relatedBooking: "BKG-2034",
};

const messages = [
  {
    id: 1,
    sender: "Priya Sharma",
    role: "Customer",
    message: "I have been waiting for my refund for over 7 days now. The booking was cancelled on 22nd October and I still haven't received my money back. Please look into this urgently.",
    timestamp: "29 Oct 2024 09:15 AM",
    isCustomer: true,
  },
  {
    id: 2,
    sender: "Ankit (Support)",
    role: "Support Agent",
    message: "Hello Priya, I apologize for the inconvenience. Let me check the status of your refund right away. Could you please confirm your bank account ending digits for verification?",
    timestamp: "29 Oct 2024 09:45 AM",
    isCustomer: false,
  },
  {
    id: 3,
    sender: "Priya Sharma",
    role: "Customer",
    message: "Yes, my account ends with 4532. I paid via UPI linked to this account.",
    timestamp: "29 Oct 2024 10:02 AM",
    isCustomer: true,
  },
  {
    id: 4,
    sender: "Ankit (Support)",
    role: "Support Agent",
    message: "Thank you for confirming. I've checked and the refund was processed on 25th October. It should reflect within 5-7 business days. If not received by tomorrow, please let us know.",
    timestamp: "29 Oct 2024 10:42 AM",
    isCustomer: false,
  },
];

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState(ticketData.status);
  const [priority, setPriority] = useState(ticketData.priority);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast({
      title: "Message sent",
      description: "Your reply has been sent to the customer.",
    });
    setNewMessage("");
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus}`,
    });
  };

  const handleResolve = () => {
    setStatus("Resolved");
    toast({
      title: "Ticket resolved",
      description: "The ticket has been marked as resolved.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-accent text-accent-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      case "Resolved":
      case "Closed":
        return "bg-success text-success-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/tickets")} className="hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{ticketId || ticketData.id}</h1>
            <Badge className={getPriorityColor(priority)}>{priority}</Badge>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{ticketData.subject}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResolve} disabled={status === "Resolved"}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Resolve
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Escalate Ticket</DropdownMenuItem>
              <DropdownMenuItem>Reassign</DropdownMenuItem>
              <DropdownMenuItem>Merge with Another</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Ticket</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.isCustomer ? "" : "flex-row-reverse"}`}
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className={msg.isCustomer ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}>
                        {msg.sender.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.isCustomer ? "" : "text-right"}`}>
                      <div className={`inline-block max-w-[80%] p-4 rounded-xl ${
                        msg.isCustomer 
                          ? "bg-muted text-left" 
                          : "bg-primary text-primary-foreground text-left"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{msg.sender}</span>
                          <Badge variant="outline" className={`text-xs ${msg.isCustomer ? "" : "border-primary-foreground/30 text-primary-foreground"}`}>
                            {msg.role}
                          </Badge>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-2 ${msg.isCustomer ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <Button onClick={handleSendMessage} className="shrink-0 self-end">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Status</label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Category</label>
                <Input value={ticketData.category} disabled />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Assigned To</label>
                <Select defaultValue="ankit">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ankit">Ankit (Support)</SelectItem>
                    <SelectItem value="riya">Riya (Support)</SelectItem>
                    <SelectItem value="vijay">Vijay (Admin)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">PS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ticketData.user}</p>
                  <p className="text-sm text-muted-foreground">{ticketData.userEmail}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span>{ticketData.userType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Related Booking</span>
                  <Button variant="link" className="h-auto p-0 text-sm" onClick={() => navigate(`/booking-details/${ticketData.relatedBooking}`)}>
                    {ticketData.relatedBooking}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-success" />
                  <div>
                    <p className="text-sm font-medium">Ticket Created</p>
                    <p className="text-xs text-muted-foreground">{ticketData.createdAt}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm font-medium">Assigned to Ankit</p>
                    <p className="text-xs text-muted-foreground">29 Oct 2024 09:30 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{ticketData.updatedAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
