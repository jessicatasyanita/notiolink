import * as React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';

export default function DismissableToast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='focus-visible:ring focus:outline-none hover:bg-[#444] p-1 ring-primary-400 rounded-full transition'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <HiX />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
