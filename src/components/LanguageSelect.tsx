import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Language } from '@/lib/types';

interface LanguageSelectProps {
  languages: Language[];
  value?: Language;
  onChange: (language: Language) => void;
  label: string;
}

export function LanguageSelect({ languages, value, onChange, label }: LanguageSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredLanguages = React.useMemo(() => {
    if (!search) return languages;
    const searchLower = search.toLowerCase();
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(searchLower) ||
        language.localName.toLowerCase().includes(searchLower)
    );
  }, [languages, search]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? `${value.name} (${value.localName})`
              : "Select language..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Search language..." 
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {filteredLanguages.map((language) => (
                  <CommandItem
                    key={language.code}
                    onSelect={() => {
                      onChange(language);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.code === language.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {language.name} ({language.localName})
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}