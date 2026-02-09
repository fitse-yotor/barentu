import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Post } from '../../types';

interface CalendarViewProps {
  posts: Post[];
  onDateSelect: (date: Date) => void;
  onPostClick: (post: Post) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ posts, onDateSelect, onPostClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getPostsForDate = (date: Date | null) => {
    if (!date) return [];
    return posts.filter(post => {
      if (!post.scheduledAt) return false;
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card">
      {/* Calendar Header */}
      <div className="p-6 border-b border-border-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-text-secondary" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  view === viewType
                    ? 'bg-primary-500 text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayPosts = getPostsForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-border-light rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  !day ? 'bg-gray-50' : ''
                } ${isToday ? 'bg-primary-50 border-primary-200' : ''}`}
                onClick={() => day && onDateSelect(day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-primary-600' : 'text-text-primary'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onPostClick(post);
                          }}
                          className={`text-xs p-1 rounded truncate cursor-pointer ${
                            post.status === 'scheduled' ? 'bg-warning text-white' :
                            post.status === 'published' ? 'bg-success text-white' :
                            'bg-gray-200 text-text-primary'
                          }`}
                        >
                          {post.content.substring(0, 30)}...
                        </div>
                      ))}
                      {dayPosts.length > 3 && (
                        <div className="text-xs text-text-secondary">
                          +{dayPosts.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;