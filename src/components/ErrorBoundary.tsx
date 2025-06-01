
"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ padding: '20px', margin: '20px', border: '1px solid red', backgroundColor: '#ffeeee', color: '#cc0000' }}>
          <h2>Oops! Something went wrong.</h2>
          <p>We encountered an error trying to load this section.</p>
          {this.state.error && (
            <details style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
              <summary>Error Details</summary>
              <p>{this.state.error.toString()}</p>
              {this.state.errorInfo && <p>Component Stack: {this.state.errorInfo.componentStack}</p>}
            </details>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined, errorInfo: undefined });
            }}
            style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
