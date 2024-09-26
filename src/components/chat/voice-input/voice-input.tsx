import { useState, useEffect } from 'react'
import { CircleStop, AudioWaveform } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RFC5646LanguageTag } from '@/lib/rfc5646-language-tags'

type Props = {
  language: RFC5646LanguageTag
  handleSubmit: (transcript: string) => void
}

export const VoiceInput = ({ language, handleSubmit }: Props) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('このPDFは何？')

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = language

    recognition.onaudiostart = (e) => {
      console.log('speechstart', e)
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const newTranscript = event.results[current][0].transcript
      setTranscript(newTranscript)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()

    return () => {
      recognition.stop()
    }
  }, [language])

  const handleStop = () => {
    handleSubmit(transcript)
    setTranscript('')
  }

  return (
    <div className='relative overflow-hidden rounded-lg border bg-background ring-1 ring-ring'>
      <Label htmlFor='message' className='sr-only'>
        メッセージ
      </Label>
      <Textarea
        id='message'
        value={transcript}
        className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
        style={{ maxHeight: '200px' }}
        disabled={!isListening}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <div className='flex items-center justify-end gap-2 p-3 pt-0'>
        <div className='relative inline-flex h-9 w-9 items-center justify-center'>
          {isListening && (
            <span className='absolute inline-flex h-4 w-4 animate-ping rounded-full bg-sky-400 opacity-75'></span>
          )}

          <AudioWaveform
            className={`${
              isListening ? 'size-4 text-sky-400' : 'size-4 text-muted-foreground'
            } transition-all duration-200`}
          />
        </div>
        <div className='ml-auto flex gap-2'>
          <Button size='sm' className='gap-1.5' type='button' onClick={handleStop}>
            ストップ
            <CircleStop className='size-3.5' />
          </Button>
        </div>
      </div>
    </div>
  )
}
