import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Network, 
  Lock, 
  Bug, 
  AlertTriangle, 
  Download,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const threatTrendData = [
  { time: "00:00", phishing: 12, ddos: 3, bruteforce: 8, malware: 5 },
  { time: "04:00", phishing: 19, ddos: 1, bruteforce: 12, malware: 3 },
  { time: "08:00", phishing: 25, ddos: 7, bruteforce: 15, malware: 8 },
  { time: "12:00", phishing: 35, ddos: 12, bruteforce: 22, malware: 12 },
  { time: "16:00", phishing: 28, ddos: 8, bruteforce: 18, malware: 7 },
  { time: "20:00", phishing: 22, ddos: 4, bruteforce: 14, malware: 9 },
];

const threatDistributionData = [
  { name: "Phishing", value: 45, color: "#3B82F6" }, // Blue
  { name: "Brute Force", value: 25, color: "#EF4444" }, // Red
  { name: "Malware", value: 20, color: "#F59E0B" }, // Orange
  { name: "DDoS", value: 10, color: "#10B981" }, // Green
];

const Dashboard = () => {
  const generatePDFReport = () => {
    // Mock PDF generation
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Security Dashboard Report - Generated at ' + new Date().toLocaleString()));
    element.setAttribute('download', 'security-dashboard-report.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-grotesk font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">Real-time threat monitoring and analytics</p>
        </div>
        
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Phishing Emails</CardTitle>
            <Mail className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-grotesk font-bold text-foreground">247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-threat-high" />
              <span className="text-threat-high">+12%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">DDoS Attempts</CardTitle>
            <Network className="h-4 w-4 text-threat-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-grotesk font-bold text-foreground">43</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-safe" />
              <span className="text-safe">-8%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Brute Force</CardTitle>
            <Lock className="h-4 w-4 text-threat-high" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-grotesk font-bold text-foreground">156</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-threat-high" />
              <span className="text-threat-high">+23%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Malware Detected</CardTitle>
            <Bug className="h-4 w-4 text-threat-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-grotesk font-bold text-foreground">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-threat-high" />
              <span className="text-threat-high">+5%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Threat Trends Chart */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground font-grotesk">Threat Trends (24h)</CardTitle>
            <CardDescription className="text-muted-foreground">
              Real-time security incidents over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line type="monotone" dataKey="phishing" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="ddos" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="bruteforce" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="malware" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution Chart */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground font-grotesk">Threat Distribution</CardTitle>
            <CardDescription className="text-muted-foreground">
              Breakdown of detected threats by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground font-grotesk">Active Alerts</CardTitle>
          <CardDescription className="text-muted-foreground">
            Recent security incidents requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20 gap-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="font-medium text-foreground">High-Risk Phishing Campaign Detected</p>
                  <p className="text-sm text-muted-foreground">Targeting finance department - 15 emails quarantined</p>
                </div>
              </div>
              <Badge variant="destructive" className="shrink-0">Critical</Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-threat-medium/10 border border-threat-medium/20 gap-3">
              <div className="flex items-center gap-3">
                <Network className="h-5 w-5 shrink-0" style={{ color: 'hsl(var(--threat-medium))' }} />
                <div>
                  <p className="font-medium text-foreground">Suspicious Traffic Spike</p>
                  <p className="text-sm text-muted-foreground">DDoS attempt blocked from 192.168.1.100</p>
                </div>
              </div>
              <Badge style={{ backgroundColor: 'hsl(var(--threat-medium) / 0.2)', color: 'hsl(var(--threat-medium))' }} className="shrink-0">
                Medium
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-safe/10 border border-safe/20 gap-3">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-safe shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Malware Signature Updated</p>
                  <p className="text-sm text-muted-foreground">Database updated with 1,247 new signatures</p>
                </div>
              </div>
              <Badge style={{ backgroundColor: 'hsl(var(--safe) / 0.2)', color: 'hsl(var(--safe))' }} className="shrink-0">
                Info
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;