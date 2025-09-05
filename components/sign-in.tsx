"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User } from "lucide-react"

interface SignInProps {
  role: "student" | "faculty" | null
  onSignIn: () => void
}

export function SignIn({ role, onSignIn }: SignInProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin123" && password === "admin123") {
      onSignIn()
    } else {
      setError("Invalid credentials. Use username: admin123, password: admin123")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">JU Pocket</h1>
          <p className="text-emerald-600 capitalize">Sign in as {role}</p>
        </div>

        <Card className="border-emerald-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-emerald-800">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access JU Pocket</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-emerald-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Sign In
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-emerald-600">Demo credentials: admin123 / admin123</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
