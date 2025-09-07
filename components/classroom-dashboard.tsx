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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Trash2,
} from "lucide-react"

interface ClassroomDashboardProps {
  userRole: "student" | "faculty"
}

export function ClassroomDashboard({ userRole }: ClassroomDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [newNotification, setNewNotification] = useState("")
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showCreateAssignment, setShowCreateAssignment] = useState(false)
  const [showUploadNotes, setShowUploadNotes] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const [showCreateSubject, setShowCreateSubject] = useState(false)
  const [showCreateChapter, setShowCreateChapter] = useState(false)
  const [selectedSubjectForChapter, setSelectedSubjectForChapter] = useState("")
  const [newChapter, setNewChapter] = useState("")
  const [newRoom, setNewRoom] = useState({
    name: "",
    courseCode: "",
    section: "",
  })
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    section: "",
    file: null as File | null,
  })
  const [newNote, setNewNote] = useState({
    title: "",
    section: "",
    file: null as File | null,
  })
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

  const [notesUploadStep, setNotesUploadStep] = useState(1)
  const [notesUploadData, setNotesUploadData] = useState({
    subject: "",
    section: "",
    chapter: "",
    files: [] as File[],
  })
  const [notesError, setNotesError] = useState("")
  const [subjects, setSubjects] = useState(["Mathematics", "Physics", "Chemistry", "Computer Science"])
  const [showAddSubject, setShowAddSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [showEditSubjects, setShowEditSubjects] = useState(false)
  const [sections, setSections] = useState(["A", "B", "C", "D", "E"])
  const [showEditSections, setShowEditSections] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [chapters, setChapters] = useState(["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"])
  const [showEditChapters, setShowEditChapters] = useState(false)
  const [newChapterName, setNewChapterName] = useState("")

  const [subjectsOld, setSubjectsOld] = useState([
    { id: 1, name: "Mathematics", chapters: ["Calculus", "Linear Algebra", "Statistics"] },
    { id: 2, name: "Physics", chapters: ["Mechanics", "Thermodynamics", "Electromagnetism"] },
    { id: 3, name: "Chemistry", chapters: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
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

  const handleAssignmentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed")
        return
      }
      setNewAssignment({ ...newAssignment, file })
      console.log("[v0] Assignment file uploaded:", file.name, "Type:", file.type)
    }
  }

  const handleNotesFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      const validFiles = files.filter((file) => allowedTypes.includes(file.type))

      if (validFiles.length !== files.length) {
        setNotesError("Only PDF, JPG, and PNG files are allowed")
        return
      }

      setNotesUploadData({ ...notesUploadData, files: validFiles })
      setNotesError("")
      console.log(
        "[v0] Notes files uploaded:",
        validFiles.map((f) => f.name),
      )
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

  const handleCreateRoom = () => {
    if (newRoom.name.trim() && newRoom.courseCode.trim() && newRoom.section.trim()) {
      console.log("[v0] Creating room:", newRoom)
      setNewRoom({ name: "", courseCode: "", section: "" })
      setShowCreateRoom(false)
      alert("Room created successfully!")
    } else {
      alert("Please fill in all fields")
    }
  }

  const handleCreateAssignment = () => {
    if (newAssignment.title.trim() && newAssignment.description.trim() && newAssignment.section.trim()) {
      console.log("[v0] Creating assignment:", newAssignment)
      setNewAssignment({ title: "", description: "", section: "", file: null })
      setShowCreateAssignment(false)
      alert("Assignment created successfully!")
    } else {
      alert("Please fill in all required fields")
    }
  }

  const handleUploadNotes = () => {
    if (newNote.title.trim() && newNote.section.trim() && newNote.file) {
      console.log("[v0] Uploading notes:", newNote)
      setNewNote({ title: "", section: "", file: null })
      setShowUploadNotes(false)
      alert("Notes uploaded successfully!")
    } else {
      alert("Please fill in all fields and select a file")
    }
  }

  const handleCreateSubject = () => {
    if (newSubject.trim()) {
      const newSubjectObj = {
        id: subjectsOld.length + 1,
        name: newSubject,
        chapters: [],
      }
      setSubjectsOld([...subjectsOld, newSubjectObj])
      setNewSubject("")
      setShowCreateSubject(false)
      alert("Subject created successfully!")
    } else {
      alert("Please enter a subject name")
    }
  }

  const handleCreateChapter = () => {
    if (newChapter.trim() && selectedSubjectForChapter) {
      setSubjectsOld(
        subjectsOld.map((subject) =>
          subject.name === selectedSubjectForChapter
            ? { ...subject, chapters: [...subject.chapters, newChapter] }
            : subject,
        ),
      )
      setNewChapter("")
      setSelectedSubjectForChapter("")
      setShowCreateChapter(false)
      alert("Chapter created successfully!")
    } else {
      alert("Please enter a chapter name and select a subject")
    }
  }

  const handleNotesNextStep = () => {
    setNotesError("")

    if (notesUploadStep === 1) {
      if (!notesUploadData.subject) {
        setNotesError("Please select a subject")
        return
      }
    } else if (notesUploadStep === 2) {
      if (!notesUploadData.section) {
        setNotesError("Please select a section")
        return
      }
    } else if (notesUploadStep === 4) {
      if (notesUploadData.files.length === 0) {
        setNotesError("Please upload at least one file")
        return
      }
    }

    setNotesUploadStep(notesUploadStep + 1)
  }

  const handleNotesPrevStep = () => {
    setNotesError("")
    setNotesUploadStep(notesUploadStep - 1)
  }

  const handleNotesSubmit = () => {
    console.log("[v0] Uploading notes:", notesUploadData)
    // Reset form
    setNotesUploadData({ subject: "", section: "", chapter: "", files: [] })
    setNotesUploadStep(1)
    setNotesError("")
    setShowUploadNotes(false)
    alert("Notes uploaded successfully!")
  }

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      setSubjects([...subjects, newSubjectName.trim()])
      setNotesUploadData({ ...notesUploadData, subject: newSubjectName.trim() })
      setNewSubjectName("")
      setShowAddSubject(false)
      setNotesError("")
    }
  }

  const handleRemoveSubject = (subjectToRemove: string) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove))
    // Reset selected subject if it was the one being removed
    if (notesUploadData.subject === subjectToRemove) {
      setNotesUploadData({ ...notesUploadData, subject: "" })
    }
  }

  const handleAddSection = () => {
    if (newSectionName.trim() && !sections.includes(newSectionName.trim())) {
      setSections([...sections, newSectionName.trim()])
      setNewSectionName("")
    }
  }

  const handleRemoveSection = (sectionToRemove: string) => {
    setSections(sections.filter((section) => section !== sectionToRemove))
    // Reset selected section if it was the one being removed
    if (notesUploadData.section === sectionToRemove) {
      setNotesUploadData({ ...notesUploadData, section: "" })
    }
  }

  const handleAddChapter = () => {
    if (newChapterName.trim()) {
      setChapters([...chapters, newChapterName.trim()])
      setNewChapterName("")
    }
  }

  const handleRemoveChapter = (chapterToRemove: string) => {
    setChapters(chapters.filter((chapter) => chapter !== chapterToRemove))
    // Reset selected chapter if it was the one being removed
    if (notesUploadData.chapter === chapterToRemove) {
      setNotesUploadData({ ...notesUploadData, chapter: "" })
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

      {/* Room Creation Modal */}
      {showCreateRoom && userRole === "faculty" && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowCreateRoom(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Room</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateRoom(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="room-name" className="block text-sm font-medium mb-2">
                  Room Name
                </label>
                <Input
                  id="room-name"
                  placeholder="e.g., Advanced Mathematics"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="course-code" className="block text-sm font-medium mb-2">
                  Course Code
                </label>
                <Input
                  id="course-code"
                  placeholder="e.g., MATH301"
                  value={newRoom.courseCode}
                  onChange={(e) => setNewRoom({ ...newRoom, courseCode: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="section" className="block text-sm font-medium mb-2">
                  Section
                </label>
                <Select value={newRoom.section} onValueChange={(value) => setNewRoom({ ...newRoom, section: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                    <SelectItem value="E">Section E</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateRoom(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateRoom} className="flex-1">
                  Create Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Creation Modal */}
      {showCreateAssignment && userRole === "faculty" && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowCreateAssignment(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Assignment</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateAssignment(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="assignment-title" className="block text-sm font-medium mb-2">
                  Assignment Title
                </label>
                <Input
                  id="assignment-title"
                  placeholder="e.g., Calculus Problem Set 4"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="assignment-description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  id="assignment-description"
                  placeholder="Assignment instructions and requirements..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label htmlFor="assignment-section" className="block text-sm font-medium mb-2">
                  Section
                </label>
                <Select
                  value={newAssignment.section}
                  onValueChange={(value) => setNewAssignment({ ...newAssignment, section: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                    <SelectItem value="E">Section E</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="assignment-file" className="block text-sm font-medium mb-2">
                  Upload File (PDF, JPG, PNG - Optional)
                </label>
                <Input
                  id="assignment-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleAssignmentFileUpload}
                  className="cursor-pointer"
                />
                {newAssignment.file && (
                  <p className="text-sm text-green-600 mt-1">✓ {newAssignment.file.name} selected</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateAssignment(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment} className="flex-1">
                  Create Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Notes Modal */}
      {showUploadNotes && userRole === "faculty" && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => {
            setShowUploadNotes(false)
            setNotesUploadStep(1)
            setNotesUploadData({ subject: "", section: "", chapter: "", files: [] })
            setNotesError("")
          }}
        >
          <div
            className="bg-card rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upload Notes - Step {notesUploadStep} of 5</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowUploadNotes(false)
                  setNotesUploadStep(1)
                  setNotesUploadData({ subject: "", section: "", chapter: "", files: [] })
                  setNotesError("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Step 1: Select Subject */}
              {notesUploadStep === 1 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select Subject</label>
                  <Select
                    value={notesUploadData.subject}
                    onValueChange={(value) => setNotesUploadData({ ...notesUploadData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full bg-transparent"
                    onClick={() => setShowEditSubjects(true)}
                  >
                    Edit Subjects
                  </Button>
                </div>
              )}

              {/* Step 2: Select Section */}
              {notesUploadStep === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Select Section/Class</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEditSections(true)}
                      className="text-xs"
                    >
                      Edit Sections
                    </Button>
                  </div>
                  <Select
                    value={notesUploadData.section}
                    onValueChange={(value) => setNotesUploadData({ ...notesUploadData, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 3: Select Chapter */}
              {notesUploadStep === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Select Chapter</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEditChapters(true)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Edit Chapters
                    </Button>
                  </div>
                  <Select
                    value={notesUploadData.chapter}
                    onValueChange={(value) => setNotesUploadData({ ...notesUploadData, chapter: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Others">Others (Default for Extra/Non-Syllabus Notes)</SelectItem>
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter} value={chapter}>
                          {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 4: Upload Files */}
              {notesUploadStep === 4 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Upload File(s) (PDF, JPG, PNG)</label>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleNotesFileUpload}
                    className="cursor-pointer"
                  />
                  {notesUploadData.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {notesUploadData.files.map((file, index) => (
                        <p key={index} className="text-sm text-green-600">
                          ✓ {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Confirmation */}
              {notesUploadStep === 5 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Confirm Upload Details:</h3>
                  <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
                    <p>
                      <strong>Subject:</strong> {notesUploadData.subject}
                    </p>
                    <p>
                      <strong>Section:</strong> {notesUploadData.section}
                    </p>
                    <p>
                      <strong>Chapter:</strong> {notesUploadData.chapter || "Others"}
                    </p>
                    <p>
                      <strong>Files:</strong> {notesUploadData.files.length} file(s)
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {notesError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {notesError}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-2 pt-4">
                {notesUploadStep > 1 && (
                  <Button variant="outline" onClick={handleNotesPrevStep} className="flex-1 bg-transparent">
                    Previous
                  </Button>
                )}

                {notesUploadStep < 5 ? (
                  <Button onClick={handleNotesNextStep} className="flex-1">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleNotesSubmit} className="flex-1">
                    Upload Notes
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subjects Modal */}
      {showEditSubjects && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Subjects</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowEditSubjects(false)
                  setNewSubjectName("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Add New Subject Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Add New Subject</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter subject name"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddSubject} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Existing Subjects List */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Existing Subjects</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {subjects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No subjects added yet</p>
                ) : (
                  subjects.map((subject) => (
                    <div key={subject} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{subject}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSubject(subject)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button
              onClick={() => {
                setShowEditSubjects(false)
                setNewSubjectName("")
              }}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {showEditSections && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Sections</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEditSections(false)
                  setNewSectionName("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Add New Section */}
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter section name"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSection()}
                />
                <Button onClick={handleAddSection} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Existing Sections */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Sections:</h4>
              {sections.map((section) => (
                <div key={section} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Section {section}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSection(section)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={() => {
                  setShowEditSections(false)
                  setNewSectionName("")
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {showEditChapters && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowEditChapters(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Chapters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditChapters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Add new chapter */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter new chapter name"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddChapter()}
                />
                <Button onClick={handleAddChapter} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Existing chapters list */}
              <div className="max-h-60 overflow-y-auto space-y-2">
                {chapters.map((chapter) => (
                  <div key={chapter} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{chapter}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChapter(chapter)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setShowEditChapters(false)}>Done</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateSubject && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowCreateSubject(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Subject</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateSubject(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="subject-name" className="block text-sm font-medium mb-2">
                  Subject Name
                </label>
                <Input
                  id="subject-name"
                  placeholder="e.g., Advanced Mathematics"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateSubject(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateSubject} className="flex-1">
                  Create Subject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateChapter && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowCreateChapter(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Chapter</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateChapter(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject: {selectedSubjectForChapter}</label>
              </div>

              <div>
                <label htmlFor="chapter-name" className="block text-sm font-medium mb-2">
                  Chapter Name
                </label>
                <Input
                  id="chapter-name"
                  placeholder="e.g., Differential Equations"
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateChapter(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateChapter} className="flex-1">
                  Create Chapter
                </Button>
              </div>
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
                      <Button
                        className="w-full justify-start bg-transparent"
                        variant="outline"
                        onClick={() => setShowCreateRoom(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Room
                      </Button>
                      <Button
                        className="w-full justify-start bg-transparent"
                        variant="outline"
                        onClick={() => setShowCreateAssignment(true)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        New Assignment
                      </Button>
                      <Button
                        className="w-full justify-start bg-transparent"
                        variant="outline"
                        onClick={() => setShowUploadNotes(true)}
                      >
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
                <Button onClick={() => setShowCreateRoom(true)}>
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
                <Button onClick={() => setShowCreateAssignment(true)}>
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
                <Button onClick={() => setShowUploadNotes(true)}>
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
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{classItem.subject}</h3>
                          {classItem.status === "current" && (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <Clock className="mr-1 h-3 w-3" />
                              Current Class
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{classItem.professor}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{classItem.building}</Badge>
                          <Badge variant="outline">{classItem.room}</Badge>
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
