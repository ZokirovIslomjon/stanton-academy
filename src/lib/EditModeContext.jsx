import React, { createContext, useContext, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '../admin/AdminAuthContext';

// Lets a logged-in admin browse the real public site and edit content inline (like a lightweight
// WordPress/Wix front-end editor), instead of only through the separate /admin forms. Reuses the
// same Supabase auth session as /admin/login — being signed in there is what makes the "Edit Page"
// button appear here.
const EditModeContext = createContext({ editMode: false });

function EditModeInner({ children }) {
  const { session } = useAdminAuth();
  const isAdmin = !!session;
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ editMode: isAdmin && editMode }}>
      {children}
      {isAdmin && (
        <button
          type="button"
          onClick={() => setEditMode((v) => !v)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: editMode ? '#006B3F' : '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '14px 22px',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {editMode ? '✓ Editing — click text to change it' : '✎ Edit Page'}
        </button>
      )}
    </EditModeContext.Provider>
  );
}

export function EditModeProvider({ children }) {
  return (
    <AdminAuthProvider>
      <EditModeInner>{children}</EditModeInner>
    </AdminAuthProvider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}
