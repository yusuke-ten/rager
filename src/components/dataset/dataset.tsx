'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Document } from '@prisma/client'
import {
  Trash,
  Pencil,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useLoading } from '@/hooks/use-loading'
import { FileUpload } from '@/components/file-upload/file-upload'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
type Props = {
  documents: Document[]
  knowledgeBaseId: string
  refreshDocuments: () => void
  deleteDocument: (documentId: string) => Promise<void>
  handleChangeDocumentEnabled: (documentId: string, enabled: boolean) => void
}

const Dataset = ({
  documents,
  knowledgeBaseId,
  refreshDocuments,
  deleteDocument,
  handleChangeDocumentEnabled,
}: Props) => {
  const { startLoading, stopLoading } = useLoading()
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()

  const onDeleteDocument = async (documentId: string) => {
    try {
      startLoading()
      await deleteDocument(documentId)
      toast({
        title: '成功',
        description: 'ドキュメントが削除されました',
        duration: 3000,
      })
      refreshDocuments()
    } catch (error) {
      console.error(error)
      toast({
        title: 'エラー',
        description: 'ドキュメントの削除中にエラーが発生しました',
        variant: 'destructive',
        duration: 3000,
      })
    } finally {
      stopLoading()
    }
  }

  const onClickAddDataset = async () => {
    try {
      startLoading()
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))

      const response = await fetch(`/api/knowledge/${knowledgeBaseId}/dataset`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('アップロードに失敗しました')
      }

      await response.json()
      setIsOpen(false)
      refreshDocuments()
      toast({
        title: '成功',
        description: 'ドキュメントがアップロードされました',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'エラー',
        description: 'ドキュメントのアップロード中にエラーが発生しました',
        variant: 'destructive',
        duration: 3000,
      })
    } finally {
      stopLoading()
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='rounded-lg bg-white p-6 shadow'>
        <div className='mb-4 flex justify-between'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Bulk' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bulk'>Bulk</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex'>
            <Input className='mr-2' placeholder='Search your files' />
            <Button onClick={() => setIsOpen(true)}>Add file</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Chunk Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Chunk Method</TableHead>
              <TableHead>Enable</TableHead>
              <TableHead>Parsing Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell></TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/knowledge/${knowledgeBaseId}/dataset/${document.id}`}
                    passHref
                    legacyBehavior
                  >
                    <Button variant='link' className='flex items-center p-0'>
                      <FileText className='mr-2 h-4 w-4' />
                      {document.name}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{document.chunkSize}</TableCell>
                <TableCell>{document.createdAt.toLocaleString()}</TableCell>
                <TableCell>General</TableCell>
                <TableCell>
                  <Switch
                    checked={document.enabled}
                    onCheckedChange={(checked) =>
                      handleChangeDocumentEnabled(document.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <span className='text-orange-500'>CANCEL</span>
                </TableCell>
                <TableCell className='flex space-x-2'>
                  <Button variant='ghost' size='icon'>
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onDeleteDocument(document.id)}
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='icon'>
                    <Download className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='mt-4 flex items-center justify-between'>
          <div>Total 1</div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='outline'>1</Button>
            <Button variant='outline' size='icon'>
              <ChevronRight className='h-4 w-4' />
            </Button>
            <Select>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='10 / page' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10 / page</SelectItem>
                <SelectItem value='20'>20 / page</SelectItem>
                <SelectItem value='50'>50 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>ファイルをアップロード</DialogTitle>
          </DialogHeader>
          <FileUpload files={files} handleAddFiles={(file) => setFiles(file)} />
          <div className='mt-4 flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={() => onClickAddDataset()}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

Dataset.displayName = 'Dataset'

export { Dataset }
