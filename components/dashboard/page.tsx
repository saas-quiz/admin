import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/dashboard/components/date-range-picker";
import { Overview } from "@/components/dashboard/components/overview";
import { RecentScores } from "@/components/dashboard/components/recent-scores";
import GroupSwitcher from "@/components/dashboard/components/group-switcher";
import { Menu, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="pointer-events-none opacity-30 select-none">
      <div className="flex-col">
        <div className="flex-1 space-y-6 p-2">
          <div className="flex flex-col justify-between gap-2 lg:flex-row">
            <div className="flex items-center justify-between space-x-2">
              <h2 className="text-xl xs:text-3xl font-bold tracking-tight">Statistics</h2>
              <GroupSwitcher />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <CalendarDateRangePicker />
              <Button className="px-2 sm:px-3" size={"sm"}>
                Download
              </Button>
            </div>
          </div>

          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                <Menu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">260</div>
                {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <Card className="col-span-4 w-full">
              <CardHeader className="">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pr-2 w-full">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 w-full">
              <CardHeader className="p-4 xs:p-6">
                <CardTitle>Recent Scores</CardTitle>
                <CardDescription>5 recent scores across all teams</CardDescription>
              </CardHeader>
              <CardContent className="p-2 xs:p-6">
                <RecentScores />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
