
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Send } from 'lucide-react';

interface Rating {
  id: string;
  date: string;
  rating: number;
  comment: string;
  from: string;
}

interface RatingsTabProps {
  ratings: Rating[];
  averageRating: number;
  formatDate: (dateString: string) => string;
}

const RatingsTab: React.FC<RatingsTabProps> = ({ ratings, averageRating, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évaluations reçues</CardTitle>
        <CardDescription>Note moyenne : {averageRating}/5</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < rating.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-medium">{rating.from}</span>
                </div>
                <div className="text-sm text-muted-foreground">{formatDate(rating.date)}</div>
              </div>
              <p className="mt-2 text-sm">{rating.comment}</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <Send className="h-3 w-3" />
                  Répondre
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingsTab;
