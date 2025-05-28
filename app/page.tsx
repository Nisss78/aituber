"use client"

import { useState } from "react"
import Layout from "../components/layout"
import DashboardPage from "../pages/dashboard-page"
import SchedulePage from "../pages/schedule-page"
import AnalyticsPage from "../pages/analytics-page"
import SettingsPage from "../pages/settings-page"
import MembersPage from "../pages/members-page"
import MemberDetailPage from "../pages/member-detail-page"
import AdvancedMemberSettings from "../pages/advanced-member-settings"
// Add the import for MemberGenerationPage
import MemberGenerationPage from "../pages/member-generation-page"

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

  // Update the renderPage function to include the member-generation case
  const renderPage = () => {
    if (selectedMemberId && showAdvancedSettings) {
      return <AdvancedMemberSettings memberId={selectedMemberId} onBack={() => setShowAdvancedSettings(false)} />
    }

    if (selectedMemberId) {
      return (
        <MemberDetailPage
          memberId={selectedMemberId}
          onBack={() => setSelectedMemberId(null)}
          onAdvancedSettings={() => setShowAdvancedSettings(true)}
        />
      )
    }

    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "schedule":
        return <SchedulePage />
      case "analytics":
        return <AnalyticsPage />
      case "settings":
        return <SettingsPage />
      case "members":
        return <MembersPage onMemberSelect={setSelectedMemberId} />
      case "member-generation":
        return <MemberGenerationPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}
