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
import { Label } from "@/components/ui/label"
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
  Settings,
  Heart,
  Award,
  Home,
  BarChart3,
  MessageSquare,
  Pin,
  Check,
  MoreHorizontal,
  Archive,
  Copy,
  MapPin,
} from "lucide-react"

function ClassroomDashboard({ userRole }: { userRole: "student" | "faculty" }) {
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

  const [showLeaveRequest, setShowLeaveRequest] = useState(false)
  const [leaveStep, setLeaveStep] = useState(1)
  const [selectedLeaveType, setSelectedLeaveType] = useState("")
  const [selectedLeaveDates, setSelectedLeaveDates] = useState<string[]>([])
  const [leaveDuration, setLeaveDuration] = useState("")
  const [leaveReason, setLeaveReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [leaveAttachment, setLeaveAttachment] = useState<File | null>(null)

  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [showRoomManagement, setShowRoomManagement] = useState(false)
  const [roomManagementTab, setRoomManagementTab] = useState("overview")
  const [editingRoom, setEditingRoom] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" })
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Question about Assignment 3",
      author: "John Doe",
      content: "Can someone explain the third problem?",
      replies: 2,
      likes: 5,
      isPinned: false,
      isResolved: false,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Study Group Formation",
      author: "Jane Smith",
      content: "Looking for study partners for the upcoming exam",
      replies: 8,
      likes: 12,
      isPinned: true,
      isResolved: false,
      timestamp: "1 day ago",
    },
  ])

  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [submissionFile, setSubmissionFile] = useState<File | null>(null)

  const [leaveFromDate, setLeaveFromDate] = useState("")
  const [leaveToDate, setLeaveToDate] = useState("")
  const [customLeaveReason, setCustomLeaveReason] = useState("")
  const [leaveDocument, setLeaveDocument] = useState<File | null>(null)
  const [isHalfDay, setIsHalfDay] = useState(false)

  const weeklySchedule = [
    {
      id: 1,
      subject: "Engineering Mathematics-I",
      code: "EM-I",
      time: "08:50 - 09:40",
      building: "NYB",
      room: "503",
      professor: "Dr. VKK",
      avatar: "/diverse-professor-lecturing.png",
      attendance: 88,
      canSkip: 3,
      day: "Monday",
      status: "upcoming",
      color: "purple",
    },
    {
      id: 2,
      subject: "Computer Programming Lab",
      code: "CPLT",
      time: "10:30 - 12:20",
      building: "Lab",
      room: "Computer Lab 1",
      professor: "Prof. Singh",
      avatar: "/professor2.jpg",
      attendance: 92,
      canSkip: 5,
      day: "Monday",
      status: "current",
      color: "orange",
    },
    {
      id: 3,
      subject: "Engineering Chemistry",
      code: "EC",
      time: "14:00 - 14:50",
      building: "NYB",
      room: "201",
      professor: "Dr. Sharma",
      avatar: "/professor3.jpg",
      attendance: 76,
      canSkip: 1,
      day: "Monday",
      status: "upcoming",
      color: "green",
    },
    {
      id: 4,
      subject: "Computer Science Fundamentals",
      code: "CSF",
      time: "15:00 - 15:50",
      building: "NYB",
      room: "405",
      professor: "Dr. Kumar",
      avatar: "/professor4.jpg",
      attendance: 94,
      canSkip: 7,
      day: "Monday",
      status: "upcoming",
      color: "blue",
    },
    {
      id: 5,
      subject: "Physics Lab",
      code: "PL",
      time: "16:00 - 17:50",
      building: "Lab",
      room: "Physics Lab 2",
      professor: "Dr. Patel",
      avatar: "/professor5.jpg",
      attendance: 82,
      canSkip: 2,
      day: "Monday",
      status: "upcoming",
      color: "red",
    },
  ]

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

  const handleRoomClick = (room: any) => {
    if (userRole === "faculty") {
      setSelectedRoom(room)
      setShowRoomManagement(true)
      setEditingRoom({ ...room })
    }
  }

  const handleUpdateRoom = () => {
    console.log("[v0] Updating room:", editingRoom)
    setSelectedRoom(editingRoom)
    alert("Room updated successfully!")
  }

  const handleDeleteRoom = () => {
    console.log("[v0] Deleting room:", selectedRoom.id)
    setShowDeleteConfirm(false)
    setShowRoomManagement(false)
    alert("Room deleted successfully!")
  }

  const handleArchiveRoom = () => {
    console.log("[v0] Archiving room:", selectedRoom.id)
    alert("Room archived successfully!")
  }

  const handleDuplicateRoom = () => {
    console.log("[v0] Duplicating room:", selectedRoom.id)
    alert("Room duplicated successfully!")
  }

  const handleInviteMember = () => {
    if (newMemberEmail.trim()) {
      console.log("[v0] Inviting member:", newMemberEmail)
      setNewMemberEmail("")
      alert("Invitation sent successfully!")
    }
  }

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      const discussion = {
        id: discussions.length + 1,
        title: newDiscussion.title,
        author: "Faculty",
        content: newDiscussion.content,
        replies: 0,
        likes: 0,
        isPinned: false,
        isResolved: false,
        timestamp: "Just now",
      }
      setDiscussions([discussion, ...discussions])
      setNewDiscussion({ title: "", content: "" })
      alert("Discussion created successfully!")
    }
  }

  const togglePinDiscussion = (id: number) => {
    setDiscussions(discussions.map((d) => (d.id === id ? { ...d, isPinned: !d.isPinned } : d)))
  }

  const toggleResolveDiscussion = (id: number) => {
    setDiscussions(discussions.map((d) => (d.id === id ? { ...d, isResolved: !d.isResolved } : d)))
  }

  const handleSubmissionFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert("File size must be less than 10MB")
        return
      }
      setSubmissionFile(file)
      console.log("[v0] Submission file uploaded:", file.name, "Type:", file.type)
    }
  }

  const handleSubmitAssignment = () => {
    if (submissionFile && selectedAssignment) {
      console.log("[v0] Submitting assignment:", selectedAssignment.title, "File:", submissionFile.name)
      setSubmissionFile(null)
      setSelectedAssignment(null)
      setShowSubmitAssignment(false)
      alert("Assignment submitted successfully!")
    } else {
      alert("Please select a file to submit")
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
                <div className="flex items-center gap-2">
                  <Select value={newRoom.section} onValueChange={(value) => setNewRoom({ ...newRoom, section: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditSections(true)}
                    className="text-xs whitespace-nowrap"
                  >
                    Edit Sections
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Select
                    value={newAssignment.section}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditSections(true)}
                    className="whitespace-nowrap"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
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

      {/* Room Management Modal */}
      {showRoomManagement && selectedRoom && userRole === "faculty" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div
            className="bg-card rounded-lg shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">{selectedRoom.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowRoomManagement(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 border-r bg-muted/30 p-4">
                <nav className="space-y-2">
                  <Button
                    variant={roomManagementTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setRoomManagementTab("overview")}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button
                    variant={roomManagementTab === "management" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setRoomManagementTab("management")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Room Management
                  </Button>
                  <Button
                    variant={roomManagementTab === "members" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setRoomManagementTab("members")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </Button>
                  <Button
                    variant={roomManagementTab === "analytics" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setRoomManagementTab("analytics")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  <Button
                    variant={roomManagementTab === "discussions" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setRoomManagementTab("discussions")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Discussions
                  </Button>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {roomManagementTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{selectedRoom.students}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">12</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">85%</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">John Doe submitted Assignment 3</span>
                            <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">New student joined the room</span>
                            <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">Assignment 4 was posted</span>
                            <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {roomManagementTab === "management" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Edit Room Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Room Name</label>
                          <Input
                            value={editingRoom?.name || ""}
                            onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Course Code</label>
                          <Input
                            value={editingRoom?.code || ""}
                            onChange={(e) => setEditingRoom({ ...editingRoom, code: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            className="w-full p-2 border rounded-md"
                            rows={3}
                            placeholder="Room description..."
                          />
                        </div>
                        <Button onClick={handleUpdateRoom}>Update Room</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Room Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={handleArchiveRoom}
                          className="w-full justify-start bg-transparent"
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Archive Room
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleDuplicateRoom}
                          className="w-full justify-start bg-transparent"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate Room
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="w-full justify-start"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Room
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {roomManagementTab === "members" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Invite Members</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter email or roll number"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                          />
                          <Button onClick={handleInviteMember}>Invite</Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Room Join Code: <code className="bg-muted px-2 py-1 rounded">ABC123</code>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Current Members ({selectedRoom.students})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                                  {String.fromCharCode(65 + i)}
                                </div>
                                <div>
                                  <div className="font-medium">Student {i + 1}</div>
                                  <div className="text-sm text-muted-foreground">student{i + 1}@ju.edu</div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {roomManagementTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Attendance Tracker</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Today's Class</span>
                              <span className="font-medium">24/28 Present</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                            <Button size="sm" className="w-full">
                              Mark Attendance
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Submission Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Assignment 3</span>
                              <span className="font-medium">18/28 Submitted</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                            </div>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="font-medium">John Doe submitted Assignment 3</div>
                              <div className="text-sm text-muted-foreground">2 hours ago</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="font-medium">Sarah Wilson joined the room</div>
                              <div className="text-sm text-muted-foreground">1 day ago</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="font-medium">New assignment posted</div>
                              <div className="text-sm text-muted-foreground">2 days ago</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {roomManagementTab === "discussions" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create New Discussion</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Input
                          placeholder="Discussion title"
                          value={newDiscussion.title}
                          onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        />
                        <textarea
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          placeholder="Discussion content..."
                          value={newDiscussion.content}
                          onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        />
                        <Button onClick={handleCreateDiscussion}>Create Discussion</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Discussions & Q&A</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {discussions
                            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                            .map((discussion) => (
                              <div key={discussion.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-medium">{discussion.title}</h3>
                                      {discussion.isPinned && (
                                        <Badge variant="secondary" className="text-xs">
                                          Pinned
                                        </Badge>
                                      )}
                                      {discussion.isResolved && (
                                        <Badge variant="default" className="text-xs bg-green-500">
                                          Resolved
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{discussion.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>By {discussion.author}</span>
                                      <span>{discussion.timestamp}</span>
                                      <span>{discussion.replies} replies</span>
                                      <span>{discussion.likes} likes</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => togglePinDiscussion(discussion.id)}
                                    >
                                      <Pin className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleResolveDiscussion(discussion.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Delete Room</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this room? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteRoom} className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Student Assignment Submission Modal */}
      {showSubmitAssignment && userRole === "student" && selectedAssignment && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowSubmitAssignment(false)}
        >
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Submit Assignment</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSubmitAssignment(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h3 className="font-medium">{selectedAssignment.title}</h3>
                <p className="text-sm text-muted-foreground">Due: {selectedAssignment.dueDate}</p>
              </div>

              <div>
                <label htmlFor="submission-file" className="block text-sm font-medium mb-2">
                  Upload Assignment File (PDF, JPG, PNG - Max 10MB)
                </label>
                <Input
                  id="submission-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleSubmissionFileUpload}
                  className="cursor-pointer"
                />
                {submissionFile && <p className="text-sm text-green-600 mt-1">✓ {submissionFile.name} selected</p>}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSubmitAssignment(false)
                    setSubmissionFile(null)
                    setSelectedAssignment(null)
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitAssignment} className="flex-1">
                  Submit Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${userRole === "student" ? "grid-cols-6" : "grid-cols-5"}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            {userRole === "student" && <TabsTrigger value="schedule">Schedule</TabsTrigger>}
            {userRole === "student" && <TabsTrigger value="student-leave">Student Leave</TabsTrigger>}
            {userRole === "faculty" && <TabsTrigger value="leave">Faculty Leave</TabsTrigger>}
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
                <Card
                  key={room.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleRoomClick(room)}
                >
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (userRole === "student") {
                              setSelectedAssignment(assignment)
                              setShowSubmitAssignment(true)
                            }
                          }}
                        >
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Weekly Schedule</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-1 h-4 w-4" />
                      Week View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Day View
                    </Button>
                  </div>
                </div>

                {/* Upcoming Class Notification */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <p className="text-sm font-medium text-blue-800">
                        Next Class: Engineering Chemistry at 14:00 with Dr. Sharma
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {weeklySchedule.map((classItem) => {
                  const getAttendanceColor = (attendance: number) => {
                    if (attendance >= 85) return "text-green-600 bg-green-50"
                    if (attendance >= 75) return "text-yellow-600 bg-yellow-50"
                    return "text-red-600 bg-red-50"
                  }

                  const getAttendanceRing = (attendance: number) => {
                    if (attendance >= 85) return "stroke-green-500"
                    if (attendance >= 75) return "stroke-yellow-500"
                    return "stroke-red-500"
                  }

                  const getSubjectColor = (color: string) => {
                    const colors = {
                      purple: "border-l-purple-500 bg-purple-50",
                      orange: "border-l-orange-500 bg-orange-50",
                      green: "border-l-green-500 bg-green-50",
                      blue: "border-l-blue-500 bg-blue-50",
                      red: "border-l-red-500 bg-red-50",
                    }
                    return colors[color as keyof typeof colors] || "border-l-gray-500 bg-gray-50"
                  }

                  return (
                    <Card
                      key={classItem.id}
                      className={`relative border-l-4 transition-all duration-200 hover:shadow-lg cursor-pointer group ${
                        classItem.status === "current" ? "ring-2 ring-green-500 shadow-lg" : ""
                      } ${getSubjectColor(classItem.color)}`}
                    >
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          {/* Subject Header */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{classItem.code}</h3>
                                {classItem.status === "current" && (
                                  <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <Badge className="bg-green-500 hover:bg-green-600 text-xs">Live</Badge>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground font-medium">{classItem.subject}</p>
                            </div>

                            {/* Attendance Ring */}
                            <div className="relative">
                              <svg className="w-12 h-12 transform -rotate-90">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  fill="none"
                                  className="text-gray-200"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 18}`}
                                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - classItem.attendance / 100)}`}
                                  className={getAttendanceRing(classItem.attendance)}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold">{classItem.attendance}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Time and Location */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {classItem.building}-{classItem.room}
                              </span>
                            </div>
                          </div>

                          {/* Attendance Status */}
                          <div
                            className={`p-2 rounded-lg text-xs font-medium ${getAttendanceColor(classItem.attendance)}`}
                          >
                            {classItem.attendance >= 85
                              ? `✅ Safe zone - Can skip ${classItem.canSkip} more classes`
                              : classItem.attendance >= 75
                                ? `⚠️ Warning - Can skip ${classItem.canSkip} more classes`
                                : `🚨 Critical - Attend next ${Math.abs(classItem.canSkip)} classes`}
                          </div>

                          {/* Hover Tooltip Content */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-2 right-2 z-10">
                            <div className="bg-white border rounded-lg shadow-lg p-3 min-w-48">
                              <div className="flex items-center gap-2 mb-2">
                                <img
                                  src={classItem.avatar || "/placeholder.svg"}
                                  alt={classItem.professor}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <p className="font-medium text-sm">{classItem.professor}</p>
                                  <p className="text-xs text-muted-foreground">Professor</p>
                                </div>
                              </div>
                              <div className="text-xs space-y-1">
                                <p>
                                  <span className="font-medium">Attendance:</span> {classItem.attendance}%
                                </p>
                                <p>
                                  <span className="font-medium">Can skip:</span> {classItem.canSkip} classes
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Export to Calendar
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="mr-1 h-4 w-4" />
                  Set Reminders
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Attendance Report
                </Button>
              </div>

              {weeklySchedule.length === 0 && (
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

          {/* Faculty Leave Tab */}
          {userRole === "faculty" && (
            <TabsContent value="leave" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Faculty Leave Management</h2>
                <Button onClick={() => setShowLeaveRequest(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Apply for Leave
                </Button>
              </div>

              {/* Leave Balance Dashboard */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Available days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Available days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Earned Leave</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">Available days</p>
                  </CardContent>
                </Card>
              </div>

              {/* Leave History */}
              <Card>
                <CardHeader>
                  <CardTitle>Leave History</CardTitle>
                  <CardDescription>Track your past leave applications and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, dates: "Dec 15-16, 2024", reason: "Personal Work", status: "Approved", type: "Casual" },
                      { id: 2, dates: "Nov 28, 2024", reason: "Fever", status: "Approved", type: "Sick" },
                      { id: 3, dates: "Nov 10-12, 2024", reason: "Family Function", status: "Pending", type: "Earned" },
                    ].map((leave) => (
                      <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{leave.dates}</p>
                          <p className="text-sm text-muted-foreground">{leave.reason}</p>
                          <Badge variant="outline" className="text-xs">
                            {leave.type} Leave
                          </Badge>
                        </div>
                        <Badge
                          variant={
                            leave.status === "Approved"
                              ? "default"
                              : leave.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {leave.status === "Approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {leave.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                          {leave.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {userRole === "student" && (
            <TabsContent value="student-leave" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-emerald-800">Student Leave Management</h2>
              </div>

              {/* Leave Balance Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-emerald-700">Casual Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-800">8</div>
                    <p className="text-xs text-gray-600">Available days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-emerald-700">Medical Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-800">12</div>
                    <p className="text-xs text-gray-600">Available days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-emerald-700">Emergency Leave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-800">5</div>
                    <p className="text-xs text-gray-600">Available days</p>
                  </CardContent>
                </Card>
              </div>

              {/* Apply for Leave Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-emerald-800">Apply for Leave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Leave Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-emerald-700">Select Leave Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Casual Leave", "Medical Leave", "Emergency Leave"].map((type) => (
                        <Button
                          key={type}
                          variant={selectedLeaveType === type ? "default" : "outline"}
                          className={`h-12 ${selectedLeaveType === type ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 hover:bg-emerald-50"}`}
                          onClick={() => setSelectedLeaveType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Date Selection */}
                  {selectedLeaveType && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-emerald-700">Select Leave Dates</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-600">From Date</Label>
                          <Input
                            type="date"
                            value={leaveFromDate}
                            onChange={(e) => setLeaveFromDate(e.target.value)}
                            className="border-emerald-200 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">To Date</Label>
                          <Input
                            type="date"
                            value={leaveToDate}
                            onChange={(e) => setLeaveToDate(e.target.value)}
                            className="border-emerald-200 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="halfDay"
                          checked={isHalfDay}
                          onChange={(e) => setIsHalfDay(e.target.checked)}
                          className="rounded border-emerald-300"
                        />
                        <Label htmlFor="halfDay" className="text-sm text-emerald-700">
                          Half Day Leave
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Reason Selection */}
                  {selectedLeaveType && leaveFromDate && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-emerald-700">Reason for Leave</Label>
                      <select
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="">Select a reason</option>
                        <option value="Fever/Sick">Fever/Sick</option>
                        <option value="Family Emergency">Family Emergency</option>
                        <option value="Personal Work">Personal Work</option>
                        <option value="Other">Other</option>
                      </select>
                      {leaveReason === "Other" && (
                        <textarea
                          placeholder="Please specify your reason..."
                          value={customLeaveReason}
                          onChange={(e) => setCustomLeaveReason(e.target.value)}
                          className="w-full p-3 border border-emerald-200 rounded-md focus:border-emerald-500 focus:outline-none"
                          rows={3}
                        />
                      )}
                    </div>
                  )}

                  {/* Step 4: Document Upload */}
                  {selectedLeaveType && leaveFromDate && leaveReason && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-emerald-700">Supporting Documents (Optional)</Label>
                      <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setLeaveDocument(e.target.files?.[0] || null)}
                          className="hidden"
                          id="leave-document"
                        />
                        <label htmlFor="leave-document" className="cursor-pointer">
                          <div className="space-y-2">
                            <div className="text-emerald-600">
                              <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                            </div>
                            <div className="text-sm text-emerald-700">
                              {leaveDocument ? leaveDocument.name : "Click to upload document"}
                            </div>
                            <div className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Submit Button */}
                  {selectedLeaveType && leaveFromDate && leaveReason && (
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedLeaveType("")
                          setLeaveFromDate("")
                          setLeaveToDate("")
                          setLeaveReason("")
                          setCustomLeaveReason("")
                          setLeaveDocument(null)
                          setIsHalfDay(false)
                        }}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={() => {
                          // Handle leave submission
                          alert("Leave application submitted successfully!")
                          setSelectedLeaveType("")
                          setLeaveFromDate("")
                          setLeaveToDate("")
                          setLeaveReason("")
                          setCustomLeaveReason("")
                          setLeaveDocument(null)
                          setIsHalfDay(false)
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Submit Leave Application
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Leave History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-emerald-800">Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: "Medical Leave",
                        dates: "Dec 15-17, 2024",
                        reason: "Fever/Sick",
                        status: "Approved",
                        appliedOn: "Dec 14, 2024",
                      },
                      {
                        id: 2,
                        type: "Casual Leave",
                        dates: "Nov 28, 2024",
                        reason: "Personal Work",
                        status: "Pending",
                        appliedOn: "Nov 27, 2024",
                      },
                      {
                        id: 3,
                        type: "Emergency Leave",
                        dates: "Oct 20-21, 2024",
                        reason: "Family Emergency",
                        status: "Approved",
                        appliedOn: "Oct 19, 2024",
                      },
                    ].map((leave) => (
                      <div
                        key={leave.id}
                        className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-emerald-800">{leave.type}</div>
                          <div className="text-sm text-gray-600">{leave.dates}</div>
                          <div className="text-sm text-gray-600">Reason: {leave.reason}</div>
                          <div className="text-xs text-gray-500">Applied: {leave.appliedOn}</div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              leave.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : leave.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Leave Request Modal */}
          {showLeaveRequest && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Apply for Leave</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowLeaveRequest(false)
                      setLeaveStep(1)
                      setSelectedLeaveType("")
                      setSelectedLeaveDates([])
                      setLeaveReason("")
                      setCustomReason("")
                      setLeaveAttachment(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Step 1: Leave Type Selection */}
                {leaveStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Leave Type</h3>
                    <div className="grid gap-3">
                      {["Casual Leave", "Sick Leave", "Earned Leave"].map((type) => (
                        <Button
                          key={type}
                          variant={selectedLeaveType === type ? "default" : "outline"}
                          className="justify-start h-auto p-4"
                          onClick={() => setSelectedLeaveType(type)}
                        >
                          <div className="text-left">
                            <div className="font-medium">{type}</div>
                            <div className="text-sm text-muted-foreground">
                              {type === "Casual Leave" && "8 days available"}
                              {type === "Sick Leave" && "12 days available"}
                              {type === "Earned Leave" && "15 days available"}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setLeaveStep(2)} disabled={!selectedLeaveType}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date Selection */}
                {leaveStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Leave Dates</h3>
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Leave Duration</label>
                        <select
                          className="border rounded-md p-2"
                          value={leaveDuration}
                          onChange={(e) => setLeaveDuration(e.target.value)}
                        >
                          <option value="">Select duration</option>
                          <option value="single">Single Day</option>
                          <option value="multiple">Multiple Days</option>
                          <option value="half">Half Day</option>
                        </select>
                      </div>

                      {leaveDuration === "single" && (
                        <div>
                          <label className="text-sm font-medium">Select Date</label>
                          <Input type="date" className="mt-1" />
                        </div>
                      )}

                      {leaveDuration === "multiple" && (
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">From Date</label>
                          <Input type="date" className="mb-2" />
                          <label className="text-sm font-medium">To Date</label>
                          <Input type="date" />
                        </div>
                      )}

                      {leaveDuration === "half" && (
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Select Date</label>
                          <Input type="date" className="mb-2" />
                          <label className="text-sm font-medium">Half Day Type</label>
                          <select className="border rounded-md p-2">
                            <option value="morning">Morning Half</option>
                            <option value="afternoon">Afternoon Half</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setLeaveStep(1)}>
                        Back
                      </Button>
                      <Button onClick={() => setLeaveStep(3)} disabled={!leaveDuration}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Reason Selection */}
                {leaveStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Leave Reason</h3>
                    <div className="space-y-2">
                      {["Fever", "Personal Work", "Casual Leave", "Other"].map((reason) => (
                        <Button
                          key={reason}
                          variant={leaveReason === reason ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setLeaveReason(reason)}
                        >
                          {reason}
                        </Button>
                      ))}
                    </div>

                    {leaveReason === "Other" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Custom Reason</label>
                        <textarea
                          className="w-full border rounded-md p-2 min-h-[80px]"
                          placeholder="Please specify your reason..."
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setLeaveStep(2)}>
                        Back
                      </Button>
                      <Button
                        onClick={() => setLeaveStep(4)}
                        disabled={!leaveReason || (leaveReason === "Other" && !customReason)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Attachment Upload */}
                {leaveStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upload Supporting Document (Optional)</h3>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Upload medical certificate or supporting document</p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 5MB)</p>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setLeaveAttachment(e.target.files?.[0] || null)}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      {leaveAttachment && <p className="text-sm text-green-600">✓ {leaveAttachment.name} uploaded</p>}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setLeaveStep(3)}>
                        Back
                      </Button>
                      <Button onClick={() => setLeaveStep(5)}>Next</Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {leaveStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Confirm Leave Application</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Leave Type:</span>
                          <span>{selectedLeaveType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Duration:</span>
                          <span>{leaveDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Reason:</span>
                          <span>{leaveReason === "Other" ? customReason : leaveReason}</span>
                        </div>
                        {leaveAttachment && (
                          <div className="flex justify-between">
                            <span className="font-medium">Attachment:</span>
                            <span>{leaveAttachment.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setLeaveStep(4)}>
                        Back
                      </Button>
                      <Button
                        onClick={() => {
                          // Handle leave submission
                          setShowLeaveRequest(false)
                          setLeaveStep(1)
                          // Reset form
                          setSelectedLeaveType("")
                          setSelectedLeaveDates([])
                          setLeaveReason("")
                          setCustomReason("")
                          setLeaveAttachment(null)
                          // Show success message
                          alert("Leave application submitted successfully! You will be notified once it's reviewed.")
                        }}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Tabs>
      </main>
    </div>
  )
}

export { ClassroomDashboard }
export default ClassroomDashboard
