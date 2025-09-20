import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Eye, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface PhishingEmail {
  id: string;
  sender: string;
  subject: string;
  classification: "Phishing" | "Legitimate";
  confidence: number;
  action: "Quarantined" | "Released" | "Pending";
  timestamp: string;
  suspiciousLinks: string[];
  headers: Record<string, string>;
}

const mockEmails: PhishingEmail[] = [
  {
    id: "1",
    sender: "support@bank-security.com",
    subject: "Urgent: Verify Your Account Immediately",
    classification: "Phishing",
    confidence: 97,
    action: "Quarantined",
    timestamp: "2024-01-15 09:23:45",
    suspiciousLinks: ["http://fake-bank-verify.com/login", "http://malicious-site.net/verify"],
    headers: {
      "From": "support@bank-security.com",
      "Reply-To": "noreply@suspicious-bank.ru",
      "X-Originating-IP": "185.220.101.42",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  },
  {
    id: "2",
    sender: "hr@company.com",
    subject: "Monthly Payroll Report - Action Required",
    classification: "Legitimate",
    confidence: 89,
    action: "Released",
    timestamp: "2024-01-15 08:15:22",
    suspiciousLinks: [],
    headers: {
      "From": "hr@company.com",
      "X-Originating-IP": "192.168.1.50",
      "DKIM-Signature": "v=1; a=rsa-sha256; d=company.com"
    }
  },
  {
    id: "3",
    sender: "admin@microsoft-support.net",
    subject: "Your Office 365 License Has Expired",
    classification: "Phishing",
    confidence: 94,
    action: "Quarantined",
    timestamp: "2024-01-15 07:45:13",
    suspiciousLinks: ["http://office365-renewal.tk/login", "http://microsoft-fake.com/renew"],
    headers: {
      "From": "admin@microsoft-support.net",
      "Reply-To": "admin@fake-microsoft.ru",
      "X-Originating-IP": "45.142.214.191"
    }
  },
  {
    id: "4",
    sender: "security@aws.amazon.com",
    subject: "AWS Security Alert: Unusual Login Activity",
    classification: "Phishing",
    confidence: 99,
    action: "Pending",
    timestamp: "2024-01-15 06:30:08",
    suspiciousLinks: ["http://aws-security-check.com/verify", "http://amazon-fake.net/login"],
    headers: {
      "From": "security@aws.amazon.com",
      "Reply-To": "support@aws-fake.com",
      "X-Originating-IP": "103.224.182.245"
    }
  }
];

const PhishingEmails = () => {
  const [emails, setEmails] = useState<PhishingEmail[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<PhishingEmail | null>(null);

  const handleAction = (emailId: string, newAction: "Quarantined" | "Released") => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, action: newAction } : email
    ));
  };

  const getClassificationBadge = (classification: string, confidence: number) => {
    if (classification === "Phishing") {
      return (
        <Badge variant="destructive" className="bg-threat-high/20 text-threat-high border-threat-high/50">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Phishing ({confidence}%)
        </Badge>
      );
    }
    return (
      <Badge className="bg-safe/20 text-safe border-safe/50">
        <CheckCircle className="h-3 w-3 mr-1" />
        Legitimate ({confidence}%)
      </Badge>
    );
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "Quarantined":
        return <Badge variant="destructive">Quarantined</Badge>;
      case "Released":
        return <Badge className="bg-safe/20 text-safe border-safe/50">Released</Badge>;
      case "Pending":
        return <Badge variant="outline">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-grotesk font-bold text-foreground">Phishing Email Detection</h1>
          <p className="text-muted-foreground">AI-powered email threat analysis and classification</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{emails.filter(e => e.classification === "Phishing").length}</span>{" "}
            phishing emails detected today
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-threat-high" />
              <div>
                <p className="text-2xl font-grotesk font-bold text-foreground">
                  {emails.filter(e => e.classification === "Phishing").length}
                </p>
                <p className="text-sm text-muted-foreground">Phishing Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-safe" />
              <div>
                <p className="text-2xl font-grotesk font-bold text-foreground">
                  {emails.filter(e => e.action === "Quarantined").length}
                </p>
                <p className="text-sm text-muted-foreground">Quarantined</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-cyber-blue" />
              <div>
                <p className="text-2xl font-grotesk font-bold text-foreground">
                  {emails.filter(e => e.action === "Released").length}
                </p>
                <p className="text-sm text-muted-foreground">Released</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-cyber-green" />
              <div>
                <p className="text-2xl font-grotesk font-bold text-foreground">97%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Analysis Table */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground font-grotesk">Email Analysis Results</CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time phishing detection and classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground font-medium">Sender</TableHead>
                <TableHead className="text-muted-foreground font-medium">Subject</TableHead>
                <TableHead className="text-muted-foreground font-medium">Classification</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Timestamp</TableHead>
                <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id} className="border-border hover:bg-muted/20">
                  <TableCell className="font-medium text-foreground">{email.sender}</TableCell>
                  <TableCell className="text-foreground max-w-xs truncate">{email.subject}</TableCell>
                  <TableCell>
                    {getClassificationBadge(email.classification, email.confidence)}
                  </TableCell>
                  <TableCell>{getActionBadge(email.action)}</TableCell>
                  <TableCell className="text-muted-foreground">{email.timestamp}</TableCell>
                  <TableCell className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEmail(email)}
                          className="border-border hover:bg-muted"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-foreground font-grotesk">Email Analysis Details</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Detailed threat analysis and email headers
                          </DialogDescription>
                        </DialogHeader>
                        {selectedEmail && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">From</label>
                                <p className="text-foreground">{selectedEmail.sender}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Classification</label>
                                <div className="mt-1">
                                  {getClassificationBadge(selectedEmail.classification, selectedEmail.confidence)}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Subject</label>
                              <p className="text-foreground">{selectedEmail.subject}</p>
                            </div>

                            {selectedEmail.suspiciousLinks.length > 0 && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Suspicious Links</label>
                                <div className="mt-2 space-y-1">
                                  {selectedEmail.suspiciousLinks.map((link, index) => (
                                    <div key={index} className="p-2 bg-destructive/10 rounded border border-destructive/20">
                                      <code className="text-sm text-destructive">{link}</code>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Email Headers</label>
                              <div className="mt-2 space-y-2">
                                {Object.entries(selectedEmail.headers).map(([key, value]) => (
                                  <div key={key} className="grid grid-cols-3 gap-2 text-sm">
                                    <span className="font-medium text-muted-foreground">{key}:</span>
                                    <span className="col-span-2 text-foreground font-mono text-xs">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {email.action === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(email.id, "Quarantined")}
                          className="border-destructive/50 text-destructive hover:bg-destructive/10"
                        >
                          Quarantine
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(email.id, "Released")}
                          className="border-safe/50 text-safe hover:bg-safe/10"
                        >
                          Release
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhishingEmails;