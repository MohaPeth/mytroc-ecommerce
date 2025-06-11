
import React, { useEffect, useRef, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.8,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage >= threshold) {
      onLoadMore();
    }
  }, [loading, hasMore, threshold, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    return () => container.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  // Intersection Observer pour détecter quand le dernier élément est visible
  useEffect(() => {
    if (!lastItemRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(lastItemRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, onLoadMore]);

  return (
    <div ref={containerRef} className={className}>
      {children}
      {hasMore && (
        <div ref={lastItemRef} className="py-4 flex justify-center">
          {loading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
