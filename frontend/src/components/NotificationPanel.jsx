import { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { getMyNotifications, markNotificationRead } from "../api/api";

const iconMap = {
  success: <FaCheckCircle className="text-emerald-600" />,
  warning: <FaExclamationTriangle className="text-amber-500" />,
  danger: <FaTimesCircle className="text-red-500" />,
  info: <FaInfoCircle className="text-blue-600" />,
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    getMyNotifications()
      .then((res) => setNotifications(res.data.data || []))
      .catch(() => setNotifications([]));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = (id) => {
    markNotificationRead(id).then(() => fetchNotifications());
  };

  const unread = notifications.filter((item) => !item.isRead).length;

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black"><FaBell className="text-blue-600" /> Notifications</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Application updates yaha show honge.</p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">{unread} new</span>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? notifications.map((item) => (
          <div key={item._id} className={`rounded-2xl border p-4 transition ${item.isRead ? "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950" : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"}`}>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-xl">{iconMap[item.type] || iconMap.info}</div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
                <p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              {!item.isRead && (
                <button onClick={() => handleRead(item._id)} className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">Read</button>
              )}
            </div>
          </div>
        )) : (
          <p className="rounded-2xl theme-section-soft p-6 text-center text-slate-500 dark:bg-slate-950 dark:text-slate-400">No notifications yet</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
