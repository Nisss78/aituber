"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, BarChart3, Settings, Users, MessageSquare, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Update the sidebarItems array to include the new member generation item
  const sidebarItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", id: "dashboard" },
    { icon: Calendar, label: "スケジュール", id: "schedule" },
    { icon: BarChart3, label: "分析", id: "analytics" },
    { icon: Settings, label: "設定", id: "settings" },
    { icon: Users, label: "メンバー一覧", id: "members" },
    { icon: Sparkles, label: "メンバー生成", id: "member-generation" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
          isHovered ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="overflow-hidden">
            {isHovered ? (
              <h1 className="text-2xl font-bold whitespace-nowrap">LOGO</h1>
            ) : (
              <div className="text-xl font-bold text-center">L</div>
            )}
          </div>
        </div>

        {/* Search Bar - only show when expanded */}
        {isHovered && (
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="検索..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start px-4 py-3 text-left mb-1 ${
                currentPage === item.id ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } ${isHovered ? "" : "px-4"}`}
              onClick={() => onPageChange(item.id)}
              title={!isHovered ? item.label : undefined}
            >
              <item.icon className={`h-5 w-5 ${isHovered ? "mr-3" : "mx-auto"}`} />
              {isHovered && <span className="whitespace-nowrap">{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-300 hover:bg-gray-700 ${isHovered ? "" : "px-4"}`}
            title={!isHovered ? "AGENTchat" : undefined}
          >
            <MessageSquare className={`h-5 w-5 ${isHovered ? "mr-3" : "mx-auto"}`} />
            {isHovered && <span className="whitespace-nowrap">AGENTchat</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
