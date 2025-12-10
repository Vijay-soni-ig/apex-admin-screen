import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Book,
  MessageCircle,
  Video,
  FileText,
  ExternalLink,
  ChevronRight,
  Zap,
  Users,
  Settings,
  CreditCard,
  Calendar,
  Shield,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const quickLinks = [
  { title: "Getting Started", desc: "Learn the basics", icon: Zap, href: "#" },
  { title: "User Management", desc: "Manage users & providers", icon: Users, href: "#" },
  { title: "Bookings", desc: "Handle bookings", icon: Calendar, href: "#" },
  { title: "Payments", desc: "Payment processing", icon: CreditCard, href: "#" },
  { title: "Settings", desc: "Platform configuration", icon: Settings, href: "#" },
  { title: "Security", desc: "Security best practices", icon: Shield, href: "#" },
];

const faqs = [
  {
    question: "How do I approve a new provider?",
    answer: "Navigate to User Management > Verification, find the provider in the 'Pending' tab, review their documents, and click 'Approve' or 'Reject' based on your assessment.",
  },
  {
    question: "How can I process a refund?",
    answer: "Go to Operations > Bookings, find the booking, click 'View Details', and use the 'Process Refund' option. The refund will be processed within 5-7 business days.",
  },
  {
    question: "How do I add a new service category?",
    answer: "Navigate to Operations > Services > Categories, click 'Add Category', fill in the details including name, description, and icon, then save.",
  },
  {
    question: "How can I change my admin password?",
    answer: "Go to your Profile (click your avatar in the top right), select 'Security' tab, and use the 'Change Password' section to update your credentials.",
  },
  {
    question: "How do I export reports?",
    answer: "Go to Overview > Analytics, select your date range, and click 'Export Report'. You can choose between PDF, Excel, or CSV formats.",
  },
  {
    question: "How can I manage user roles and permissions?",
    answer: "Navigate to User Management > Roles & Access. Here you can create new roles, edit existing ones, and assign specific permissions to each role.",
  },
];

const resources = [
  { title: "Admin User Guide", type: "PDF", size: "2.4 MB", icon: FileText },
  { title: "Video Tutorials", type: "Videos", count: "12", icon: Video },
  { title: "API Documentation", type: "Docs", version: "v2.1", icon: Book },
];

const HelpCenter = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground mt-2">Find answers, tutorials, and resources to help you manage the platform</p>
        
        <div className="relative mt-6 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help articles, tutorials, FAQs..."
            className="pl-12 h-12 text-lg rounded-xl"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {quickLinks.map((link, idx) => (
          <Card key={idx} className="group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mt-3">{link.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {resource.type} • {resource.size || resource.count || resource.version}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="h-14 w-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mt-4">Need More Help?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button className="mt-4 w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { keys: ["⌘", "K"], action: "Quick search" },
                { keys: ["⌘", "N"], action: "New booking" },
                { keys: ["⌘", "/"], action: "Help center" },
                { keys: ["Esc"], action: "Close modal" },
              ].map((shortcut, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{shortcut.action}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, kidx) => (
                      <kbd
                        key={kidx}
                        className="px-2 py-1 text-xs bg-muted rounded border"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
