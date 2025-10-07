import { Smile, Frown, Meh, Laugh, Angry } from 'lucide-react';

export const MOODS = [
  { id: 1, name: 'Excellent', icon: Laugh, color: '#10b981', emoji: '😄' },
  { id: 2, name: 'Bien', icon: Smile, color: '#3b82f6', emoji: '😊' },
  { id: 3, name: 'Neutre', icon: Meh, color: '#f59e0b', emoji: '😐' },
  { id: 4, name: 'Pas terrible', icon: Frown, color: '#ef4444', emoji: '😔' },
  { id: 5, name: 'Difficile', icon: Angry, color: '#991b1b', emoji: '😢' }
];

export const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
