import { Languages } from 'lucide-react'

import { cn } from '@/lib/utils'
import { RFC5646LanguageTag } from '@/lib/rfc5646-language-tags'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

type Props = {
  selectedLanguage: RFC5646LanguageTag
  setSelectedLanguage: (id: RFC5646LanguageTag) => void
  languageList: {
    id: RFC5646LanguageTag
    label: string
  }[]
}
export const LanguageSwitcher = ({
  selectedLanguage,
  setSelectedLanguage,
  languageList,
}: Props) => {
  return (
    <Select defaultValue={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger
        className={cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
        )}
        aria-label='Select account'
      >
        <SelectValue placeholder='選択してください'>
          <Languages />
          <span className={cn('ml-2')}>
            {languageList.find((language) => language.id === selectedLanguage)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languageList.map((language) => (
          <SelectItem key={language.id} value={language.id}>
            <div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
              {language.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
