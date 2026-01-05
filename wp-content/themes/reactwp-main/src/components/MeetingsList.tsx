import React from "react";
import { Meeting } from "../types";

export interface MeetingsListProps {
  meetings: Meeting[];
}

export const MeetingsList: React.FC<MeetingsListProps> = ({ meetings }) => {
  return (
    <div className="space-y-4 not-prose">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-100 p-6 rounded-xl shadow-sm items-center"
        >
          <div className="text-center min-w-[100px] border-l border-slate-200 pl-6">
            <div className="text-3xl font-bold text-indigo-600">
              {meeting.day}
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase">
              {meeting.month}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {meeting.title}
            </h3>
            <p className="text-slate-600 text-sm">{meeting.description}</p>
          </div>
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 mr-auto whitespace-nowrap">
            {meeting.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};
