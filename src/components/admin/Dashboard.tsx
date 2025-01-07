"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Eye } from "lucide-react";
import { RecentArticles } from "./RecentArticles";
import { RecentComments } from "./RecentComments";
import { TopArticles } from "./TopArticles";
import ArticleLoadingSkeleton from "../Skeleton";
import useBatchedQueries from "@/lib/batchQueries";

interface DashboardStat {
  title: string;
  value: number;
  icon: any;
  description: string;
}

// to fix
// mobile responsive
// while importing, some links dont work
// dashboard should be user related. morph team should have one and authors should have one
// 6. user management
// fix signup where everyone is admin
// dashboard for approving content maybe
// 7. add a new card for total authors

//if a change is mad eto the content then the draft should be modified

// add oracles, subgraphs, etc to the article oage and also a searchba


export function Dashboard() {
  const { isLoading, data } = useBatchedQueries();

  if (isLoading) {
    return <ArticleLoadingSkeleton />;
  }

  const { articles, stats } = data;

  const dashboardStats: DashboardStat[] = [
    {
      title: "Total Articles",
      value: articles?.length || 0,
      icon: FileText,
      description: "Published articles",
    },
    {
      title: "Total Comments",
      value: stats?.totalComments || 0,
      icon: MessageSquare,
      description: "All comments",
    },
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      icon: Eye,
      description: "Article views",
    },
  ];

  return (
    <div className="h-full p-8 pt-6 space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
    </div>
    
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {dashboardStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <RecentArticles />
      {/* <RecentComments /> */}

      <TopArticles />
    </div>
  </div>
  );
}