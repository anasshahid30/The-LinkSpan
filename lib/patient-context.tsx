// lib/patient-context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from './firebase';
import { DoctorNote, Message, Patient, Update } from './types';

type PatientContextType = {
  patients: Patient[];
  updates: Record<string, Update[]>;
  notes: Record<string, DoctorNote[]>;
  messages: Record<string, Message[]>;
  refreshPatient: (id: string) => Promise<void>;
  postUpdate: (update: Omit<Update,'id'|'timeISO'>) => Promise<void>;
  postNote: (note: Omit<DoctorNote,'id'|'createdAtISO'>) => Promise<void>;
  postMessage: (msg: Omit<Message,'id'|'createdAtISO'|'seenByIds'>) => Promise<void>;
};
const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [updates, setUpdates] = useState<Record<string, Update[]>>({});
  const [notes, setNotes] = useState<Record<string, DoctorNote[]>>({});
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    api.listPatients('').then(setPatients);
  }, []);

  const refreshPatient = async (id: string) => {
    const [u, n, m] = await Promise.all([api.listUpdates(id), api.listNotes(id), api.listMessages(id)]);
    setUpdates(prev => ({ ...prev, [id]: u }));
    setNotes(prev => ({ ...prev, [id]: n }));
    setMessages(prev => ({ ...prev, [id]: m }));
  };

  const postUpdate = async (payload: Omit<Update,'id'|'timeISO'>) => {
    const created = await api.postUpdate(payload);
    setUpdates(prev => ({ ...prev, [created.patientId]: [created, ...(prev[created.patientId] ?? [])] }));
  };
  const postNote = async (payload: Omit<DoctorNote,'id'|'createdAtISO'>) => {
    const created = await api.postNote(payload);
    setNotes(prev => ({ ...prev, [created.patientId]: [created, ...(prev[created.patientId] ?? [])] }));
  };
  const postMessage = async (payload: Omit<Message,'id'|'createdAtISO'|'seenByIds'>) => {
    const created = await api.postMessage(payload);
    setMessages(prev => ({ ...prev, [created.patientId]: [...(prev[created.patientId] ?? []), created] }));
  };

  return (
    <PatientContext.Provider value={{ patients, updates, notes, messages, refreshPatient, postUpdate, postNote, postMessage }}>
      {children}
    </PatientContext.Provider>
  );
}
export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used within PatientProvider');
  return ctx;
}
