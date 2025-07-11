"use client";

import {
  HardDrive,
  Users,
  Cloud,
  FileText,
  Image,
  Video,
  FileArchive,
  Scale,
  Globe,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBalances } from "@/hooks/useBalances";
import { Progress } from "./ui/progress";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const sidebarItems = [
  { icon: HardDrive, label: "My Drive", route: null },
  { icon: Users, label: "Shared with me", route: "shared" },
  { icon: Globe, label: "Public Folders", route: "public" },
  // { icon: Trash2, label: "Trash", route: "trash" },
  { icon: Scale, label: "Proof Sets", route: "proof-sets" }
];

const fileTypes = [
  { icon: FileText, label: "Documents", route: "documents" },
  { icon: Image, label: "Images", route: "images" },
  { icon: Video, label: "Videos", route: "videos" },
  { icon: FileArchive, label: "Archives", route: "archives" },
  { icon: Brain, label: "Embeds", route: "embeds" }
];

export default function Sidebar() {
  const segment = useSelectedLayoutSegment();

  const {
    data,
    isLoading: isBalanceLoading,
  } = useBalances();
  const balances = data;

  const storageUsagePercent = balances?.currentRateAllowanceGB
    ? (balances.currentStorageGB / balances.currentRateAllowanceGB) * 100
    : 0;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 flex-1">
        {/* Navigation Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = segment === item.route;
            const href = item.route ? `/dashboard/${item.route}` : '/dashboard';
            
            return (
              <Link key={item.label} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start h-10 px-3"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Storage Section */}
        <div className="space-y-1">
            <Link href="/dashboard/storage">
              <Button
                variant={segment === "storage" ? "default" : "ghost"}
                className="w-full justify-start h-10 px-3"
              >
                <Cloud className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">Storage</span>
              </Button>
            </Link>

          {/* Storage Usage */}
          <div className="px-3 py-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {isBalanceLoading ? "..." : `${balances?.currentStorageGB?.toLocaleString()} GB of ${balances?.currentRateAllowanceGB?.toLocaleString()} GB used`}
                </span>
              </div>
              {!isBalanceLoading && (
                <Progress value={storageUsagePercent} className="h-2" />
              )}
              <p className="text-xs text-muted-foreground">
                {isBalanceLoading ? "..." : `${storageUsagePercent.toFixed(1)}% of allocated storage used`}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* File Types */}
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">File Types</h3>
          </div>
          {fileTypes.map((item) => {
            const isActive = segment === item.route;
            const href = `/dashboard/${item.route}`;
            
            return (
              <Link key={item.label} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start h-9 px-3 text-sm"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
