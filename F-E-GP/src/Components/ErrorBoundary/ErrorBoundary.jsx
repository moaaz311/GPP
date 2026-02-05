import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center mt-5 p-4 border rounded bg-light shadow-sm">
          <h2 className="text-danger mb-3">Error, Email is taken</h2>
          <p className="text-muted">{this.state.error?.message || "يرجى المحاولة لاحقًا."}</p>
          <button className="btn btn-primary mt-3 text-white" onClick={() => window.location.reload()}>
            reload the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
