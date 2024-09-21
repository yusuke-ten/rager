import { useDropzone } from 'react-dropzone'
import { FileRejection } from 'react-dropzone'
import React, { useState, useEffect, useCallback } from 'react'
import { X, File, UploadCloud, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

type Props = {
  files: File[]
  handleAddFiles: (files: File[]) => void
  progress?: { [key: string]: number }
  error?: string
  isUploading?: boolean
}

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 5MB

const FileUpload = ({
  files,
  handleAddFiles,
  progress = {},
  error,
  isUploading,
}: Props) => {
  const [fileSizeError, setFileSizeError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleAddFiles(acceptedFiles)
      setFileSizeError(null) // Reset file size error on successful drop
    },
    [handleAddFiles],
  )

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach((rejection) => {
      if (rejection.errors.some((e) => e.code === 'file-too-large')) {
        setFileSizeError('ファイルサイズが大きすぎます。最大5MBまでです。')
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: MAX_FILE_SIZE,
  })

  const removeFile = (file: File) => {
    handleAddFiles(files.filter((f) => f !== file))
  }

  useEffect(() => {
    return () => {
      // コンポーネントのアンマウント時にオブジェクトURLを解放
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)))
    }
  }, [files])

  return (
    <>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className='mx-auto h-12 w-12 text-gray-400' />
        <p className='my-2 text-sm font-semibold'>
          クリックまたはファイルをこのエリアにドラッグしてアップロード
        </p>
        <p className='text-xs text-gray-500'>または、クリックしてファイルを選択</p>
        <div className='mt-2'>
          <p className='text-xs text-gray-500'>最大ファイルサイズ: 5MB</p>
          <p className='text-xs text-gray-500'>許可されるファイル形式: PDF</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-sm font-medium'>アップロードするファイル：</h3>
          <ul className='mt-2 space-y-2'>
            {files.map((file, index) => (
              <li key={index} className='flex items-center justify-between text-sm'>
                <div className='flex items-center'>
                  <File className='mr-2 h-4 w-4' />
                  {file.name}
                </div>
                {progress[file.name] !== undefined && (
                  <Progress value={progress[file.name]} className='w-24' />
                )}
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => removeFile(file)}
                  disabled={isUploading}
                >
                  <X className='h-4 w-4' />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fileSizeError && (
        <Alert variant='destructive' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{fileSizeError}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant='destructive' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

FileUpload.displayName = 'FileUpload'

export { FileUpload }
