import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Post } from '../../types';

interface DragDropCalendarProps {
  posts: Post[];
  onPostMove: (postId: string, newDate: Date) => void;
  onPostClick: (post: Post) => void;
  onDateSelect: (date: Date) => void;
  onCreatePost: (date: Date) => void;
}

interface DraggablePostProps {
  post: Post;
  onPostClick: (post: Post) => void;
}

interface DroppableDayProps {
  date: Date;
  posts: Post[];
  onDrop: (postId: string, date: Date) => void;
  onPostClick: (post: Post) => void;
  onCreatePost: (date: Date) => void;
  isToday: boolean;
}

const DraggablePost: React.FC<DraggablePostProps> = ({ post, onPostClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'post',
    item: { id: post.id, post },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'published': return 'bg-success';
      case 'scheduled': return 'bg-warning';
      case 'failed': return 'bg-error';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div
      ref={drag}
      onClick={() => onPostClick(post)}
      className={`text-xs p-2 rounded cursor-pointer transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${getStatusColor(post.status)} text-white hover:shadow-md`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="font-medium truncate">{post.content.substring(0, 30)}...</div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex gap-1">
          {post.platforms.map((platform) => (
            <span key={platform} className="w-3 h-3 bg-white bg-opacity-30 rounded-full text-xs flex items-center justify-center">
              {platform.charAt(0).toUpperCase()}
            </span>
          ))}
        </div>
        <span className="text-xs opacity-75">
          {post.scheduledAt ? new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        </span>
      </div>
    </div>
  );
};

const DroppableDay: React.FC<DroppableDayProps> = ({ 
  date, 
  posts, 
  onDrop, 
  onPostClick, 
  onCreatePost,
  isToday 
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'post',
    drop: (item: { id: string; post: Post }) => {
      onDrop(item.id, date);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[120px] p-2 border border-border-light rounded-lg transition-all ${
        isOver ? 'bg-primary-50 border-primary-300' : 'hover:bg-gray-50'
      } ${isToday ? 'bg-primary-50 border-primary-200' : ''}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${isToday ? 'text-primary-600' : 'text-text-primary'}`}>
          {date.getDate()}
        </span>
        <button
          onClick={() => onCreatePost(date)}
          className="w-5 h-5 text-text-secondary hover:text-primary-500 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-1">
        {posts.map((post) => (
          <DraggablePost
            key={post.id}
            post={post}
            onPostClick={onPostClick}
          />
        ))}
      </div>
      
      {isOver && (
        <div className="mt-2 p-2 border-2 border-dashed border-primary-300 rounded text-center text-primary-500 text-xs">
          Drop post here
        </div>
      )}
    </div>
  );
};

const DragDropCalendar: React.FC<DragDropCalendarProps> = ({
  posts,
  onPostMove,
  onPostClick,
  onDateSelect,
  onCreatePost
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const getDaysInMonth = useCallback((date: Date) => {
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
  }, []);

  const getPostsForDate = useCallback((date: Date | null) => {
    if (!date) return [];
    return posts.filter(post => {
      if (!post.scheduledAt) return false;
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    });
  }, [posts]);

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

  const handlePostDrop = useCallback((postId: string, newDate: Date) => {
    onPostMove(postId, newDate);
  }, [onPostMove]);

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <DndProvider backend={HTML5Backend}>
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
              <button
                onClick={() => setCurrentDate(new Date())}
                className="btn-secondary text-sm"
              >
                Today
              </button>
              {(['month', 'week'] as const).map((viewType) => (
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
              const isToday = day ? day.toDateString() === new Date().toDateString() : false;
              
              return (
                <div key={index}>
                  {day ? (
                    <DroppableDay
                      date={day}
                      posts={dayPosts}
                      onDrop={handlePostDrop}
                      onPostClick={onPostClick}
                      onCreatePost={onCreatePost}
                      isToday={isToday}
                    />
                  ) : (
                    <div className="min-h-[120px] p-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-text-secondary">Published</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span className="text-text-secondary">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span className="text-text-secondary">Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-text-secondary">Draft</span>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDropCalendar;