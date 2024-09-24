'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Type, Copy, AtSign } from 'lucide-react'
import { Plus, Search, ChevronLeft, MoreVertical } from 'lucide-react'
import {
  Document as DocumentType,
  DocumentSegment as DocumentSegmentType,
} from '@prisma/client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'

type Props = {
  document: DocumentType
  documentSegments: DocumentSegmentType[]
  handleChangeDocumentSegmentEnabled: (
    segmentId: string,
    enabled: boolean,
  ) => Promise<void>
}

const Document = ({
  document,
  documentSegments,
  handleChangeDocumentSegmentEnabled,
}: Props) => {
  const router = useRouter()
  const [editingSegment, setEditingSegment] = useState<DocumentSegmentType | null>(null)

  const handleEditClick = (segment: DocumentSegmentType) => {
    setEditingSegment(segment)
  }

  const handleEditClose = () => {
    setEditingSegment(null)
  }

  const handleEditSave = () => {
    // Here you would typically update the item with the new data
    console.log('Saving:', editingSegment)
    setEditingSegment(null)
  }

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <span className='font-medium'>{document.name}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm'>
            Full text
          </Button>
          <Button variant='outline' size='sm'>
            Ellipse
          </Button>
          <Button variant='outline' size='sm'>
            Bulk
            <ChevronLeft className='rotate-270 ml-1 h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Search className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <MoreVertical className='h-4 w-4' />
          </Button>
          <Button size='icon'>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {documentSegments.map((segment, index) => (
          <Card
            key={segment.id}
            className='group relative cursor-pointer'
            onClick={() => handleEditClick(segment)}
          >
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <Badge
                variant='outline'
                className='rounded-full px-2 py-0.5 text-xs font-normal'
              >
                {segment.position}
              </Badge>
              {segment.enabled ? (
                <div className='h-2 w-2 rounded-full bg-green-500' />
              ) : (
                <div className='h-2 w-2 rounded-full bg-red-500' />
              )}
            </CardHeader>
            <CardContent>
              <p className='line-clamp-5 text-sm text-gray-600'>{segment.chunkContent}</p>
            </CardContent>
            <div className='absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='flex items-center space-x-1'>
                    <Type className='h-4 w-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>{segment.wordCount}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <AtSign className='h-4 w-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>{0}</span>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch
                    checked={segment.enabled}
                    onCheckedChange={() => {
                      handleChangeDocumentSegmentEnabled(segment.id, !segment.enabled)
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  />
                  <Copy className='h-4 w-4 cursor-pointer text-gray-500' />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={editingSegment !== null} onOpenChange={handleEditClose}>
        {editingSegment && (
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='flex items-center justify-between'>
                <span>#{editingSegment?.position}</span>
              </DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <Textarea
                value={editingSegment.chunkContent}
                onChange={(e) =>
                  setEditingSegment({ ...editingSegment!, chunkContent: e.target.value })
                }
                rows={10}
              />
              <div className='flex items-center justify-between text-sm text-gray-500'>
                <div className='flex items-center space-x-4'>
                  <span>{editingSegment.wordCount} 文字</span>
                  <span>@0 参照回数</span>
                </div>
                <Switch
                  checked={editingSegment.enabled}
                  onCheckedChange={async () => {
                    await handleChangeDocumentSegmentEnabled(
                      editingSegment.id,
                      !editingSegment.enabled,
                    )
                    setEditingSegment({
                      ...editingSegment,
                      enabled: !editingSegment.enabled,
                    })
                  }}
                />
              </div>
            </div>
            <Button onClick={handleEditSave}>Save changes</Button>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

Document.displayName = 'Document'

export { Document }
