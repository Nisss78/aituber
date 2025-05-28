"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Unlock, RotateCw, Trash2 } from "lucide-react"
import type { SceneElement } from "../hooks/use-broadcast-channel"

interface DraggableElementProps {
  element: SceneElement
  isSelected: boolean
  isEditMode: boolean
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: Partial<SceneElement>) => void
  onDelete: (id: string) => void
  children: React.ReactNode
}

export default function DraggableElement({
  element,
  isSelected,
  isEditMode,
  onSelect,
  onUpdate,
  onDelete,
  children,
}: DraggableElementProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || element.locked) return

    e.preventDefault()
    e.stopPropagation()

    onSelect(element.id)
    setIsDragging(true)
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || element.locked) return

    e.preventDefault()
    e.stopPropagation()

    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.width,
      height: element.height,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !element.locked) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y

        // Constrain to canvas bounds
        const constrainedX = Math.max(0, Math.min(newX, 100 - element.width / 10))
        const constrainedY = Math.max(0, Math.min(newY, 100 - element.height / 10))

        onUpdate(element.id, { x: constrainedX, y: constrainedY })
      }

      if (isResizing && !element.locked) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        const newWidth = Math.max(50, resizeStart.width + deltaX)
        const newHeight = Math.max(30, resizeStart.height + deltaY)

        onUpdate(element.id, { width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, resizeStart, element, onUpdate])

  return (
    <div
      ref={elementRef}
      className={`absolute ${isEditMode ? "cursor-move" : ""} ${
        isSelected && isEditMode ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}px`,
        height: `${element.height}px`,
        opacity: element.opacity / 100,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
        visibility: element.visible ? "visible" : "hidden",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Element Content */}
      <div className="w-full h-full">{children}</div>

      {/* Edit Mode Controls */}
      {isEditMode && isSelected && (
        <>
          {/* Element Label */}
          <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">{element.name}</div>

          {/* Resize Handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
            onMouseDown={handleResizeMouseDown}
          />

          {/* Control Buttons */}
          <div className="absolute -top-8 right-0 flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onUpdate(element.id, { visible: !element.visible })
              }}
            >
              {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onUpdate(element.id, { locked: !element.locked })
              }}
            >
              {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onUpdate(element.id, { rotation: (element.rotation + 90) % 360 })
              }}
            >
              <RotateCw className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(element.id)
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
