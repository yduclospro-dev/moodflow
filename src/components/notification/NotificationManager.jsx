import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';
export default function NotificationManager() {
  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }
    // Schedule daily notification at 5 PM
    const checkTime = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 17 && now.getMinutes() === 0) {
        sendDailyReminder();
      }
    }, 60000);
    return () => clearInterval(checkTime);
  }, []);
  const sendNotification = async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
   
    if (Notification.permission === 'granted') {
      new Notification('MoodFlow', {
        body: "N'oublie pas de renseigner ton humeur du jour !",
        icon: '🌸'
      });
    }
  };
  const sendDailyReminder = () => {
    sendNotification();
  };
  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={sendNotification}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium flex items-center gap-2"
      >
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
}