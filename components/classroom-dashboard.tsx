"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Bell,
  Search,
  Plus,
  Upload,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Send,
} from "lucide-react"

interface ClassroomDashboardProps {
  userRole: "student" | "faculty"
}

export function ClassroomDashboard({ userRole }: ClassroomDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [newNotification, setNewNotification] = useState("")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Assignment Reminder",
      message: "Calculus Problem Set 3 is due tomorrow",
      time: "2 hours ago",
      type: "assignment",
    },
    {
      id: 2,
      title: "Class Update",
      message: "Physics lab session has been moved to Friday 2 PM",
      time: "4 hours ago",
      type: "announcement",
    },
    {
      id: 3,
      title: "Grades Posted",
      message: "Chemistry quiz results are now available",
      time: "1 day ago",
      type: "grades",
    },
    {
      id: 4,
      title: "New Material",
      message: "Linear Algebra notes have been uploaded",
      time: "2 days ago",
      type: "material",
    },
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed")
        return
      }
      setUploadedFile(file)
      console.log("[v0] File uploaded:", file.name, "Size:", file.size)
    }
  }

  const handleAddNotification = () => {
    if (newNotification.trim() && userRole === "faculty") {
      const notification = {
        id: notifications.length + 1,
        title: "New Announcement",
        message: newNotification,
        time: "Just now",
        type: "announcement",
      }
      setNotifications([notification, ...notifications])
      setNewNotification("")
    }
  }

  const rooms = [
    { id: 1, name: "Mathematics - Section A", students: 28, code: "MATH101A", color: "bg-primary" },
    { id: 2, name: "Physics - Section B", students: 25, code: "PHY201B", color: "bg-accent" },
    { id: 3, name: "Chemistry - Section C", students: 30, code: "CHEM301C", color: "bg-chart-2" },
  ]

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set 3",
      subject: "Mathematics",
      dueDate: "2024-01-15",
      status: "pending",
      submissions: 18,
    },
    {
      id: 2,
      title: "Newton's Laws Lab Report",
      subject: "Physics",
      dueDate: "2024-01-12",
      status: "graded",
      submissions: 25,
    },
    {
      id: 3,
      title: "Organic Chemistry Quiz",
      subject: "Chemistry",
      dueDate: "2024-01-20",
      status: "draft",
      submissions: 0,
    },
  ]

  const notes = [
    { id: 1, title: "Linear Algebra Fundamentals", subject: "Mathematics", unit: "Unit 1", uploadDate: "2024-01-08" },
    { id: 2, title: "Thermodynamics Principles", subject: "Physics", unit: "Unit 2", uploadDate: "2024-01-10" },
    { id: 3, title: "Molecular Structure Guide", subject: "Chemistry", unit: "Unit 1", uploadDate: "2024-01-05" },
  ]

  const recentMessages = [
    { id: 1, room: "Mathematics - Section A", message: "Assignment 3 has been posted", time: "2 hours ago" },
    { id: 2, room: "Physics - Section B", message: "Lab session moved to Friday", time: "4 hours ago" },
    { id: 3, room: "Chemistry - Section C", message: "Quiz results are now available", time: "1 day ago" },
  ]

  const todaySchedule = [
    {
      id: 1,
      subject: "Mathematics",
      time: "09:00 - 10:30",
      building: "Building A",
      room: "Room 101",
      professor: "Dr. Smith",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Physics",
      time: "11:00 - 12:30",
      building: "Building B",
      room: "Room 205",
      professor: "Dr. Johnson",
      status: "current",
    },
    {
      id: 3,
      subject: "Chemistry",
      time: "14:00 - 15:30",
      building: "Building C",
      room: "Room 302",
      professor: "Dr. Brown",
      status: "upcoming",
    },
    {
      id: 4,
      subject: "Computer Science",
      time: "16:00 - 17:30",
      building: "Building D",
      room: "Room 401",
      professor: "Dr. Wilson",
      status: "upcoming",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">JU Pocket</h1>
                <Badge variant={userRole === "faculty" ? "default" : "secondary"}>
                  {userRole === "faculty" ? "Faculty" : "Student"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search classes, assignments..." className="w-64 pl-10" />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{userRole === "faculty" ? "FC" : "ST"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setShowNotifications(false)}>
          <div
            className="absolute right-0 top-0 h-full w-96 bg-card border-l shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notification Creation Form for Faculty */}
            {userRole === "faculty" && (
              <div className="p-4 border-b bg-muted/50">
                <h3 className="text-sm font-medium mb-2">Add New Notification</h3>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter notification message..."
                    value={newNotification}
                    onChange={(e) => setNewNotification(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={handleAddNotification} className="w-full" disabled={!newNotification.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                </div>
              </div>
            )}

            {/* Notification List Display */}
            <div className="p-4 space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {notification.type}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${userRole === "student" ? "grid-cols-5" : "grid-cols-4"}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            {userRole === "student" && <TabsTrigger value="schedule">Schedule</TabsTrigger>}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {userRole === "faculty" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rooms.length}</div>
                    <p className="text-xs text-muted-foreground">Active classrooms</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rooms.reduce((sum, room) => sum + room.students, 0)}</div>
                    <p className="text-xs text-muted-foreground">Enrolled students</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{assignments.length}</div>
                    <p className="text-xs text-muted-foreground">Active assignments</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Notes</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{notes.length}</div>
                    <p className="text-xs text-muted-foreground">Study materials</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Rooms</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rooms.length}</div>
                    <p className="text-xs text-muted-foreground">Enrolled classes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
                    <p className="text-xs text-muted-foreground">Due soon</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{notes.length}</div>
                    <p className="text-xs text-muted-foreground">Available notes</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest classroom announcements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{message.room}</p>
                        <p className="text-sm text-muted-foreground">{message.message}</p>
                        <p className="text-xs text-muted-foreground">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    {userRole === "faculty" ? "Common tasks and shortcuts" : "Student actions"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userRole === "faculty" ? (
                    <>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Room
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        New Assignment
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Notes
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Class
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="assignment-upload" className="block text-sm font-medium">
                          Upload Assignment (PDF, max 10MB)
                        </label>
                        <Input
                          id="assignment-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        {uploadedFile && (
                          <p className="text-sm text-green-600">✓ {uploadedFile.name} ready to submit</p>
                        )}
                      </div>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View My Submissions
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Study Materials
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{userRole === "faculty" ? "Manage Classrooms" : "My Classrooms"}</h2>
              {userRole === "faculty" && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Room
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-lg ${room.color} flex items-center justify-center`}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary">{room.code}</Badge>
                    </div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription>
                      {userRole === "faculty" ? `${room.students} students enrolled` : "Enrolled"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{userRole === "faculty" ? `${room.students} students` : "View materials"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{userRole === "faculty" ? "Manage Assignments" : "My Assignments"}</h2>
              {userRole === "faculty" && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          {userRole === "faculty" && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{assignment.submissions} submissions</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            assignment.status === "graded"
                              ? "default"
                              : assignment.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assignment.status === "graded" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {assignment.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                          {assignment.status === "draft" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {assignment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {userRole === "faculty" ? "View Details" : "Submit Assignment"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Study Notes</h2>
              {userRole === "faculty" && (
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Notes
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{note.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{note.subject}</span>
                          <span>{note.unit}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Uploaded: {note.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab for students */}
          {userRole === "student" && (
            <TabsContent value="schedule" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Today's Schedule</h2>
                <Badge variant="outline" className="text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Badge>
              </div>

              <div className="space-y-4">
                {todaySchedule.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className={`${classItem.status === "current" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{classItem.subject}</h3>
                            {classItem.status === "current" && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <Clock className="mr-1 h-3 w-3" />
                                Current Class
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{classItem.professor}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm font-medium">
                            <Badge variant="secondary">{classItem.building}</Badge>
                            <Badge variant="outline">{classItem.room}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {classItem.status === "current" && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Join Class
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {todaySchedule.length === 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Classes Today</h3>
                      <p className="text-muted-foreground">Enjoy your free day!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
