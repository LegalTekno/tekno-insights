
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onRangeChange: (startDate: Date, endDate: Date) => void;
  className?: string;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onRangeChange,
  className,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalStartDate, setInternalStartDate] = useState<Date>(startDate);
  const [internalEndDate, setInternalEndDate] = useState<Date>(endDate);
  const [currentView, setCurrentView] = useState<'start' | 'end'>('start');

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (currentView === 'start') {
      setInternalStartDate(date);
      setCurrentView('end');
    } else {
      // Make sure end date isn't before start date
      if (date < internalStartDate) {
        setInternalEndDate(internalStartDate);
        setInternalStartDate(date);
      } else {
        setInternalEndDate(date);
      }
      setIsOpen(false);
      onRangeChange(
        currentView === 'end' && date < internalStartDate ? date : internalStartDate,
        currentView === 'end' && date < internalStartDate ? internalStartDate : date
      );
    }
  };

  const displayRange = `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between bg-theme-dark border border-theme-purple hover:bg-theme-purple/20 text-white w-full",
            className
          )}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{displayRange}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-theme-dark border border-theme-purple" align="start">
        <div className="px-4 pt-3 pb-2 border-b border-theme-purple">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-medium text-theme-light">
              {currentView === 'start' ? 'Select start date' : 'Select end date'}
            </h3>
            <div className="flex text-xs text-muted-foreground">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn("text-xs", currentView === 'start' && "text-theme-pink")}
                onClick={() => setCurrentView('start')}
              >
                Start
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn("text-xs", currentView === 'end' && "text-theme-pink")}
                onClick={() => setCurrentView('end')}
              >
                End
              </Button>
            </div>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={currentView === 'start' ? internalStartDate : internalEndDate}
          onSelect={handleSelect}
          initialFocus
          className="p-3 pointer-events-auto bg-theme-dark"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
