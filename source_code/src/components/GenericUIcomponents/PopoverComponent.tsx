import React, { useState, useRef, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type PopoverProps = {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-left';
  className?: string;
};

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  position = 'bottom',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverStyles, setPopoverStyles] = useState({});
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Close popover when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      triggerRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Position the popover based on the trigger and position prop
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    let styles = {};

    switch (position) {
      case 'top':
        styles = {
          left: `${triggerRect.left + window.scrollX}px`,
          top: `${triggerRect.top + window.scrollY - popoverRef.current.offsetHeight}px`,
        };
        break;
      case 'bottom':
        styles = {
          left: `${triggerRect.left + window.scrollX}px`,
          top: `${triggerRect.bottom + window.scrollY}px`,
        };
        break;
      case 'left':
        styles = {
          left: `${triggerRect.left + window.scrollX - popoverRef.current.offsetWidth}px`,
          top: `${triggerRect.top + window.scrollY}px`,
        };
        break;
      case 'right':
        styles = {
          left: `${triggerRect.right + window.scrollX}px`,
          top: `${triggerRect.top + window.scrollY}px`,
        };
        break;
      case 'bottom-left':
        styles = {
          left: `${triggerRect.left + window.scrollX - popoverRef.current.offsetWidth + 25}px`,
          top: `${triggerRect.bottom + window.scrollY}px`,
        };
        break;
      default:
        break;
    }

    setPopoverStyles(styles);
  }, [isVisible, position]);

  return (
    <div style={{ display: 'inline-block' }} ref={triggerRef} onClick={toggleVisibility}>
      {children}
      {isVisible &&
        ReactDOM.createPortal(
          <div
            className={`${className}`}
            ref={popoverRef}
            onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              ...popoverStyles,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};
