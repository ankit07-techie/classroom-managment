"use client"

import { useState } from "react"
import { RoleSelection } from "@/components/role-selection"
import { SignIn } from "@/components/sign-in"
import { ClassroomDashboard } from "@/components/classroom-dashboard"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"role" | "signin" | "dashboard">("role")
  const [selectedRole, setSelectedRole] = useState<"student" | "faculty" | null>(null)

  const handleRoleSelect = (role: "student" | "faculty") => {
    setSelectedRole(role)
    setCurrentStep("signin")
  }

  const handleSignIn = () => {
    setCurrentStep("dashboard")
  }

  if (currentStep === "role") {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  if (currentStep === "signin") {
    return <SignIn role={selectedRole} onSignIn={handleSignIn} />
  }

  return <ClassroomDashboard userRole={selectedRole!} />
}
