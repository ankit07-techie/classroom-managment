"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: "student" | "faculty") => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">JU Pocket</h1>
          <p className="text-emerald-600">Choose your role to continue</p>
        </div>

        <div className="space-y-4">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200"
            onClick={() => onRoleSelect("student")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-800">Student</CardTitle>
              <CardDescription>Access your courses, assignments, and notes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => onRoleSelect("student")}>
                Continue as Student
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200"
            onClick={() => onRoleSelect("faculty")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-800">Faculty</CardTitle>
              <CardDescription>Manage classes, create assignments, and track progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => onRoleSelect("faculty")}>
                Continue as Faculty
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
