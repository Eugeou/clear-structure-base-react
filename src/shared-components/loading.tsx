import { type FC } from "react";

interface LoadingProps {
  showSpinner?: boolean;
}

const Loading: FC<LoadingProps> = ({ showSpinner = true }) => {
  return (
    <>
      {showSpinner && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <div 
            className="spinner"
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} 
          />
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Loading;
